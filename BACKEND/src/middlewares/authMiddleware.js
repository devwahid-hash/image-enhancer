import jwt from "jsonwebtoken"
const isAuth=(req,res,next)=>{
    try {
        const token=req.cookies.jwt
    if(!token) {
     return res.status(401).json({message:"user not authenticated :'no token'"})
    }
   const verifyToken=jwt.verify(token,process.env.SESSION_KEY)
   console.log(verifyToken)
   req.userId=verifyToken.userId
   next()
    } catch (error) {
        return res.status(400).json({message:`erorr in isAuth middleware${error}`})
    }
}
export default isAuth;