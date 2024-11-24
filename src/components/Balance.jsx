import { useState } from "react";
import AddBalance from "./AddBalance";

const Balance = ({ balance, expense, income, onAddTransaction }) => {
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [button, setButton] = useState("Add");

  

  const handleAddBalance = () => {
    setShowAddBalance(!showAddBalance);
    setButton(button === "Add" ? "Cancel" : "Add");
  };

  const balanceColor = balance < 0 ? 'text-red-500' : 'text-green-500';

  return (
    <div className="gap-4 mt-4 p-4">
      <div className="flex flex-row justify-between text-center gap-4">
        <h2 className={`border rounded-md py-2 px-4 font-bold text-[20px] ${balanceColor}`}>Balance : ${balance}</h2>
        <button onClick={handleAddBalance}>{button}</button>
      </div>
      {showAddBalance && <AddBalance onAddTransaction={onAddTransaction} />}
    </div>
  );
};

export default Balance;