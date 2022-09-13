import React, { Component, Fragment } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base_url: this.props.base_url,
      api_url: this.props.api_url,
      header: this.loggedIn()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({header: this.loggedIn()});
    }
  }

  loggedIn = () => {
    if (localStorage.getItem('credentials')) {
      return (
        <Fragment>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <!-- Left Side Of Navbar --> */}
            <ul className="navbar-nav me-auto"></ul>

            {/* <!-- Right Side Of Navbar --> */}
            <ul className="navbar-nav ms-auto">
              {/* <!-- Authentication Links --> */}
              <li className="nav-item dropdown">
                <a
                  id="navbarDropdown"
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  v-pre="true"
                >
                  John Doe
                </a>

                <div
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <a
                    className="dropdown-item"
                    href="logout"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.clear();
                      this.props.history.push('/');
                    }}
                  >
                    Logout
                  </a>

                  <form
                    id="logout-form"
                    action="logout"
                    method="POST"
                    className="d-none"
                  ></form>
                </div>
              </li>
            </ul>
          </div>
        </Fragment>)
    }

    return null;
  }
  
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/">Shapes</a>
          {this.state.header}
        </div>
      </nav>
    );
  }
}

export default Header;
