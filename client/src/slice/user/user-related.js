import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    isLoading : false,
    cityPrices : []
}

export const fetchCityPrice = createAsyncThunk(
    'user/city/fetchPrice',
    async({city})=>{
        const response = await axios.get(`http://localhost:3500/api/prices/${city}`);
        return response.data;
    }
)

const userSlice = createSlice({
    name : 'userSlice',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(fetchCityPrice.pending,(state)=>{
            state.isLoading = true
        }).addCase(fetchCityPrice.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.cityPrices = action.payload.success ? action.payload.data : []
        }).addCase(fetchCityPrice.rejected,(state)=>{
            state.isLoading = false,
            state.cityPrices = []
        })
    }
});

export default userSlice.reducer;