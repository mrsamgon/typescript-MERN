


import express from "express"
import globalErrorHandler from "./middlewares/globalErrorHandler"
import noteRoute from "./note/noteRoute"
import exp from "constants"

const app = express()
app.use(express.json())




app.use(globalErrorHandler)
app.use(express.static("./src/uploads/"))
app.use("/api/notes", noteRoute)
// app.use(globalErrorHandler)

export default app