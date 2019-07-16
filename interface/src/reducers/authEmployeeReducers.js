 import {SET_CURRENT_EMPLOYEE} from '../actions/types'
 import isEmpty from '../../src/validation/isEmpty'
 const initState = {
     isValid : false,
     employee : {}
 }

 export default (state = initState,action)=>{
switch(action.type){
     case SET_CURRENT_EMPLOYEE:
         return {
             ...state,
             isValid: !isEmpty(action.payload),
             employee: action.payload
         }
    default: 
    return state;
}


 }