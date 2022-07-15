import { useState, useEffect } from 'react'
import Axios from 'axios'

import Navbar from './components/Navbar';

import './App.css';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:4000/getUsers').then((response) => {
      setListOfUsers(response.data)
    })

  }, [])
  

  return (
    <div className="App">
      <Navbar />
      
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h2>First Name: {user.firstName} </h2>
              <h2>Last Name: {user.lastName} </h2>
              <h2>Mobile No: {user.mobileNo} </h2>
              <h2>Email: {user.email} </h2>
              <h2>Password: {user.password} </h2>
            </div>
          )
        })}

      </div>
    </div>
  );
}

export default App;
