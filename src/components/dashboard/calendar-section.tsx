'use client'

import { useState } from 'react'
import Title from '../title'
import { Calendar } from '../ui/calendar'
import CalendarTile from '../calendar/calendar-tile'
import { isLargeScreen } from '@/utilities/common'

export default function CalendarSection() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <section className="grid gap-10">
      <Title text="Upcoming Deadlines" type="sub-heading" />
      <div className="grid md:flex gap-2 md:gap-4">
        <div className="grid gap-2 flex-1">
          <CalendarTile />
          <CalendarTile />
          <CalendarTile />
          <CalendarTile />
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="shadow-sm rounded-lg"
          numberOfMonths={isLargeScreen ? 2 : 1}
        />
      </div>
    </section>
  )
}
