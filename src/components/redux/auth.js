import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: localStorage.getItem('token')||null,
    email:localStorage.getItem('token')||null,
    isLogin:localStorage.getItem('isLogin')||null
}


const authSlice =  createSlice({
    name: "authentication",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {

            localStorage.setItem("token", action.payload.idToken);
            localStorage.setItem("email", action.payload.email);
            localStorage.setItem("isLogin", true);
            state.token = action.payload.idToken;
            state.email = action.payload.email;
            state.isLogin = true
        },
        logout(state) {
            state.token = null;
            state.email = null;
            state.isLogin = false
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice.reducer;