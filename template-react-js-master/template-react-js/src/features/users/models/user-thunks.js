import { createAsyncThunk } from "@reduxjs/toolkit";
import UserApi from "../api/users-api";

export const fetchUser = createAsyncThunk(
    'user/get',
    async (_, {rejectWithValue}) => {
        try{ 
        return await UserApi.getUser()
        }catch(error){
         return rejectWithValue(
            error.response.data?.error || error.message || ''
         )
        }
    }
)
export const fetchUpdateUser = createAsyncThunk(
    'user/update',
    async(form, {rejectWithValue}) => {
        try{
      return await UserApi.getUpdate(form)
        }catch(error){
            return rejectWithValue(
                error.response?.data?.error || error.message || ''
            )
        }
    }
)