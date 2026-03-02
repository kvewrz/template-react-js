import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../widgets/loader/loader'
import { useToast } from '../../../widgets/toast/hooks/use-toast'
import schema from '../models/categories-schema'
import { fetchUpdateCategories } from '../models/categories-thunks'


function CategoriesUpdateForm({category}) {
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm({
        resolver:yupResolver(schema),
        defaultValues:{...category}
    })
    const showToast = useToast()
    const dispatch = useDispatch()
    const {loading , error} = useSelector((state) => state.categories)
    const onUpdate = async (form) => {
        try{
          await dispatch(fetchUpdateCategories({id:category.id, form})).unwrap()
          reset()
          showToast('удачно обновилось')
        }catch(error){
            showToast('не удалось обновить' + error + 'error')
        }
    }
    if(loading){
        return <Loader />
    }
  return (
  <form onSubmit={handleSubmit(onUpdate)}>
    {error && <span>{error}</span>}
   <label>
    Name
    {errors.name && <span>{errors.name.message}</span>}
    <input type="text" {...register('name')}  id='name'/>
   </label>
   <button type='submit' disabled={loading}>{loading ? 'обновить' : 'обновляем'}</button>
  </form>
  )
}

export default CategoriesUpdateForm
