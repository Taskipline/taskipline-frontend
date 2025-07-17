import GoalModal from '@/components/goals/goal-modal'
import { MainGoalTile } from '@/components/goals/goal-tile'
import Title from '@/components/title'
import { CustomInput } from '@/components/ui/input'
import { goals } from '@/constants/goals'

export default function Goals() {
  return (
    <div className="grid gap-4">
      <div>
        <div className="flex justify-between items-center">
          <Title text="Goals" />
          <GoalModal type="create" />
        </div>
        <p className="text-sm leading-[21px] text-foreground/70">
          Manage your long and short term goals whilst creating subsequent tasks
          under them for better reassessments.
        </p>
      </div>
      <CustomInput placeholder="Search goals" />
      <Title text="Current Goals" type="sub-heading-2" />
      {goals.map((goal) => (
        <MainGoalTile
          key={goal.id}
          title={goal.title}
          description="Lorem ipsum dolor sit amelia"
        />
      ))}
      <Title text="Completed Goals" type="sub-heading-2" />
      {goals.map((goal) => (
        <MainGoalTile
          key={goal.id}
          title={goal.title}
          description="Lorem ipsum dolor sit amelia"
        />
      ))}
    </div>
  )
}
