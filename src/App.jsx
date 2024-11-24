import { useState, useEffect } from "react";
import Balance from "./components/Balance";
import Header from "./components/Header";
import Transactions from "./components/Transactions";

function App() {
  // Initialize state with data from localStorage or default values
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? parseFloat(savedBalance) : 0;
  });

  const [expense, setExpense] = useState(() => {
    const savedExpense = localStorage.getItem("expense");
    return savedExpense ? parseFloat(savedExpense) : 0;
  });

  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem("income");
    return savedIncome ? parseFloat(savedIncome) : 0;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("balance", balance.toString());
    localStorage.setItem("expense", expense.toString());
    localStorage.setItem("income", income.toString());
  }, [transactions, balance, expense, income]);

  const addTransaction = (amount, description, type) => {
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      description,
      type,
      date: new Date().toLocaleDateString(), // Adding date for better tracking
    };

    setTransactions((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);

    if (type === "Expense") {
      setExpense((prev) => prev + parseFloat(amount));
      setBalance((prev) => prev - parseFloat(amount));
    } else {
      setIncome((prev) => prev + parseFloat(amount));
      setBalance((prev) => prev + parseFloat(amount));
    }
  };

  // Add function to delete transaction
  const deleteTransaction = (transactionId) => {
    const transactionToDelete = transactions.find(
      (t) => t.id === transactionId
    );
    if (!transactionToDelete) return;

    setTransactions((prevTransactions) =>
      prevTransactions.filter((t) => t.id !== transactionId)
    );

    // Update balance, income, and expense
    if (transactionToDelete.type === "Expense") {
      setExpense((prev) => prev - transactionToDelete.amount);
      setBalance((prev) => prev + transactionToDelete.amount);
    } else {
      setIncome((prev) => prev - transactionToDelete.amount);
      setBalance((prev) => prev - transactionToDelete.amount);
    }
  };

  return (
    <div>
      <div>
        <Header />
        <Balance
          balance={balance}
          expense={expense}
          income={income}
          onAddTransaction={addTransaction}
        />
        <div className="gap-4 mt-4 p-4">
          <div className="flex flex-row justify-between">
            <h3 className="text-green-500 border rounded-md px-4 py-3">
              Income: ${income}
            </h3>
            <h3 className="text-red-500 border rounded-md px-4 py-3">
              Expense: ${expense}
            </h3>
          </div>
        </div>
      </div>
      <Transactions
        transactions={transactions}
        onDeleteTransaction={deleteTransaction}
      />
    </div>
  );
}

export default App;
