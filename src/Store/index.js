import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth-slics";
import emailSlice from "./email-slice";

const Store=configureStore({
    reducer:{
        auth:authSlice.reducer,
        email:emailSlice.reducer
    }
});
export default Store;