export default function Title({
  text,
  type = 'default',
  textAlignment = 'text-left',
  className,
}: {
  text: string
  type?: 'default' | 'auth'
  textAlignment?: 'text-left' | 'text-center' | 'text-right'
  className?: string
}) {
  return (
    <h1
      className={`${type === 'auth' ? 'text-[28px] leading-[35px]' : 'text-[32px] leading-10'} ${textAlignment} font-bold ${className}`}
    >
      {text}
    </h1>
  )
}
