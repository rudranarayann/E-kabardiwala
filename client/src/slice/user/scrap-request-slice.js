import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading : false,
    allRequest : [],
}

export const scrapReq = createAsyncThunk(
    'api/scrap/request',
    async({formData,userid,vendorid,city})=>{
        const response = await axios.post(`http://localhost:3500/api/scrap/request/${city}/${userid}/${vendorid}`,formData);
        
        // console.log(response.data);
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
        }).addCase(scrapReq.fulfilled,(state,action)=>{
            // console.log(action.payload);
            state.isLoading = false
        }).addCase(scrapReq.rejected,(state,action)=>{
            state.isLoading = false,
            state.allRequest = []
        })
    }
})

export default scrapRequest.reducer;