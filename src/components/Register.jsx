import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from "axios";

export const Register = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    username:'',
    email:'',
    password:''
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({...user,[name]:value});
  }

  const baseURL = process.env.REACT_APP_BASE_URL;

  const signUp = async(event) => {
    event.preventDefault();

    axios.post(`${baseURL}/api/signup`, user)
    .then(() => {
      window.alert('Registered successfully');
      history.push('/login')
    })
    .catch(error => {
      console.log(error);
      if(error.response){
        if(error.response.status === 400){
          window.alert(error.response.data.msg);
        }
        // else if(error.response.status === 404){
        //   msg = error.response.data.msg;
        // }
        // else if(error.response.status === 401){
        //   msg = error.response.data.msg;
        // }
        // else if(error.response.status === 429){
        //   msg = 'Demasiados intentos fallidos, vuelva a intentar mas tarde.'
        // }
        // else if(error.response.status === 500){
        //   msg = error.response.data.msg;
        // }
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
            <div className="row">
              <div className="col-md-6 d-flex flex-column align-items-center form text-white justify-content-center">
                <h1 className="display-4 fw-bolder">Hello</h1>
                <p className="lead text-center">Enter Your Details to Register</p>
                <h5 className="mb-4">Or</h5>
                <NavLink to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50">Login</NavLink>
              </div>
              <div className="col-md-6 p-5">
                <h1 className="display-6 fw-bolder mb-5 text-center">Create an account</h1>
                <form onSubmit={signUp} method="POST">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      id="username"
                      className="form-control"
                      aria-describedby="emailHelp"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      type="text"
                      required
                    />
                  </div>
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
                  <button type="submit" className="btn btn-outline-primary w-100 mt-4">
                    Register  
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
