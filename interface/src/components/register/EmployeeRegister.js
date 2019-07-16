import React, { Component } from 'react';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import classnames from 'classnames'
import {connect} from 'react-redux'
import {registerEmployee} from '../../actions/authemployeeaction'

class EmployeeRegister extends Component {
   
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2:'',
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

    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            this.setState( {
                error: nextProps.error
            })
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const employee =  {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerEmployee(employee,this.props.history)
    
    }
    render() {
        const {error} = this.state
        return (
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your Employee account</p>
                  <form  noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input type="text" className={classnames("form-control form-control-lg" ,{'is-invalid': error.name})}placeholder="Name" name="name" 
                      value={this.state.name} 
                      onChange={this.onChange}
                      />
                      {error.name && (<div className="invalid-feedback">{error.name}</div>)}
                    </div>
                    <div className="form-group">
                      <input type="email" className={classnames("form-control form-control-lg" ,{'is-invalid': error.email})}placeholder="Email Address" name="email"
                      value={this.state.email}
                      onChange={this.onChange} />
                       {error.email && (<div className="invalid-feedback">{error.email}</div>)}
                      <small className="form-text text-muted"> use a Gravatar email</small>
                    </div>
                    <div className="form-group">
                      <input type="password" className={classnames("form-control form-control-lg" ,{'is-invalid': error.password})} placeholder="Password" 
                      name="password" 
                      value = {this.state.password}
                      onChange={this.onChange}
                      />
                       {error.password && (<div className="invalid-feedback">{error.password}</div>)}
                    </div>
                    <div className="form-group">
                      <input type="password" className={classnames("form-control form-control-lg" ,{'is-invalid': error.password2})} placeholder="Confirm Password" name="password2"
                      value={this.state.password2}
                      onChange={this.onChange} />
                       {error.password2 && (<div className="invalid-feedback">{error.password2}</div>)}
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

const mapStateToProps = (state)=> ({
    authEmployee: state.authEmployee,
    error: state.error
})

EmployeeRegister.propTypes ={
    registerEmployee: propTypes.func.isRequired,
    authEmployee: propTypes.object.isRequired,
    error : propTypes.object.isRequired
}


export default connect(mapStateToProps,{registerEmployee})(withRouter(EmployeeRegister));