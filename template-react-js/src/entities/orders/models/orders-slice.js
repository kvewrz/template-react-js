import { createSlice } from "@reduxjs/toolkit";
import { fetchCancelOrder, fetchCreateOrder, fetchOrders, fetchRejectedOrder } from "./orders-thunks";


const initialState = {
    itemsIsSeller:[],
    itemsIsBuyer:[],
    loading:false,
    error:undefined,
};
const ordersSlice = createSlice({
    name:'orders',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder
      //get
      .addCase(fetchOrders.fulfilled, (state , action) => {
        const isSeller = action.meta.arg;
        if(isSeller){
            state.itemsIsSeller = action.payload
        }else{
            state.itemsIsBuyer = action.payload
        }
        state.loading = false;
        state.error = undefined;
      })  
      .addCase(fetchOrders.rejected, (state , action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchOrders.pending , (state, _) => {
        state.loading = true ;
        state.error = undefined;
      })

      //create
      .addCase(fetchCreateOrder.fulfilled, (state , action) => {
        state.loading = false;
        state.error = undefined;
        state.itemsIsBuyer.push(action.payload)
      })
      .addCase(fetchCreateOrder.rejected, (state , action) => {
        state.loading = false;
        state.error = action.payload || action.error.message 
      })
      .addCase(fetchCreateOrder.pending, (state) => {
        state.loading = true;
        state.error = undefined
      })
      //cancel
      .addCase(fetchCancelOrder.fulfilled , (state , action) => {
        state.loading = false;
        state.error = undefined;
        state.itemsIsBuyer = state.itemsIsBuyer.map((el) => el.id === action.payload.id ? action.payload : el)
      })
      .addCase(fetchCancelOrder.rejected , (state , action) => {
        state.loading = false;
        state.error = action.payload ||  action.error.message ;
      })
      .addCase(fetchCancelOrder.pending , (state , _)=> {
        state.loading = true;
        state.error = undefined
      })
      //reject
      .addCase(fetchRejectedOrder.fulfilled, (state , action) => {
        state.loading = false ;
        state.error = undefined ;
        state.itemsIsSeller = state.itemsIsSeller.map((el) => el.id === action.payload.id ? action.payload : el)
      })
      .addCase(fetchRejectedOrder.rejected, (state , action) => {
        state.loading  = false;
        state.error = action.payload || action.error.message 
      })
      .addCase(fetchRejectedOrder.pending, (state , _) => {
        state.loading = true;
        state.error = undefined
      })
      
    }
})

export default ordersSlice.reducer