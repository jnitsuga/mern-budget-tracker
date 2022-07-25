import React, { createContext, useContext, useState} from 'react'

const UserContext = createContext();

export const ContextProvider = ({children}) => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [transactionsList, setTransactionsList] = useState([]);

  const [ showAddTransactionForm, setShowAddTransactionForm ] = useState(false)
  const [ showUpdateTransactionForm, setShowUpdateTransactionForm ] = useState(false)

  const [inputFirstName, setInputFirstName] = useState('')
  const [inputLastName, setInputLastName] = useState('')
  const [inputUsername, setInputUsername] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [inputPassword2, setInputPassword2] = useState('')
  const [inputEmail, setInputEmail] = useState('')
  const [inputMobileNo, setInputMobileNo] = useState('')

  const [inputCategory, setInputCategory] = useState('Expense')
  const [inputCurrency, setInputCurrency] = useState('PHP')
  const [inputAmount, setInputAmount] = useState('')
  const [inputDescription, setInputDescription] = useState('')

  const [transactionId, setTransactionId] = useState('')

  const userLoggedIn = localStorage.getItem('token')
  
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
        transactionsList,
        setTransactionsList,
        showAddTransactionForm,
        setShowAddTransactionForm,
        inputCategory,
        setInputCategory,
        inputCurrency,
        setInputCurrency,
        inputAmount,
        setInputAmount,
        inputDescription,
        setInputDescription,
        showUpdateTransactionForm,
        setShowUpdateTransactionForm,
        transactionId,
        setTransactionId,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext);