const regValidator = require('validator');
const isEmpty = require('./empty');
module.exports = function validateRegister(data){
var error = {}


data.name = !isEmpty(data.name) ? data.name: '';
data.email = !isEmpty(data.email) ? data.email: '';
data.password = !isEmpty(data.password) ? data.password: '';
data.password2 = !isEmpty(data.password2) ? data.password2: '';

if(!regValidator.isLength(data.name, {min: 2,max: 23})){
    error.name = "Name must be between 2 and 23 character"
}

if(regValidator.isEmpty(data.name)){
    error.name = "Name is required"
}

if(regValidator.isEmpty(data.email)){
    error.email = "Email is required"
}


if(!regValidator.isEmail(data.email)){
    error.email = "email is not valid"
}

if(regValidator.isEmpty(data.password)){
    error.password = "password is required"
}

if(!regValidator.isLength(data.password,{min: 6,max: 20})){
    error.password = "password must between 6 and 20 characters"
}

if(!regValidator.equals(data.password,data.password2)){
    error.password2 = "passwords its not match"
}






    
return {
    error,
    isValid: isEmpty(error)
}

}