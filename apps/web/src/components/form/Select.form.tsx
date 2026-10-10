import { Label } from '@/shadcn/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select'
import { AnyFieldApi } from '@tanstack/react-form'
import React from 'react'

const SelectForm = (
  props: React.ComponentProps<typeof Select> & {
    className?: string
    placeholder?: string
    label?: string
    field: AnyFieldApi
    options?: {
      label: string
      value: string
    }[]
  },
) => {
  const { label, field, onValueChange, options, ...rest } = props
  const errors = field.state.meta.errors
  return (
    <>
      {label && <Label className={errors.length > 0 ? 'text-destructive' : ''}>{label}</Label>}
      <Select
        {...rest}
        onValueChange={(value: string) => {
          field.handleChange(value)
          if (onValueChange) onValueChange(value)
        }}
        required={rest.required}
        value={String(field.state.value)}
      >
        <SelectTrigger className={rest.className}>
          <SelectValue placeholder={rest.placeholder} />
        </SelectTrigger>
        <SelectContent
          position="popper"
          aria-required={rest.required}
        >
          <SelectGroup>
            {options?.map((item, key) => (
              <SelectItem
                key={key}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export default SelectForm
