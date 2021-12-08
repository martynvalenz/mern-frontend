import './App.css';
import {useState, useEffect} from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import {Route, Switch} from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoutes } from './ProtectedRoutes';
import axios from 'axios';

function App() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');
  
  const [authenticated, setAuthenticated] = useState(false);
  const [auth, setAuth] = useState(false);
  
  const isLoggedIn = async() => {
    await axios.get(`${baseURL}/api/refresh-token`,{
      headers: {
        token
      }
    })
    .then(res => {
      localStorage.setItem('token',res.data.token)
      setAuth(false)
      setAuthenticated(true)
    })
    .catch(() => {
      setAuth(true)
      setAuthenticated(false)
    })
  }

  useEffect(() => {
    isLoggedIn();
  },[]);

  return (
    <>
      <Navbar auth={auth}/>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoutes exact path="/login" component={Login} auth={auth} />
        <ProtectedRoutes exact path="/register" component={Register} auth={auth} />
        <ProtectedRoutes exact path="/dashboard" component={Dashboard} auth={authenticated} />
      </Switch>
    </>
  );
}

export default App;
