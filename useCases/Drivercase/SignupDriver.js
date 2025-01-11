
import passwordServices from "../../infrastructure/services/PasswordServices.js"
import Driver from '../../entities/DriverEentities.js'
import DriverRepository from "../../repository/implementation/DriverRepository.js"

class SignupDriver{
    constructor(PasswordServices=new passwordServices(),driverRepository=new DriverRepository()){
        this.PasswordServices=PasswordServices
        this.driverRepository=driverRepository
    }
    async execute(password,email){
      console.log('email',email);
              const existingUser=await this.driverRepository.findByemail(email)
        if(existingUser){
            throw new Error('User already exists')
        }
        const hashPassword=await this.PasswordServices.hashaPassword(password)
        const driver =new Driver(email,hashPassword)
        console.log(driver);
        await this.driverRepository.save(driver)
        return driver
    }
}

export default SignupDriver