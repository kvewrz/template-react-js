import AxiosInstance from "../../../shared/lib/axios-instance"

class CategoriesApi{
static async getAll(){
    const {data} = await AxiosInstance.get('/categories')
    return data
}
static async getOne(id){
    const {data} = await AxiosInstance.get(`/categories/${id}`)
    return data
}
static async remove(id){
    const {data} = await AxiosInstance.delete(`/categories/${id}`)
    return data
}
static async create(form){
    const {data} = await AxiosInstance.post(`/categories` ,form)
    return data
}
static async update(id , form){
    const {data} = await AxiosInstance.put(`/categories/${id}`, form)
    return data
}
}
export default CategoriesApi