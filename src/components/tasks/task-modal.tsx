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
import { goals } from '@/constants/goals'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createTask, listTasks, updateTask } from '@/services/taskService'
import { type Task, TaskPriority } from '@/types/tasks'
import { isoToLocalInput, notify, toIsoOrUndefined } from '@/utilities/common'

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
  })

  const [open, setOpen] = useState(false)
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [goal, setGoal] = useState<string | undefined>(undefined)
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
      setGoal(undefined)
    } else if ((type === 'edit' || type === 'view') && originalTask) {
      setTitle(originalTask.title)
      setDescription(originalTask.description || '')
      setDueDateLocal(isoToLocalInput(originalTask.dueDate))
      setPriority(originalTask.priority || 'medium')
      setGoal(originalTask.goal || undefined)
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
      normalize.goal(goal) !== normalize.goal(originalTask.goal))

  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      notify('success', 'Task created successfully.')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setOpen(false)
      setTitle('')
      setDescription('')
      setDueDateLocal('')
      setPriority('medium')
      setGoal(undefined)
    },
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
    onSuccess: () => {
      notify('success', 'Task updated successfully.')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setOpen(false)
    },
  })

  const toggleTaskCompletionMutation = useMutation({
    mutationFn: (task: Task) =>
      updateTask(task.id, { isCompleted: !task.isCompleted }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      const task = originalTask || tasks?.find((t) => t.id === taskId)
      if (!task) return
      notify('success', `Task '${task.title}' updated successfully.`)
    },
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
                  goal,
                })
              } else if (type === 'edit' && originalTask) {
                updateMutation.mutate({
                  id: originalTask.id,
                  title,
                  description: description || undefined,
                  dueDate: toIsoOrUndefined(dueDateLocal),
                  priority,
                  goal,
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
              <div className="hidden">
                <GoalDropdown goal={goal} setGoal={setGoal} type={type} />
              </div>
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
  goal,
  setGoal,
  type,
}: {
  goal: string | undefined
  setGoal: (value: string | undefined) => void
  type: 'create' | 'edit' | 'view'
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={type === 'view'} asChild>
        <CustomInput
          label="Link to Goal (optional)"
          placeholder="Select priority"
          value={
            goal
              ? goal.charAt(0).toUpperCase() + goal.slice(1)
              : 'Select priority'
          }
          readOnly
          className="cursor-pointer text-left"
          width="w-full md:max-w-sm"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Goal</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={goals.find((g) => g.value === goal)?.title}
          onValueChange={(value) => setGoal(value as string)}
          defaultValue={goals[0].title}
        >
          {goals.map((taskPriority) => (
            <DropdownMenuRadioItem
              key={taskPriority.value}
              value={taskPriority.value}
            >
              {taskPriority.title}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
