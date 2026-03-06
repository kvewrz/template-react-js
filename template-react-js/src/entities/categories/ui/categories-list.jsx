import { memo, useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router"
import { fetchDeleteCategories } from "../../../features/categories/models/categories-thunks"
import CategoriesUpdateForm from "../../../features/categories/ui/categories-update-form"
import Modal from "../../../widgets/modal/modal"
import { useToast } from "../../../widgets/toast/hooks/use-toast"




const CategoriesList = memo(({category}) => {
    const [editOpen , setEditOpen] = useState(false)
    const dispatch = useDispatch()
    const showToast = useToast()
    const onRemove = useCallback(async () => {
        if(confirm('точно хотите удалить')){
            try{
           await dispatch(fetchDeleteCategories(category.id)).unwrap()
           showToast('запись успешно удалена')
            }catch(error){
                showToast('запись не удалилось' + error, 'error')
            }
        }
    } , [dispatch , category.id , showToast] ) 
    const handleClose = useCallback(()=>setEditOpen(false), [])
  return (
    <div>
      <Link to={`/categories/${category.id}`}>
       <h1>Category:{category.name}</h1>
      </Link>

      <button onClick={onRemove}>Remove</button>
      <button onClick={() => setEditOpen(true)}>Update</button>
       <Modal open={editOpen}  onClose={handleClose} title='форма обновления' >
         <CategoriesUpdateForm category={category} />
       </Modal>
    </div>
  )
})
CategoriesList.displayName = 'CategoriesList'
export default CategoriesList
