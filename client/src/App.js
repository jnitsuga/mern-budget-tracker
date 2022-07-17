import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';

import { useUserContext } from './contexts/ContextProvider';


function App() {
  const { listOfUsers } = useUserContext();

  return (
    <div className='App'>
      <BrowserRouter>
        <div className='main header'>

          <ToastContainer />
          <Navbar />

          <div className='usersDisplay flex flex-wrap justify-center gap-2'>
            {listOfUsers.map((user, key) => {
              return (
                <div key={key} className='bg-amber-100 text-center m-4 p-4 text-md drop-shadow-md'>
                  <p>First Name: {user.firstName} </p>
                  <p>Last Name: {user.lastName} </p>
                  <p>Username: {user.username} </p>
                  {/* <p>Password: {user.password} </p> */}
                  {user.email !== '' ? <p>Email: {user.email} </p> : null }
                  {user.mobileNo !== '' ? <p>Mobile No: {user.mobileNo} </p> : null }
                </div>
              )
            })}
          </div>

          <Routes>
            <Route path='/' element={<></>} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
            
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
