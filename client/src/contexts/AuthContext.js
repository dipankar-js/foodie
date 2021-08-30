import React, {createContext, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const authContext = createContext({});

const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get('token') ? true : false,
  );
  const [isLoading, setIsLoading] = useState(false);

  const register = async ({name, email, password}) => {
    setIsLoading(true);
    try {
      const {data} = await axios.post(
        `http://localhost:5000/api/v1/auth/register`,
        {
          name,
          email,
          password,
        },
      );
      setIsLoading(false);
      if (data.success) {
        setIsAuthenticated(true);
        Cookies.set('token', data.token);
        return {
          success: true,
          message: null,
        };
      }
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        message: 'User already exists',
      };
    }
  };

  const login = async ({email, password}) => {
    setIsLoading(true);
    try {
      const {data} = await axios.post(
        `http://localhost:5000/api/v1/auth/login`,
        {
          email,
          password,
        },
      );

      setIsLoading(false);
      if (data.success) {
        setIsAuthenticated(true);
        Cookies.set('token', data.token);
        return {
          success: true,
          message: null,
        };
      }
    } catch (error) {
      setIsLoading(false);
      return {
        success: false,
        message: 'Invalid Credentials',
      };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    Cookies.remove('token');
    setIsLoading(false);
    setIsAuthenticated(false);
  };

  return (
    <authContext.Provider
      value={{isAuthenticated, register, login, logout, isLoading}}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
