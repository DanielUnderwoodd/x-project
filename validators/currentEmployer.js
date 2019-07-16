const regValidator = require('validator');
const isEmpty = require('./empty');
module.exports = function validateLogin(data){
var error = {}

data.handler = !isEmpty(data.handler) ? data.handler: '';

console.log(!regValidator.isLength(data.handler),{min: 2,max: 50})

if(!regValidator.isLength(data.handler,{min: 2,max: 50})){
    error.handler = "Handler must between 2 and 50 characer "
}


if(regValidator.isEmpty(data.handler)){
    error.handler = "handler is required"
}






    
return {
    error,
    isValid: isEmpty(error)
}

}