import mongoose from "mongoose"
import dns from "dns"

dns.setServers(["1.1.1.1", "8.8.8.8"])

const connectDb=async()=>{
    try {
       await mongoose.connect(process.env.MONGO_URI).then
        console.log("database connected successfully")
    } catch (error) {
        console.log(`error in db${error}`)
    }
}

export default connectDb