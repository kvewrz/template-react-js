import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from "../../../features/categories/models/categories-thunks"
import CategoriesCreateForm from "../../../features/categories/ui/categories-create-form"
import Loader from "../../../widgets/loader/loader"
import Modal from "../../../widgets/modal/modal"
import CategoriesList from "./categories-list"

function Categories() {
  const [editOpen , setEditOpen] = useState(false)
    const {items:categories , loading , error} = useSelector((state) => state.categories)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])
    if(loading){
        return <Loader />
    }
   
  return (
    <div>
      <button onClick={() => setEditOpen(true)}>Create</button>
      <Modal open={editOpen}  onClose={() => setEditOpen(false)} title='форма создания'>
 <CategoriesCreateForm />
      </Modal>
     
        {error && <span>{error}</span>}
      {categories.map(category => (
        <CategoriesList category={category} key={category.id} />
      ))}
    </div>
  )
}

export default Categories
