'use client'

import { useState } from 'react'
import TaskTile from '../tasks/task-tile'
import Title from '../title'
import { tasks } from '@/constants/tasks'
import { Button } from '../ui/button'

export default function TasksSection() {
  const [taskList, setTaskList] = useState(tasks)
  return (
    <section className="grid gap-10">
      <Title text="Today's Focus" />
      <div className="grid gap-6">
        <div className="grid gap-4">
          {taskList.map((task) => (
            <TaskTile
              key={task.id}
              title={task.title}
              date={task.date}
              completed={task.completed}
              onCheckClick={() => {
                console.log(`Task ${task.id} completed status toggled`)
                setTaskList((prevTasks) =>
                  prevTasks.map((t) =>
                    t.id === task.id ? { ...t, completed: !t.completed } : t
                  )
                )
              }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button className="rounded-[20px]">New Task</Button>
          <Button className="rounded-[20px]" variant="secondary">
            New Goal
          </Button>
        </div>
      </div>
    </section>
  )
}
