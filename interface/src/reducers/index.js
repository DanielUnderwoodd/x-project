import { combineReducers}  from 'redux'
import authEmployeeReducers from './authEmployeeReducers'
import error from './error'
export default combineReducers({
    authEmployee: authEmployeeReducers,
    error: error
})