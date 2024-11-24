
import { useState } from 'react';

const Transactions = ({ transactions }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter transactions based on search query
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='mt-4 flex flex-col gap-4 p-4'>
      <h3 className='text-lg font-semibold'>Transactions</h3>
      <input 
        type='search' 
        placeholder='Search' 
        className='px-3 py-2 rounded-md'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredTransactions.length === 0 ? (
        <div className='text-center py-4'>No transactions found</div>
      ) : (
        filteredTransactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className='flex flex-row justify-around border rounded-md px-3 py-2'
          >
            <div className='flex flex-col'>
              <h5>{transaction.description}</h5>
              <span className='text-sm text-gray-500'>{transaction.type}</span>
            </div>
            <h5>${transaction.amount}</h5>
          </div>
        ))
      )}
    </div>
  );
};

export default Transactions;