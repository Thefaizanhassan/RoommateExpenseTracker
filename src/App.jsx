import React, { useState } from 'react';

function App() {
  const [numRoommates, setNumRoommates] = useState('');
  const [roommates, setRoommates] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [articleName, setArticleName] = useState('');
  const [price, setPrice] = useState('');
  const [payer, setPayer] = useState(null);
  const [involvedRoommates, setInvolvedRoommates] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const handleNumRoommatesChange = (e) => {
    const input = e.target.value;
    const number = parseInt(input, 10);

    if (input === '' || isNaN(number) || number < 1) {
      setNumRoommates('');
      setRoommates([]);
    } else {
      setNumRoommates(number);
      setRoommates(Array(number).fill(''));
    }
  };

  const handleRoommateNameChange = (index, value) => {
    const updatedRoommates = [...roommates];
    updatedRoommates[index] = value;
    setRoommates(updatedRoommates);
  };

  const toggleInvolvedRoommate = (index) => {
    setInvolvedRoommates((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setInvolvedRoommates([]);
    } else {
      setInvolvedRoommates(roommates.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const addExpense = () => {
    if (!articleName || !price || involvedRoommates.length === 0 || payer === null) {
      alert('Please fill out all required fields and select roommates involved.');
      return;
    }

    const totalPerRoommate = (parseFloat(price) / involvedRoommates.length).toFixed(2);

    const newExpense = {
      articleName,
      price: parseFloat(price).toFixed(2),
      payer,
      involvedRoommates,
      totalPerRoommate,
      date: currentDate || new Date().toISOString().split('T')[0],
    };

    setExpenses([...expenses, newExpense]);

    setArticleName('');
    setPrice('');
    setPayer(null);
    setInvolvedRoommates([]);
    setSelectAll(false);
    setCurrentDate('');
  };

  const exportToCSV = () => {
    let csvContent = "Date,Article,Price,Payer,Involved Roommates,Amount Per Person\n";

    expenses.forEach(expense => {
      const row = [
        expense.date,
        expense.articleName,
        expense.price,
        roommates[expense.payer],
        expense.involvedRoommates.map(i => roommates[i]).join(';'),
        expense.totalPerRoommate
      ].join(',');
      csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenses_${startDate}_to_${endDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredExpenses = expenses.filter(expense => {
    if (!startDate || !endDate) return true;
    return expense.date >= startDate && expense.date <= endDate;
  });

  const calculateBalances = () => {
    const balances = roommates.map(() => 0);
    const consolidatedDebts = {};

    expenses.forEach((expense) => {
      const share = parseFloat(expense.totalPerRoommate);
      expense.involvedRoommates.forEach((index) => {
        if (index !== expense.payer) {
          balances[index] -= share;
          balances[expense.payer] += share;

          const debtKey = `${index}-${expense.payer}`;
          if (consolidatedDebts[debtKey]) {
            consolidatedDebts[debtKey] += share;
          } else {
            consolidatedDebts[debtKey] = share;
          }
        }
      });
    });

    return { balances, consolidatedDebts };
  };

  const { balances, consolidatedDebts } = calculateBalances();

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Roommate Shared Expenses</h1>

      <div style={{ marginBottom: '20px' }}>
        <h3>Select Date Range</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ padding: '8px' }}
          />
          <span>to</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ padding: '8px' }}
          />
        </div>
        <button 
          onClick={exportToCSV}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Export to CSV
        </button>
      </div>

      <div>
        <h3>Enter Number of Roommates</h3>
        <input
          type="number"
          min="1"
          value={numRoommates}
          onChange={handleNumRoommatesChange}
          placeholder="Enter number of roommates"
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
      </div>

      {numRoommates > 0 && (
        <div>
          <h3>Enter Roommate Names</h3>
          {roommates.map((name, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Roommate ${index + 1} Name`}
              value={name}
              onChange={(e) => handleRoommateNameChange(index, e.target.value)}
              style={{ padding: '8px', width: '100%', marginTop: '10px' }}
              autoCapitalize="off"
            />
          ))}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Add New Expense</h3>
        <input
          type="date"
          value={currentDate}
          onChange={(e) => setCurrentDate(e.target.value)}
          style={{ padding: '8px', width: '100%', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Article Name"
          value={articleName}
          onChange={(e) => setArticleName(e.target.value)}
          style={{ padding: '8px', width: '100%' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: '8px', width: '100%', marginTop: '10px' }}
        />

        <h4>Select Who Paid</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {roommates.map((name, index) => {
            const sameFirstLetter = roommates.filter(
              (r, i) => r && name && r.charAt(0).toLowerCase() === name.charAt(0).toLowerCase() && i !== index
            ).length > 0;

            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => setPayer(index)}
              >
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: payer === index ? '#4CAF50' : '#f0f0f0',
                    color: payer === index ? '#fff' : '#000',
                    fontWeight: 'bold',
                    marginRight: '5px',
                    border: payer === index ? '2px solid #4CAF50' : '2px solid #ccc'
                  }}
                >
                  {name ? (sameFirstLetter ? `${name.charAt(0)}${name.charAt(1)}` : name.charAt(0)).toUpperCase() : `R${index + 1}`}
                </div>
              </div>
            );
          })}
        </div>

        <h4>Select Roommates Involved</h4>
        <div>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={toggleSelectAll}
          />
          <label>Select All</label>
        </div>
        {roommates.map((name, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={involvedRoommates.includes(index)}
              onChange={() => toggleInvolvedRoommate(index)}
            />
            <label>{name || `Roommate ${index + 1}`}</label>
          </div>
        ))}

        <button onClick={addExpense} style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add Expense
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Expenses List</h3>
        {filteredExpenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul>
            {filteredExpenses.map((expense, index) => (
              <li key={index} style={{ marginBottom: '15px' }}>
                <div><strong>Date:</strong> {expense.date}</div>
                <strong>{expense.articleName}</strong> - ₹{expense.price} 
                <div>Paid by: {roommates[expense.payer]}</div>
                <div>Split among: {expense.involvedRoommates.map(i => roommates[i]).join(', ')}</div>
                <div>Each involved pays: ₹{expense.totalPerRoommate}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Balance Summary</h3>
        {Object.keys(consolidatedDebts).length === 0 ? (
          <p>All balances are settled.</p>
        ) : (
          <div>
            {Object.entries(consolidatedDebts).map(([key, amount]) => {
              const [debtorIndex, creditorIndex] = key.split('-').map(Number);
              return (
                <div key={key}>
                  {roommates[debtorIndex]} owes ₹{amount.toFixed(2)} to {roommates[creditorIndex]}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
