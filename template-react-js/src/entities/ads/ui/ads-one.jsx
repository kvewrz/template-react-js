import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import { fetchOneAds } from "../../../features/ads/models/ads-thunks"
import Loader from "../../../widgets/loader/loader"


function AdsOne() {
  const {id} = useParams()
  const navigate = useNavigate()
  const  { items , loading , error} = useSelector((state) => state.ads)
  const dispatch = useDispatch()
  useEffect(() => {
   dispatch(fetchOneAds(id))
  }, [id ,dispatch ])
 const ad = useMemo(() => {
  return items.find(el => el.id ===Number(id))
 },[items , id])
 if(loading){
  return <Loader />
 }
  return (
    <div>
      {items && (
        <>
        {error && <span>{error}</span>}
        <h1>{ad.title}</h1>
        <h2>{ad.description}</h2>
        <h2>{ad.price}</h2>
        <h2>{ad.categoryId}</h2>
        <img src={ad.imageUrl} alt="" />
        <button onClick={() => navigate('/ads')}>назад</button>
        </>
        
      )}
    </div>
  )
}

export default AdsOne
