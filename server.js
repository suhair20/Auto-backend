

import express from 'express'
import http, { createServer } from 'http'
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import adminRoute from './infrastructure/express/routes/adminRoute.js';
import userRoute from './infrastructure/express/routes/userRoute.js';
import driverRoute from './infrastructure/express/routes/driverRoute.js'
import connectDB from './infrastructure/database/mongoConfig/mongoConnect.js';
import errorHandler from './infrastructure/express/Middelware/errorHandler.js';
import { setupDriverSocket } from './inerfaceAdapters/controllers/driverSocketController.js';

import { activeDrivers } from './inerfaceAdapters/controllers/driverSocketController.js';


dotenv.config()
connectDB()

const app=express()
const port =5001

const server=createServer(app)

const io=new Server(server,{
cors:{
  origin:'auto-bay.vercel.app',
  methods:['GET','POST'],
  credentials:true
}
})

setupDriverSocket(io);

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))  

// app.use(cors({
//     origin: 'https://auto-frontend-8idj-moidheen-suhairs-projects.vercel.app', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())


app.get('/', (req, res) => {
    res.send('Backend is running!');
  });

app.use('/user',userRoute)
app.use('/admin',adminRoute)
app.use('/driver',driverRoute)


app.get('/api/active-drivers', (req, res) => {
  console.log('Active Drivers:', activeDrivers);
  res.json({ drivers: activeDrivers });
});


// Use the error-handling middleware
app.use(errorHandler);


server.listen(port,()=>console.log(`server started on port ${port}`) )

