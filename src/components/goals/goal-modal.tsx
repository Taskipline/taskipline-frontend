'use client'

import { useState } from 'react'
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
import { tasks } from '@/constants/tasks'
import Title from '../title'
import TaskTile from '../tasks/task-tile'
import { Progress } from '../ui/progress'

export default function GoalModal({
  type,
}: {
  type: 'create' | 'edit' | 'view'
}) {
  const [subTasksEnabled, setSubTasksEnabled] = useState(false)

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary" className="rounded-[20px] cursor-pointer">
            {type === 'create'
              ? 'New Goal'
              : type === 'edit'
                ? 'Edit Goal'
                : type === 'view' && 'View Details'}
          </Button>
        </DialogTrigger>
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
          <div className="grid gap-4 p-2 max-h-[60vh] md:max-h-[70vh] overflow-y-auto">
            <CustomInput
              label="Goal Name"
              placeholder="e.g Complete Project Report"
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
                  ? 'This goal is to complete the project report by the end of the month.'
                  : ''
              }
            />
            <CustomInput
              label="Target Date/Time Span"
              width="w-full md:max-w-sm"
              type="datetime-local"
              disabled={type === 'view'}
              defaultValue={type === 'view' ? '2026-10-31T12:00' : ''}
            />
            {type !== 'view' ? (
              <>
                <div className="flex gap-2">
                  <Checkbox
                    checked={subTasksEnabled}
                    onClick={() => setSubTasksEnabled(!subTasksEnabled)}
                  />
                  <Label>Break down into sub-tasks</Label>
                </div>
                {subTasksEnabled && (
                  <>
                    <CustomInput
                      label="Sub-task Name"
                      placeholder="e.g Write Introduction"
                      width="w-full md:max-w-sm"
                    />
                    <CustomTextarea
                      label="Sub-task Description"
                      width="w-full md:max-w-sm"
                    />
                    <CustomInput
                      label="Sub-task Due Date/Time Span"
                      width="w-full md:max-w-sm"
                      type="datetime-local"
                    />
                    <div className="flex justify-end">
                      <Button
                        variant="secondary"
                        className="rounded-[20px]"
                        disabled
                      >
                        Add Sub-task
                      </Button>
                    </div>
                    {tasks.map((task) => (
                      <GoalTaskTile
                        key={task.id}
                        title={task.title}
                        description={task.description}
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
                    <p>75%</p>
                  </div>
                  <Progress value={75} className="" />
                </div>
                <Title text="Sub-tasks" type="sub-heading-2" />
                {tasks.map((task) => (
                  <TaskTile
                    key={task.id}
                    title={task.title}
                    date={task.date}
                    completed={task.completed}
                    showIcon={false}
                    // description={task.description}
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
                <Button type="submit" className="rounded-[20px]">
                  Create Goal
                </Button>
              </>
            ) : type === 'view' ? (
              <>
                <GoalModal type="edit" />
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

function GoalTaskTile({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex justify-between">
      <div>
        <h3 className="font-medium text-base leading-6">{title}</h3>
        <p className="text-sm leading-[21px] text-foreground/70">
          {description}
        </p>
      </div>
      <Button variant="ghost" size="icon">
        <Pencil className="w-5 h-5" />
      </Button>
    </div>
  )
}
