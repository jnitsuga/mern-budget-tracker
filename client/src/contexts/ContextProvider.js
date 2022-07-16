import React, { createContext, useContext, useState, useEffect } from 'react'
import Axios from 'axios'

const UserContext = createContext();

export const ContextProvider = ({children}) => {
  const [listOfUsers, setListOfUsers] = useState([]);

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
        mobileNo,
        setMobileNo,
        email,
        setEmail,
        password,
        setPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);