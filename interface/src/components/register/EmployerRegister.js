import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import classnames from 'classnames'
class EmployerRegister extends Component {
    
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

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const employer =  {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        axios
        .post('/api/employer/register',employer).then(res => console.log(res.data)
        ).catch(err => this.setState({error: err.response.data}))
    }
    render() {
        const {error} = this.state
        
        return (
            <div className="register">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Sign Up</h1>
                  <p className="lead text-center">Create your Employer account</p>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <input type="text" className={classnames("form-control form-control-lg" ,{'is-invalid': error.name})} placeholder="Name" name="name" onChange={this.onChange} />
                      {error.name && (<div className="invalid-feedback">{error.name}</div>)}
                    </div>
                    <div className="form-group">
                      <input type="email"  className={classnames("form-control form-control-lg" ,{'is-invalid': error.email})} placeholder="Email Address" name="email" onChange={this.onChange} />
                      {error.name && (<div className="invalid-feedback">{error.email}</div>)}
                      <small className="form-text text-muted">use a Gravatar email</small>
                    </div>
                    <div className="form-group">
                      <input type="password"  className={classnames("form-control form-control-lg" ,{'is-invalid': error.password})} placeholder="Password" name="password" onChange={this.onChange}/>
                      {error.name && (<div className="invalid-feedback">{error.password}</div>)}
                    </div>
                    <div className="form-group">
                      <input type="password"  className={classnames("form-control form-control-lg" ,{'is-invalid': error.password2})} placeholder="Confirm Password" name="password2" onChange={this.onChange} />
                      {error.name && (<div className="invalid-feedback">{error.password2}</div>)}
                    </div>
                    <input type="submit" className="btn btn-info btn-block mt-4" />
                  </form>
                  <h4>wanna hire??</h4>
                  <div className="col-md-4 center-block">
                    <Link to="/login/employee" className="btn center-block  btn-secondary mt-4">Login as Employee</Link>
                  </div>
        
                  <div className="col-md-4 center-block">
                    <Link to="/register/employee" className="btn center-block  btn-danger mt-4">Sign Up as Employee</Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )
    }
}
export default EmployerRegister;