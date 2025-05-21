import RideInterface from "../interfaces/RideInterface.js";
import Ride from "../../infrastructure/database/model/rideModel.js";



class  RideRepository extends RideInterface{


    async save(ride) {
        const newRide = new Ride(ride);
      
        
        return await newRide.save();
      }
    
      async findById(rideId) {
        return await Ride.findById(rideId)
      }

      async findByrideId(rideId){
        
        
        return await Ride.find({rideId}).populate('driverId','name Phone VehicleNumber')
      }
    
      async findByUserId(userId) {
        return await Ride.find({ userId }).sort({date:-1});
      }
    
      async findByDriverId(driverId) {
        return await Ride.find({ driverId });
      }
    
      async updateStatus(rideId, status) {
        console.log("ride id come 3 sucess");
        return await Ride.findOneAndUpdate({ rideId }, { status }, { new: true });
      }

      async updateStatusandpaymentId(rideId, status, razorpayPaymentId) {
  console.log("ride id come 4uccess");
  return await Ride.findOneAndUpdate(
    { rideId }, 
    { status, razorpayPaymentId }, 
    { new: true } 
  );
}
    
      async addReview(rideId, review, rating) {
        return await Ride.findByIdAndUpdate(
          rideId,
          { review, rating },
          { new: true }
        );
      }

}

export default RideRepository