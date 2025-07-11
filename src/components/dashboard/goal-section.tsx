import { goals } from '@/constants/goals'
import GoalTile from '../goals/goal-tile'
import Title from '../title'

export default function GoalSection() {
  return (
    <section className="grid gap-4">
      <Title text="Goal Progress" type="sub-heading" />
      <div>
        {goals.map((goal) => (
          <GoalTile key={goal.id} title={goal.title} progress={goal.progress} />
        ))}
      </div>
    </section>
  )
}
