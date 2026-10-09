import { useProgram } from '@/providers/Program.provider'
import { NotFoundPage } from './NotFound.page'
import { FeatureComponent } from '@/components/Feature.component'
import { Button } from '@/shadcn/components/ui/button'
import { Link } from '@tanstack/react-router'
import { useAdmin } from '@/providers/Admin.provider'

const FeaturePage = () => {
  const { program } = useProgram()
  const { isAdminSuper } = useAdmin()
  const isNotFound = !program || (!isAdminSuper && !program.isReadAllowed)
  return (
    <>
      {isNotFound && <NotFoundPage />}
      {!isNotFound && (
        <div className="flex flex-col gap-y-6">
          <div className="text-2xl font-bold">{program.name}</div>
          {(isAdminSuper || program.isCreateAllowed) && (
            <Link to={program.path + '/add'}>
              <Button>Add</Button>
            </Link>
          )}
          <FeatureComponent {...program} />
        </div>
      )}
    </>
  )
}

export { FeaturePage }
