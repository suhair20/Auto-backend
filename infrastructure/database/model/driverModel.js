import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: '' },
    Experience: { type: Number, default: 0 },
    Phone: { type: String, default: '' }, 
    Model: { type: String, default: '' },
    VehicleNumber: { type: String, default: '' },
    color: { type: String, default: '' },
    isBlocked: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    Profileimage: { type: String, default:'' },
    Licenceimage:{type:String,default:''},
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    isFullyRegistered: { type: Boolean, default: false } 
});

export default mongoose.model('Driver', driverSchema);


// hiiii doo


