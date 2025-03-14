
import DriverRepository from "../../repository/implementation/DriverRepository.js"

class UpdateDriverLocationUseCase{
  constructor( driverRepository=new DriverRepository()){
   this.driverRepository=driverRepository
  }

  async execute(driverId,latitude,longitude){
    const location ={type:'Point',coordinates:[longitude,latitude   ]};
      
    console.log("Driver Repository Instance:", this.driverRepository);
    console.log("Available Methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(this.driverRepository)));


        console.log('driverId',driverId);
        console.log(longitude);
        console.log(latitude);
        
        
        
      await this.driverRepository.updatelocation(driverId,location)
       
     return {lat :latitude,lng:longitude};
  }
  
}

export default UpdateDriverLocationUseCase;