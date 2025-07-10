import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    />
  )
}

export { Input }

import { Label } from '@/components/ui/label'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { Button } from './button'

export function CustomInput({
  label,
  htmlFor,
  type,
  isPassword = false,
  togglePasswordIcon,
  ...inputProps
}: {
  label?: string
  htmlFor?: string
  isPassword?: boolean
  togglePasswordIcon?: () => void
} & React.ComponentProps<'input'>) {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      {label && <Label htmlFor={htmlFor}>{label}</Label>}
      <div className="relative">
        <Input type={type} {...inputProps} />
        {isPassword && (
          <Button
            className="absolute right-0 bottom-0 hover:bg-transparent"
            variant="ghost"
            size="icon"
            onClick={togglePasswordIcon}
          >
            {type === 'password' ? (
              <EyeClosedIcon size={16} />
            ) : (
              <EyeIcon size={16} />
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
