import RideRepository from "../../repository/implementation/RideRepository.js"

class RideDeatials{
    constructor(rideRepository=new RideRepository()){
        this.rideRepository=rideRepository;
    }

    async execute(driverId){

        if(driverId){
            console.log('2driver');
            
            const driver= await this.rideRepository.findByDriverId(driverId)
       
        
        return driver
        }
      
    }
}
export default RideDeatials