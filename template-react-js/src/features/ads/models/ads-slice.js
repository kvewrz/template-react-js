import { createSlice } from "@reduxjs/toolkit"
import { fetchAds, fetchCreateAds, fetchDeleteAds, fetchOneAds, fetchUpdateAds } from "./ads-thunks"

export const initialState = {
    items:[],
    loading:false,
    error:undefined 
}

export const adsSlice = createSlice({
    name:'ads',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        //all
        .addCase(fetchAds.fulfilled, (state , action) => {
            state.loading = false;
            state.error = undefined;
            state.items = action.payload 
        })
        .addCase(fetchAds.rejected, (state , action) => {
            state.loading = false;
            state.error = action.payload || action.error.message 
        })
        .addCase(fetchAds.pending, (state , _) => {
            state.loading = true;
            state.error= undefined;
        })
        //id 
        .addCase(fetchOneAds.fulfilled, (state , action) => {
            state.loading = false;
            state.error = undefined;
            const exists = state.items.find((el) => el.id === action.payload.id)
            if(exists){
                state.items = state.items.map((el) => 
                    el.id === action.payload.id ? action.payload : el
                )
            }else{
                state.items.push(action.payload)
            }
        })
        .addCase(fetchOneAds.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || state.error.message 
        })
        .addCase(fetchOneAds.pending, (state , _)=> {
            state.loading = true;
            state.error = undefined
        })
        //remove
        .addCase(fetchDeleteAds.fulfilled, (state , action) => {
            state.loading = false;
            state.error = undefined;
            state.items = state.items.filter((el) => el.id !== action.payload)
        })
        .addCase(fetchDeleteAds.rejected, (state , action) => {
            state.loading = false;
            state.error = action.payload || action.error.message 
        })
        .addCase(fetchDeleteAds.pending, (state, _) => {
            state.loading = true;
            state.error = undefined
        })
        //create 
        .addCase(fetchCreateAds.fulfilled, (state , action) => {
            state.loading = false;
            state.error = undefined;
            state.items.push(action.payload)
        })
        .addCase(fetchCreateAds.rejected, (state , action) => {
            state.loading = false;
            state.error = action.payload || action.error.message;
        })
        .addCase(fetchCreateAds.pending, (state, _) => {
            state.loading = true;
            state.error = undefined
        })
        //update
        .addCase(fetchUpdateAds.fulfilled, (state , action) => {
            state.loading = false;
            state.error = undefined;
            state.items = state.items.map((el) => 
             el.id === action.payload.id ? action.payload : el 
            )
        })
        .addCase(fetchUpdateAds.rejected, (state , action) => {
            state.loading = false;
            state.error = action.payload || action.error.message 
        })
        .addCase(fetchUpdateAds.pending, (state) => {
            state.loading = true;
            state.error = undefined 
        })
    }

})
export default adsSlice.reducer