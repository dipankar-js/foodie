import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {authContext} from '../contexts/AuthContext';

const PrivateRoute = ({component: Component, ...rest}) => {
  const {isAuthenticated} = useContext(authContext);
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
  /*  we are spreading routeProps to be able to access this routeProps in the component. */
};

export default PrivateRoute;
