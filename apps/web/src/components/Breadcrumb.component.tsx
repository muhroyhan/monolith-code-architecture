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
          if (key === paths.length - 1 && ['edit', 'view'].includes(paths[key - 1])) {
            return jsxs
          } else if (item.length === 0) {
            jsxs.push(
              <BreadcrumbItem key={key}>
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>,
            )
            if (paths.length > 1) jsxs.push(<BreadcrumbSeparator key={key + 's'} />)
          } else if (`/${item}` === program?.path) {
            jsxs.push(
              <BreadcrumbItem key={key}>
                {key === paths.length - 1 && <BreadcrumbPage>{program.name}</BreadcrumbPage>}
                {key !== paths.length - 1 && (
                  <BreadcrumbLink asChild>
                    <Link to={program.path}>{program.name}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>,
            )
            if (key !== paths.length - 1) jsxs.push(<BreadcrumbSeparator key={key + 's'} />)
          } else if (['add', 'edit', 'view'].includes(item)) {
            jsxs.push(
              <BreadcrumbItem key={key}>
                <BreadcrumbPage>
                  {startCase(item)} {item !== 'add' && `(${paths[key + 1]})`}
                </BreadcrumbPage>
              </BreadcrumbItem>,
            )
          } else {
            jsxs.push(
              <BreadcrumbItem key={key}>
                <BreadcrumbLink asChild>
                  <Link to={paths.slice(0, key).join('/')}>{startCase(item)}</Link>
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
