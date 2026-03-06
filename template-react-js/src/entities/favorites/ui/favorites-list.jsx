import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../widgets/loader/loader"
import { useToast } from "../../../widgets/toast/hooks/use-toast"
import { fetchFavorites, fetchRemoveFavorite } from "../models/favorites-thunks"
import './favorites.css'



function FavoritesList() {
    const dispatch = useDispatch()
    const {items:favorites , error , loading} = useSelector((state) => state.favorites)
    const showToast = useToast()
    useEffect(()=> {
        dispatch(fetchFavorites())
    },[dispatch])
    const removeFavorites = async (adId) => {
        try{
         await dispatch(fetchRemoveFavorite(adId)).unwrap()
         showToast('удачно удалили')
        }catch(error){
       showToast('не удачно' + error)
        } 
    }
    if(loading){
        return <Loader />
    }
  return (
   <div className="favorites-list">
    {favorites.map(favorite => (
        <div key={favorite.id} className="favorite-item">
            {error && <span className="error">{error}</span>}
            <img src={favorite?.imageUrl || 'https://avatars.mds.yandex.net/i?id=609397dca0c9b274d8129e39c1f25346f3e78fe4-11270328-images-thumbs&n=13'} alt="" />
            <hr />
            <div className="item-info">
                <h1>{favorite?.title}</h1>
                <h2>{favorite?.Category?.name}</h2>
                <h2>{favorite?.description}</h2>
                <h2>{favorite?.price} ₽</h2>
                <button className="remove-favorites" onClick={() => removeFavorites(favorite.id)}>Remove</button>
            </div>
        </div>
    ))}
</div>
  )
}

export default FavoritesList