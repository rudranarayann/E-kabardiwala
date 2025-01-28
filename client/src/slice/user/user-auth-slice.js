import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    isAuthenticate: false,
    isLoading: true,
    user: null,
};

export const userLogin = createAsyncThunk('auth/user-login',
    async (formData) => {
        const response = await axios.post('http://localhost:3500/api/auth/user/user-login', formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
);

export const userRegistration = createAsyncThunk('auth/user-signup',
    async (formData) => {
        const response = await axios.post('http://localhost:3500/api/auth/user/user-register', formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }

);

export const userLogout = createAsyncThunk('auth/user-logout',
    async () => {
        const response = await axios.post('http://localhost:3500/api/auth/user/user-logout', {},
            {
                withCredentials: true
            }
        );
        return response.data;
    }

);

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

export const checkAuth = createAsyncThunk('auth/checkAuth',
    async()=>{
        const response = await axios.get('http://localhost:3500/api/auth/user/checkAuth',
            {
                withCredentials : true,
                headers : {
                    'Cache-control' : 'no-store,no-cache, must-revalidate, proxy-revalidate',
                }
            }
        );
        return response.data;
    }
);

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(userLogin.pending, (state) => {
            state.isAuthenticate = false,
                state.isLoading = true
        }).addCase(userLogin.fulfilled, (state, action) => {
            state.isAuthenticate = true,
                state.isLoading = false,
                state.user = action.payload.success ? action.payload.data : null
        }).addCase(userLogin.rejected, (state) => {
            state.isAuthenticate = false,
                state.isLoading = false,
                state.user = null
        }).addCase(userRegistration.pending, (state) => {
            state.isAuthenticate = false,
                state.isLoading = true
        }).addCase(userRegistration.fulfilled, (state) => {
            state.isAuthenticate = false,
                state.isLoading = false,
                state.user = null
        }).addCase(userRegistration.rejected, (state) => {
            state.isAuthenticate = false,
                state.isLoading = false,
                state.user = null
        }).addCase(userLogout.pending, (state) => {
            state.isAuthenticate = false,
                state.isLoading = true
        }).addCase(userLogout.fulfilled, (state) => {
            state.isAuthenticate = false,
                state.isLoading = false,
                state.user = null
        }).addCase(userLogout.rejected, (state) => {
            state.isAuthenticate = false,
                state.isLoading = false,
                state.user = null
        }).addCase(vendorLogin.pending, (state) => {
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
        }).addCase(checkAuth.pending,(state)=>{
            state.isLoading = true
        }).addCase(checkAuth.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = (action.payload.success) ? action.payload.user :null ;
            state.isAuthenticate =action.payload.success; 
        }).addCase(checkAuth.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticate = false 
        });
    }
})

export default userAuthSlice.reducer;