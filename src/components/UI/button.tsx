import React from 'react'

export default function Button({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode
  onClick: () => void
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition ${className}`}
    >
      {children}
    </button>
  )
}
