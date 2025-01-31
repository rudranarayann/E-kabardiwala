import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from '../slice/user/user-auth-slice';



const store = configureStore({
    reducer :{
        auth : userAuthSlice,
    }
});

export default store;