import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
    name:'email',
    initialState:{
        emails:[],
    },
    reducers:{
        sentEmail(state,action){
           state.emails = action.payload
        }
    }
})

export const emailActions=emailSlice.actions;
export default emailSlice;