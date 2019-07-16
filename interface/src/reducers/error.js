 import { GET_ERROR} from '../actions/types'
 const initState = {}

export default (state = initState,action)=>{
switch(action.type){
   case GET_ERROR:
   return action.payload
   
   default: 
   return state;
}


}