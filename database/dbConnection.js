import { connect } from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export const dbConn= connect('mongodb://localhost:27017/e_commerce')
.then(()=>{
    console.log('db connected successfully')
})