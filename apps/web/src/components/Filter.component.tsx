import { Button } from '@/shadcn/components/ui/button'
import { Feature, ProgramRegistary } from '@/types'
import { useForm } from '@tanstack/react-form'
import { useNavigate, useSearch } from '@tanstack/react-router'
import InputForm from './form/Input.form'
import ToggleForm from './form/Toggle.form'
import SelectForm from './form/Select.form'
import { pickBy } from 'es-toolkit'

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
      const filteredSearch = pickBy(
        {
          ...search['filters'],
          ...value,
        },
        (value) => value && value.length > 0,
      )
      navigate({
        search: {
          ...search,
          filters: filteredSearch,
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
                <ToggleForm
                  className="flex-1"
                  disabled={filter.disabled}
                  field={field}
                  onValueChange={() => {
                    form.handleSubmit()
                  }}
                  options={filter.options}
                  type="single"
                />
              )}
            />,
          )
        } else if (filter.type === 'select') {
          comps.push(
            <form.Field
              key={key}
              name={filter.name}
              children={(field) => (
                <SelectForm
                  className="flex-1"
                  disabled={filter.disabled}
                  field={field}
                  onValueChange={() => {
                    form.handleSubmit()
                  }}
                  required={filter.required}
                  placeholder={filter.placeholder}
                  options={filter.options}
                />
              )}
            />,
          )
        } else {
          comps.push(
            <form.Field
              key={key}
              name={filter.name}
              children={(field) => (
                <InputForm
                  className="flex-1"
                  disabled={filter.disabled}
                  field={field}
                  onChange={() => {
                    form.handleSubmit()
                  }}
                  placeholder={filter.placeholder}
                  required={filter.required}
                  type={filter.type}
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
