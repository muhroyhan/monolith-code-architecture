import { useProgram } from '@/providers/Program.provider'
import { NotFoundPage } from './NotFound.page'

const FeaturePage = () => {
  const { program } = useProgram()

  return (
    <>
      {(!program || !program.isReadAllowed) && <NotFoundPage />}
      {program && program.isReadAllowed && <div>Feature</div>}
    </>
  )
}

export { FeaturePage }
