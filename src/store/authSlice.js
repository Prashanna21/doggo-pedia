import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn : false,
    userData : {

    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers : {
        login : (state, action) => {
            state.loggedIn = true;
            state.userData = action.payload
        },
        logout : (state, action) => {
            state.loggedIn = false;
            state.userData =  {
            }
        }
        
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer