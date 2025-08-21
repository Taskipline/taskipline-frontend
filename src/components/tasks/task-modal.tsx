'use client'

import { ReactNode, useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { CustomInput } from '../ui/input'
import { CustomTextarea } from '../ui/textarea'
import { taskPriorities } from '@/constants/tasks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTask, listTasks, updateTask } from '@/services/taskService'
import { type Task, TaskPriority } from '@/types/tasks'
import {
  isoToLocalInput,
  notify,
  toIsoOrUndefined,
  randomId,
  recomputeAndPatchGoalCompletion,
  recomputeAndPatchGoals,
  syncGoalTasksFromTasks,
  syncGoalsTasksFromTasks,
} from '@/utilities/common'
import { listGoals } from '@/services/goalService'

// todo: make sure to check the task to goal dialog

export default function TaskModal({
  type,
  callToActionButtonVariant = 'secondary',
  callToActionButtonContent,
  taskId,
}: {
  type: 'create' | 'edit' | 'view'
  callToActionButtonVariant?: 'secondary' | 'default' | 'link'
  callToActionButtonContent?: ReactNode | string
  taskId?: string
}) {
  const queryClient = useQueryClient()
  const { data: tasks, isLoading: isFetchingTasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: listTasks,
    enabled: type !== 'create',
  })

  const [open, setOpen] = useState(false)
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [goalId, setGoalId] = useState<string | undefined>(undefined)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  // const [dueDate, setDueDate] = useState<string | undefined>(undefined)
  const [dueDateLocal, setDueDateLocal] = useState<string>('')

  const originalTask = useMemo(
    () => (taskId ? tasks?.find((t) => t.id === taskId) : undefined),
    [tasks, taskId]
  )

  useEffect(() => {
    if (type === 'create') {
      setTitle('')
      setDescription('')
      setDueDateLocal('')
      setPriority('medium')
      setGoalId(undefined)
    } else if ((type === 'edit' || type === 'view') && originalTask) {
      setTitle(originalTask.title)
      setDescription(originalTask.description || '')
      setDueDateLocal(isoToLocalInput(originalTask.dueDate))
      setPriority(originalTask.priority || 'medium')
      setGoalId(originalTask.goal || undefined)
    }
  }, [open, type, originalTask])

  const normalize = {
    title: (v: string) => v.trim(),
    desc: (v?: string) => (v ?? '').trim(),
    // Compare ISO strings; convert local input to ISO for a fair comparison
    dateIsoFromLocal: (local: string) => toIsoOrUndefined(local) ?? '',
    priority: (p: TaskPriority) => p, // already TitleCase
    goal: (g?: string) => g ?? '',
  }

  const isFormChanged =
    type === 'edit' &&
    originalTask !== undefined &&
    (normalize.title(title) !== normalize.title(originalTask.title) ||
      normalize.desc(description) !==
        normalize.desc(originalTask.description) ||
      normalize.dateIsoFromLocal(dueDateLocal) !==
        (originalTask.dueDate ?? '') ||
      normalize.priority(priority) !== originalTask.priority ||
      normalize.goal(goalId) !== normalize.goal(originalTask.goal))

  const createMutation = useMutation({
    mutationFn: createTask,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      const tempTask: Task = {
        id: `temp-${randomId()}`,
        title: payload.title,
        description: payload.description,
        dueDate: payload.dueDate,
        priority: payload.priority,
        isCompleted: false,
        goal: payload.goal,
      }
      queryClient.setQueryData<Task[]>(['tasks'], (old) => [
        ...(old ?? []),
        tempTask,
      ])
      // Optimistically recompute the linked goal progress
      if (payload.goal) {
        recomputeAndPatchGoalCompletion(queryClient, payload.goal)
        syncGoalTasksFromTasks(queryClient, payload.goal)
      }
      return { previousTasks }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
      notify('error', 'Failed to create task. Changes were rolled back.')
    },
    onSuccess: () => {
      notify('success', 'Task created successfully.')
      setOpen(false)
      setTitle('')
      setDescription('')
      setDueDateLocal('')
      setPriority('medium')
      setGoalId(undefined)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
    onSettled: () => {},
  })

  const updateMutation = useMutation({
    mutationFn: (task: {
      id: string
      title: string
      description?: string
      dueDate?: string
      priority: TaskPriority
      goal?: string
    }) => updateTask(task.id, task),
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        (old ?? []).map((t) =>
          t.id === updated.id
            ? {
                ...t,
                title: updated.title ?? t.title,
                description: updated.description ?? t.description,
                dueDate: updated.dueDate ?? t.dueDate,
                priority: updated.priority ?? t.priority,
                goal: updated.goal ?? t.goal,
              }
            : t
        )
      )
      // Optimistically recompute goal progress if goal linkage affected
      const prevTask = previousTasks?.find((t) => t.id === updated.id)
      const affected = new Set<string>()
      if (prevTask?.goal) affected.add(prevTask.goal)
      const nextGoal = updated.goal ?? prevTask?.goal
      if (nextGoal) affected.add(nextGoal)
      recomputeAndPatchGoals(queryClient, affected)
      syncGoalsTasksFromTasks(queryClient, affected)
      return { previousTasks }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
      notify('error', 'Failed to update task. Changes were rolled back.')
    },
    onSuccess: () => {
      notify('success', 'Task updated successfully.')
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
    onSettled: () => {},
  })

  const toggleTaskCompletionMutation = useMutation({
    mutationFn: (task: Task) =>
      updateTask(task.id, { isCompleted: !task.isCompleted }),
    onMutate: async (t) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        (old ?? []).map((x) =>
          x.id === t.id ? { ...x, isCompleted: !x.isCompleted } : x
        )
      )
      if (t.goal) {
        recomputeAndPatchGoalCompletion(queryClient, t.goal)
        syncGoalTasksFromTasks(queryClient, t.goal)
      }
      return { previousTasks }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
      notify('error', 'Failed to toggle task. Changes were rolled back.')
    },
    onSuccess: (_data, t) => {
      notify('success', `Task '${t.title}' updated successfully.`)
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
    onSettled: () => {},
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={callToActionButtonVariant}
          className="rounded-[20px] cursor-pointer"
        >
          {callToActionButtonContent ??
            (type === 'create'
              ? 'New Task'
              : type === 'edit'
                ? 'Edit Task'
                : type === 'view' && 'View Details')}
        </Button>
      </DialogTrigger>
      {type !== 'create' && isFetchingTasks ? (
        <p>No task has been selected to be viewed</p>
      ) : (
        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>
              {type === 'create'
                ? 'Create New Task'
                : type === 'edit'
                  ? 'Edit Task'
                  : type === 'view' && 'Task Details'}
            </DialogTitle>
            {type === 'view' && (
              <DialogDescription>View and manage your task</DialogDescription>
            )}
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (type === 'create') {
                createMutation.mutate({
                  title,
                  description: description || undefined,
                  dueDate: toIsoOrUndefined(dueDateLocal),
                  priority,
                  goal: goalId,
                })
              } else if (type === 'edit' && originalTask) {
                updateMutation.mutate({
                  id: originalTask.id,
                  title,
                  description: description || undefined,
                  dueDate: toIsoOrUndefined(dueDateLocal),
                  priority,
                  goal: goalId,
                })
              }
            }}
            className="grid gap-4 p-2 max-h-[60vh] md:max-h-[70vh] overflow-y-auto"
          >
            <div className="grid gap-4 p-2 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
              <CustomInput
                label="Task Name"
                placeholder="Enter task name"
                width="w-full md:max-w-sm"
                disabled={type === 'view'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <CustomTextarea
                label="Description"
                width="w-full md:max-w-sm"
                disabled={type === 'view'}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <CustomInput
                label="Due Date/Time"
                width="w-full md:max-w-sm"
                type="datetime-local"
                disabled={type === 'view'}
                value={dueDateLocal}
                onChange={(e) => setDueDateLocal(e.target.value)}
              />
              <PriorityDropdown
                priority={priority}
                setPriority={setPriority}
                type={type}
              />
              <GoalDropdown goalId={goalId} setGoalId={setGoalId} type={type} />
            </div>
            <DialogFooter>
              {type === 'create' ? (
                <>
                  <DialogClose asChild>
                    <Button variant="secondary" className="rounded-[20px]">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    className="rounded-[20px]"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? 'Creating...' : 'Create Task'}
                  </Button>
                </>
              ) : type === 'view' ? (
                <>
                  <TaskModal type="edit" taskId={taskId} />
                  <Button
                    type="button"
                    className="rounded-[20px]"
                    disabled={toggleTaskCompletionMutation.isPending}
                    onClick={() => {
                      const task =
                        originalTask || tasks?.find((t) => t.id === taskId)
                      if (!task) return
                      toggleTaskCompletionMutation.mutate(task)
                    }}
                  >
                    {toggleTaskCompletionMutation.isPending
                      ? 'Updating...'
                      : originalTask?.isCompleted
                        ? 'Mark as Incomplete'
                        : 'Mark as Completed'}
                  </Button>
                </>
              ) : (
                type === 'edit' && (
                  <>
                    <DialogClose asChild>
                      <Button variant="secondary" className="rounded-[20px]">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="rounded-[20px]"
                      disabled={!isFormChanged || updateMutation.isPending}
                    >
                      {updateMutation.isPending
                        ? 'Saving Changes...'
                        : 'Save Changes'}
                    </Button>
                  </>
                )
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  )
}

function PriorityDropdown({
  priority,
  setPriority,
  type,
}: {
  priority: TaskPriority
  setPriority: (value: TaskPriority) => void
  type: 'create' | 'edit' | 'view'
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={type === 'view'} asChild>
        <CustomInput
          label="Priority"
          placeholder="Select priority"
          value={priority.charAt(0).toUpperCase() + priority.slice(1)}
          readOnly
          className="cursor-pointer text-left"
          width="w-full md:max-w-sm"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={priority}
          onValueChange={(value) => setPriority(value as TaskPriority)}
        >
          {taskPriorities.map((taskPriority) => (
            <DropdownMenuRadioItem
              key={taskPriority.value}
              value={taskPriority.value}
            >
              {taskPriority.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function GoalDropdown({
  goalId,
  setGoalId,
  type,
}: {
  goalId: string | undefined
  setGoalId: (value: string | undefined) => void
  type: 'create' | 'edit' | 'view'
}) {
  const { data: goals, isLoading: isFetchingGoals } = useQuery({
    queryKey: ['goals'],
    queryFn: listGoals,
    enabled: type !== 'create',
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={type === 'view'} asChild>
        <CustomInput
          label="Link to Goal (optional)"
          placeholder="Select priority"
          value={
            goalId
              ? goalId.charAt(0).toUpperCase() + goalId.slice(1)
              : 'Select goal'
          }
          readOnly
          className="cursor-pointer text-left"
          width="w-full md:max-w-sm"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {isFetchingGoals ? (
          <p>Loading goals...</p>
        ) : goals?.length === 0 ? (
          <p className="text-accent italic">No goals available</p>
        ) : (
          <>
            <DropdownMenuLabel>Select Goal</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={goals?.find((g) => g._id === goalId)?.title}
              onValueChange={(value) => setGoalId(value as string)}
            >
              {goals?.map((taskPriority) => (
                <DropdownMenuRadioItem
                  key={taskPriority._id}
                  value={taskPriority.title}
                >
                  {taskPriority.title}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
