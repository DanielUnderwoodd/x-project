import React, { Component } from 'react'
import {BrowserRouter as Router, Route}  from 'react-router-dom'
import {Link} from 'react-router-dom'
import {setCurrentEmployee}from '../../actions/authemployeeaction'
import propTypes from 'prop-types'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {loginEmployee} from '../../actions/authemployeeaction'
import jwt_decoder from 'jwt-decode';
import setAuthToken from '../../header/setHeader'
class EmployeeLogin extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            error: {}
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount(){
        if(this.props.authEmployee.isValid){
             this.props.history.push('/dashboard/employee')
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const employee =  {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginEmployee(employee)
    }

    componentWillReceiveProps(nextProps){
          if(nextProps.authEmployee.isValid){
              this.props.history.push('/dashboard/employee')
          }
        if(nextProps.error){
            this.setState({
                error: nextProps.error
            })
        }
      
    }
    render() {
        const {error} = this.state
        return (
 <div className="login">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your Employee account</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="email" className={classnames("form-control form-control-lg" ,{'is-invalid': error.email})}placeholder="Email Address" name="email" 
                value={this.state.email} 
                onChange={this.onChange}
              />
                       {error.email && (<div className="invalid-feedback">{error.email}</div>)}
            </div>
            <div className="form-group">
              <input type="password" className={classnames("form-control form-control-lg" ,{'is-invalid': error.password})} placeholder="Password" name="password"
                value={this.state.password} 
                onChange={this.onChange} />
                         {error.password && (<div className="invalid-feedback">{error.password}</div>)}
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
          <h4>wanna hire??</h4>
                  <div className="col-md-4 center-block">
                    <Link to="/login/employer" className="btn center-block  btn-secondary mt-4">Login as Employer</Link>
                  </div>
        
                  <div className="col-md-4 center-block">
                    <Link to="/register/employer" className="btn center-block  btn-danger mt-4">Sign Up as Employer</Link>
                  </div>
        </div>
      </div>
    </div>
  </div>
            
        )
    }
}
EmployeeLogin.propTypes ={
    loginEmployee: propTypes.func.isRequired,
    authEmployee: propTypes.object.isRequired,
    error: propTypes.object.isRequired
}


const mapStateToProps = (state)=>({
    authEmployee: state.authEmployee,
    error: state.error
})
export default connect(mapStateToProps,{loginEmployee})(EmployeeLogin);