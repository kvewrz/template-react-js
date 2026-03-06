

import { createSlice } from "@reduxjs/toolkit";
import { fetchFavoriteAdd, fetchFavorites, fetchRemoveFavorite } from "./favorites-thunks";



const initialState = {
   items:[],
    loading:false,
    error:undefined,
};
const favoritesSlice = createSlice({
    name:'orders',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder
      //get
      .addCase(fetchFavorites.fulfilled, (state , action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = undefined;
      })  
      .addCase(fetchFavorites.rejected, (state , action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchFavorites.pending , (state, _) => {
        state.loading = true ;
        state.error = undefined;
      })

      //add
      .addCase(fetchFavoriteAdd.fulfilled, (state , action) => {
        state.loading = false;
        state.error = undefined;
        state.items.push(action.payload)
      })
      .addCase(fetchFavoriteAdd.rejected, (state , action) => {
        state.loading = false;
        state.error = action.payload || action.error.message 
      })
      .addCase(fetchFavoriteAdd.pending, (state) => {
        state.loading = true;
        state.error = undefined
      })
      //remove
      .addCase(fetchRemoveFavorite.fulfilled , (state , action) => {
        state.loading = false;
        state.error = undefined;
       state.items = state.items.filter((el) => el.id !== action.payload)
      })
      .addCase(fetchRemoveFavorite.rejected , (state , action) => {
        state.loading = false;
        state.error = action.payload ||  action.error.message ;
      })
      .addCase(fetchRemoveFavorite.pending , (state , _)=> {
        state.loading = true;
        state.error = undefined
      })
    }
})

export default favoritesSlice.reducer