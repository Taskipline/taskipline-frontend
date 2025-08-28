import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

import { Label } from '@/components/ui/label'
import { Button } from './button'

export function CustomTextarea({
  label,
  htmlFor,
  rightIcon,
  onRightIconClick,
  width = 'max-w-sm',
  ...inputProps
}: {
  label?: string
  htmlFor?: string
  rightIcon?: React.ReactNode
  onRightIconClick?: () => void
  width?: string
} & React.ComponentProps<'textarea'>) {
  return (
    <div className={`grid w-full ${width} items-center gap-3`}>
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      <div className="relative">
        <Textarea {...inputProps} />
        {rightIcon && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 bottom-0"
            onClick={onRightIconClick}
          >
            {rightIcon}
          </Button>
        )}
      </div>
    </div>
  )
}
