import AxiosInstance from "../../../shared/lib/axios-instance"

class FavoritesApi{
static async getFavorites(){
    const {data} = await AxiosInstance.get('/favorites')
    return data
}
static async getAddFavorites(adId){
    const {data} = await AxiosInstance.post('/favorites', adId)
    return data
}
static async removeFavorites(adId){
    const {data} = await AxiosInstance.delete(`/favorites/${adId}`)
    return data
}
}
export default FavoritesApi