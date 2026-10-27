
import React, { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const balance = income - expenses;

  const addTransaction = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0) {
      alert("Please enter a valid title and amount!");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type,
    };

    setTransactions((previous) => [newTransaction, ...previous]);
    setTitle("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Expense Tracker</h1>
          <p>Manage your money, simply.</p>
        </div>
        <div className="header-icon">₹</div>
      </header>

      <main className="container">
        <section className="balance-card">
          <p>Total Balance</p>
          <h2>₹{balance.toLocaleString("en-IN")}</h2>
          <span>Your financial overview</span>
        </section>

        <section className="summary">
          <div className="summary-card income-card">
            <div className="summary-icon">↗</div>
            <p>Total Income</p>
            <h3>₹{income.toLocaleString("en-IN")}</h3>
          </div>

          <div className="summary-card expense-card">
            <div className="summary-icon">↘</div>
            <p>Total Expenses</p>
            <h3>₹{expenses.toLocaleString("en-IN")}</h3>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel">
            <h2>Add Transaction</h2>
            <p className="panel-description">
              Record your income or expenses.
            </p>

            <form onSubmit={addTransaction}>
              <label htmlFor="title">Transaction Name</label>
              <input
                id="title"
                type="text"
                placeholder="e.g. Food, Salary, Shopping"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label htmlFor="amount">Amount (₹)</label>
              <input
                id="amount"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <label htmlFor="type">Transaction Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <button type="submit" className="add-button">
                + Add Transaction
              </button>
            </form>
          </div>

          <div className="panel transactions-panel">
            <div className="transaction-heading">
              <div>
                <h2>Recent Transactions</h2>
                <p className="panel-description">
                  Your latest money activity.
                </p>
              </div>
              <span className="count">{transactions.length}</span>
            </div>

            {transactions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">₹</div>
                <h3>No transactions yet</h3>
                <p>Add your first transaction to get started.</p>
              </div>
            ) : (
              <div className="transaction-list">
                {transactions.map((item) => (
                  <div className="transaction-item" key={item.id}>
                    <div className={`transaction-symbol ${item.type}`}>
                      {item.type === "income" ? "↗" : "↘"}
                    </div>

                    <div className="transaction-info">
                      <h4>{item.title}</h4>
                      <span>
                        {item.type === "income" ? "Income" : "Expense"}
                      </span>
                    </div>

                    <strong className={item.type}>
                      {item.type === "income" ? "+" : "-"}₹
                      {item.amount.toLocaleString("en-IN")}
                    </strong>

                    <button
                      className="delete-button"
                      onClick={() => deleteTransaction(item.id)}
                      aria-label={`Delete ${item.title}`}
                      title="Delete transaction"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <footer>
          Expense Tracker · Track better, save smarter.
        </footer>
      </main>
    </div>
  );
}

export default App;
