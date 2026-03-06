
import { createAsyncThunk } from "@reduxjs/toolkit";
import FavoritesApi from "../api/favorites-api";


export const fetchFavorites = createAsyncThunk(
    'favorites/all',
    async (_, {rejectWithValue}) => {
        try{
         return await FavoritesApi.getFavorites()
          
        }catch(error){
            return rejectWithValue(
                error.response?.data?.error || error.message || ''
            )
        }
    }
)

export const fetchFavoriteAdd = createAsyncThunk(
    'favorites/add',
    async (adId, {rejectWithValue}) => {
        try{
            return  await FavoritesApi.getAddFavorites({adId})
            
        }catch(error){
            return rejectWithValue(
                error.response?.data?.error || error.message || ''
            )
        }
    }
) 

export const fetchRemoveFavorite = createAsyncThunk(
    'favorites/remove',
    async(adId, {rejectWithValue}) => {
        try{
        await FavoritesApi.removeFavorites(adId)
        return adId
       
        }catch(error){
         return rejectWithValue(
            error?.response?.data?.error || error.message || ''
         )
        }
    }
)
