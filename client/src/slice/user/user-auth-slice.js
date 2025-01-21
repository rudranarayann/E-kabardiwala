import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    isAuthenticate : false,
    isLoading : true,
    user : null,
};

export const userLogin = createAsyncThunk('auth/user-login',
    async(formData)=>{
        const response = await axios.post('http://localhost:3500/api/auth/user/user-login',formData,
            {
                withCredentials : true,
            }
        );
        return response.data;
    }
);

export const userRegistration = createAsyncThunk('auth/user-signup',
    async(formData)=>{
        const response = await axios.post('http://localhost:3500/api/auth/user/user-register',formData,
            {
                withCredentials : true,
            }
        );
        return response.data;
    }

);

export const userLogout = createAsyncThunk('auth/user-logout',
    async()=>{
        const response = await axios.post('http://localhost:3500/api/auth/user/user-logout',{},
            {
                withCredentials : true
            }
        );
        return response.data;
    }

);

const userAuthSlice = createSlice({
    name : 'userAuth',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(userLogin.pending,(state)=>{
            state.isAuthenticate = false,
            state.isLoading = true
        }).addCase(userLogin.fulfilled,(state,action)=>{
            state.isAuthenticate = true,
            state.isLoading = false,
            state.user = action.payload.success ? action.payload.data : null
        }).addCase(userLogin.rejected,(state)=>{
            state.isAuthenticate = false,
            state.isLoading = false,
            state.user = null
        }).addCase(userRegistration.pending,(state)=>{
            state.isAuthenticate = false,
            state.isLoading = true
        }).addCase(userRegistration.fulfilled,(state)=>{
            state.isAuthenticate = false,
            state.isLoading = false,
            state.user = null
        }).addCase(userRegistration.rejected,(state)=>{
            state.isAuthenticate = false,
            state.isLoading = false,
            state.user = null
        }).addCase(userLogout.pending,(state)=>{
            state.isAuthenticate = false,
            state.isLoading = true
        }).addCase(userLogout.fulfilled,(state)=>{
            state.isAuthenticate = false,
            state.isLoading = false,
            state.user = null
        }).addCase(userLogout.rejected,(state)=>{
            state.isAuthenticate = false,
            state.isLoading = false,
            state.user = null
        });
    }
})

export default userAuthSlice.reducer;