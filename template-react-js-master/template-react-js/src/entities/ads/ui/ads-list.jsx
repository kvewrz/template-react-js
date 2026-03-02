import { memo, useCallback, useState } from 'react'
import {useDispatch} from 'react-redux'
import { Link } from 'react-router'
import { fetchDeleteAds } from '../../../features/ads/models/ads-thunks'
import AdsFormUpdate from '../../../features/ads/ui/ads-form-update'
import Modal from '../../../widgets/modal/modal'
import { useToast } from '../../../widgets/toast/hooks/use-toast'



const AdsList = memo(({ad}) => {
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
  return (
    <div>
      <Link to={`/ads/${ad.id}`}>
      <h1>Title:{ad.title}</h1>
      </Link>
      <h2>Description: {ad.description}</h2>
      <h2>Price: {ad.price}</h2>
      <h2>Category:{ad.categoryId}</h2>
      <img src={ad?.imageUrl} alt="" />
      <button onClick={onRemove}>Remove</button>
      <button onClick={() => setEditOpen(true)}>Update</button>
      <Modal  open={editOpen} onClose={handleClose} title='форма для обновления'>
        <AdsFormUpdate  ad={ad} />
      </Modal>
    </div>
  )
}
)
AdsList.displayName= 'AdsList'
export default AdsList
