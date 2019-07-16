import {GET_ERROR} from './types'
import axios from 'axios';
import setAuthToken from '../../src/header/setHeader'
import jwt_decoder from 'jwt-decode'
import {SET_CURRENT_EMPLOYEE} from '../../src/actions/types'

export const registerEmployee = (employee,history)=> dispatch=>{
        axios
         .post('/api/employee/register',employee).then(res => history.push('/login/employee'))
         .catch(err => 
            dispatch({
                type: GET_ERROR,
                payload: err.response.data
            })
            )
}


export const loginEmployee = (employee) => dispatch =>{
    axios.post('/api/employee/login',employee)
    .then(res =>{
      // save token that has been generated
      const {token} = res.data

      localStorage.setItem('jwtToken',token)

      //send it to the header
      setAuthToken(token);

      const decodedEmployee = jwt_decoder(token)
      dispatch(setCurrentEmployee(decodedEmployee))
    })
    .catch(err =>  dispatch({
        type: GET_ERROR,
        payload: err.response.data
    }))
}

export const setCurrentEmployee = (decodedEmployee) =>{
    return {
        type: SET_CURRENT_EMPLOYEE,
        payload: decodedEmployee
    }
}

export const logoutEmployee = ()=> dispath=>{
    //

    localStorage.removeItem('jwtToken')


    setAuthToken(false)
      dispath(setCurrentEmployee({}))

}