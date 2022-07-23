import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Topbar from './components/Topbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Transactions from './pages/Transactions';
import Admin from './pages/Admin';
import Logout from './pages/Logout';

function App() {
  
  return (
    <div className='App'>
      <BrowserRouter>
        <div className='main header'>

          <ToastContainer />
          <Topbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/me' element={<Account />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/logout' element={<Logout />} />
          </Routes>
            
        </div>
      </BrowserRouter> 
    </div>
  );
}

export default App;
