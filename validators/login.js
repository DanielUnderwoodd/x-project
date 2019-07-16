const regValidator = require('validator');
const isEmpty = require('./empty');
module.exports = function validateLogin(data){
var error = {}

data.email = !isEmpty(data.email) ? data.email: '';
data.password = !isEmpty(data.password) ? data.password: '';




if(regValidator.isEmpty(data.email)){
    error.email = "Email is required"
}


if(!regValidator.isEmail(data.email)){
    error.email = "email is not valid"
}

if(regValidator.isEmpty(data.password)){
    error.password = "password is required"
}






    
return {
    error,
    isValid: isEmpty(error)
}

}