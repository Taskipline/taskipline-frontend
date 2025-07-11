export default function Title({
  text,
  type = 'default',
  textAlignment = 'text-left',
  className,
}: {
  text: string
  type?: 'default' | 'auth' | 'sub-heading'
  textAlignment?: 'text-left' | 'text-center' | 'text-right'
  className?: string
}) {
  return (
    <h1
      className={`${type === 'auth' ? 'text-[28px] leading-[35px]' : type === 'sub-heading' ? 'text-[22px] leading-7' : 'text-[32px] leading-10'} ${textAlignment} font-bold cursor-default ${className}`}
    >
      {text}
    </h1>
  )
}
