import AxiosInstance from "../../../shared/lib/axios-instance"

class OrdersApi{
static async getOrders(asSeller=true) {
    const {data} = await AxiosInstance.get(`/orders?asSeller=${asSeller}`)
    return data
}
static async createOrder(adId){
    const {data} = await AxiosInstance.post('/orders', {adId})
    return data
}
static async cancelOrder(id){
    const {data} = await AxiosInstance.patch(`/orders/${id}/cancel`)
    return data
}
static async  rejectOrder(id , rejectComment){
    const {data} = await AxiosInstance.patch(`/orders/${id}/reject` , {rejectComment})
    return data
}
}
export default OrdersApi