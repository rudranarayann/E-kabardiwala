import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    isAuthenticate: false,
    isLoading: false,
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

//Forgot password for user
export const forgotPasswordUser = createAsyncThunk('auth/forgot-password-user',
    async ({email}) => {
        const response = await axios.post('http://localhost:3500/api/auth/user/forgot-password',{email},
            {
                withCredentials: true,
            }
        );
        return response.data;
    }

);

export const resetPasswordUser = createAsyncThunk('auth/reset-password-user',
    async ({token,password}) => {
        const response = await axios.post(`http://localhost:3500/api/auth/user/reset-password/${token}`,{password},
            {
                withCredentials: true,
            }
        );
        return response.data;
    }

);

//Forgot Password for vendor
export const forgotPasswordVendor = createAsyncThunk('auth/forgot-password-vendor',
    async ({email}) => {
        const response = await axios.post('http://localhost:3500/api/auth/vendor/forgot-password',{email},
            {
                withCredentials: true,
            }
        );
        return response.data;
    }

);

export const resetPasswordVendor = createAsyncThunk('auth/reset-password-vendor',
    async ({token,password}) => {
        const response = await axios.post(`http://localhost:3500/api/auth/vendor/reset-password/${token}`,{password},
            {
                withCredentials: true,
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
                state.isAuthenticate = action.payload.success 
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
                state.isAuthenticate = action.payload.success 
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
        }).addCase(forgotPasswordUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(forgotPasswordUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = null ;
            state.isAuthenticate = false; 
        }).addCase(forgotPasswordUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticate = false 
        }).addCase(resetPasswordUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(resetPasswordUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = null ;
            state.isAuthenticate = false; 
        }).addCase(resetPasswordUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticate = false 
        }).addCase(forgotPasswordVendor.pending,(state)=>{
            state.isLoading = true
        }).addCase(forgotPasswordVendor.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = null ;
            state.isAuthenticate = false; 
        }).addCase(forgotPasswordVendor.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticate = false 
        }).addCase(resetPasswordVendor.pending,(state)=>{
            state.isLoading = true
        }).addCase(resetPasswordVendor.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = null ;
            state.isAuthenticate = false; 
        }).addCase(resetPasswordVendor.rejected,(state,action)=>{
            state.isLoading = false;
            state.user = null;
            state.isAuthenticate = false 
        });
    }
})

export default userAuthSlice.reducer;