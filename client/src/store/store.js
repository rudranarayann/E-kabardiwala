import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from '../slice/user/user-auth-slice';
import vendorRegistration from '../slice/vendor/registration-slice-vendor';



const store = configureStore({
    reducer :{
        auth : userAuthSlice,
        vendor : vendorRegistration
    }
});

export default store;