import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../widgets/loader/loader'
import { useToast } from '../../../widgets/toast/hooks/use-toast'
import { fetchCategories } from '../../categories/models/categories-thunks'
import schema from '../models/ads-schema'
import { fetchUpdateAds } from '../models/ads-thunks'
import './ads.css'



function AdsFormUpdate({ad}) {
   const {
        register,
        handleSubmit,
        formState:{errors},
        reset 
    } = useForm({
        resolver:yupResolver(schema),
        defaultValues:{...ad}
    })
    const dispatch = useDispatch()
    const { loading, error} = useSelector((state) => state.ads)
    const {items:categories} = useSelector((state) => state.categories)
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])
    const showToast = useToast()
    const onUpdate = async (form) => {
        try{ 
          await dispatch(fetchUpdateAds({id:ad.id , ...form})).unwrap()
          showToast('удачно обновили')
          reset()
        }catch(error){
            showToast('не удалось обновить'+ error + 'error')
        }
    }
    if(loading){
        return <Loader />
    }
  return (
    <div className='ads-form'>
      <h2>Update Ads</h2>
      <form onSubmit={handleSubmit(onUpdate)}>
        {error && <span>{error}</span>}
        <label>
            {errors.title && <span>{errors.title.message}</span>}
            Title 
            <input type="text" {...register('title')} id="title" />
        </label>
        <label>
            Description
             {errors.description && <span>{errors.description.message}</span>}
            <input type="text" {...register('description')} id="description" />
        </label>
        <label>
            Price 
             {errors.price && <span>{errors.price.message}</span>}
            <input type="text" {...register('price')} id="price"/>
        </label>
        <label>
            Category
             {errors.categoryId && <span>{errors.categoryId.message}</span>}
            <select id="categoryId" {...register('categoryId')}>
                <option value="">выберите категорию</option>
                 {categories.map (category => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                 ))}
            </select>
        </label>
        <label>
            Image
             {errors.imageUrl && <span>{errors.imageUrl.message}</span>}
            <input type="text" {...register('imageUrl')} id="imageUrl" />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  )
}

export default AdsFormUpdate
