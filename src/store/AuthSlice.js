import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userData : {},
    token : ""
}

 const AuthSlice = createSlice({
    name : "auth",
    initialState : initialState,
    reducers : {
        setValue : (state,action) =>{
                return state = action.payload
        },
        clearValue : (state) =>{
                return initialState
        }
    }
 })   

 export const {setValue,clearValue} = AuthSlice.actions
 export default AuthSlice.reducer