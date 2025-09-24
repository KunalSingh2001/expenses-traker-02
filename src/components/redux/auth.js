import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: null,
    isLogin:false,
    email:null
}


createSlice({
    name: "authentication",
    initialState: initialAuthState,
    
})