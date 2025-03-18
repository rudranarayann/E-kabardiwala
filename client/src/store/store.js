import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from '../slice/user/user-auth-slice';
import vendorRegistration from '../slice/vendor/registration-slice-vendor';
import contactSlice from '../slice/contact/contact-slice'
import addressSlice from '../slice/address/address-slice'
import userSlice from '../slice/user/user-related';
import scrapRequest from '../slice/user/scrap-request-slice';

const store = configureStore({
    reducer :{
        auth : userAuthSlice,
        vendor : vendorRegistration,
        contact : contactSlice,
        address : addressSlice,
        user : userSlice,
        scrap : scrapRequest,
    }
});

export default store;