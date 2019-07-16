const regValidator = require('validator');
const isEmpty = require('./empty');
module.exports = function validateExperience(data){
var error = {}

data.title = !isEmpty(data.title) ? data.title: '';
data.company = !isEmpty(data.company) ? data.company: '';
data.from = !isEmpty(data.from) ? data.from: '';



if(regValidator.isEmpty(data.title)){
    error.title = "title is required"
}
if(regValidator.isEmpty(data.company)){
    error.company = "company is required"
}

if(regValidator.isEmpty(data.from)){
    error.from = "from is required"
}

    
return {
    error,
    isValid: isEmpty(error)
}

}