import { get } from '@/api/client'
import { useFeatureMutation } from '@/hooks/use_feature_mutation'
import { Button } from '@/shadcn/components/ui/button'
import { Input } from '@/shadcn/components/ui/input'
import { Label } from '@/shadcn/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/components/ui/toggle-group'
import { Feature, ProgramRegistary } from '@/types'
import { differenceByObject } from '@/utils/difference_by_object'
import { ApiResponseBody } from '@monolith-code-architecture/types'
import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate, useParams } from '@tanstack/react-router'
import { useEffect } from 'react'

const AddEditComponent = <K extends keyof Feature>(props: ProgramRegistary<K>) => {
  const { id } = useParams({ strict: false })
  const location = useLocation()
  const navigate = useNavigate()
  const isAddPage = location.pathname.includes('add')
  type CreateBodyType = Feature[K]['createBody']
  type UpdateBodyType = Feature[K]['updateBody']

  const getUpdateUrl = props.api + '/' + id
  const apiUrl = isAddPage ? props.api : getUpdateUrl

  const { isIdle, isSuccess, mutate } = useFeatureMutation(apiUrl, isAddPage)

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
    onSubmit: async ({ value }) => {
      const changedValues = differenceByObject(defaultValues, value)
      mutate(changedValues)
    },
  })

  useEffect(() => {
    if (!isIdle && isSuccess) {
      navigate({
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
                  required={item.required}
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

export { AddEditComponent }
