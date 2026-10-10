import { useProgram } from '@/providers/Program.provider'
import { NotFoundPage } from './NotFound.page'
import { AddEditComponent } from '@/components/AddEdit.component'
import { useLocation } from '@tanstack/react-router'
import { useAdmin } from '@/providers/Admin.provider'

const AddEditPage = () => {
  const { program } = useProgram()
  const { isAdminSuper } = useAdmin()
  const location = useLocation()
  const isAddPage = location.pathname.includes('add')
  const isAddAllowed = isAddPage && program?.isCreateAllowed
  const isEditAllowed = !isAddPage && program?.isUpdateAllowed
  const isNotFound =
    !program || (!isAdminSuper && (!program.isReadAllowed || (!isAddAllowed && !isEditAllowed)))
  return (
    <>
      <div className="text-2xl font-bold mb-6">{program?.name}</div>
      {isNotFound && <NotFoundPage />}
      {!isNotFound && <AddEditComponent {...program} />}
    </>
  )
}

export { AddEditPage }
