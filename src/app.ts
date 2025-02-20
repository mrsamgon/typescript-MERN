


import express from "express"
import globalErrorHandler from "./middlewares/globalErrorHandler"
import noteRoute from "./note/noteRoute"
import cors from 'cors'
import envConfig from "./config/config"




const app = express()
//PRASE INCOMING JSON TO HANDLE UNDEFINED ERROR
app.use(express.json())

// CORS CONFIGURATION
app.use(cors({
    origin : envConfig.frontend
}))


app.use("/api/notes", noteRoute)

//IMAGE PUBLIC
app.use(express.static("./src/uploads/"))


//ERROR HANLDER
app.use(globalErrorHandler)

export default app