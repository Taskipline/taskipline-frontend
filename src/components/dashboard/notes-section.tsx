import NoteTile from '../notes/note-tile'
import Title from '../title'

export default function NotesSection() {
  return (
    <section className="grid gap-4">
      <Title text="Recent Notes" type="sub-heading" />
      <div>
        <NoteTile />
        <NoteTile />
      </div>
    </section>
  )
}
