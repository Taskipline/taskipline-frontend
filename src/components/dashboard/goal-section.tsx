'use client'

import GoalTile from '../goals/goal-tile'
import Title from '../title'
import { useQuery } from '@tanstack/react-query'
import { listGoals } from '@/services/goalService'

export default function GoalSection() {
  const { data: goals, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: listGoals,
  })

  const firstFiveGoals = goals?.slice(0, 5)

  return (
    <section className="grid gap-4">
      <Title text="Goal Progress" type="sub-heading" />
      <div>
        {isLoading ? (
          <p>Loading goals...</p>
        ) : (
          firstFiveGoals?.length === 0 && (
            <p className="text-accent italic">No goals set</p>
          )
        )}
        {firstFiveGoals?.map((goal) => (
          <GoalTile key={goal._id} goal={goal} />
        ))}
      </div>
    </section>
  )
}
