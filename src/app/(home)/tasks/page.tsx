'use client'

import TaskModal from '@/components/tasks/task-modal'
import TaskTile from '@/components/tasks/task-tile'
import Title from '@/components/title'
import { CustomInput } from '@/components/ui/input'
import { listTasks } from '@/services/taskService'
import { endOfToday, startOfToday } from '@/utilities/common'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function Tasks() {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: listTasks,
  })
  const [query, setQuery] = useState('')
  const tasks = Array.isArray(data)
    ? data.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      )
    : []

  const parse = (iso?: string) => {
    if (!iso) return null
    const d = new Date(iso)
    return Number.isNaN(d.getTime()) ? null : d
  }

  const tasksToday = tasks.filter((t) => {
    const d = parse(t.dueDate)
    return d !== null && d >= startOfToday && d <= endOfToday
  })

  const upcomingTasks = tasks.filter((t) => {
    const d = parse(t.dueDate)
    return d !== null && d > endOfToday
  })

  const unScheduledTasks = tasks.filter((t) => !parse(t.dueDate))

  const oldTasks = tasks.filter((t) => {
    const d = parse(t.dueDate)
    return d !== null && d < startOfToday
  })

  return (
    <div className="grid gap-4">
      <div>
        <div className="flex justify-between items-center">
          <Title text="Tasks" />
          <TaskModal type="create" />
        </div>
        <p className="text-sm leading-[21px] text-foreground/70">
          Manage your tasks effectively to stay on top of your goals.
        </p>
      </div>
      <CustomInput
        placeholder="Search tasks"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {/* <div className="w-full border-b border-b-primary flex gap-4 p-4 overflow-x-auto">
        <Button variant="secondary" className="rounded-[20px]">
          All Tasks
        </Button>
        <Button variant="outline" className="rounded-[20px]">
          Completed
        </Button>
        <Button variant="outline" className="rounded-[20px]">
          Pending
        </Button>
        {goals.map((goal) => (
          <Button key={goal.id} variant="outline" className="rounded-[20px]">
            {goal.title}
          </Button>
        ))}
      </div> */}
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-accent italic">You do not have any tasks</p>
      ) : (
        <>
          {tasksToday.length > 0 && (
            <>
              <Title text="Today" type="sub-heading-2" />
              {tasksToday?.map((task) => (
                <TaskTile key={task.id} task={task} />
              ))}
            </>
          )}
          {upcomingTasks.length > 0 && (
            <>
              {' '}
              <Title text="Upcoming" type="sub-heading-2" />
              {upcomingTasks?.map((task) => (
                <TaskTile key={task.id} task={task} />
              ))}
            </>
          )}
          {unScheduledTasks.length > 0 && (
            <>
              {' '}
              <Title text="Unscheduled" type="sub-heading-2" />
              {unScheduledTasks?.map((task) => (
                <TaskTile key={task.id} task={task} />
              ))}
            </>
          )}
          {oldTasks.length > 0 && (
            <>
              <Title text="Old/Previous" type="sub-heading-2" />
              {oldTasks?.map((task) => (
                <TaskTile key={task.id} task={task} />
              ))}{' '}
            </>
          )}
        </>
      )}
    </div>
  )
}
