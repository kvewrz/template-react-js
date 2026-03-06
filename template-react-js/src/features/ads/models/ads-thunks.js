import { createAsyncThunk } from "@reduxjs/toolkit";
import AdsApi from "../api/ads-api";


export const fetchAds = createAsyncThunk(
    'ads/all',
    async (_, {rejectWithValue}) => {
       try{
         const res = await AdsApi.getAll()
         return res 
       }catch(error){
        return rejectWithValue(
            error.response?.data?.error || error.message || ''
        )
       }
    }
)
export const fetchOneAds = createAsyncThunk(
    'ads/id',
    async (id, {rejectWithValue}) => {
        try{
          const res = await AdsApi.getOne(id)
        return res 
        }catch(error){
            return rejectWithValue(
                error.response?.data?.error || error.message || ''
            )
        }
    }
)
export const fetchDeleteAds = createAsyncThunk(
    'ads/delete',
    async(id, {rejectWithValue}) => {
        try{
            const res = await AdsApi.remove(id)
           if(res){
            return id 
           }
        }catch(error){
            return rejectWithValue(
                error.response?.data?.error || error.message || ''
            )
        }
    }
)
export const fetchCreateAds = createAsyncThunk(
    'ads/create',
    async(form , {rejectWithValue}) => {
        try{ 
         const res = await AdsApi.create(form)
         return res 
        }catch(error){
            return rejectWithValue(
                error.response?.data?.error || error.message || ''
            )
        }
    }
)
export const fetchUpdateAds = createAsyncThunk(
    'ads/update',
    async({id,form}, {rejectWithValue}) => {
        try{
        const res = await AdsApi.update(id , form)
        return res 
        }catch(error){
            return rejectWithValue(
                error?.response?.data?.error || error.message || ''
            )
        }
    }
)