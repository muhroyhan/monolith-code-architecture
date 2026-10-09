import { useProgram } from '@/providers/Program.provider'
import { Button } from '@/shadcn/components/ui/button'
import { Link, useParams } from '@tanstack/react-router'
import { NotFoundPage } from './NotFound.page'
import { ViewComponent } from '@/components/View.component'
import { useAdmin } from '@/providers/Admin.provider'

const ViewPage = () => {
  const { program } = useProgram()
  const { isAdminSuper } = useAdmin()
  const { id } = useParams({ strict: false })
  const isNotFound = !program || (!isAdminSuper && !program.isReadAllowed)
  const isEditAllowed = isAdminSuper || program?.isUpdateAllowed

  return (
    <>
      <div className="text-2xl font-bold mb-6">{program?.name}</div>
      {isNotFound && <NotFoundPage />}
      {!isNotFound && (
        <div>
          {isEditAllowed && (
            <Link to={program.path + `/${id}` + '/edit'}>
              <Button>Edit</Button>
            </Link>
          )}
          <ViewComponent {...program} />
        </div>
      )}
    </>
  )
}

export { ViewPage }
