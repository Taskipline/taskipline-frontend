'use client'

import GoalModal from '@/components/goals/goal-modal'
import { MainGoalTile } from '@/components/goals/goal-tile'
import Title from '@/components/title'
import { CustomInput } from '@/components/ui/input'
import { listGoals } from '@/services/goalService'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function Goals() {
  const { data, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: listGoals,
  })

  const [query, setQuery] = useState('')
  const goals = data?.filter((goal) =>
    goal.title.toLowerCase().includes(query.toLowerCase())
  )

  const currentGoals = goals?.filter((goal) => goal.status === 'In Progress')

  const completedGoals = goals?.filter((goal) => goal.status === 'Completed')

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
      <CustomInput
        placeholder="Search goals"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading ? (
        <p>Loading goals...</p>
      ) : goals?.length === 0 ? (
        <p className="text-accent italic">You do not have any goals</p>
      ) : (
        <>
          {currentGoals && currentGoals.length > 0 && (
            <>
              <Title text="Current Goals" type="sub-heading-2" />
              {currentGoals?.map((goal) => (
                <MainGoalTile key={goal._id} goal={goal} />
              ))}
            </>
          )}
          {completedGoals && completedGoals.length > 0 && (
            <>
              <Title text="Completed Goals" type="sub-heading-2" />
              {completedGoals?.map((goal) => (
                <MainGoalTile key={goal._id} goal={goal} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  )
}
