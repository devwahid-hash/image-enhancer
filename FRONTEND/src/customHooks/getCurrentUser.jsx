import axios from "axios"
import { useEffect } from "react"
import { serverURL } from "../main"
import { useDispatch } from "react-redux"
import { setuserData } from "../redux/userSlice"


const getCurrentUser=()=>{
    const dispatch=useDispatch()
    useEffect(()=>{
      let fetchUser=async()=>{
      try {
      let response=await axios.get(`${serverURL}/auth/currentuser`,{
         withCredentials: true 
       })
       dispatch(setuserData(response.data))
      } catch (error) {
        console.log(`error in getCurrentUser componenet${error}`)
      }
        }
    fetchUser()
    },[])
}

export default getCurrentUser;