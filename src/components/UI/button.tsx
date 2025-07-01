import React from 'react'

export default function Button({
  children,
  onClick,
  className = '',
  variant = 'primary',
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${variant === 'primary' ? 'bg-primary' : 'bg-secondary'} text-white rounded-[20px] hover:opacity-50 transition ${className}`}
    >
      {children}
    </button>
  )
}
