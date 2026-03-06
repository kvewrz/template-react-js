import { useEffect } from 'react'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../widgets/loader/loader'
import { useToast } from '../../../widgets/toast/hooks/use-toast'
import { fetchCategories } from '../../categories/models/categories-thunks'
import schema from '../models/ads-schema'
import { fetchCreateAds } from '../models/ads-thunks'
import './ads.css'

function AdsFormCreate() {
    const {
        register,
        handleSubmit,
        formState:{errors},
        reset 
    } = useForm({
        resolver:yupResolver(schema)
    })
    const showToast = useToast()
    const {loading , error} = useSelector((state) => state.ads)
    const dispatch = useDispatch()
    const {items:categories} = useSelector((state) => state.categories)
    useEffect(()=> {
 dispatch(fetchCategories())
    }, [dispatch])
    
    const onCreate = async (form) => {
        try{
         await dispatch(fetchCreateAds(form)).unwrap()
         showToast('удачное создание')
         reset()
        }catch(error){
            showToast('не удалось создать' + error + 'error')
        }
    }
    if(loading){
        return <Loader />
    }
  return (
    <div className='ads-form'>
        {error && <span>{error}</span>}
      <h2>Create Ads</h2>
      <form onSubmit={handleSubmit(onCreate)}>
        <label>
            Title
            {errors.title && <span>{errors.title.message}</span>}
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
            <input type="text" {...register('price')} id="price" />
        </label>
        <label>
            Category
            <select id="categoryId" {...register('categoryId')}>
                <option value=''>sss</option>
         {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
         ))}
       </select> 
        </label>
      
        <label>
            Image
             {errors.imageUrl && <span>{errors.imageUrl.message}</span>}
            <input type="text" {...register('imageUrl')} id="imageUrl" />
        </label>
        <button type='submit'>Create</button>
      </form>
    </div>
  );
}

export default AdsFormCreate;
