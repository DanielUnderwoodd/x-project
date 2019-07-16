import React, { Component } from 'react'
import {Link} from 'react-router-dom'
class Land extends Component {
    render() {
        return (
            <div className="landing">
              <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12 text-center">
                        <h1 className="display-3 mb-4">Apply for jobs for free / Hire poeple
                        </h1>
                        <p className="lead"> Create a employer/employee profile/portfolio, share posts</p>
                        <hr />
                        <Link to="/register/employee" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                        <Link to="/login/employer" className="btn btn-lg btn-light">Login</Link>
                    </div>
                    </div>
                </div>
            </div>
  </div>
        )
    }
}
export default Land;

