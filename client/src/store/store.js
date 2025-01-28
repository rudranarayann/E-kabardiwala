import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from '../slice/user/user-auth-slice';



const store = configureStore({
    reducer :{
        userAuthReducer : userAuthSlice,
    }
});

export default store;