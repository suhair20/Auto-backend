import CloudinaryServices from "../../infrastructure/services/Cloudinary.js"
import DriverRepository from "../../repository/implementation/DriverRepository.js"

class Verification{
    constructor(cloudinaryServices=new CloudinaryServices(),driverRepository=new DriverRepository()){
      this.cloudinaryServices= cloudinaryServices,
      this.driverRepository=driverRepository
    }

    async execute(name, experience, phone, model, vehicleNumber, color, email, files){
       try {
        console.log('execut');
        const ImageUrl=await this.cloudinaryServices.uploadImages(files)
        console.log(ImageUrl);

        const updatedDetails = {
            name,
            Experience: experience,
            Phone: phone,
            Model: model,
            VehicleNumber: vehicleNumber,
            color,
            Profileimage: ImageUrl[0], 
            Licenceimage: ImageUrl[1],
            isFullyRegistered: true, 
          };

        
        const Updatedetails=this.driverRepository.updateDriverdetials(email,updatedDetails)
          return Updatedetails
       } catch (error) {
        console.log(error);
       }
    

    }
}


export default Verification