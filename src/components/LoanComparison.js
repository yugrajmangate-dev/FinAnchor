import React, { useState } from 'react';

function LoanComparison() {
  const [loans, setLoans] = useState([
    { lender: 'Bank A', interest: 11.5, emi: 16200, tenure: 36, totalCost: 583200 },
    { lender: 'NBFC B', interest: 13, emi: 17000, tenure: 36, totalCost: 612000 }
  ]);

  const [newLoan, setNewLoan] = useState({
    lender: '',
    interest: '',
    emi: '',
    tenure: ''
  });

  const handleChange = (e) => {
    setNewLoan({ ...newLoan, [e.target.name]: e.target.value });
  };

  const calculateTotalCost = (emi, tenure) => {
    return parseFloat(emi) * parseFloat(tenure);
  };

  const addLoan = () => {
    if (newLoan.lender && newLoan.interest && newLoan.emi && newLoan.tenure) {
      const totalCost = calculateTotalCost(newLoan.emi, newLoan.tenure);
      setLoans([...loans, { 
        lender: newLoan.lender, 
        interest: parseFloat(newLoan.interest),
        emi: parseFloat(newLoan.emi),
        tenure: parseFloat(newLoan.tenure),
        totalCost: totalCost
      }]);
      setNewLoan({ lender: '', interest: '', emi: '', tenure: '' });
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="loan-comparison">
      <h2>Loan Comparison Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Lender</th>
            <th>Interest</th>
            <th>EMI</th>
            <th>Tenure</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr key={index}>
              <td>{loan.lender}</td>
              <td>{loan.interest}%</td>
              <td>₹{loan.emi.toLocaleString()}</td>
              <td>{loan.tenure}</td>
              <td>₹{loan.totalCost.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add New Loan</h3>
      <form>
        <label>
          Lender:
          <input type="text" name="lender" value={newLoan.lender} onChange={handleChange} placeholder="Enter lender name" />
        </label>
        <label>
          Interest Rate (% p.a.):
          <input type="number" step="0.1" name="interest" value={newLoan.interest} onChange={handleChange} placeholder="e.g., 11.5" />
        </label>
        <label>
          EMI (₹):
          <input type="number" name="emi" value={newLoan.emi} onChange={handleChange} placeholder="e.g., 16200" />
        </label>
        <label>
          Tenure (months):
          <input type="number" name="tenure" value={newLoan.tenure} onChange={handleChange} placeholder="e.g., 36" />
        </label>
        <label style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          <strong>Total Cost (Auto-calculated):</strong> ₹{newLoan.emi && newLoan.tenure ? calculateTotalCost(newLoan.emi, newLoan.tenure).toLocaleString() : '0'}
        </label>
        <button type="button" onClick={addLoan}>Add Loan</button>
      </form>
    </div>
  );
}

export default LoanComparison;