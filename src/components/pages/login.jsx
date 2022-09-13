import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

class Login extends Component {
  login = (e) => {
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (email === 'johndoe@gmail.com' && password === 'johndoe') {
        localStorage.setItem('credentials', 'John Doe, johndoe@gmail.com');
        this.props.history.push('/home');
    } else {
        alert('Wrong email or password');
    }
  }

  render() {
    return (
      <Fragment>
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body mt-3">
                        <h3 className="mb-3" align="center">Login</h3>
                        <form method="POST" onSubmit={this.login}>
                            <div className="row mb-3">
                                <label htmlFor="email" className="col-md-4 col-form-label text-md-end">Email Address</label>

                                <div className="col-md-6">
                                    <input id="email" type="email" className="form-control" name="email" required autoComplete="email" autoFocus />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="password" className="col-md-4 col-form-label text-md-end">Password</label>

                                <div className="col-md-6">
                                    <input id="password" type="password" className="form-control" name="password" required autoComplete="current-password" />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6 offset-md-4">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" name="remember" id="remember" />

                                        <label className="form-check-label" htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                    <a className="btn btn-link" href="/" onClick={(e) => e.preventDefault()}>
                                        Forgot Your Password?
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  base_url: state.globals.base_url,
  api_url: state.globals.api_url,
});

export default connect(mapStateToProps)(Login);