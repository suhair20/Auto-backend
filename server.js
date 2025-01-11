

import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import adminRoute from './infrastructure/express/routes/adminRoute.js';
import userRoute from './infrastructure/express/routes/userRoute.js';
import driverRoute from './infrastructure/express/routes/driverRoute.js'
import connectDB from './infrastructure/database/mongoConfig/mongoConnect.js';
import errorHandler from './infrastructure/express/Middelware/errorHandler.js';
dotenv.config()

connectDB()

const app=express()
const port =5000

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/user',userRoute)
app.use('/admin',adminRoute)
app.use('/driver',driverRoute)


// Use the error-handling middleware
app.use(errorHandler);


app.listen(port,()=>console.log(`server started on port ${port}`) )

