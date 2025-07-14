import TaskTile from '@/components/tasks/task-tile'
import Title from '@/components/title'
import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/input'
import { goals } from '@/constants/goals'
import { tasks } from '@/constants/tasks'

export default function Tasks() {
  return (
    <div className="grid gap-4">
      <div>
        <div className="flex justify-between items-center">
          <Title text="Tasks" />
          <Button variant="secondary" className="rounded-[20px] cursor-pointer">
            New Task
          </Button>
        </div>
        <p className="text-sm leading-[21px] text-foreground/70">
          Manage your tasks effectively to stay on top of your goals.
        </p>
      </div>
      <CustomInput placeholder="Search tasks" />
      <div className="w-full border-b border-b-primary flex gap-4 p-4 overflow-x-auto">
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
      </div>
      <Title text="Today" type="sub-heading-2" />
      {tasks.map((task) => (
        <TaskTile
          key={task.id}
          title={task.title}
          date={task.date}
          completed={task.completed}
          // onCheckClick={() => {}}
        />
      ))}
      <Title text="Upcoming" type="sub-heading-2" />
      {tasks.map((task) => (
        <TaskTile
          key={task.id}
          title={task.title}
          date={task.date}
          completed={task.completed}
          // onCheckClick={() => {}}
        />
      ))}
    </div>
  )
}
