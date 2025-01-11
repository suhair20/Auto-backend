import UserInterface from "../interfaces/UserInterface.js";
import UserModel from "../../infrastructure/database/model/userModel.js"


class userRepository extends UserInterface{
 
    async findByUsername(name){
        
        return await UserModel.findOne({name})
    }

    async findByemail(email){
        return await UserModel.findOne({email})
    }

    async save(userdata){
        try {
           
            const user= new UserModel(userdata)

            return await user.save()
            
        } catch (error) {
            console.log(error.message);
        }
      
    }

    async  updateUserVerificationStatus(email,isVerified){
        try {
    console.log('nice');
            const user= await this.findByemail(email)
            if(user){
              user.isVerified=isVerified
              return await user.save();
            }else{
                throw new Error('User not found')
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default userRepository

