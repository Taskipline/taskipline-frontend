'use client'

import { ReactNode, useState } from 'react'
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

type TaskPriority = 'low' | 'medium' | 'high'

export default function TaskModal({
  type,
  callToActionButtonVariant = 'secondary',
  callToActionButtonContent,
}: {
  type: 'create' | 'edit' | 'view'
  callToActionButtonVariant?: 'secondary' | 'default' | 'link'
  callToActionButtonContent?: ReactNode | string
}) {
  const [priority, setPriority] = useState<TaskPriority>('medium')
  const [goal, setGoal] = useState<string | undefined>(undefined)
  return (
    <Dialog>
      <form>
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
          <div className="grid gap-4 p-2 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
            <CustomInput
              label="Task Name"
              placeholder="Enter task name"
              width="w-full md:max-w-sm"
              disabled={type === 'view'}
              defaultValue={type === 'view' ? 'Project Report' : ''}
            />
            <CustomTextarea
              label="Description"
              width="w-full md:max-w-sm"
              disabled={type === 'view'}
              defaultValue={
                type === 'view'
                  ? 'This task is to complete the project report before 5pm.'
                  : ''
              }
            />
            <CustomInput
              label="Due Date/Time"
              width="w-full md:max-w-sm"
              type="datetime-local"
              disabled={type === 'view'}
              defaultValue={type === 'view' ? '2026-10-31T12:00' : ''}
            />
            <PriorityDropdown
              priority={priority}
              setPriority={setPriority}
              type={type}
            />
            <GoalDropdown goal={goal} setGoal={setGoal} type={type} />
          </div>
          <DialogFooter>
            {type === 'create' ? (
              <>
                <DialogClose asChild>
                  <Button variant="secondary" className="rounded-[20px]">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" className="rounded-[20px]">
                  Create Task
                </Button>
              </>
            ) : type === 'view' ? (
              <>
                <TaskModal type="edit" />
                <Button type="submit" className="rounded-[20px]">
                  Mark as Complete
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
                  <Button type="submit" className="rounded-[20px]">
                    Save Changes
                  </Button>
                </>
              )
            )}
          </DialogFooter>
        </DialogContent>
      </form>
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
