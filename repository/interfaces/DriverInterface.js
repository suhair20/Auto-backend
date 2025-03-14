class DriverInterface{
    async findByUsername(name){
        throw new Error('Mehod not implemented')
 
    }
    async save(user){
        throw new Error('Method not implemented')
    }
    updatelocation(driverId, location) {
        throw new Error("Method 'updatelocation' must be implemented.");
    }
}

export default DriverInterface