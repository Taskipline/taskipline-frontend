'use client'

import { ArrowUpRight, ListChecks, Loader2, Trash } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import TaskModal from './task-modal'
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
} from '@/components/ui/dialog'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask, updateTask } from '@/services/taskService'
import type { Task } from '@/types/tasks'
import { useState } from 'react'
import { notify } from '@/utilities/common'

export default function TaskTile({
  task,
  showIcon = true,
}: { task: Task } & { showIcon?: boolean }) {
  const queryClient = useQueryClient()
  const toggleTaskCompletionMutation = useMutation({
    mutationFn: (task: Task) =>
      updateTask(task.id, { isCompleted: !task.isCompleted }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      notify('success', `Task '${task.title}' updated successfully.`)
    },
  })

  return (
    <div
      className={`flex items-center justify-between hover:bg-accent-foreground/10 px-4 py-2 rounded-lg transition-colors ${task.isCompleted ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center gap-2 md:gap-4">
        {showIcon && (
          <div className="bg-accent size-12 rounded-lg flex items-center justify-center">
            <ListChecks className="w-5 h-5" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h3
              className={`font-medium text-base leading-6 ${task.isCompleted && 'line-through text-foreground/50'}`}
            >
              {task.title}
            </h3>
            <TaskModal
              type="view"
              callToActionButtonVariant="link"
              callToActionButtonContent={<ArrowUpRight className="size-5" />}
              taskId={task.id}
            />
          </div>
          <p
            className={`text-sm leading-[21px] ${task.isCompleted ? 'line-through text-foreground/50' : 'text-foreground/70'}`}
          >
            {task.dueDate}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        {toggleTaskCompletionMutation.isPending ? (
          <Loader2 />
        ) : (
          <Checkbox
            checked={task.isCompleted}
            onCheckedChange={() => toggleTaskCompletionMutation.mutate(task)}
            disabled={toggleTaskCompletionMutation.isPending}
            aria-label="Toggle task completion"
          />
        )}
        <DeleteDialog task={task} queryClient={queryClient} />
      </div>
    </div>
  )
}

function DeleteDialog({
  task,
  queryClient,
}: {
  task: Task
  queryClient: QueryClient
}) {
  const [open, setOpen] = useState(false)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
      setOpen(false)
      notify('success', 'Task deleted successfully.')
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="size-4">
          <Trash className="h-4 w-4 text-error" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete &apos;{task.title}&apos; Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={() => deleteMutation.mutate(task.id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Task'}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
