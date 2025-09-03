import { createSlice } from "@reduxjs/toolkit";
import { LogOut } from "lucide-react";


const userSlice=createSlice({
    name:"user",
    initialState:{
      userData:null
    },
    reducers:{
        setuserData:(state,action)=>{
            state.userData=action.payload
        }
    }
})
export const {setuserData}=userSlice.actions
export default userSlice.reducer;