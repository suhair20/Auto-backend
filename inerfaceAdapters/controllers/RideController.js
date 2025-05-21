
import CreateRide from "../../useCases/RideCases/CreateRide.js";
import TrackingDetials from "../../useCases/RideCases/TrackingDetials.js";
import RideEnd from "../../useCases/RideCases/RideEnd.js";

import crypto from 'crypto'
import { log } from "util";

const RAZORPAY_SECRET= process.env.RAZORPAY_SECRET


class RideController{
    constructor(
      createRide=new CreateRide(),
    trackingdeatials=new TrackingDetials(),
    rideend=new RideEnd()
  ){
       this.createRide=createRide
       this.trackingdeatials=trackingdeatials
       this.rideend=rideend
    }



    ride=async(req,res)=>{
        try {

            
            
               const {razorpay_order_id, razorpay_payment_id, razorpay_signature, rideDetails }=req.body
       
               const expectedSignature=crypto
               .createHmac("sha256",RAZORPAY_SECRET)
               .update(razorpay_order_id + "|" + razorpay_payment_id)
               .digest("hex")
       
               if (expectedSignature !== razorpay_signature) {
                   return res.status(400).json({ success: false, message: "Invalid signature. Payment not verified." });
                 }

       const ride=await this.createRide.execute(rideDetails,razorpay_payment_id)
        if(ride){
            res.status(201).json({ success:true });
        }
        
       
                 
               
               
           } catch (error) {
               res.status(500).json({error:'failed in verifypayment  '})
           }

    }


tracking = async (req, res) => {
  try {
    const { rideId } = req.query;

    if (!rideId) {
      return res.status(400).json({ success: false, message: 'rideId is required' });
    }

    const details = await this.trackingdeatials.execute(rideId);

    if (!details || details.length === 0) {
      return res.status(404).json({ success: false, message: 'Ride not found' });
    }
    
    
    res.status(200).json({ success: true, data: details[0] });
  } catch (error) {
    console.error('Error in tracking controller:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

rideEnd=async(req,res)=>{
  try { 
   const { rideId } = req.body;
     console.log("ride id come 1",req.body);
     
      if (rideId){
        const status='payment_pending'
         await this.rideend.execute(rideId,status)
      } 
    
    
  } catch (error) {
     console.error('Error in rideEnd controller:', error)
  }
}


ridepayment=async(req,res)=>{
        try {
     console.log('1final');
     
            
            
               const {razorpay_order_id, razorpay_payment_id, razorpay_signature, rideId }=req.body
               console.log('hii',razorpay_order_id,'giii',razorpay_payment_id,'hii', razorpay_signature,'iiii', rideId);
               
               const expectedSignature=crypto
               .createHmac("sha256",RAZORPAY_SECRET)
               .update(razorpay_order_id + "|" + razorpay_payment_id)
               .digest("hex")
       
               if (expectedSignature !== razorpay_signature) {
                   return res.status(400).json({ success: false, message: "Invalid signature. Payment not verified." });
                 }
          
       if (rideId){
        console.log('2 final');
        
        const status='completed'
         const ride=await this.rideend.executepaymnet(rideId,status,razorpay_payment_id)

         
        if(ride){
            res.status(201).json({ success:true });
        }
      } 
        
       
                 
               
               
           } catch (error) {
               res.status(500).json({error:'failed in verifypayment  '})
           }

    }

    feedback=async(req,res)=>{


      const {rideId,rating,comment}=req.body 
        if (!rideId || !rating) {
    return res.status(400).json({ success: false, message: "Missing data" });
        }

      try {

     const feedback=await this.rideend.executefeedback(rideId,comment,rating)

        if(feedback){
          res.status(201).json({ success:true });
        }

        
      } catch (error) {
        res.status(500).json({error:'failed in feedback  '})
      }
    }





}

export default RideController