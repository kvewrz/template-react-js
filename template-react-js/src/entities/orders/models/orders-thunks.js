
import { createAsyncThunk } from "@reduxjs/toolkit";
import OrdersApi from "../api/orders-api";


export const fetchOrders = createAsyncThunk(
    'orders/all',
    async (isSeller, {rejectWithValue}) => {
        try{
         return await OrdersApi.getOrders(isSeller)
          
        }catch(error){
            return rejectWithValue(
                error.response?.data?.error || error.message || ''
            )
        }
    }
)

export const fetchCreateOrder = createAsyncThunk(
    'orders/create',
    async (adId, {rejectWithValue}) => {
        try{
            await OrdersApi.createOrder(adId)
            return adId
        }catch(error){
            return rejectWithValue(
                error.response?.data?.error || error.message || ''
            )
        }
    }
) 

export const fetchCancelOrder = createAsyncThunk(
    'orders/cancel',
    async(id , {rejectWithValue}) => {
        try{
        return await OrdersApi.cancelOrder(id)
       
        }catch(error){
         return rejectWithValue(
            error?.response?.data?.error || error.message || ''
         )
        }
    }
)
export const fetchRejectedOrder = createAsyncThunk(
    'orders/reject',
    async({id , rejectComment}, {rejectWithValue}) => {
        try{
        return await OrdersApi.rejectOrder(id , rejectComment)
    
        }catch(error){
         return rejectWithValue(
            error?.response?.data?.error || error.message || ''
         )
        }
    }
)
