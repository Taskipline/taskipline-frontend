import CalendarSection from '@/components/dashboard/calendar-section'
import GamificationSection from '@/components/dashboard/gamification-section'
import GoalSection from '@/components/dashboard/goal-section'
import NotesSection from '@/components/dashboard/notes-section'
import TasksSection from '@/components/dashboard/tasks-section'

export default function Dashboard() {
  return (
    <div className="grid gap-10">
      <TasksSection />
      <GoalSection />
      <CalendarSection />
      <NotesSection />
      <GamificationSection />
    </div>
  )
}
