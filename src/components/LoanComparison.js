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
    tenure: '',
    totalCost: ''
  });

  const handleChange = (e) => {
    setNewLoan({ ...newLoan, [e.target.name]: e.target.value });
  };

  const addLoan = () => {
    setLoans([...loans, { ...newLoan, totalCost: parseFloat(newLoan.totalCost) }]);
    setNewLoan({ lender: '', interest: '', emi: '', tenure: '', totalCost: '' });
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
          <input type="text" name="lender" value={newLoan.lender} onChange={handleChange} />
        </label>
        <label>
          Interest:
          <input type="number" step="0.1" name="interest" value={newLoan.interest} onChange={handleChange} />
        </label>
        <label>
          EMI:
          <input type="number" name="emi" value={newLoan.emi} onChange={handleChange} />
        </label>
        <label>
          Tenure:
          <input type="number" name="tenure" value={newLoan.tenure} onChange={handleChange} />
        </label>
        <label>
          Total Cost:
          <input type="number" name="totalCost" value={newLoan.totalCost} onChange={handleChange} />
        </label>
        <button type="button" onClick={addLoan}>Add Loan</button>
      </form>
    </div>
  );
}

export default LoanComparison;