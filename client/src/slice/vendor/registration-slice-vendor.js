import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    isLoading : false,
    prices : [],
}

export const cmpRegistrationVendor = createAsyncThunk(
    'vendor/registration',
    async(formData) => {
        const response = await axios.post('http://localhost:3500/api/auth/vendor/registration',formData);

        return response.data
    }
)

export const addCitySlice  = createAsyncThunk(
    'vendor/addcity',
    async(formData) => {
        const response = await axios.post('http://localhost:3500/api/auth/vendor/addcity',formData);

        return response.data;
    }
);

export const fetchAllCity = createAsyncThunk(
    'vendor/fetchAllCity',
    async({vendorid})=>{
        const response = await axios.get(`http://localhost:3500/api/auth/vendor/fetchallcity/${vendorid}`);

        return response.data;
    }
);

export const deleteCity = createAsyncThunk(
    'vendor/deletecity',
    async({vendorid,city})=>{
        const response = await axios.delete(`http://localhost:3500/api/auth/vendor/deletecity/${vendorid}/${city}`);

        return response.data;
    }
)

export const updatePrice = createAsyncThunk(
    'vendor/updateprice',
    async({vendorid,city,formData})=> {
        const response = await axios.put(`http://localhost:3500/api/auth/vendor/updateprice/${vendorid}/${city}`,formData);

        return response.data;
    }
)

const vendorRegistrationSlice = createSlice({
    name : 'vendorRegistrationSlice',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(cmpRegistrationVendor.pending , (state)=>{
            state.isLoading = true;
        }).addCase(cmpRegistrationVendor.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.prices = action?.payload?.success ? (action?.payload?.data) : [];
        }).addCase(cmpRegistrationVendor.rejected,(state,action)=>{
            state.isLoading = false;
            state.prices = [];
        }).addCase(addCitySlice.pending , (state)=>{
            state.isLoading = true;
        }).addCase(addCitySlice.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.prices = action?.payload?.success ? (action?.payload?.data) : [];
        }).addCase(addCitySlice.rejected,(state,action)=>{
            state.isLoading = false;
            state.prices = [];
        }).addCase(fetchAllCity.pending , (state)=>{
            state.isLoading = true;
        }).addCase(fetchAllCity.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.prices = action?.payload?.success ?(action?.payload?.data) : [];
        }).addCase(fetchAllCity.rejected,(state,action)=>{
            state.isLoading = false;
            state.prices = [];
        }).addCase(deleteCity.pending , (state)=>{
            state.isLoading = true;
        }).addCase(deleteCity.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.prices = action?.payload?.success ? (action?.payload?.data) : [];
        }).addCase(deleteCity.rejected,(state,action)=>{
            state.isLoading = false;
            state.prices = [];
        }).addCase(updatePrice.pending , (state)=>{
            state.isLoading = true;
        }).addCase(updatePrice.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.prices = action?.payload?.success ? (action?.payload?.data) : [];
        }).addCase(updatePrice.rejected,(state,action)=>{
            state.isLoading = false;
            state.prices = [];
        })
    }
})


export default vendorRegistrationSlice.reducer;