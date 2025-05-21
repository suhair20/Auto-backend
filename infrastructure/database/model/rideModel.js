import mongoose from "mongoose";

const rideSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,

    },
    driverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Driver',
        required:true
    },
    pickup: {
    type: String,
    required: true
  },
  pickupLat: {
    type: Number, // Add this
    required: true
  },
  pickupLng: {
    type: Number, // Add this
    required: true
  },
  drop: {
    type: String,
    required: true
  },
  dropLat: {
    type: Number, // Add this
    required: true
  },
  dropLng: {
    type: Number, // Add this
    required: true
  },
    fare:{
        type:Number,
        required:true
    },
    advancePaid:{
        type:Number,
        default:0,
    },
    advancePaymentId:{
      type: String,
    },
    razorpayPaymentId: {
        type: String,
      },
      status: {
        type: String,
        enum: ['pending','payment_pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      rideId:{
       type:String,
       required:true,
       unique:true
      },
      review: {
        type: String,
        trim: true,
      },
      rating: {
        type: Number,
        min: 1, 
        max: 5, 
        required: false,
      },


})

const Ride=mongoose.model('Ride',rideSchema)
export default Ride






