import { useState } from 'react';

const AddBalance = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState("Expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description) return;
    
    onAddTransaction(amount, description, type);
    // Reset form after submission
    setAmount('');
    setDescription('');
    setType('Expense');
  };

  return (
    <div>
      <form className="flex flex-col gap-4 mt-4 border p-4" onSubmit={handleSubmit}>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="Enter amount" 
          className="px-4 py-3"
          required 
        />
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          className="px-4 py-3"
          required 
        />
        <div className="flex justify-around">
          <div className="flex items-center">
            <input 
              type="radio" 
              name="type" 
              value="Expense" 
              checked={type === "Expense"} 
              onChange={(e) => setType(e.target.value)} 
            />
            <label className="ml-2">Expense</label>
          </div>
          <div className="flex items-center">
            <input 
              type="radio" 
              name="type" 
              value="Income" 
              checked={type === "Income"} 
              onChange={(e) => setType(e.target.value)} 
            />
            <label className="ml-2">Income</label>
          </div>
        </div>
        <button 
          type="submit"
          className="rounded-md "
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddBalance;