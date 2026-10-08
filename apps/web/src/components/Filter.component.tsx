import { Button } from '@/shadcn/components/ui/button'
import { Input } from '@/shadcn/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/components/ui/toggle-group'
import { Feature, ProgramRegistary } from '@/types'
import { useForm } from '@tanstack/react-form'
import { useNavigate, useSearch } from '@tanstack/react-router'

const FilterComponent = <K extends keyof Feature>(props: {
  filters: ProgramRegistary<K>['filters']
}) => {
  const search = useSearch({ strict: false })
  const navigate = useNavigate()
  const defaultValues = props.filters?.reduce((obj, item) => {
    return {
      ...obj,
      [item.name]: '',
    }
  }, {})

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      navigate({
        search: {
          ...search,
          filters: {
            ...search['filters'],
            ...value,
          },
        },
      })
    },
  })

  return (
    <form
      className="flex flex-row gap-x-6"
      onReset={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.reset()
        form.handleSubmit()
      }}
    >
      {props.filters?.reduce<React.JSX.Element[]>((comps, filter, key) => {
        if (filter.type === 'radio') {
          comps.push(
            <form.Field
              key={key}
              name={filter.name}
              children={(field) => (
                <ToggleGroup
                  className="flex-1"
                  onBlur={field.handleBlur}
                  onValueChange={(val) => {
                    if (!!val) field.handleChange(val as any)
                    form.handleSubmit()
                  }}
                  type="single"
                  value={String(field.state.value)}
                >
                  {filter.options?.map((i, k) => (
                    <ToggleGroupItem
                      key={k}
                      value={i.value}
                    >
                      {i.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            />,
          )
        } else if (filter.type === 'select') {
          comps.push(
            <form.Field
              key={key}
              name={filter.name}
              children={(field) => (
                <Select
                  onValueChange={(value: string) => {
                    field.handleChange(value)
                    form.handleSubmit()
                  }}
                  required={filter.required}
                  value={String(field.state.value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    aria-required={filter.required}
                  >
                    <SelectGroup>
                      {filter.options?.map((item, key) => (
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
              )}
            />,
          )
        } else {
          comps.push(
            <form.Field
              key={key}
              name={filter.name}
              children={(field) => (
                <Input
                  className="flex-1"
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value as any)
                    form.handleSubmit()
                  }}
                  placeholder={filter.label}
                  required={filter.required}
                  type={filter.type}
                  value={String(field.state.value)}
                />
              )}
            />,
          )
        }
        return comps
      }, [])}
      <Button type="reset">Reset</Button>
    </form>
  )
}

export { FilterComponent }
