
import RideRepository from "../../repository/implementation/rideRepository.js";

class RideEnd{
       constructor(rideRepository=new RideRepository) {
      this.rideRepository = rideRepository;
       }


       async execute(rideId,status) {
             if(rideId){
                console.log("ride id come 2");
            const updation =this.rideRepository.updateStatus(rideId,status)
      return updation
             }
             console.log("error found in rideEnd");
             
       }

 async executepaymnet(rideId,status,razorpayPaymentId) {
             if(rideId){
                console.log("ride id co 3");
            const updation =this.rideRepository.updateStatusandpaymentId(rideId,status,razorpayPaymentId)
      return updation
             }
             console.log("error found in rideEnd");
             
       }

       async executefeedback(rideId,comment,rating){
        
         if (!rideId || !rating) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }

    const updation =this.rideRepository.addReview(rideId,comment,rating)
      return updation
       }


}

 export default RideEnd