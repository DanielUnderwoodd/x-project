import axios from 'axios';


const setHeader = token =>{
    if(token){
        //if exist we want to injected to all routes

        axios.defaults.headers.common['Authorization'] = token;
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }
}


export default setHeader;