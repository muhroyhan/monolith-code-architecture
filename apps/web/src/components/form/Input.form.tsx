import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import { AnyFieldApi } from '@tanstack/react-form'

const InputForm = (
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string
    field: AnyFieldApi
  },
) => {
  const { field, onChange, label, ...rest } = props
  const errors = field.state.meta.errors
  return (
    <>
      {label && <Label className={errors.length > 0 ? 'text-destructive' : ''}>{label}</Label>}
      <Input
        {...rest}
        onBlur={field.handleBlur}
        onChange={(e) => {
          field.handleChange(e.target.value)
          if (onChange) onChange(e)
        }}
        placeholder={rest?.placeholder ?? 'Enter Text...'}
        value={field.state.value}
      />
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

export default InputForm
