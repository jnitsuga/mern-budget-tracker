import React, { useEffect } from 'react'
import Axios from 'axios'
import { GrClose } from 'react-icons/gr'
import { AiOutlinePlus } from 'react-icons/ai'
import Navbar from '../components/Navbar'
import SummaryBoard from '../components/SummaryBoard'
import { useUserContext } from '../contexts/ContextProvider'

const Transactions = () => {
  const { 
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
  } = useUserContext();

  useEffect(() => {
    Axios.get('http://localhost:4000/api/transactions/getMyTransactions', 
    {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
    .then((response) => {
      setTransactionsList(response.data)
    })
    .catch((error) => {
      console.error(`ERROR! ${error}`)
    })
  }, [setTransactionsList])

  const payload = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  // const getMyTransactions = () => {
  //   Axios.get('http://localhost:4000/api/transactions/getMyTransactions', payload)
  //   .then((response) => {
  //     setTransactionsList(response.data)
  //   })
  //   .catch((error) => {
  //     console.error(`ERROR! ${error}`)
  //   })
  // }

  const createTransaction = (e) => {
    e.preventDefault()

    Axios.post('http://localhost:4000/api/transactions/createTransaction', {
      category: inputCategory,
      currency: inputCurrency,
      amount: inputAmount,
      description: inputDescription,
    }, payload)
    .then((res) => {
      setTransactionsList(res.data)
    })
    .catch((error) => {
      console.error(`ERROR! ${error}`)
    })
  }

  const deleteTransaction = (id) => {
    Axios.delete(`http://localhost:4000/api/transactions/${id}`, payload)
    .then((response) => {
      setTransactionsList(response.data)
    })
  }

  return (
    <>
    <Navbar header='/transactions' headerTw='text-gray-700' subHeader='Transactions' subHeaderTw='text-black' bannerTw='bg-jc-lilypad-02'/>
    <SummaryBoard props={transactionsList}/>
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
              <td className='px-4 py-2'>{transaction.amount.toLocaleString("en-US")}</td>
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

    
    {showAddTransactionForm ? <>
    {/* Add Transaction Form */}
    <div className="w-full max-w-xs m-4 absolute">
      <form className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className='absolute right-3 top-3'>
          <button onClick={() => setShowAddTransactionForm(!showAddTransactionForm)}><GrClose /></button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Category
          </label>
          <div className="relative">
            <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" value={inputCategory} onChange={(e) => {setInputCategory(e.target.value)}}>
              <option value='Expense'>Expense</option>
              <option value='Income'>Income</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Currency
          </label>
          <div className="relative">
            <select className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" value={inputCurrency} onChange={(e) => {setInputCurrency(e.target.value)}}>
              <option value={'PHP'}>PHP</option>
              <option value={'USD'}>USD</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Amount
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="number" placeholder="0.00" onChange={(e) => {setInputAmount(e.target.value)}} />
        </div>   
      
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Description
          </label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Description" onChange={(e) => {setInputDescription(e.target.value)}}/>
        </div>

        <div className="flex items-center justify-between">
          <button 
            className="bg-green-200 hover:bg-green-400 py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button"
            onClick={createTransaction}
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
    {/* End of Add Transaction Form */}
    </> : null}
    
    {!showAddTransactionForm ? <button className='text-white bg-slate-600 text-4xl rounded-full hover:bg-green-400 absolute bottom-5 left-5 drop-shadow-xl' onClick={() => setShowAddTransactionForm(!showAddTransactionForm)}><AiOutlinePlus /></button> : null}
    
    </>
  )
}

export default Transactions