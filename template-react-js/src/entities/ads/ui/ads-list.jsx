import { memo, useCallback, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router'
import { fetchDeleteAds } from '../../../features/ads/models/ads-thunks'
import AdsFormUpdate from '../../../features/ads/ui/ads-form-update'
import Modal from '../../../widgets/modal/modal'
import { useToast } from '../../../widgets/toast/hooks/use-toast'
import { fetchFavoriteAdd, fetchRemoveFavorite } from '../../favorites/models/favorites-thunks'
import { fetchCreateOrder } from '../../orders/models/orders-thunks'
import './ads.css'



const AdsList = memo(({ad}) => {
  const {user} = useSelector((state) => state.auth)
   const [editOpen , setEditOpen] = useState(false)
  const dispatch = useDispatch()
  const showToast = useToast()
  const onRemove = useCallback(async () => {
    if(confirm('точно хотите удалить')){
      try{
      await dispatch(fetchDeleteAds(ad.id)).unwrap()
      showToast('запись удалена успешна')
      }catch(error){
        showToast('записб не удалена'+error)
      }
    }
  } ,[dispatch, showToast , ad.id ] ) 
  const handleClose = useCallback(()=> setEditOpen(false), []) 
  const makeOrder = async () => {
    try{
        await dispatch(fetchCreateOrder(ad.id)).unwrap()
        showToast('успешно')
    }catch(error){
      showToast("не удачно" + error)
    }
  }
  const {items:favorites} = useSelector((state) => state.favorites)
  const isFavorite = favorites.some((el) => el.id  === ad.id)
    const handleToogle = async () => {
      try{
         if(isFavorite){
          await dispatch(fetchRemoveFavorite(ad.id)).unwrap()
          showToast('удачно удалили')
         }else{
          await dispatch(fetchFavoriteAdd(ad.id)).unwrap()
          showToast('удачно добавили')
         }
      }catch(error){
       showToast('не удачно' + error)
      } 
    }
  return (
    <div className='ads'>
      <img src={ad?.imageUrl || 'https://ir.ozone.ru/s3/multimedia-z/6765519599.jpg'} alt="" />
      <hr />
      <Link to={`/ads/${ad.id}`}>
      <h1>Title:{ad.title}</h1>
      </Link>
      <h2>Description: {ad.description}</h2>
      <h2>Price: {ad.price}</h2>
      <h2>Category:{ad.Category.name}</h2>
      
      {user && (user.id === ad.userId)?(
        <>
        <button className='favorite-button'  onClick={handleToogle}>{isFavorite? '❤️' : "🖤"}</button>
        <button className='remove-button' onClick={onRemove}>Remove</button>
      <button className='update-button' onClick={() => setEditOpen(true)}>Update</button>
      <Modal  open={editOpen} onClose={handleClose} title='форма для обновления'>
        <AdsFormUpdate  ad={ad} />
      </Modal>
        </>
      ):(
        <>
          <button className='favorite-button' onClick={handleToogle}>{isFavorite ? '❤️' : "🖤"}</button>
        <button className='order-button' onClick={makeOrder}>заказать</button>
        </>
      )
    }
      
    </div>
  )
}
)
AdsList.displayName= 'AdsList'
export default AdsList
