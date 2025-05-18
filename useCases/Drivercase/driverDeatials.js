
import DriverRepository from "../../repository/implementation/DriverRepository.js";

class driverDeatials {
    constructor(driverRepository=new DriverRepository()) {
        this.driverRepository=driverRepository
    }

    async execute(driverId){
       
        
        const driver= await this.driverRepository.findById(driverId)
       
        
        return driver
    }
      
}

export default driverDeatials