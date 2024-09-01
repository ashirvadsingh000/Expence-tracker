import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [notification, setNotification] = useState(false);

  const dummyTransactions = [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 }
  ];

  useEffect(() => {
    setTransactions(dummyTransactions);
  }, []);

  useEffect(() => {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts
      .reduce((accumulator, value) => (accumulator += value), 0)
      .toFixed(2);
    const income = amounts
      .filter((value) => value > 0)
      .reduce((accumulator, value) => (accumulator += value), 0)
      .toFixed(2);
    const expense = (
      amounts
        .filter((value) => value < 0)
        .reduce((accumulator, value) => (accumulator += value), 0) * -1
    ).toFixed(2);
    setBalance(total);
    setIncome(income);
    setExpense(expense);
  }, [transactions]);

  const generateID = () => {
    return Math.floor(Math.random() * 100000000);
  };

  const addTransaction = (e) => {
    e.preventDefault();
    if (text.trim() === "" || amount.trim() === "") {
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 2000);
    } else {
      const transaction = {
        id: generateID(),
        text,
        amount: +amount
      };
      setTransactions([...transactions, transaction]);
      setText('');
      setAmount('');
    }
  };

  const removeTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <div className="container">
        <div className="header">
          <img src="https://i.ibb.co/jfScDTC/budget.png" alt="Expense Tracker" />
          <div className="balance-container">
            <h2>Your Balance</h2>
            <h2 className="balance">${balance}</h2>
          </div>
        </div>
        <div className="inc-exp-container">
          <div>
            <h4>Income</h4>
            <p className="money plus">+${income}</p>
          </div>
          <div>
            <h4>Expenses</h4>
            <p className="money minus">-${expense}</p>
          </div>
        </div>
        <h3>History</h3>
        <ul className="list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className={transaction.amount < 0 ? "minus" : "plus"}>
              {transaction.text} <span>{transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount)}</span>
              <button className="delete-btn" onClick={() => removeTransaction(transaction.id)}><i className="fa fa-times"></i></button>
            </li>
          ))}
        </ul>
        <h3>Add new transaction</h3>
        <form>
          <div className="form-control">
            <label htmlFor="text">Description</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter description..." />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount <br />
              <small>(-100 = expense, 100 = income)</small></label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
          </div>
          <button className="btn" onClick={addTransaction}>Add transaction</button>
        </form>
      </div>
      {notification && (
        <div className="notification-container">
          <p>Please add a description and amount</p>
        </div>
      )}
    </div>
  );
}

export default App;