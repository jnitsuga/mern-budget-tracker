import React from 'react'
import Axios from 'axios'
import { toast } from 'react-toastify'
import { GrClose } from 'react-icons/gr'
import { useUserContext } from '../contexts/ContextProvider';

const UpdateTransactionForm = (props) => {
  const { 
    setTransactionsList, 
    showUpdateTransactionForm,
    setShowUpdateTransactionForm,
    inputCategory,
    setInputCategory,
    inputCurrency,
    setInputCurrency,
    inputAmount,
    setInputAmount,
    inputDescription,
    setInputDescription,
    transactionId,
  } = useUserContext();

  const payload = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  const updateTransaction = (id) => {
    Axios.put(`http://localhost:4000/api/transactions/${id}`, {
      category: inputCategory,
      currency: inputCurrency,
      amount: inputAmount,
      description: inputDescription,
    }, payload)
    .then((res) => {
      setTransactionsList(res.data)
      setShowUpdateTransactionForm(!showUpdateTransactionForm)
      toast('Transaction updated')
    })
    .catch((error) => {
      console.error(`ERROR! ${error}`)
    })
  }

  return (
    <>
    {/* Update Transaction Form */}
    <div className="w-full max-w-xs m-4">
      <form className="bg-gray-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className='my-4 text-xl'>Edit Transaction</p>
        <div className='absolute right-3 top-3'>
          <button onClick={() => setShowUpdateTransactionForm(!showUpdateTransactionForm)}><GrClose /></button>
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
            onClick={() => updateTransaction(transactionId)}
          >
            Save
          </button>
        </div>

      </form>
    </div>
    {/* End of Update Transaction Form */}
    </>
  )
}

export default UpdateTransactionForm