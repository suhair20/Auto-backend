

class RideInterface {
    async save(ride) {
      throw new Error("Method 'save' must be implemented.");
    }
  
    async findById(rideId) {
      throw new Error("Method 'findById' must be implemented.");
    }
  
    async findByUserId(userId) {
      throw new Error("Method 'findByUserId' must be implemented.");
    }
  
    async findByDriverId(driverId) {
      throw new Error("Method 'findByDriverId' must be implemented.");
    }
  
    async updateStatus(rideId, status) {
      throw new Error("Method 'updateStatus' must be implemented.");
    }
  
    async addReview(rideId, review, rating) {
      throw new Error("Method 'addReview' must be implemented.");
    }
  }
  
  export default RideInterface;
  