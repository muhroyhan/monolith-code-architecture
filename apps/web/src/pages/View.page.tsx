import { useProgram } from '@/providers/Program.provider'
import { Button } from '@/shadcn/components/ui/button'
import { Link, useParams } from '@tanstack/react-router'
import { NotFoundPage } from './NotFound.page'
import { ViewComponent } from '@/components/View.component'

const ViewPage = () => {
  const { program } = useProgram()
  const { id } = useParams({ strict: false })
  return (
    <>
      <div className="text-2xl font-bold mb-6">{program?.name}</div>
      {(!program || !program.isReadAllowed) && <NotFoundPage />}
      {program?.isReadAllowed && (
        <div>
          <Link to={program.path + `/${id}` + '/edit'}>
            <Button>Edit</Button>
          </Link>
          <ViewComponent {...program} />
        </div>
      )}
    </>
  )
}

export { ViewPage }
