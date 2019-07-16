import React from 'react';
import {BrowserRouter as Router, Route}  from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import setAuthToken from './header/setHeader'
import jwt_decoder from 'jwt-decode'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Land from './components/layout/Land'
import EmployeeLogin from './components/login/EmployeeLogin';
import EmployeeRegister from './components/register/EmployeeRegister';
import EmployerLogin from './components/login/EmployerLogin';
import EmployerRegister from './components/register/EmployerRegister';
import './App.css';
import { setCurrentEmployee } from './actions/authemployeeaction';
import {logoutEmployee} from './actions/authemployeeaction'

//
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)

  const decoded = jwt_decoder(localStorage.jwtToken)

  store.dispatch(setCurrentEmployee(decoded))


  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    store.dispatch(logoutEmployee)

    window.location.href = '/login/employee'
  }
}


function App() {
  return (
    <Provider store={ store }>
     <Router>
      <div className="App">
            <Navbar/>
            <Route  exact path="/" component={Land}></Route>
              <div className="container">
                 <Route exact path="/register/employee" component={EmployeeRegister}/>
                 <Route exact path="/register/employer" component={EmployerRegister}/>
                 <Route exact path="/login/employee" component={EmployeeLogin}/>
                 <Route exact path="/login/employer" component={EmployerLogin}/>
              </div>
            <Footer/>
      </div>
     </Router>
    </Provider>
   
  );
}

export default App;
