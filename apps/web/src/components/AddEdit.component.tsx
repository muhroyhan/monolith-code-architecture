import { get } from '@/api/client'
import { useFeatureMutation } from '@/hooks/use_feature_mutation'
import { Button } from '@/shadcn/components/ui/button'
import { Feature, ProgramRegistary } from '@/types'
import { differenceByObject } from '@/utils/difference_by_object'
import { ApiResponseBody } from '@monolith-code-architecture/types'
import { useForm } from '@tanstack/react-form'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import { useEffect } from 'react'
import ToggleForm from './form/Toggle.form'
import InputForm from './form/Input.form'
import SelectForm from './form/Select.form'

const AddEditComponent = <K extends keyof Feature>(props: ProgramRegistary<K>) => {
  const { id } = useParams({ strict: false })
  const queryClient = useQueryClient()
  const location = useLocation()
  const navigate = useNavigate()
  const isAddPage = location.pathname.includes('add')
  type CreateBodyType = Feature[K]['createBody']
  type UpdateBodyType = Feature[K]['updateBody']

  const getUpdateUrl = props.api + '/' + id
  const apiUrl = isAddPage ? props.api : getUpdateUrl

  const { isIdle, isSuccess, mutate } = useFeatureMutation(apiUrl, isAddPage)

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [props.path, 'findOne'] })
  }, [])

  let defaultValues: CreateBodyType | UpdateBodyType = props.add.defaultValues
  if (!isAddPage) {
    const { data } = useQuery({
      queryKey: [props.api, 'findOne', id],
      queryFn: async () => {
        const res = await get<ApiResponseBody<Feature[K]['data']>>(getUpdateUrl)
        return props.updateFormat(res?.data?.data ?? ({} as Feature[K]['data']))
      },
    })
    if (data) defaultValues = data
  }

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: props.add.schema,
    },
    canSubmitWhenInvalid: true,
    onSubmit: async ({ value }) => {
      const values = isAddPage ? value : differenceByObject(defaultValues, value)
      mutate(values)
    },
  })

  useEffect(() => {
    if (!isIdle && isSuccess) {
      queryClient.invalidateQueries({ queryKey: [props.path, 'findall'] })
      navigate({
        replace: true,
        from: location.pathname,
        to: props.path,
      })
    }
  }, [isIdle, isSuccess])

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
        if (item.type === 'radio') {
          comps.push(
            <form.Field
              key={key}
              name={item.name}
              children={(field) => (
                <ToggleForm
                  label={item.label}
                  disabled={item.disabled}
                  field={field}
                  options={item.options}
                  type="single"
                />
              )}
            />,
          )
        }
        if (item.type === 'select') {
          comps.push(
            <form.Field
              key={key}
              name={item.name}
              children={(field) => (
                <SelectForm
                  className="flex-1"
                  disabled={item.disabled}
                  field={field}
                  label={item.label}
                  onValueChange={() => {
                    form.handleSubmit()
                  }}
                  required={item.required}
                  placeholder={item.placeholder}
                  options={item.options}
                />
              )}
            />,
          )
        }
        if (item.type === 'text' || item.type === 'password') {
          comps.push(
            <form.Field
              key={key}
              name={item.name}
              children={(field) => (
                <InputForm
                  label={item.label}
                  disabled={item.disabled}
                  field={field}
                  placeholder={item?.placeholder ?? 'Enter Text...'}
                  required={item.required}
                  type={item.type}
                />
              )}
            />,
          )
        }
        if (item.type === 'custom') {
          comps.push(
            <form.Field
              key={key}
              name={item.name}
              children={(field) =>
                item.Component && (
                  <item.Component
                    field={field}
                    {...item}
                  />
                )
              }
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

export { AddEditComponent }
