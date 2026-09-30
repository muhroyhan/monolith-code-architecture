import { useProgram } from '@/providers/Program.provider'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shadcn/components/ui/breadcrumb'
import { Link } from '@tanstack/react-router'
import { startCase } from 'es-toolkit'

const BreadcrumbComponent = (props: { paths: string[] }) => {
  const { paths } = props
  const { program } = useProgram()
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((item, key) => {
          if (key === paths.length - 1 && ['edit', 'view'].includes(paths[key - 1]))
            return undefined
          if (item.length === 0) {
            return (
              <>
                <BreadcrumbItem key={key}>
                  <BreadcrumbLink asChild>
                    <Link to="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )
          }
          if (`/${item}` === program?.path) {
            return (
              <>
                <BreadcrumbItem key={key}>
                  {key === paths.length - 1 && <BreadcrumbPage>{program.name}</BreadcrumbPage>}
                  {key !== paths.length - 1 && (
                    <BreadcrumbLink asChild>
                      <Link to={program.path}>{program.name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {key !== paths.length - 1 && <BreadcrumbSeparator />}
              </>
            )
          }
          if (['add', 'edit', 'view'].includes(item)) {
            return (
              <BreadcrumbItem key={key}>
                <BreadcrumbPage>
                  {startCase(item)} {item !== 'add' && `(${paths[key + 1]})`}
                </BreadcrumbPage>
              </BreadcrumbItem>
            )
          }
          return (
            <>
              <BreadcrumbItem key={key}>
                <BreadcrumbLink asChild>
                  <Link to={paths.slice(0, key).join('/')}>{startCase(item)}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { BreadcrumbComponent }
