import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isAuthenticate : false,
    isLoading : true,
    user : null
}

export const vendorLogin = createAsyncThunk('auth/vendor-login',
    async (formData) => {
        const response = await axios.post('http://localhost:3500/api/auth/vendor/vendor-login', formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }

);

export const vendorRegistration = createAsyncThunk('auth/vendor-signup',
    async (formData) => {
        const response = await axios.post('http://localhost:3500/api/auth/vendor/vendor-register', formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }

);

export const vendorLogout = createAsyncThunk('auth/vendor-logout',
    async () => {
        const response = await axios.post('http://localhost:3500/api/auth/vendor/vendor-logout', {},
            {
                withCredentials: true
            }
        );
        return response.data;
    }

);


const vendorAuthSlice = createSlice({
    name: 'vendorAuth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(vendorLogin.pending, (state) => {
            state.isAuthenticate = false,
            state.isLoading = true
        }).addCase(vendorLogin.fulfilled, (state, action) => {
            state.isAuthenticate = true,
            state.isLoading = false,
            state.user = action.payload.success ? action.payload.data : null
        }).addCase(vendorLogin.rejected, (state) => {
            state.isAuthenticate = false,
            state.isLoading = false,
            state.user = null
        }).addCase(vendorRegistration.pending, (state) => {
            state.isAuthenticate = false,
            state.isLoading = true
        }).addCase(vendorRegistration.fulfilled, (state) => {
            state.isAuthenticate = false,
            state.isLoading = false,
            state.user = null
        }).addCase(vendorRegistration.rejected, (state) => {
            state.isAuthenticate = false,
            state.isLoading = false,
            state.user = null
        }).addCase(vendorLogout.pending, (state) => {
            state.isAuthenticate = false,
            state.isLoading = true
        }).addCase(vendorLogout.fulfilled, (state) => {
            state.isAuthenticate = false,
            state.isLoading = false,
            state.user = null
        }).addCase(vendorLogout.rejected, (state) => {
            state.isAuthenticate = false,
            state.isLoading = false,
            state.user = null
        });
    }
})

export default vendorAuthSlice.reducer;