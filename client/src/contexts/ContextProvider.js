import React, { createContext, useContext, useState} from 'react'
// import Axios from 'axios'

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

  // const [user, setUser] = useState(null)
  
  // useEffect(() => {
  //   const payload = {
  //     headers: {
  //       'Authorization': `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }

  //   Axios.get('http://localhost:4000/api/users/me', payload).then((response) => {
  //     setUser(response.data)
  //   })
  // }, [setUser])

  const userLoggedIn = localStorage.getItem('token')

  const logoutUser = () => {
    localStorage.clear()
    window.location='/'
  }
  
  
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
        userLoggedIn,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);