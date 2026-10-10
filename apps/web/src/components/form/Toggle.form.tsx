import { Label } from '@/shadcn/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/components/ui/toggle-group'
import { AnyFieldApi } from '@tanstack/react-form'
import React from 'react'

const ToggleForm = (
  props: React.ComponentProps<typeof ToggleGroup> & {
    label?: string
    field: AnyFieldApi
    options?: {
      label: string
      value: string
    }[]
  },
) => {
  const { field, label, options, ...rest } = props
  const errors = field.state.meta.errors

  return (
    <>
      {label && <Label className={errors.length > 0 ? 'text-destructive' : ''}>{label}</Label>}
      <ToggleGroup
        {...rest}
        onBlur={field.handleBlur}
        onValueChange={(val: string & string[]) => {
          if (!!val) field.handleChange(val as any)
          if (rest.onValueChange) rest.onValueChange(val)
        }}
        value={field.state.value}
      >
        {options?.map((i, k) => (
          <ToggleGroupItem
            key={k}
            value={i.value}
          >
            {i.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {errors.length > 0 && (
        <div className="flex flex-col items-start gap-y-1">
          {errors.map((err, k) => (
            <div
              className="text-destructive"
              key={k}
            >
              *{err?.message}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ToggleForm
