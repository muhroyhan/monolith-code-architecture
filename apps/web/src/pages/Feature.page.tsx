import { useProgram } from '@/providers/Program.provider'
import { NotFoundPage } from './NotFound.page'
import FeatureComponent from '@/components/Feature.component'
import { Button } from '@/shadcn/components/ui/button'
import { Link } from '@tanstack/react-router'

const FeaturePage = () => {
  const { program } = useProgram()
  return (
    <>
      {(!program || !program.isReadAllowed) && <NotFoundPage />}
      {program && program.isReadAllowed && (
        <div>
          <Link to={program.path + '/add'}>
            <Button>Add</Button>
          </Link>
          <FeatureComponent {...program} />
        </div>
      )}
    </>
  )
}

export { FeaturePage }
