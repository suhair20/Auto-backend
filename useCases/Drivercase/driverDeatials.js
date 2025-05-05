
import DriverRepository from "../../repository/implementation/DriverRepository.js";

class driverDeatials {
    constructor(driverRepository=new DriverRepository()) {
        this.driverRepository=driverRepository
    }

    async execute(driverId){
        console.log('helo');
        
        const driver= await this.driverRepository.findById(driverId)
        console.log('name',driver);
        
        return driver
    }
      
}

export default driverDeatials