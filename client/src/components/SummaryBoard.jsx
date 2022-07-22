import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const SummaryBoard = (props) => {
  const [ totalExpenses, setTotalExpenses ] = useState('');
  const [ totalIncome, setTotalIncome ] = useState('');
  const [ balance, setBalance ] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:4000/api/transactions/getMyTransactions', 
      {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
      .then((response) => {
        const transactions = response.data
        const incomes = transactions.filter(transaction => transaction.category === 'Income')
        const expenses = transactions.filter(transaction => transaction.category === 'Expense')

        let sumIncomes = 0
        for (let i=0; i < incomes.length; i++) {
          sumIncomes += parseFloat(incomes[i].amount)
          console.log(sumIncomes)
        }

        let sumExpenses = 0
        for (let i=0; i < expenses.length; i++) {
          sumExpenses += parseFloat(expenses[i].amount)
          console.log(sumExpenses)
        }

        const getBalance = sumIncomes - sumExpenses

        setTotalIncome(sumIncomes)
        setTotalExpenses(sumExpenses)
        setBalance(getBalance)
      })
  }, [setTotalExpenses, setTotalIncome, setBalance])

  return (
    <div className='m-4'>
      <div className={`bg-gray rounded-xl w-full p-8 pt-9 bg-slate-900 bg-no-repeat bg-cover bg-center`}>
        <div className='flex items-center space-x-10'>
          <div className='block'>
            <span className={`flex font-bold text-xl text-gray-400`}>Total Income</span>
            <span className={`flex text-3xl text-white`}>{totalIncome.toLocaleString("en-US")}</span>
          </div>

          <div className='block'>
            <span className={`flex font-bold text-xl text-gray-400`}>Total Expenses</span>
            <span className={`flex text-3xl text-white`}>{totalExpenses.toLocaleString("en-US")}</span>
          </div>

          <div className='block'>
            <span className={`flex font-bold text-xl text-gray-400`}>Balance</span>
            <span className={`flex text-3xl ${balance > 0 ? 'text-green-500' : 'text-red-600'}`}>{balance.toLocaleString("en-US")}</span>
          </div>
        </div>

      </div>
    </div>
  )
}


export default SummaryBoard