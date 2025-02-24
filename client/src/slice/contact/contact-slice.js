import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState  = {
    isLoading : false,
    contacts : []
}

export const saveContact = createAsyncThunk(
    'api/saveSontact',
    async(formData)=>{
        const response = await axios.post('http://localhost:3500/api/contact/save-contact',formData);

        return response.data;
    }
);

export const getContact = createAsyncThunk(
    'api/getContact',
    async(formData)=>{
        const response = await axios.post('http://localhost:3500/api/contact/get-contacts',formData);

        return response.data;
    }
);

const contactSlice = createSlice({
    name : 'contactSlice',
    initialState,
    reducers : {},
    extraReducers: (builder) =>{
        builder.addCase(saveContact.pending , (state)=>{
            state.isLoading = true
        }).addCase(saveContact.fulfilled , (state)=>{
            state.isLoading = false
        }).addCase(saveContact.rejected , (state)=>{
            state.isLoading = false
        }).addCase(getContact.pending , (state)=>{
            state.isLoading = true
        }).addCase(getContact.fulfilled , (state,action)=>{
            state.isLoading = false,
            state.contacts = action?.payload?.success ? action?.payload?.data : []
        }).addCase(getContact.rejected , (state,action)=>{
            state.isLoading = false,
            state.contacts  = []
        })
    }
});

export default contactSlice.reducer;