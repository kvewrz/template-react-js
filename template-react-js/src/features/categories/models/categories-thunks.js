import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoriesApi from "../api/categories-api";


export const fetchCategories = createAsyncThunk(
    'categories/all',
    async (_, {rejectWithValue}) => {
        try{
          const data = await CategoriesApi.getAll()
          return data
        }catch(error){
            return rejectWithValue(
                error.response?.data?.error || error.message || ''
            )
        }
    }
)

export const fetchOneCategory = createAsyncThunk(
    'categories/id',
    async (id, {rejectWithValue}) => {
        try{
            const data = await CategoriesApi.getOne(id)
            return data
        }catch(error){
            return rejectWithValue(
                error.response?.data?.error || error.message || ''
            )
        }
    }
) 

export const fetchCreateCategories = createAsyncThunk(
    'categories/create',
    async(form , {rejectWithValue}) => {
        try{
        const data = await CategoriesApi.create(form)
        return data
        }catch(error){
         return rejectWithValue(
            error?.response?.data?.error || error.message || ''
         )
        }
    }
)
export const fetchUpdateCategories = createAsyncThunk(
    'categories/update',
    async({id , form} , {rejectWithValue}) => {
        try{
            const data = await CategoriesApi.update(id, form)
            return data
        }catch(error){
            return rejectWithValue(
                error?.response?.data?.error || error.message || ''
            )
        }
    }

)
export const fetchDeleteCategories = createAsyncThunk(
    'categories/delete',
    async (id , {rejectWithValue}) => {
        try{
            const data = await CategoriesApi.remove(id)
            if(data){
               return id  
            }
           
        }catch(error){
            return rejectWithValue(error?.response?.data?.error || error.message || '')
        }
    }
)