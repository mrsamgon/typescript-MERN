// // for the database connetion hai
// import mongoose from "mongoose";
// import envConfig from "./config";

// console.log("its testing database connection")

// const connectToDatabase = async ()=>{
//     try{
//         mongoose.connect(envConfig.mongodbString as string); 
//             console.log("Connection attempt made, waiting for response...");
// //  as string is we are forcefully putting as a string when its not accepting
//         await mongoose.connection.on("connected", ()=>{
//             console.log("Connected to database successfully")
//         })
//     }catch(error) {
//         console.log("Failed to conneted databaese !!!!")
//         process.exit(1)//auto exit forcefully
//     }
// }

// export default connectToDatabase

import mongoose from "mongoose";
import envConfig from "./config";

const connectToDatabase = async ()=>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("Connected to db successfully")
        })
        await mongoose.connect(envConfig.mongodbString as string)
    } catch (error) {
        console.log("Faile to connected db !!!")
        process.exit(1)
    }
}

export default connectToDatabase