import AxiosInstance from "../../../shared/lib/axios-instance"

class AdsApi{
 static async getAll(){
    const {data} = await AxiosInstance.get('/ads')
    return data
 }
 static async getOne(id){
    const {data} = await AxiosInstance.get(`/ads/${id}`)
    return data
 }
 static async remove(id){
    const {data} = await AxiosInstance.delete(`/ads/${id}`)
    return data
 }
 static async create(form){
    const {data} = await AxiosInstance.post('/ads', form)
    return data
 }
 static async update(id , form){
    const {data} = await AxiosInstance.put(`/ads/${id}`, form)
    return data
 }
}
export default AdsApi