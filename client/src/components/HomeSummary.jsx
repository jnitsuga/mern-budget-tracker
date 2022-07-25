import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const HomeSummary = () => {
  const [ totalExpenses, setTotalExpenses ] = useState('');
  const [ totalIncome, setTotalIncome ] = useState('');
  const [ balance, setBalance ] = useState('');

  useEffect(() => {
    const getMyTransactions = async () => {
      await Axios.get('http://localhost:4000/api/transactions/getMyTransactions', 
      {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      .then((response) => {
        const transactions = response.data
        const incomes = transactions.filter(transaction => transaction.category === 'Income')
        const expenses = transactions.filter(transaction => transaction.category === 'Expense')

        let sumIncomes = 0
        for (let i=0; i < incomes.length; i++) {
          sumIncomes += parseFloat(incomes[i].amount)
        }

        let sumExpenses = 0
        for (let i=0; i < expenses.length; i++) {
          sumExpenses += parseFloat(expenses[i].amount)
        }

        const getBalance = sumIncomes - sumExpenses

        setTotalIncome(sumIncomes)
        setTotalExpenses(sumExpenses)
        setBalance(getBalance)
      })
      .catch((error) => {
        console.error(`ERROR! ${error}`)
      })
    }
    getMyTransactions() 
  }, [])

  return (
    <>
    <div className='m-4 shadow-inner'>
      <div className={`bg-gray rounded-xl w-full px-6 py-6 bg-slate-900 bg-opacity-20`}>
        <div className='flex items-center space-x-6'>
          <div className='block bg-gray-700 bg-opacity-70 px-6 py-6 rounded-xl drop-shadow'>
            <span className={`flex font-bold text-xl text-gray-300`}>Total Income</span>
            <span className={`flex text-4xl text-white`}>{totalIncome.toLocaleString("en-US")}</span>
          </div>

          <div className='block bg-gray-700 bg-opacity-70 px-6 py-6 rounded-xl drop-shadow'>
            <span className={`flex font-bold text-xl text-gray-300`}>Total Expenses</span>
            <span className={`flex text-4xl text-white`}>{totalExpenses.toLocaleString("en-US")}</span>
          </div>

          <div className='block bg-gray-700 bg-opacity-70 px-6 py-6 rounded-xl drop-shadow'>
            <span className={`flex font-bold text-xl text-gray-300`}>Balance</span>
            <span className={`flex text-4xl ${balance > 0 ? 'text-green-500' : 'text-red-600'}`}>{balance.toLocaleString("en-US")}</span>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}


export default HomeSummary