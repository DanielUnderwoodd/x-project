import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutEmployee} from '../../actions/authemployeeaction'
import { userInfo } from 'os';
class Navbar extends Component {


    onLogoutClick(e){
         e.preventDefault();
         this.props.logoutEmployee();
    }
    render() {
        const {isValid,employee} = this.props.authEmployee

        const employeeLink =(  <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        <a href="#" onClick={this.onLogoutClick.bind(this)}>
            <img
             className="rounded-circle"
             src={employee.avatar} alt={employee.name } style={{width: "25px",marginRight: '5px'}} title="you must have a avatar"/>
            Logout
        </a>
        </li>
        </ul>)

        const guestLink =( <ul className="navbar-nav ml-auto">
        <li className="nav-item">
            <Link className="nav-link" to="/register/employee">Sign Up</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/login/employee">Login</Link>
        </li>
        </ul>)
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                <Link className="navbar-brand" to="/">X-project</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/all/employees"> Employees
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/all/employers"> Employers
                        </Link>
                    </li>
                    </ul>
                    {isValid ? employeeLink : guestLink}
                </div>
                </div>
  </nav>
        )
    }
}

Navbar.propTypes ={
    logoutEmployee: propTypes.func.isRequired,
    authEmployee: propTypes.object.isRequired

}
const mapStateToProps = (state)=>({
    authEmployee: state.authEmployee

})
export default connect(mapStateToProps,{logoutEmployee})(Navbar);