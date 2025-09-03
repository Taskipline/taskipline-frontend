'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
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
import { CustomInput } from '../ui/input'
import { Label } from '../ui/label'
import { CustomTextarea } from '../ui/textarea'
import { Pencil } from 'lucide-react'
import Title from '../title'
import { Progress } from '../ui/progress'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createGoal, listGoals, updateGoal } from '@/services/goalService'
import type { CreateGoalTaskInput } from '@/services/goalService'
import { Task } from '@/types/tasks'
import {
  isoToLocalInput,
  notify,
  randomId,
  toIsoOrUndefined,
} from '@/utilities/common'
import { Goal } from '@/types/goal'
import TaskTile from '../tasks/task-tile'
import { updateTask } from '@/services/taskService'

export default function GoalModal({
  type,
  callToActionButtonVariant = 'secondary',
  callToActionButtonContent,
  goalId,
}: {
  type: 'create' | 'edit' | 'view'
  callToActionButtonVariant?: 'secondary' | 'default' | 'link'
  callToActionButtonContent?: React.ReactNode | string
  goalId?: string
}) {
  const queryClient = useQueryClient()
  const { data: goal, isLoading: isFetchingGoals } = useQuery({
    queryKey: ['goals'],
    queryFn: listGoals,
    enabled: type !== 'create',
  })

  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDateLocal, setDueDateLocal] = useState('')
  const [subTasksEnabled, setSubTasksEnabled] = useState(false)
  const [subTasks, setSubTasks] = useState<Task[] | undefined>(undefined)
  const [editSubtaskId, setEditSubtaskId] = useState<string>(randomId())
  const [modifiedTasks, setModifiedTasks] = useState<Record<string, boolean>>(
    {}
  )

  const originalGoal = useMemo(
    () => (goalId ? goal?.find((g) => g._id === goalId) : undefined),
    [goal, goalId]
  )

  useEffect(() => {
    if (type === 'create') {
      setTitle('')
      setDescription('')
      setDueDateLocal('')
      setSubTasksEnabled(false)
      setSubTasks(undefined)
    } else if ((type === 'edit' || type === 'view') && originalGoal) {
      setTitle(originalGoal.title || '')
      setDescription(originalGoal.description || '')
      setDueDateLocal(isoToLocalInput(originalGoal.dueDate))
      setSubTasksEnabled(originalGoal.tasks.length > 0)
      setSubTasks(originalGoal.tasks)
    }
  }, [open, type, originalGoal])

  // Track task modifications when they change
  useEffect(() => {
    if (type === 'edit' && originalGoal && subTasks) {
      const modified: Record<string, boolean> = {}

      // Track which tasks have been modified from their original state
      subTasks.forEach((task) => {
        if (!task.id) return

        const original = originalGoal.tasks.find((t) => t.id === task.id)
        if (original) {
          const isModified =
            task.title !== original.title ||
            task.description !== original.description ||
            task.dueDate !== original.dueDate

          if (isModified) {
            modified[task.id] = true
          }
        }
      })

      setModifiedTasks(modified)
    }
  }, [subTasks, originalGoal, type, setModifiedTasks])

  const normalize = {
    title: (v: string) => v.trim(),
    description: (v: string) => v.trim(),
    dateIsoFromLocal: (local: string) => toIsoOrUndefined(local) ?? '',
    // Clean sub-tasks for API: keep only valid fields, trim, drop empties, convert to ISO
    subTasks: (tasks: Task[]): CreateGoalTaskInput[] =>
      tasks
        .map((task) => {
          const t = (task.title ?? '').trim()
          const d = (task.description ?? '').trim()
          const iso = task.dueDate ? toIsoOrUndefined(task.dueDate) : undefined
          return {
            title: t,
            description: d || undefined,
            dueDate: iso, // undefined keys are omitted in JSON
          }
        })
        .filter((t) => t.title.length > 0),
  }

  const isFormChanged =
    type === 'edit' &&
    originalGoal !== undefined &&
    (normalize.title(title) !== normalize.title(originalGoal.title || '') ||
      normalize.description(description) !==
        normalize.description(originalGoal.description || '') ||
      normalize.dateIsoFromLocal(dueDateLocal) !==
        (originalGoal.dueDate ?? '') ||
      Boolean(subTasksEnabled) !== originalGoal.tasks?.length > 0 ||
      (subTasksEnabled &&
        JSON.stringify(normalize.subTasks(subTasks ?? [])) !==
          JSON.stringify(normalize.subTasks(originalGoal.tasks ?? []))))

  const createMutation = useMutation({
    mutationFn: createGoal,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ['goals'] })
      const previousGoals = queryClient.getQueryData<Goal[]>(['goals'])
      const calcPct = (tasks?: Task[]) => {
        const list = tasks ?? []
        const total = list.length
        const done = list.filter((t) => t.isCompleted).length
        return total ? Math.round((done / total) * 100) : 0
      }
      // Map minimal create inputs to full Task[] shape for optimistic cache
      const mapInputsToTasks = (inputs?: CreateGoalTaskInput[]): Task[] =>
        (inputs ?? []).map((t) => ({
          id: randomId(),
          title: t.title,
          description: t.description,
          dueDate: t.dueDate,
          priority: 'low',
          isCompleted: false,
        }))

      const tempTasks = mapInputsToTasks(payload.tasks)
      const tempGoal: Goal = {
        _id: `temp-${randomId()}`,
        title: payload.title,
        description: payload.description,
        dueDate: payload.dueDate,
        status: 'In Progress',
        tasks: tempTasks,
        completionPercentage: calcPct(tempTasks),
      }
      queryClient.setQueryData<Goal[]>(['goals'], (old) => [
        ...(old ?? []),
        tempGoal,
      ])
      return { previousGoals }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousGoals) {
        queryClient.setQueryData(['goals'], context.previousGoals)
      }
      notify('error', 'Failed to create goal. Changes were rolled back.')
    },
    onSuccess: () => {
      notify('success', 'Goal created successfully.')
      setOpen(false)
      setTitle('')
      setDescription('')
      setDueDateLocal('')
      setSubTasksEnabled(false)
      setSubTasks(undefined)
      queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
    onSettled: () => {},
  })

  const updateMutation = useMutation({
    mutationFn: (goal: {
      _id: string
      title: string
      description?: string
      dueDate?: string
      tasks?: Task[]
    }) => updateGoal(goal._id, goal),
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ['goals'] })
      const previousGoals = queryClient.getQueryData<Goal[]>(['goals'])
      const calcPct = (tasks?: Task[]) => {
        const list = tasks ?? []
        const total = list.length
        const done = list.filter((t) => t.isCompleted).length
        return total ? Math.round((done / total) * 100) : 0
      }
      queryClient.setQueryData<Goal[]>(['goals'], (old) =>
        (old ?? []).map((g) =>
          g._id === updated._id
            ? {
                ...g,
                title: updated.title ?? g.title,
                description: updated.description ?? g.description,
                dueDate: updated.dueDate ?? g.dueDate,
                tasks: updated.tasks ?? g.tasks,
                completionPercentage: calcPct(updated.tasks ?? g.tasks),
              }
            : g
        )
      )
      return { previousGoals }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousGoals) {
        queryClient.setQueryData(['goals'], context.previousGoals)
      }
      notify('error', 'Failed to update goal. Changes were rolled back.')
    },
    onSuccess: () => {
      notify('success', 'Goal updated successfully.')
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
    onSettled: () => {},
  })

  // const toggleGoalCompletionMutation = useMutation({
  //   mutationFn: (goal: Goal) =>
  //     updateGoal(goal._id, {
  //       ...goal,
  //       status: goal.status === 'In Progress' ? 'Completed' : 'In Progress',
  //     }),
  //   onMutate: async (g) => {
  //     await queryClient.cancelQueries({ queryKey: ['goals'] })
  //     const previousGoals = queryClient.getQueryData<Goal[]>(['goals'])
  //     const nextStatus =
  //       g.status === 'In Progress' ? 'Completed' : 'In Progress'
  //     queryClient.setQueryData<Goal[]>(['goals'], (old) =>
  //       (old ?? []).map((x) =>
  //         x._id === g._id ? { ...x, status: nextStatus } : x
  //       )
  //     )
  //     return { previousGoals }
  //   },
  //   onError: (_err, _vars, context) => {
  //     if (context?.previousGoals) {
  //       queryClient.setQueryData(['goals'], context.previousGoals)
  //     }
  //     notify('error', 'Failed to update status. Changes were rolled back.')
  //   },
  //   onSuccess: () => {
  //     notify('success', 'Goal status updated successfully.')
  //     queryClient.invalidateQueries({ queryKey: ['goals'] })
  //   },
  //   onSettled: () => {},
  // })

  // Add task update mutation for updating sub-tasks
  const updateTasksMutation = useMutation({
    mutationFn: async (tasks: Task[]) => {
      // Process all task updates in parallel
      return Promise.all(tasks.map((task) => updateTask(task.id, task)))
    },
    onMutate: async (tasksToUpdate) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] })
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks'])

      // Optimistically update tasks cache
      queryClient.setQueryData<Task[]>(['tasks'], (old = []) => {
        return old.map((task) => {
          const updated = tasksToUpdate.find((t) => t.id === task.id)
          return updated ? { ...task, ...updated } : task
        })
      })

      return { previousTasks }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks)
      }
      notify('error', 'Failed to update sub-tasks. Changes were rolled back.')
    },
    onSuccess: () => {
      notify('success', 'Sub-tasks updated successfully.')
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={callToActionButtonVariant}
          className="rounded-[20px] cursor-pointer w-fit"
        >
          {callToActionButtonContent ??
            (type === 'create'
              ? 'New Goal'
              : type === 'edit'
                ? 'Edit Goal'
                : type === 'view' && 'View Details')}
        </Button>
      </DialogTrigger>
      {type !== 'create' && isFetchingGoals ? (
        <p>No goal has been selected to be viewed</p>
      ) : (
        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] xl:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle>
              {type === 'create'
                ? 'Create New Goal'
                : type === 'edit'
                  ? 'Edit Goal'
                  : type === 'view' && 'Goal Details'}
            </DialogTitle>
            {type === 'view' && (
              <DialogDescription>View and manage your goal</DialogDescription>
            )}
          </DialogHeader>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              if (type === 'create') {
                const cleaned = subTasksEnabled
                  ? normalize.subTasks(subTasks ?? [])
                  : []
                createMutation.mutate({
                  title: normalize.title(title),
                  description: normalize.description(description),
                  dueDate: normalize.dateIsoFromLocal(dueDateLocal),
                  tasks: cleaned,
                })
              } else if (type === 'edit' && originalGoal) {
                // Start both mutations simultaneously
                const promises = []

                // 1. Update the goal itself
                promises.push(
                  updateMutation.mutateAsync({
                    _id: originalGoal._id,
                    title: normalize.title(title),
                    description: normalize.description(description),
                    dueDate: normalize.dateIsoFromLocal(dueDateLocal),
                  })
                )

                // 2. Update modified tasks
                const tasksToUpdate = (subTasks ?? [])
                  .filter((task) => task.id && modifiedTasks[task.id])
                  .map((task) => ({
                    id: task.id,
                    title: task.title,
                    description: task.description || '',
                    dueDate: toIsoOrUndefined(task.dueDate) || undefined,
                    // Preserve existing values
                    priority: task.priority || 'low',
                    isCompleted: task.isCompleted || false,
                    goal: originalGoal._id,
                  }))

                if (tasksToUpdate.length > 0) {
                  promises.push(updateTasksMutation.mutateAsync(tasksToUpdate))
                }

                // Wait for all updates to complete
                try {
                  await Promise.all(promises)
                  setOpen(false)
                } catch (error) {
                  // Error handling is done in the individual mutations
                  console.error('Update failed:', error)
                }
              }
              // else if (type === 'view' && originalGoal) {
              //   toggleGoalCompletionMutation.mutate(originalGoal)
              // }
            }}
          >
            <div className="grid gap-4 p-2 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
              <CustomInput
                label="Goal Name"
                placeholder="e.g Complete Project Report"
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
                placeholder="e.g This goal is to complete the project report by the end of the month. The purpose is to summarize the project findings and present them to the stakeholders."
                rows={4}
              />
              <CustomInput
                label="Target Date/Time Span"
                width="w-full md:max-w-sm"
                type="datetime-local"
                value={dueDateLocal}
                onChange={(e) => setDueDateLocal(e.target.value)}
                disabled={type === 'view'}
              />
              {type !== 'view' ? (
                <>
                  <div className="flex gap-2">
                    <Checkbox
                      checked={subTasksEnabled}
                      onClick={() =>
                        setSubTasksEnabled((prev) => {
                          const next = !prev
                          if (next) {
                            // Ensure there is an editable sub-task when enabling
                            setSubTasks((prevTasks) => {
                              const list = prevTasks ? [...prevTasks] : []
                              if (!list.find((t) => t.id === editSubtaskId)) {
                                list.push({
                                  id: editSubtaskId,
                                  title: '',
                                  description: '',
                                  dueDate: '',
                                  priority: 'low',
                                  isCompleted: false,
                                })
                              }
                              return list
                            })
                          }
                          return next
                        })
                      }
                    />
                    <Label>Break down into sub-tasks</Label>
                  </div>
                  {subTasksEnabled && (
                    <>
                      <CustomInput
                        label="Sub-task Name"
                        placeholder="e.g Write Introduction"
                        width="w-full md:max-w-sm"
                        value={
                          editSubtaskId
                            ? subTasks?.find((t) => t.id === editSubtaskId)
                                ?.title
                            : ''
                        }
                        onChange={(e) => {
                          const value = e.target.value
                          if (!editSubtaskId) return
                          setSubTasks((prev) => {
                            const list = prev ? [...prev] : []
                            let idx = list.findIndex(
                              (t) => t.id === editSubtaskId
                            )
                            if (idx === -1) {
                              list.push({
                                id: editSubtaskId,
                                title: '',
                                description: '',
                                dueDate: '',
                                priority: 'low',
                                isCompleted: false,
                              })
                              idx = list.length - 1
                            }
                            list[idx] = { ...list[idx], title: value }
                            return list
                          })
                        }}
                      />
                      <CustomTextarea
                        label="Sub-task Description"
                        width="w-full md:max-w-sm"
                        value={
                          editSubtaskId
                            ? subTasks?.find((t) => t.id === editSubtaskId)
                                ?.description
                            : ''
                        }
                        onChange={(e) => {
                          const value = e.target.value
                          if (!editSubtaskId) return
                          setSubTasks((prev) => {
                            const list = prev ? [...prev] : []
                            let idx = list.findIndex(
                              (t) => t.id === editSubtaskId
                            )
                            if (idx === -1) {
                              list.push({
                                id: editSubtaskId,
                                title: '',
                                description: '',
                                dueDate: '',
                                priority: 'low',
                                isCompleted: false,
                              })
                              idx = list.length - 1
                            }
                            list[idx] = { ...list[idx], description: value }
                            return list
                          })
                        }}
                      />
                      <CustomInput
                        label="Sub-task Due Date/Time Span"
                        width="w-full md:max-w-sm"
                        type="datetime-local"
                        value={
                          editSubtaskId
                            ? subTasks?.find((t) => t.id === editSubtaskId)
                                ?.dueDate || ''
                            : ''
                        }
                        onChange={(e) => {
                          const value = e.target.value
                          if (!editSubtaskId) return
                          setSubTasks((prev) => {
                            const list = prev ? [...prev] : []
                            let idx = list.findIndex(
                              (t) => t.id === editSubtaskId
                            )
                            if (idx === -1) {
                              list.push({
                                id: editSubtaskId,
                                title: '',
                                description: '',
                                dueDate: '',
                                priority: 'low',
                                isCompleted: false,
                              })
                              idx = list.length - 1
                            }
                            list[idx] = { ...list[idx], dueDate: value }
                            return list
                          })
                        }}
                      />
                      <div className="flex justify-end">
                        <Button
                          variant="secondary"
                          className="rounded-[20px]"
                          disabled={
                            !(
                              editSubtaskId &&
                              (
                                subTasks?.find((t) => t.id === editSubtaskId)
                                  ?.title ?? ''
                              ).trim()
                            )
                          }
                          onClick={() => {
                            const id = randomId()
                            setSubTasks((prev) => [
                              ...(prev ?? []),
                              {
                                id,
                                title: '',
                                description: '',
                                dueDate: '',
                                priority: 'low',
                                isCompleted: false,
                              },
                            ])
                            setEditSubtaskId(id)
                          }}
                        >
                          Add Sub-task
                        </Button>
                      </div>
                      {(subTasks ?? []).map((task, idx) => (
                        <GoalTaskTile
                          key={task.id ?? `task-${idx}`}
                          task={task}
                          setEditSubtaskId={setEditSubtaskId}
                        />
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className="grid gap-1">
                    <div className="flex justify-between">
                      <Label>Overall Progress</Label>
                      <p>{originalGoal?.completionPercentage}%</p>
                    </div>
                    <Progress
                      value={originalGoal?.completionPercentage}
                      className=""
                    />
                  </div>
                  <Title text="Sub-tasks" type="sub-heading-2" />
                  {originalGoal?.tasks.map((task, idx) => (
                    <TaskTile
                      key={task.id ?? `task-${idx}`}
                      task={task}
                      showIcon={false}
                    />
                  ))}
                </>
              )}
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
                    {createMutation.isPending ? 'Creating...' : 'Create Goal'}
                  </Button>
                </>
              ) : type === 'view' ? (
                <>
                  <GoalModal type="edit" goalId={goalId} />
                  {/* <Button
                    type="submit"
                    className="rounded-[20px]"
                    disabled={toggleGoalCompletionMutation.isPending}
                  >
                    {toggleGoalCompletionMutation.isPending
                      ? 'Updating...'
                      : originalGoal?.status === 'In Progress'
                        ? 'Mark as Completed'
                        : 'Mark as In Progress'}
                  </Button> */}
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
                      disabled={
                        (!isFormChanged &&
                          Object.keys(modifiedTasks).length === 0) ||
                        updateMutation.isPending ||
                        updateTasksMutation.isPending
                      }
                    >
                      {updateMutation.isPending || updateTasksMutation.isPending
                        ? 'Saving...'
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

function GoalTaskTile({
  task,
  setEditSubtaskId,
}: {
  task: Task
} & { setEditSubtaskId?: (id: string) => void }) {
  return (
    <div className="flex justify-between">
      <div>
        <h3 className="font-medium text-base leading-6">{task.title}</h3>
        <p className="text-sm leading-[21px] text-foreground/70">
          {task.description}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setEditSubtaskId?.(task.id)}
      >
        <Pencil className="w-5 h-5" />
      </Button>
    </div>
  )
}
