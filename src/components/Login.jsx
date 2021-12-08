import React, {useState}  from 'react'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from "axios";

export const Login = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    email:'',
    password:''
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({...user,[name]:value});
  }

  const baseURL = process.env.REACT_APP_BASE_URL;

  const signIn = async(event) => {
    event.preventDefault();

    axios.post(`${baseURL}/api/signin`, user)
    .then(res => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userId', res.data.user.id)
      window.alert('Loged in successfully');
    })
    .then(() => {
      window.location.replace('/dashboard');
      // history.push('/dashboard')
    })
    .catch(error => {
      console.log(error);
      if(error.response){
        if(error.response.status === 400){
          window.alert(error.response.data.msg);
        }
        else{
          window.alert('An error occured, please contact server admin');
        }
      }
      else{
        window.alert('An error occured, please contact server admin');
      }
    })
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-lg-9">
          <div className="container shadow my-5">
            <div className="row justify-content-center">
              <div className="col-md-6 d-flex flex-column align-items-center form text-white justify-content-center">
                <h1 className="display-4 fw-bolder">Welcome Back</h1>
                <p className="lead text-center">Enter Your Credentials to Login</p>
                <h5 className="mb-4">Or</h5>
                <NavLink to="/register" className="btn btn-outline-light rounded-pill pb-2 w-50">Register</NavLink>
              </div>
              <div className="col-md-6 p-5">
                <h1 className="display-6 fw-bolder mb-5 text-center">Sign In</h1>
                <form onSubmit={signIn} method="POST">
                  <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                      id="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      type="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      id="password"
                      className="form-control"
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="remember"/>
                    <label className="form-check-label">Remember me</label>
                  </div>
                  <button type="submit" className="btn btn-outline-primary w-100 mt-4">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
