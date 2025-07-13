import GoalSection from '@/components/dashboard/goal-section'
import TasksSection from '@/components/dashboard/tasks-section'

export default function Dashboard() {
  return (
    <div className="grid gap-10">
      <TasksSection />
      <GoalSection />
      {/* <CalendarSection />
      <NotesSection /> */}
      {/* <GamificationSection /> */}
    </div>
  )
}
