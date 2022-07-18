import React, { createContext, useContext, useState, useEffect } from 'react'
import Axios from 'axios'

const UserContext = createContext();

export const ContextProvider = ({children}) => {
  const [listOfUsers, setListOfUsers] = useState([]);

  const [inputFirstName, setInputFirstName] = useState('')
  const [inputLastName, setInputLastName] = useState('')
  const [inputUsername, setInputUsername] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [inputPassword2, setInputPassword2] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputMobileNo, setInputMobileNo] = useState('')

  const [loggedIn, setLoggedIn] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:4000/api/users/getUsers').then((response) => {
      setListOfUsers(response.data)
    })
  }, [listOfUsers])
  
  return (
    <UserContext.Provider
      value={{
        listOfUsers,
        setListOfUsers,
        inputFirstName,
        setInputFirstName,
        inputLastName,
        setInputLastName,
        inputUsername,
        setInputUsername,
        inputPassword,
        setInputPassword,
        inputPassword2,
        setInputPassword2,
        inputEmail,
        setInputEmail,
        inputMobileNo,
        setInputMobileNo,
        loggedIn,
        setLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);