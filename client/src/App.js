import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

import { useUserContext } from './contexts/ContextProvider';


function App() {
  const { listOfUsers } = useUserContext();

  return (
    <div className='App'>
      <BrowserRouter>
        <div className='main header'>

          <Navbar />

          <div className='usersDisplay flex flex-wrap justify-center gap-2'>
            {listOfUsers.map((user, key) => {
              return (
                <div key={key} className='bg-amber-100 text-center m-4 p-4 text-md drop-shadow-md'>
                  <p>First Name: {user.firstName} </p>
                  <p>Last Name: {user.lastName} </p>
                  <p>Username: {user.username} </p>
                  <p>Password: {user.password} </p>
                  <p>Email: {user.email} </p>
                  <p>Mobile No: {user.mobileNo} </p>
                </div>
              )
            })}
          </div>

          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
            
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
