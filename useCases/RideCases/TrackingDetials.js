import RideRepository from "../../repository/implementation/RideRepository.js";

class TrackingDetials{
     constructor(rideRepository=new RideRepository) {
      this.rideRepository = rideRepository;
    }


    async execute(rideId){
       

        const Deatials= await this.rideRepository.findByrideId(rideId)
       
        
        return Deatials
        
    }

}

export default TrackingDetials