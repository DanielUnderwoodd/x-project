const postValidator = require('validator');
const isEmpty = require('./empty');
module.exports = function validatePost(data){
var error = {}

data.text = !isEmpty(data.text) ? data.text: '';
if(!postValidator.isLength(data.text,{ min: 20,max: 250})){
error.text = "post must be between 20 and 250 "
}

if(postValidator.isEmpty(data.text)){
    error.text = "text is required"
}


    
return {
    error,
    isValid: isEmpty(error)
}

}