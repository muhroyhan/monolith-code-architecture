import { useProgram } from '@/providers/Program.provider'
import { NotFoundPage } from './NotFound.page'
import AddEditComponent from '@/components/AddEdit.component'

const AddEditPage = () => {
  const { program } = useProgram()

  return (
    <>
      {(!program || !program.isReadAllowed || !program.isWriteAllowed) && <NotFoundPage />}
      {program && program.isReadAllowed && program.isWriteAllowed && (
        <AddEditComponent {...program} />
      )}
    </>
  )
}

export { AddEditPage }
