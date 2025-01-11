class User {
    constructor( name, email, password, isBlocked = false, isAdmin = false, image = null, createdAt = new Date() ,isVerified=false) {
        
        this.name = name;
        this.email = email;
        this.password = password;
        this.isBlocked = isBlocked;
        this.isAdmin = isAdmin;
        this.image = image;
        this.createdAt = createdAt;
        this.isVerified=isVerified

    }
}
export default User