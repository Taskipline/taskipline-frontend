import toast from 'react-hot-toast'

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
