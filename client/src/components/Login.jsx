import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {authContext} from '../contexts/AuthContext';
import {useHistory} from 'react-router-dom';

const SignUp = () => {
  const history = useHistory();
  const authProvider = useContext(authContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const onSubmit = async (data) => {
    const response = await authProvider.login({...data});
    if (response.success) {
      history.push('/');
    } else {
      alert(response.message);
    }
  };
  return (
    <div className="outer">
      <div className="inner">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Login</h3>

          <div className="form-group mt-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              {...register('email', {
                required: true,
              })}
            />
            {errors.email && (
              <p className="text-danger mt-1">This field is required</p>
            )}
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              {...register('password', {required: true})}
            />
            {errors.password && (
              <p className="text-danger mt-1">This field is required</p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block mt-4"
            disabled={authProvider.isLoading}
          >
            {authProvider.isLoading && (
              <i className="fa fa-spinner fa-spin"></i>
            )}
            <span className="ml-2"> Login </span>
          </button>
          <p className="forgot-password text-right">
            New User ?
            <Link className="nav-link" to={'/register'}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
