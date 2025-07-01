export default function Text({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={`text-gray-700 dark:text-gray-300 ${className}`}>
      {children}
    </p>
  )
}
