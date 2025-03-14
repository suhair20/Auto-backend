import UserInterface from "../interfaces/DriverInterface.js";
import DriverModel from "../../infrastructure/database/model/driverModel.js"



class DriverRepository extends UserInterface{
 
    async findByUsername(name){
        console.log("usermodel is hwer");
        return await DriverModel.findOne({name})
    }

    async findByemail(email){
        return await DriverModel.findOne({email})
    }

    async save(userdata){
        try {
            console.log("vanu");
            const user= new DriverModel(userdata)

            return await user.save()
            
        } catch (error) {
            console.log(error.message);
        }
      
    }

    async  updateDriverVerificationStatus(email,isVerified){
        try {
    console.log('nice');
            const Driver= await this.findByemail(email)
            if(Driver){
              Driver.isVerified=isVerified
              return await Driver.save();
            }else{
                throw new Error('Driver not found')
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

    async updateDriverdetials(email,details){
        try {
          console.log("update driver");
            const updatedDriver = await DriverModel.findOneAndUpdate({email}, { $set: details }, { new: true });
            console.log(updatedDriver);
      return updatedDriver;

        } catch (error) {
            console.log(error);
        }
    }

    async updatelocation(driverId,location){
        try {
           
            console.log("Driver ID:", driverId);
            console.log("New Location:", location);
            return await DriverModel.findByIdAndUpdate(driverId,{location},{new:true});
        } catch (error) {
            console.log(error);  
        }
       
    }

    async findById(userId) {
        return await UserModel.findById(userId).select("-password");
    }
}

export default DriverRepository
