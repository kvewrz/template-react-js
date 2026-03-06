import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchCreateCategories, fetchDeleteCategories, fetchOneCategory, fetchUpdateCategories } from "./categories-thunks";


const initialState = {
    items:[],
    loading:false,
    error:undefined,
};
const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
      builder
      //get
      .addCase(fetchCategories.fulfilled, (state , action) => {
        state.loading = false;
        state.error = undefined;
        state.items = action.payload 
      })  
      .addCase(fetchCategories.rejected, (state , action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchCategories.pending , (state, _) => {
        state.loading = true ;
        state.error = undefined;
      })

      //id
      .addCase(fetchOneCategory.fulfilled, (state , action) => {
        state.loading = false;
        state.error = undefined;
        const exists = state.items.find((el) => el.id === action.payload.id)
        if(exists){
            state.items = state.items.map((el) => 
            el.id === action.payload.id ? action.payload : el)
        }else{
            state.items.push(action.payload)
        }
      })
      .addCase(fetchOneCategory.rejected, (state , action) => {
        state.loading = false;
        state.error = action.payload || action.error.message 
      })
      .addCase(fetchOneCategory.pending, (state) => {
        state.loading = true;
        state.error = undefined
      })
      //remove
      .addCase(fetchDeleteCategories.fulfilled , (state , action) => {
        state.loading = false;
        state.error = undefined;
        state.items = state.items.filter((el) => el.id !== action.payload)
      })
      .addCase(fetchDeleteCategories.rejected , (state , action) => {
        state.loading = false;
        state.error = action.payload ||  action.error.message ;
      })
      .addCase(fetchDeleteCategories.pending , (state , _)=> {
        state.loading = true;
        state.error = undefined
      })
      //create
      .addCase(fetchCreateCategories.fulfilled, (state , action) => {
        state.loading = false ;
        state.error = undefined ;
        state.items.push(action.payload)
      })
      .addCase(fetchCreateCategories.rejected, (state , action) => {
        state.loading  = false;
        state.error = action.payload || action.error.message 
      })
      .addCase(fetchCreateCategories.pending, (state , _) => {
        state.loading = true;
        state.error = undefined
      })
      //update
      .addCase(fetchUpdateCategories.fulfilled, (state , action) => {
        state.loading = false;
        state.error = undefined;
        state.items = state.items.map((el) => 
            el.id === action.payload.id ? action.payload : el  
        )
      })
      .addCase(fetchUpdateCategories.rejected, (state , action) => {
        state.loading = false;
        state.error = action.payload ||  action.error.message;
      })
      .addCase(fetchUpdateCategories.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })

    }
})

export default categoriesSlice.reducer