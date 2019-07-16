const regValidator = require('validator');
const isEmpty = require('./empty');
module.exports = function validateExperience(data){
var error = {}

data.school = !isEmpty(data.school) ? data.school: '';
data.degree = !isEmpty(data.degree) ? data.degree: '';
data.field = !isEmpty(data.field) ? data.field: '';
data.from = !isEmpty(data.from) ? data.from: '';



if(regValidator.isEmpty(data.school)){
    error.school = "school is required"
}
if(regValidator.isEmpty(data.degree)){
    error.degree = "degree is required"
}

if(regValidator.isEmpty(data.from)){
    error.from = "from is required"
}
if(regValidator.isEmpty(data.field)){
    error.field = "field is required"
}

    
return {
    error,
    isValid: isEmpty(error)
}

}