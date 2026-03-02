import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAds } from '../../../features/ads/models/ads-thunks'
import AdsFormCreate from '../../../features/ads/ui/ads-form-create'
import Loader from '../../../widgets/loader/loader'
import Modal from '../../../widgets/modal/modal'
import AdsList from './ads-list'




function Ads() {
  const [editOpen , setEditOpen] = useState(false)

    const {items:ads, loading , error} = useSelector((state) => state.ads)
    const dispatch = useDispatch()
    useEffect(()=> {
    dispatch(fetchAds())
    }, [dispatch])
    if(loading){
        return <Loader />
    }
  return (
    <div>
      <button type='submit' onClick={() => setEditOpen(true)}>Open Create</button>
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title='форма создания'>
      <AdsFormCreate />
      </Modal>
      {error && <span>{error}</span>}
      {ads.map(ad => (
        <AdsList ad={ad} key={ad.id} />
      ))}
    </div>
  )
}

export default Ads
