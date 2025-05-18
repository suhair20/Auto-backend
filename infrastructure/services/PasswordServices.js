import bcrypt from 'bcrypt'


class passwordServices{
    constructor(saltRounds=10){
     this.saltRounds=saltRounds
    }

    async hashaPassword(Password){
       try {
        console.log(Password);
        const hashaPassword= await bcrypt.hash(Password,this.saltRounds)
        console.log(hashaPassword)
        return hashaPassword
       } catch (error) {
        console.log(error);
        throw new Error('Error hashed password')
       }
    }

    async comparePassword(password,oldpass){
        try {
            
            const isPasswordValid = await bcrypt.compare(password, oldpass);
            return isPasswordValid
        } catch (error) {
            console.log(error);
            throw new Error('bcrypt error')
        }
    }
}


export default passwordServices

