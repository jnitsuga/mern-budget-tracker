import React, { useEffect } from 'react'
import Axios from 'axios'
import { AiOutlinePlus } from 'react-icons/ai'
import Navbar from '../components/Navbar'
import SummaryBoard from '../components/SummaryBoard'
import { useUserContext } from '../contexts/ContextProvider'
import AddTransactionForm from '../components/AddTransactionForm'

const Transactions = () => {
  const { transactionsList, setTransactionsList, showAddTransactionForm, setShowAddTransactionForm } = useUserContext();

  useEffect(() => {
    Axios.get('http://localhost:4000/api/transactions/getMyTransactions', {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    .then((response) => {
      console.log(response.data)
      setTransactionsList(response.data)
    })
  }, [setTransactionsList])

  const payload = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  const getMyTransactions = () => {
    Axios.get('http://localhost:4000/api/transactions/getMyTransactions', payload).then((response) => {
      setTransactionsList(response.data)
    })
  }

  const deleteTransaction = (id) => {
    Axios.delete(`http://localhost:4000/api/transactions/${id}`, payload).then(() => {
      getMyTransactions()
    })
  }

  return (
    <>
    <Navbar header='/transactions' headerTw='text-gray-700' subHeader='Transactions' subHeaderTw='text-black' bannerTw='bg-jc-lilypad-02'/>
    <SummaryBoard />
    <div className='m-4'>
      <table className='table-fixed w-full bg-slate-800 drop-shadow-xl'>
        <thead className='bg-slate-600 text-gray-100'>
          <tr>
            <th className='w-1/8 px-4 py-2'>Category</th>
            <th className='w-1/8 px-4 py-2'>Currency</th>
            <th className='w-1/6 px-4 py-2'>Amount</th>
            <th className='w-1/2 px-4 py-2'>Description</th>
            <th className='w-1/8 px-4 py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
        {transactionsList.map((transaction, key) => {
          return (
            <tr key={key} className='text-center text-gray-300'>
              <td className='px-4 py-2'>{transaction.category}</td>
              <td className='px-4 py-2'>{transaction.currency}</td>
              <td className='px-4 py-2'>{transaction.amount}</td>
              <td className='px-4 py-2'>{transaction.description}</td>
              <td className='px-4 py-2 space-x-6'>
                <span className='text-xs'><button>Edit</button></span>
                <span className='text-xs'><button onClick={() => deleteTransaction(transaction._id)}>Delete</button></span>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>

    
    {showAddTransactionForm ? <AddTransactionForm className='drop-shadow-xl' /> : null}
    
    {!showAddTransactionForm ? <button className='text-white bg-slate-600 text-4xl rounded-full hover:bg-green-400 absolute bottom-5 left-5 drop-shadow-xl' onClick={() => setShowAddTransactionForm(!showAddTransactionForm)}><AiOutlinePlus /></button> : null}
    
    </>
  )
}

export default Transactions