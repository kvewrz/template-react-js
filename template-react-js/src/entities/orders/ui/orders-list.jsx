import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../../widgets/loader/loader"
import { useToast } from "../../../widgets/toast/hooks/use-toast"
import { fetchCancelOrder, fetchOrders, fetchRejectedOrder } from "../models/orders-thunks"




function OrdersList() {
    const showToast = useToast()
    const [tab , setTab] = useState('isBuyer')
    const {itemsIsSeller, itemsIsBuyer, loading} = useSelector((state) => state.orders)
    const dispatch = useDispatch()
    const list = tab === 'isBuyer' ? itemsIsBuyer : itemsIsSeller
    useEffect(()=> {
        dispatch(fetchOrders(tab === 'isSeller'))
    },[dispatch ,tab])
    const cancelOrder  = async (id) => {
        try{
        await dispatch(fetchCancelOrder(id)).unwrap()
        showToast('удачно')
        }catch(error){
        showToast('не удачно'+ error)
        }
    }
    const rejectOrder  = async (id) => {
        try{
        await dispatch(fetchRejectedOrder(id)).unwrap()
        showToast('удачно')
        }catch(error){
        showToast('не удачно'+ error)
        }
    }
    if(loading){
        return <Loader />
    }
  return (
    <div>
        <div className="button_tab">
          <button onClick={()=> setTab('isBuyer')}>покупатель</button>
          <button onClick={() => setTab('isSeller')}>продавец</button>
        </div>
    {list.map(order => (
        <div className="order" key={order.id}>
            <h2>{order.Ad.title}</h2> 
            <div className="orderBuyer">Покупатель {order.Buyer.email}</div>
            <div className="orderSellser">Продавец {order.Ad.User.email}</div>
            <div>статутс {order.status}</div>
            {
                tab === 'isBuyer' && order.status === 'pending' && (
                     <button onClick={() => cancelOrder(order.id)}>отменить(cancel)</button>
                )
            }
            { 
            tab=== 'isSeller' && order.status === 'pending' && (
                    <>
                    <button onClick={() => rejectOrder(order.id)}>Отклонить заявку (reject)</button>
                    </>
                )
            }
           
            
            </div>
    ))}
    
    </div>
  )
}

export default OrdersList