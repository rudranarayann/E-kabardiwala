import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    allRequestVendor : [],
    allRequestUser : [],
}

export const scrapReq = createAsyncThunk(
    'api/scrap/request',
    async({formData,userid,vendorid,city})=>{
        const response = await axios.post(`http://localhost:3500/api/scrap/request/${city}/${userid}/${vendorid}`,formData);
        return response.data;
    }
);

export const fetchAllRequestVendor = createAsyncThunk(
    "api/scrap/request/fetchAllVendor",
    async({vendorid})=>{
        const response = await axios.get(`http://localhost:3500/api/scrap/request/fetch/vendor/${vendorid}`);
        
        return response.data;
    }
);

export const scheduleRequest = createAsyncThunk(
    "api/scrap/schedule",
    async({reqId,date})=>{
        const response = await axios.put(`http://localhost:3500/api/scrap/request/schedule/${reqId}`,{date});
        
        return response.data;
    }
)
export const cancelRequestById = createAsyncThunk(
    "api/scrap/cancel",
    async({reqId,status})=>{
        const response = await axios.put(`http://localhost:3500/api/scrap/request/cancel/${reqId}`,{status});
        
        return response.data;
    }
)

export const fetchAllRequestUser = createAsyncThunk(
    "api/scrap/request/fetchAllUser",
    async({userid})=>{
        const response = await axios.get(`http://localhost:3500/api/scrap/request/fetch/user/${userid}`);
        
        return response.data;
    }
)

const scrapRequest = createSlice({
    name : 'scrapRequest',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(scrapReq.pending,(state)=>{
            state.isLoading = true
        }).addCase(scrapReq.fulfilled,(state)=>{
            state.isLoading = false
        }).addCase(scrapReq.rejected,(state)=>{
            state.isLoading = false,
            state.allRequest = []
        }).addCase(fetchAllRequestVendor.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchAllRequestVendor.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.allRequestVendor = action?.payload?.success ? action?.payload?.data : []
        }).addCase(fetchAllRequestVendor.rejected,(state)=>{
            state.isLoading = false,
            state.allRequestVendor = []
        }).addCase(fetchAllRequestUser.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchAllRequestUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.allRequestUser = action?.payload?.success ? action?.payload?.data : []
        }).addCase(fetchAllRequestUser.rejected,(state)=>{
            state.isLoading = false,
            state.allRequestUser = []
        }).addCase(scheduleRequest.pending,(state)=>{
            state.isLoading = true;
        }).addCase(scheduleRequest.fulfilled,(state)=>{
            state.isLoading = false;
        }).addCase(scheduleRequest.rejected,(state)=>{
            state.isLoading = false
        }).addCase(cancelRequestById.pending,(state)=>{
            state.isLoading = true;
        }).addCase(cancelRequestById.fulfilled,(state)=>{
            state.isLoading = false;
        }).addCase(cancelRequestById.rejected,(state)=>{
            state.isLoading = false
        })
    }
})

export default scrapRequest.reducer;