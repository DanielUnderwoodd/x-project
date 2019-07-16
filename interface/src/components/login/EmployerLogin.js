import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class EmployerLogin extends Component {
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

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e){
        e.preventDefault();

        const employer =  {
            email: this.state.email,
            password: this.state.password,
        }
        console.log(employer)
    }
    render() {
        return (
            <div className="login">
                <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Log In</h1>
                    <p className="lead text-center">Sign in to your Employer account</p>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                        <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" 
                            value={this.state.email} 
                            onChange={this.onChange}
                        />
                        </div>
                        <div className="form-group">
                        <input type="password" className="form-control form-control-lg" placeholder="Password" name="password"
                            value={this.state.password} 
                            onChange={this.onChange} />
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
export default EmployerLogin;