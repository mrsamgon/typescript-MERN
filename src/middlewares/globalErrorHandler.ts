import { NextFunction } from "express";
import { HttpError } from "http-errors";
import { Response } from "express";
import { Request } from "express";
import { error } from "console";
import envConfig from "../config/config";


const globalErrorHandler = (err:HttpError, req:Request, res: Response, next:NextFunction)=>{
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        message : err.message,
        errorStack : envConfig.environment == "development" ? err.stack : "Something went wrong"
    })

}

export default globalErrorHandler