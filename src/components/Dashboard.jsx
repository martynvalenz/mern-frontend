import React, {useState, useEffect} from 'react'
import axios from "axios";
import {Modal, Button} from 'react-bootstrap';

export const Dashboard = () => {
  const [users, setUsers] = useState([])
  const [userId, setUserId] = useState('')
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    id:'',
    name:'',
    email:'',
    password:''
  })
  
  const baseURL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('token');

  const getUser = () =>{
    const data = localStorage.getItem('userId')
    setUserId(data);
  }
  
  const getUsers = async() => {
    await axios.get(`${baseURL}/api/users`,{
      headers: {
        token
      }
    })
    .then(res => {
      setUsers(res.data.users)
    })
  }

  const selectUser = (user) => {
    setUser(user)
    setShow(true)
  }

  const handleClose = () => setShow(false);

  useEffect(() => {
    getUser();
    getUsers();
  }, []);

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({...user,[name]:value});
  }

  const updateUser = () => {
    axios.put(`${baseURL}/api/users/${user.id}`,{
      name:user.name,
      email:user.email,
      password:user.password,
    },{
      headers: {
        token
      }
    })
    .then(res => {
      window.alert('User saved successfully');
      let newData = users;
      newData.forEach((obj,index) => {
        if(obj.id === user.id){
          users[index] = res.data.user
        }
      })
      setUsers(newData);
      setShow(false)
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

  const delteUser = () => {
    axios.delete(`${baseURL}/api/users/${user.id}`,{
      headers: {
        token
      }
    })
    .then(() => {
      window.alert('User deleted successfully');
      let newData = users;
      newData.forEach((obj,index) => {
        if(obj.id === user.id){
          users.splice(index,1)
        }
      })
      setUsers(newData);
      setShow(false)
    })
    .then(() => {
      localStorage.setItem('token','')
      localStorage.setItem('userId','')
    })
    .then(() => {
      window.location.replace('/');
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

  const logOut = async(event) => {
    event.preventDefault();
    const token = await localStorage.getItem('token');
    axios.get(`${baseURL}/api/signout`,{
      headers: {
        token
      }
    })
    .then(() => {
      localStorage.setItem('token','')
      localStorage.setItem('userId','')
    })
    .then(() => {
      window.alert('Loged out successfully');
      window.location.replace('/');
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
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="buttons d-flex ">
            <button className="btn btn-warning me-4 rounded-pill px-4 py-2" onClick={logOut}>Logout</button>
          </div>
        </div>
      </div>
      <div className="container shadow my-5">
        <div className="row mt-5">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Created</th>
                <th scope="col">Updated</th>
                <th scope="col">Last Login</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user,index) => {
                return(
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.createdAt}</td>
                    <td>{user.updatedAt}</td>
                    <td>{user.lastLogin}</td>
                    <td>
                      {
                        user.id === userId 
                        ? <button className="btn btn-warning btn-sm" onClick={() => selectUser(user)}><i className="fa fa-edit"></i></button>
                        : <button className="btn btn-info btn-sm" onClick={() => selectUser(user)}><i className="fa fa-eye"></i></button>
                      }
                    </td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              id="name"
              className="form-control"
              aria-describedby="emailHelp"
              name="name"
              value={user.name}
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
          {
            user.id === userId
            ? <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                id="password"
                className="form-control"
                type="text"
                name="password"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            :<></>
          }
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {
            user.id === userId 
              ? <>
                <Button variant="danger" onClick={() => delteUser()}>
                  Delete
                </Button>
                <Button variant="primary" onClick={() => updateUser()}>
                  Save Changes
                </Button>
              </>
            : <></>
          }
          
        </Modal.Footer>
      </Modal>
    </div>
  )
}
