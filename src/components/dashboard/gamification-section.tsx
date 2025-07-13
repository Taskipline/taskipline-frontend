import GamificationCard from '../leaderboard/gamification-card'
import Title from '../title'

export default function GamificationSection() {
  return (
    <section className="grid gap-4">
      <Title text="Gamification Summary" type="sub-heading" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GamificationCard />
        <GamificationCard />
        <GamificationCard />
        <GamificationCard />
      </div>
    </section>
  )
}
