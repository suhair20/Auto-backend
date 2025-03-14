import express from 'express'
import DriverController from '../../../inerfaceAdapters/controllers/driverController.js'
import multer from 'multer'
import driverAuthMiddleware from '../Middelware/driverAuthMiddleware.js';
const upload = multer({ dest: 'uploads/' });

const adminRoute=express.Router()



const driverController=new DriverController()

adminRoute.post('/Register',driverController.signup)
adminRoute.post('/verifyotp',driverController.verifyotp)
adminRoute.post('/resendotp',driverController.resendingOtp)
adminRoute.post('/verification', upload.array('image'), driverController.verification);
adminRoute.post('/login',driverController.login)
adminRoute.get('/checkAuth',driverAuthMiddleware,driverController.checkAuth)
export default adminRoute