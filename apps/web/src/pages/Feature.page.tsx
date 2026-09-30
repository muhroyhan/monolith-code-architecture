import { useProgram } from '@/providers/Program.provider'
import { NotFoundPage } from './NotFound.page'
import FeatureComponent from '@/components/Feature.component'

const FeaturePage = () => {
  const { program } = useProgram()

  return (
    <>
      {(!program || !program.isReadAllowed) && <NotFoundPage />}
      {program && program.isReadAllowed && <FeatureComponent {...program} />}
    </>
  )
}

export { FeaturePage }
