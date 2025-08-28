import toast from 'react-hot-toast'
import type { QueryClient } from '@tanstack/react-query'
import type { Task } from '@/types/tasks'
import type { Goal } from '@/types/goal'

export function validateEmail(email: string): boolean {
  // Simple regex for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  // Password must be at least 8 characters long
  return password.length >= 8
}

export function validateUsername(username: string): boolean {
  // Username must be at least 3 characters long and can contain letters, numbers, and underscores
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/
  return usernameRegex.test(username)
}

export function validatePhoneNumber(phone: string): boolean {
  // Simple regex for validating phone number format (10 digits)
  const phoneRegex = /^\d{10}$/
  return phoneRegex.test(phone)
}

export function validateUrl(url: string): boolean {
  // Simple regex for validating URL format
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
  return urlRegex.test(url)
}

export function validateName(name: string): boolean {
  // Name must be at least 2 characters long and can contain letters and spaces
  const nameRegex = /^[a-zA-Z\s]{2,}$/
  return nameRegex.test(name)
}

export function validateDate(date: string): boolean {
  // Simple regex for validating date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  return dateRegex.test(date)
}

export const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0
export const screenHeight =
  typeof window !== 'undefined' ? window.innerHeight : 0
export const isMobile = screenWidth < 768
export const isTablet = screenWidth >= 768 && screenWidth < 1024
export const isDesktop = screenWidth >= 1024 && screenWidth < 1280
export const isLargeScreen = screenWidth >= 1280

export const notify = (type: 'success' | 'error' | 'info', message: string) => {
  switch (type) {
    case 'success':
      toast.success(message)
      break
    case 'error':
      toast.error(message)
      break
    case 'info':
      toast(message, {
        icon: 'ℹ️',
        style: {
          background: '#f0f0f0',
          color: '#333',
        },
      })
      break
    default:
      toast(message)
      break
  }
}

export const randomHexColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const randomRgbColor = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `rgb(${r}, ${g}, ${b})`
}

export const randomHslColor = () => {
  const h = Math.floor(Math.random() * 360)
  const s = Math.floor(Math.random() * 100) + '%'
  const l = Math.floor(Math.random() * 100) + '%'
  return `hsl(${h}, ${s}, ${l})`
}

export const randomId = () => {
  const timestamp = Date.now().toString(36) // Convert timestamp to base-36 string
  const randomPart = Math.random().toString(36).substring(2, 10)
  return `taskipline-${timestamp}-${randomPart}`
}

export const toIsoOrUndefined = (val?: string) =>
  val ? new Date(val).toISOString() : undefined

export const now = new Date()
export const startOfToday = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  0,
  0,
  0,
  0
)
export const endOfToday = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate(),
  23,
  59,
  59,
  999
)

/*
 * Converts an ISO date string to a local input format (YYYY-MM-DDTHH:mm).
 * Returns an empty string if the input is undefined or invalid.
 */
export const isoToLocalInput = (iso?: string) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  // yyyy-MM-ddTHH:mm
  const pad = (n: number) => `${n}`.padStart(2, '0')
  const yyyy = d.getFullYear()
  const MM = pad(d.getMonth() + 1)
  const dd = pad(d.getDate())
  const hh = pad(d.getHours())
  const mm = pad(d.getMinutes())
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`
}

/*
 * Formats a date string to a more readable format.
 * If the date is today, it returns "Today at HH:MM".
 * If the date is tomorrow, it returns "Tomorrow at HH:MM".
 * If the date is yesterday, it returns "Yesterday at HH:MM".
 * Otherwise, it returns the formatted date string.
 */
export function formatDueDate(iso?: string) {
  if (!iso) return 'No due date'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'Invalid date'

  const now = new Date()
  const startOf = (dt: Date) =>
    new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 0, 0, 0, 0)
  const startToday = startOf(now)
  const startDue = startOf(d)
  const diffDays = Math.round(
    (startDue.getTime() - startToday.getTime()) / 86400000
  )

  const timeStr = d.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (diffDays === 0) return `Today at ${timeStr}`
  if (diffDays === 1) return `Tomorrow at ${timeStr}`
  if (diffDays === -1) return `Yesterday at ${timeStr}`

  const dateStr = d.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  return `${dateStr} at ${timeStr}`
}

// Recompute and patch a single goal's completionPercentage from tasks in cache
export function recomputeAndPatchGoalCompletion(
  queryClient: QueryClient,
  goalId: string
) {
  if (!goalId) return
  const tasks = queryClient.getQueryData<Task[]>(['tasks'])
  if (!tasks) {
    // Fallback: compute from existing goals cache without relying on tasks cache
    queryClient.setQueryData<Goal[]>(['goals'], (old) =>
      (old ?? []).map((g) => {
        if (g._id !== goalId) return g
        const list = Array.isArray(g.tasks) ? g.tasks : []
        const total = list.length
        const done = list.filter((t) => t.isCompleted).length
        const pct = total ? Math.round((done / total) * 100) : 0
        return { ...g, completionPercentage: pct }
      })
    )
    return
  }
  const related = tasks.filter((t) => t.goal === goalId)
  const total = related.length
  const done = related.filter((t) => t.isCompleted).length
  const pct = total ? Math.round((done / total) * 100) : 0
  queryClient.setQueryData<Goal[]>(['goals'], (old) =>
    (old ?? []).map((g) =>
      g._id === goalId ? { ...g, completionPercentage: pct } : g
    )
  )
}

// Recompute and patch multiple goals' completionPercentage from tasks in cache
export function recomputeAndPatchGoals(
  queryClient: QueryClient,
  goalIds: Iterable<string>
) {
  const ids = Array.from(new Set(goalIds)).filter(Boolean)
  if (ids.length === 0) return
  const tasks = queryClient.getQueryData<Task[]>(['tasks'])
  const pctById = new Map<string, number>()
  if (tasks) {
    for (const id of ids) {
      const related = tasks.filter((t) => t.goal === id)
      const total = related.length
      const done = related.filter((t) => t.isCompleted).length
      pctById.set(id, total ? Math.round((done / total) * 100) : 0)
    }
  } else {
    const goals = queryClient.getQueryData<Goal[]>(['goals']) ?? []
    for (const id of ids) {
      const g = goals.find((x) => x._id === id)
      const list = g?.tasks ?? []
      const total = list.length
      const done = list.filter((t) => t.isCompleted).length
      pctById.set(id, total ? Math.round((done / total) * 100) : 0)
    }
  }
  queryClient.setQueryData<Goal[]>(['goals'], (old) =>
    (old ?? []).map((g) =>
      pctById.has(g._id)
        ? { ...g, completionPercentage: pctById.get(g._id)! }
        : g
    )
  )
}

// Keep goal.tasks arrays in the goals cache in sync with the tasks cache
export function syncGoalTasksFromTasks(
  queryClient: QueryClient,
  goalId: string
) {
  if (!goalId) return
  const tasks = queryClient.getQueryData<Task[]>(['tasks'])
  if (!tasks) return
  const related = tasks.filter((t) => t.goal === goalId)
  queryClient.setQueryData<Goal[]>(['goals'], (old) =>
    (old ?? []).map((g) => (g._id === goalId ? { ...g, tasks: related } : g))
  )
}

export function syncGoalsTasksFromTasks(
  queryClient: QueryClient,
  goalIds: Iterable<string>
) {
  const ids = Array.from(new Set(goalIds)).filter(Boolean)
  if (ids.length === 0) return
  const tasks = queryClient.getQueryData<Task[]>(['tasks'])
  if (!tasks) return
  const byGoal = new Map<string, Task[]>()
  for (const id of ids) {
    byGoal.set(
      id,
      tasks.filter((t) => t.goal === id)
    )
  }
  queryClient.setQueryData<Goal[]>(['goals'], (old) =>
    (old ?? []).map((g) =>
      byGoal.has(g._id) ? { ...g, tasks: byGoal.get(g._id)! } : g
    )
  )
}
