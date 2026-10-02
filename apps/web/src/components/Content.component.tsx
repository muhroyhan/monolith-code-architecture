import { Outlet, useLocation } from '@tanstack/react-router'
import { BreadcrumbComponent } from './Breadcrumb.component'

const ContentComponent = () => {
  const location = useLocation()
  const paths = [...new Set(location.pathname.split('/'))]
  return (
    <div className="w-full pt-6 px-6">
      {paths.length >= 1 && <BreadcrumbComponent paths={paths} />}
      <Outlet />
    </div>
  )
}

export { ContentComponent }
