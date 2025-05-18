



class Ride {
  constructor({
    userId,
    driverId,
    pickup,
    drop,
    fare,
    advancePaid = 0,
    razorpayPaymentId = null,
    status = 'pending',
    createdAt = new Date(),
    review = null,
    rating = null,
  }) {
    this.userId = userId;
    this.driverId = driverId;
    this.pickup = pickup;
    this.drop = drop;
    this.fare = fare;
    this.advancePaid = advancePaid;
    this.razorpayPaymentId = razorpayPaymentId;
    this.status = status;
    this.createdAt = createdAt;
    this.review = review;
    this.rating = rating;
  }



  confirmPayment(paymentId) {
    this.razorpayPaymentId = paymentId;
    this.status = 'confirmed';
  }

  completeRide() {
    this.status = 'completed';
  }

  cancelRide() {
    this.status = 'cancelled';
  }

  addReview(review, rating) {
    this.review = review;
    this.rating = rating;
}
}

export default Ride