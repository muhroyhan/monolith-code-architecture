import { post } from '@/api/client'
import { Button } from '@/shadcn/components/ui/button'
import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/components/ui/toggle-group'
import { Feature, ProgramRegistary } from '@/types'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { toast } from 'sonner'

const AddEditComponent = <K extends keyof Feature>(props: ProgramRegistary<K>) => {
  const location = useLocation()
  const navigate = useNavigate()
  const {
    isIdle: isIdleCreate,
    isSuccess: isIdleSuccess,
    mutate: create,
  } = useMutation<void, Error, Feature[K]['createBody']>({
    mutationFn: async (data) => {
      await post(props.api, data)
    },
    onSuccess: () => {
      toast.success('Create Successful!')
    },
  })

  const form = useForm({
    defaultValues: props.add.defaultValues,
    validators: {
      onSubmit: props.add.schema,
    },
    onSubmit: async ({ value }) => {
      create(value)
    },
  })

  useEffect(() => {
    if (!isIdleCreate && isIdleSuccess) {
      navigate({
        from: location.pathname,
        to: props.path,
      })
    }
  }, [isIdleCreate, isIdleSuccess])

  return (
    <form
      className="flex flex-col gap-y-2"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      {props.add.forms.reduce<React.JSX.Element[]>((comps, item, key) => {
        if (item.title) comps.push(<Label key={key + '-l'}>{item.title}</Label>)
        if (item.type === 'radio') {
          comps.push(
            <form.Field
              key={key}
              name={item.name}
              children={(field) => (
                <ToggleGroup
                  onBlur={field.handleBlur}
                  onValueChange={(val) => {
                    if (!!val) field.handleChange(val as any)
                  }}
                  type="single"
                  value={String(field.state.value)}
                >
                  {item.options?.map((i, k) => (
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
        } else {
          comps.push(
            <form.Field
              key={key}
              name={item.name}
              children={(field) => (
                <Input
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value as any)
                  }}
                  placeholder="Enter Text..."
                  required
                  type={item.type}
                  value={String(field.state.value)}
                />
              )}
            />,
          )
        }
        return comps
      }, [])}
      <Button
        type="submit"
        className="w-full mt-6"
      >
        Submit
      </Button>
    </form>
  )
}

export default AddEditComponent
