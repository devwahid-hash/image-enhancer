import User from "../models/userModel.js"

export const getCurrentUser=async(req,res)=>{
    try {
        
   
    const userId=req.userId
  
    const findUser=await User.findById(userId).select("-password")
      if(!findUser){
        return res.status(401).json({message:"user not authenticated: please Login"})
    }
    return res.status(200).json(findUser)
    } catch (error) {
    return res.status(500).json({message:`error in getCurrentUser${error}`})
}

}