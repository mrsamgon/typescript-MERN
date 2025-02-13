// for the database connetion hai
import mongoose from "mongoose";
import envConfig from "./config";

const connectToDatabase = async ()=>{
    try{
        await mongoose.connect(envConfig.mongodbString as string) //  as string is we are forcefully putting as a string when its not accepting
        mongoose.connection.on("connected", ()=>{
            console.log("Connected to database successfully")
        })
    }catch(error) {
        console.log("Failed to conneted databaese !!!!")
        process.exit(1)//auto exit forcefully
    }
}

export default connectToDatabase