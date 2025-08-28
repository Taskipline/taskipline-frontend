export default function Title({
  text,
  type = 'default',
  textAlignment = 'text-left',
  className,
}: {
  text: string
  type?: 'default' | 'auth' | 'sub-heading' | 'sub-heading-2'
  textAlignment?: 'text-left' | 'text-center' | 'text-right'
  className?: string
}) {
  return (
    <h1
      className={`${type === 'auth' ? 'text-[28px] leading-[35px]' : type === 'sub-heading' ? 'text-[22px] leading-7' : type === 'sub-heading-2' ? 'text-[18px] leading-[23px]' : 'text-[32px] leading-10'} ${textAlignment} font-bold cursor-default ${className}`}
    >
      {text}
    </h1>
  )
}
