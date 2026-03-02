import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../widgets/loader/loader"
import { useToast } from "../../../widgets/toast/hooks/use-toast"
import schema from "../models/categories-schema"
import { fetchCreateCategories } from "../models/categories-thunks"





function CategoriesCreateForm() {
  const {
    register,
    handleSubmit,
    formState:{errors},
    reset 
  } = useForm({
    resolver:yupResolver(schema)
  })
  const dispatch = useDispatch()
  const showToast = useToast()
  const {loading , error} = useSelector((state) => state.categories)
  const onCreate = async (form) => {
    try{
      await dispatch(fetchCreateCategories(form)).unwrap()
      reset()
     showToast('удачно была создана')
    }catch(error){
      showToast('запись не была создана' + error , 'error')
    }
  }
  if(loading){
    return <Loader />
  }
  return (
    <div>
      Create Category 
       <form onSubmit={handleSubmit(onCreate)}>
        {error && <span>{error}</span>}
    <label>
      {errors.name && <span>{errors.name.message}</span>}
      Name
      <input type="text" {...register('name')}  id="name"/>
    </label>
    <button type="submit" disabled={loading}>{loading? 'создать' : 'создать '}</button>
   
   </form>
    </div>
  )
}

export default CategoriesCreateForm
