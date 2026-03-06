import { createSlice } from "@reduxjs/toolkit";
import { fetchUpdateUser, fetchUser } from "./user-thunks";


const initialState = {
    user:undefined,
    loading:false,
    error:undefined,
};
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.fulfilled, (state , action) => {
            state.loading = false;
            state.error = undefined;
            state.user = action.payload
        })
        .addCase(fetchUser.rejected, (state , action) => {
            state.loading = false;
            state.error = action.payload || action.error.message 
        })
        .addCase(fetchUser.pending , (state, _) => {
            state.loading = true;
            state.error = undefined 
        })
        .addCase(fetchUpdateUser.fulfilled, (state , action) => {
            state.loading = false;
            state.error = undefined; 
            state.user = action.payload
        })
        .addCase(fetchUpdateUser.rejected, (state , action) => {
            state.loading = false;
            state.error = action.payload || action.error.message 
        })
        .addCase(fetchUpdateUser.pending,(state , _) => {
            state.loading = true;
            state.error = undefined 
        })
    }
})
export default userSlice.reducer