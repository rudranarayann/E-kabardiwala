import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState  = {
    isLoading : false,
    addressList : []
}

export const addAdderss = createAsyncThunk(
    '/user/addAddress',
    async(formData)=>{
        const response = await axios.post('http://localhost:3500/api/user/address/add-address',formData);

        return response.data;
    }
);

export const editAddress = createAsyncThunk(
    'user/editAddress',
    async({userid,addressid,formData}) =>{
        const response = await axios.put(`http://localhost:3500/api/user/address/edit-address/${userid}/${addressid}`,formData);

        return response.data;
    }
);

export const fetchAllAddress = createAsyncThunk(
    'user/fetchAllAddress',
    async({userid})=>{
        const response = await axios.get(`http://localhost:3500/api/user/address/get-address/${userid}`);

        return response.data;
    }
);

export const deleteAddress = createAsyncThunk(
    'user/deleteAddress',
    async({userid,addressid})=>{
        const response = await axios.delete(`http://localhost:3500/api/user/address/delete-address/${userid}/${addressid}`);

        return response.data;
    }
)

const addressSlice = createSlice({
    name : 'addressSlice',
    initialState,
    reducers : {},
    extraReducers: (builder) =>{
        builder.addCase(addAdderss.pending, (state)=>{
            state.isLoading = true
        }).addCase(addAdderss.fulfilled, (state,action)=>{
            state.isLoading = false
            // state.addressList = action?.payload?.success ? action?.payload?.data : []
        }).addCase(addAdderss.rejected, (state)=>{
            state.isLoading = false
        }).addCase(fetchAllAddress.pending, (state)=>{
            state.isLoading = true
        }).addCase(fetchAllAddress.fulfilled, (state,action)=>{
            state.isLoading = false,
            state.addressList = action?.payload?.success ? action?.payload?.data : []
        }).addCase(fetchAllAddress.rejected, (state)=>{
            state.isLoading = false,
            state.addressList = []
        }).addCase(editAddress.pending, (state)=>{
            state.isLoading = true
        }).addCase(editAddress.fulfilled, (state,action)=>{
            state.isLoading = false,
            state.addressList = action?.payload?.success ? action?.payload?.data : []
        }).addCase(editAddress.rejected, (state)=>{
            state.isLoading = false
        }).addCase(deleteAddress.pending, (state)=>{
            state.isLoading = true
        }).addCase(deleteAddress.fulfilled, (state)=>{
            state.isLoading = false
        }).addCase(deleteAddress.rejected, (state)=>{
            state.isLoading = false
        })
    }
});

export default addressSlice.reducer;