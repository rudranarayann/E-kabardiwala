import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from '../slice/user/user-auth-slice';
import vendorAuthSlice from '../slice/vendor/vendor-auth-slice';


const store = configureStore({
    reducer :{
        userAuthReducer : userAuthSlice,
        userAuthReducer : vendorAuthSlice
    }
});

export default store;