import React, { createContext, useContext, useState, useEffect } from 'react'
import Axios from 'axios'

const UserContext = createContext();

export const ContextProvider = ({children}) => {
  const [listOfUsers, setListOfUsers] = useState([]);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNo, setMobileNo] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:4000/getUsers').then((response) => {
      setListOfUsers(response.data)
    })
  }, [])
  
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