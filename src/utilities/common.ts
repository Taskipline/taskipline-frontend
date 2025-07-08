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
