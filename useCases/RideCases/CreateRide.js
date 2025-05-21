import RideRepository from "../../repository/implementation/RideRepository.js";

class CreateRide {
    constructor(rideRepository=new RideRepository) {
      this.rideRepository = rideRepository;
    }
  
    async execute(rideData,razorpayPaymentId) {
        

        const rideDetails={
            userId:rideData.userId,
            driverId:rideData.driverId,
            pickup:rideData.origin.name,
            pickupLat:rideData.origin.coordinates[1],
            pickupLng: rideData.origin.coordinates[0],
            drop: rideData.destination.name,
           dropLat: rideData.destination.coordinates[1],
           dropLng: rideData.destination.coordinates[0],
            fare:rideData.fare,
            advancePaid:rideData.advancePayment,
            advancePaymentId:razorpayPaymentId,
            status:'confirmed',
             rideId:rideData.rideId
        }
        
      const updation =this.rideRepository.save(rideDetails)
      return updation
    }
  }
  
  export default CreateRide;