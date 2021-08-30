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
    const response = await authProvider.register({...data});
    if (response.success) {
      history.push('/');
    } else {
      alert(response.message);
    }
  };
  console.log(errors);
  return (
    <div className="outer">
      <div className="inner">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Register</h3>

          <div className="form-group mt-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              {...register('name', {required: true})}
            />
            {errors.name && (
              <p className="text-danger mt-1">This field is required</p>
            )}
          </div>

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
              {...register('password', {required: true, minLength: 6})}
            />
            {errors.password && errors.password.type === 'required' && (
              <p className="text-danger mt-1">This field is required</p>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <p className="text-danger mt-1">
                Password should be atleast 6 characters long
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-dark btn-lg btn-block mt-4"
            disabled={authProvider.isLoading}
          >
            {authProvider.isLoading && <i class="fa fa-spinner fa-spin"></i>}
            <span className="ml-2"> Register </span>
          </button>
          <p className="forgot-password text-right">
            Already registered ?
            <Link className="nav-link" to={'/login'}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
