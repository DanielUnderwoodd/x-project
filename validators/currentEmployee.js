const regValidator = require('validator');
const isEmpty = require('./empty');
module.exports = function validateLogin(data){
var error = {}

data.handler = !isEmpty(data.handler) ? data.handler: '';
data.status = !isEmpty(data.status) ? data.status: '';
data.skills = !isEmpty(data.skills) ? data.skills: '';


console.log(!regValidator.isLength(data.handler),{min: 2,max: 50})

if(!regValidator.isLength(data.handler,{min: 2,max: 50})){
    error.handler = "Handler must between 2 and 50 characer "
}


if(regValidator.isEmpty(data.handler)){
    error.handler = "handler is required"
}
if(regValidator.isEmpty(data.status)){
    error.status = "status is required"
}

if(regValidator.isEmpty(data.skills)){
    error.skills = "skills is required"
}

if(!isEmpty(data.website)){
    if(!regValidator.isURL(data.website)){
        error.website = "not a valid url"
    }
}

if(!isEmpty(data.instgram)){
    if(!regValidator.isURL(data.instgram)){
        error.instgram = "not a valid url"
    }
}
if(!isEmpty(data.twitter)){
    if(!regValidator.isURL(data.twitter)){
        error.twitter = "not a valid url"
    }
}
if(!isEmpty(data.linkedin)){
    if(!regValidator.isURL(data.linkedin)){
        error.linkedin = "not a valid url"
    }
}






    
return {
    error,
    isValid: isEmpty(error)
}

}