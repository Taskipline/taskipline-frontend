'use client'

import { Progress } from '../ui/progress'
import GoalModal from './goal-modal'
import { ArrowUpRight, Trash } from 'lucide-react'
import { type Goal } from '@/types/goal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteGoal } from '@/services/goalService'
import { formatDueDate, notify } from '@/utilities/common'
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
import { Button } from '../ui/button'

export default function GoalTile({ goal }: { goal: Goal }) {
  return (
    <div className="grid gap-2 p-4 hover:bg-accent-foreground/10 rounded-lg transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3
            className={`font-medium text-base leading-6 ${goal.completionPercentage === 100 || goal.status === 'Completed' ? 'line-through text-foreground/50' : ''}`}
          >
            {goal.title.toLocaleUpperCase()}{' '}
            <span className="font-normal">| {formatDueDate(goal.dueDate)}</span>
          </h3>
          <GoalModal
            type="view"
            callToActionButtonVariant="link"
            callToActionButtonContent={<ArrowUpRight className="size-5" />}
            goalId={goal._id}
          />
        </div>
        <p className="text-sm leading-[21px]">{goal.completionPercentage}%</p>
      </div>
      <Progress value={goal.completionPercentage} />
    </div>
  )
}

export function MainGoalTile({ goal }: { goal: Goal }) {
  // const queryClient = useQueryClient()

  // const toggleGoalCompletionMutation = useMutation({
  //   mutationFn: (goal: Goal) =>
  //     updateGoal(goal._id, {
  //       status: goal.status === 'Completed' ? 'In Progress' : 'Completed',
  //     }),
  //   onMutate: async (g) => {
  //     await queryClient.cancelQueries({ queryKey: ['goals'] })
  //     const previousGoals = queryClient.getQueryData<Goal[]>(['goals'])
  //     const nextStatus = g.status === 'Completed' ? 'In Progress' : 'Completed'
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
  //     notify('error', 'Failed to update goal status. Changes were rolled back.')
  //   },
  //   onSuccess: () => {
  //     notify('success', `Goal '${goal.title}' status updated successfully.`)
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ['goals'] })
  //   },
  // })

  return (
    <div className="flex justify-between p-4 hover:bg-accent-foreground/10 rounded-lg transition-colors cursor-default">
      <div className="grid gap-10">
        <div>
          <h3
            className={`font-medium text-base leading-6 ${goal.completionPercentage === 100 || goal.status === 'Completed' ? 'line-through text-foreground/50' : ''}`}
          >
            {goal.title.toLocaleUpperCase()}{' '}
            <span className="font-normal">
              {' '}
              | {goal.completionPercentage}% completed |{' '}
              {formatDueDate(goal.dueDate)}{' '}
            </span>
          </h3>
          <p
            className={`text-sm leading-[21px] ${goal.completionPercentage === 100 || goal.status === 'Completed' ? 'line-through text-foreground/50' : 'text-foreground/70'}`}
          >
            {goal.description}
          </p>
        </div>
        <GoalModal type="view" goalId={goal._id} />
      </div>
      <div className="flex flex-col items-center gap-2">
        {/* {toggleGoalCompletionMutation.isPending ? (
          <Loader2 />
        ) : (
          <Checkbox
            checked={goal.status === 'Completed'}
            onCheckedChange={() => toggleGoalCompletionMutation.mutate(goal)}
            disabled={toggleGoalCompletionMutation.isPending}
            aria-label="Toggle task completion"
          />
        )} */}
        <DeleteDialog goal={goal} />
      </div>
    </div>
  )
}

function DeleteDialog({ goal }: { goal: Goal }) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteGoal(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['goals'] })
      const previousGoals = queryClient.getQueryData<Goal[]>(['goals'])
      queryClient.setQueryData<Goal[]>(['goals'], (old) =>
        (old ?? []).filter((g) => g._id !== id)
      )
      return { previousGoals }
    },
    onError: (_err, _id, context) => {
      if (context?.previousGoals) {
        queryClient.setQueryData(['goals'], context.previousGoals)
      }
      notify('error', 'Failed to delete goal. Changes were rolled back.')
    },
    onSuccess: () => {
      setOpen(false)
      notify('success', 'Goal deleted successfully.')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] })
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
          <DialogTitle>Delete &apos;{goal.title}&apos; Task</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this goal? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={() => deleteMutation.mutate(goal._id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete Goal'}
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
