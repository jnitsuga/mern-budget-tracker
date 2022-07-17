import React, { createContext, useContext, useState, useEffect } from 'react'
import Axios from 'axios'

const UserContext = createContext();

export const ContextProvider = ({children}) => {
  const [listOfUsers, setListOfUsers] = useState([]);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')

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
        firstName,
        setFirstName,
        lastName,
        setLastName,
        username,
        setUsername,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        email,
        setEmail,
        mobileNo,
        setMobileNo,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);