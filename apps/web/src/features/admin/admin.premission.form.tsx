import { programs } from '@/programs'
import { ToggleGroup, ToggleGroupItem } from '@/shadcn/components/ui/toggle-group'
import { AddEditFormRegistary } from '@/types'
import { AnyFieldApi } from '@tanstack/react-form'
import { snakeCase } from 'es-toolkit'

const AdminPermissionForm = (
  props: AddEditFormRegistary & {
    field: AnyFieldApi
  },
) => {
  const { field } = props
  const progs = Object.values(programs())
    .map((item) => item.name)
    .filter((name) => name !== 'Admin')
  return (
    <>
      {progs.map((program, key) => {
        return (
          <div
            className="flex flex-row items-center gap-x-10"
            key={key}
          >
            <div>{program}</div>
            <ToggleGroup
              disabled={props.disabled}
              value={field.state.value}
              className="flex flex-row gap-x-4"
              onBlur={field.handleBlur}
              onValueChange={(value) => {
                field.handleChange(value)
              }}
              type="multiple"
            >
              <ToggleGroupItem
                className="border-2 data-[state=on]:border-0"
                value={`${snakeCase(program)}:create`}
              >
                C
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-2 data-[state=on]:border-0"
                value={`${snakeCase(program)}:read`}
              >
                R
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-2 data-[state=on]:border-0"
                value={`${snakeCase(program)}:update`}
              >
                U
              </ToggleGroupItem>
              <ToggleGroupItem
                className="border-2 data-[state=on]:border-0"
                value={`${snakeCase(program)}:delete`}
              >
                D
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )
      })}
    </>
  )
}

export { AdminPermissionForm }
