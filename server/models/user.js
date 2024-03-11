const mongoose =require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


const userSchema=new mongoose.Schema({
    firstname : {type : String, required : true},
    lastname : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    role : {type : String, default : 'utilisateur'},
    age : {type : Number, required : true}
});


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.statics.create = function(signUpUserData) {
    var newUser = new this();
    newUser.email = signUpUserData.email.toLowerCase();
    newUser.firstname = signUpUserData.firstname;
    newUser.lastname = signUpUserData.lastname;
    newUser.role = signUpUserData.role;
    newUser.age = signUpUserData.age;
    newUser.password = newUser.generateHash(signUpUserData.password);

    return newUser.save()
}

module.exports= mongoose.model('User',userSchema);