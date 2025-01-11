class Driver {
    constructor(
        email,
        password,
        name = '',
        Experience = 0,
        Phone = '', 
        Model = '',
        VehicleNumber = '',
        color = '',
        isBlocked = false,
        isAdmin = false,
        Profileimage='',
        Licenceimage='',
        isVerified = false,
        createdAt = new Date(),
        isFullyRegistered = false // New field for registration status
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.Experience = Experience;
        this.Phone = Phone;
        this.Model = Model;
        this.VehicleNumber = VehicleNumber;
        this.color = color;
        this.isBlocked = isBlocked;
        this.isAdmin = isAdmin;
        this.Profileimage=Profileimage;
        this.Licenceimage=Licenceimage;
        this.isVerified = isVerified;
        this.createdAt = createdAt;
        this.isFullyRegistered = isFullyRegistered; // New field
    }
}

export default Driver;
