import { useProgram } from '@/providers/Program.provider'
import { NotFoundPage } from './NotFound.page'
import { AddEditComponent } from '@/components/AddEdit.component'

const AddEditPage = () => {
  const { program } = useProgram()

  return (
    <>
      <div className="text-2xl font-bold mb-6">{program?.name}</div>
      {(!program || !program.isReadAllowed || !program.isWriteAllowed) && <NotFoundPage />}
      {program && program.isReadAllowed && program.isWriteAllowed && (
        <AddEditComponent {...program} />
      )}
    </>
  )
}

export { AddEditPage }
