import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {authContext} from '../contexts/AuthContext';
import {useHistory} from 'react-router-dom';

function NavBar() {
  const history = useHistory();
  const {isAuthenticated, logout} = useContext(authContext);

  const handleLogout = async () => {
    await logout();
    history.push('/login');
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>
            {isAuthenticated && <span>Hi, </span>} Foodie
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/login'}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={'/register'}>
                      Sign up
                    </Link>
                  </li>
                </>
              )}
              {isAuthenticated && (
                <li className="nav-item ml-5">
                  <button
                    onClick={handleLogout}
                    className="btn btn-danger btn-md"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
