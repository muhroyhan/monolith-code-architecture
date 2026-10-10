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
    <Breadcrumb className="pb-6">
      <BreadcrumbList>
        {paths.reduce<React.JSX.Element[]>((jsxs, item, key) => {
          let name = 'Dashboard'
          if (!!item) {
            name = ['add', 'edit'].includes(item) ? startCase(item) : item
            if (program?.path.includes(item)) name = program.name
          }

          if (key === paths.length - 1) {
            jsxs.push(
              <BreadcrumbItem key={key}>
                <BreadcrumbPage>{name}</BreadcrumbPage>
              </BreadcrumbItem>,
            )
          } else {
            jsxs.push(
              <BreadcrumbItem key={key}>
                <BreadcrumbLink asChild>
                  <Link to={item ? paths.slice(0, key + 1).join('/') : '/'}>{name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>,
            )
            jsxs.push(<BreadcrumbSeparator key={key + 's'} />)
          }
          return jsxs
        }, [])}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { BreadcrumbComponent }
