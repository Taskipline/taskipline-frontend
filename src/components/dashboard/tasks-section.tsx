'use client'

import TaskTile from '../tasks/task-tile'
import Title from '../title'
import GoalModal from '../goals/goal-modal'
import TaskModal from '../tasks/task-modal'
import { useQuery } from '@tanstack/react-query'
import { listTasks } from '@/services/taskService'

export default function TasksSection() {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: listTasks,
  })
  const now = new Date()
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  )
  const endOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  )

  const tasks = Array.isArray(data)
    ? data.filter((t) => {
        if (!t.dueDate) return false
        const d = new Date(t.dueDate)
        if (Number.isNaN(d.getTime())) return false
        return d >= startOfToday && d <= endOfToday
      })
    : []

  return (
    <section className="grid gap-10">
      <Title text="Today's Focus" />
      <div className="grid gap-6">
        <div className="grid gap-4">
          {isLoading ? (
            <p>Loading tasks...</p>
          ) : (
            tasks.length === 0 && (
              <p className="text-accent italic">No tasks for today</p>
            )
          )}
          {tasks?.map((task) => (
            <TaskTile key={task.id} task={task} />
          ))}
        </div>
        <div className="flex gap-2">
          <TaskModal type="create" callToActionButtonVariant="default" />
          <GoalModal type="create" />
        </div>
      </div>
    </section>
  )
}
