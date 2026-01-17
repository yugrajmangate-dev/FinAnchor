import React, { useState } from 'react';

function LoanEligibility() {
  const [eligibilityData, setEligibilityData] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: '',
    income: '',
    expenses: ''
  });
  const [emi, setEmi] = useState(null);
  const [eligible, setEligible] = useState(null);
  const [eligibleAmount, setEligibleAmount] = useState(null);

  const handleChange = (e) => {
    setEligibilityData({ ...eligibilityData, [e.target.name]: e.target.value });
  };

  const calculateEMI = () => {
    const { loanAmount, interestRate, tenure } = eligibilityData;
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(tenure) * 12;
    const emiValue = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    setEmi(emiValue.toFixed(2));
  };

  const checkEligibility = () => {
    const { income, expenses } = eligibilityData;
    const monthlyIncome = parseFloat(income);
    const monthlyExpenses = parseFloat(expenses);
    const disposableIncome = monthlyIncome - monthlyExpenses;
    // Mock rule: Eligible amount = 5x disposable income
    const eligibleAmt = disposableIncome * 5;
    setEligibleAmount(eligibleAmt);
    setEligible(eligibleAmt > 0);
  };

  return (
    <div className="loan-eligibility">
      <h2>Loan Eligibility & EMI Tools</h2>
      <form>
        <label>
          Loan Amount:
          <input type="number" name="loanAmount" value={eligibilityData.loanAmount} onChange={handleChange} />
        </label>
        <label>
          Interest Rate (%):
          <input type="number" step="0.01" name="interestRate" value={eligibilityData.interestRate} onChange={handleChange} />
        </label>
        <label>
          Tenure (years):
          <input type="number" name="tenure" value={eligibilityData.tenure} onChange={handleChange} />
        </label>
        <label>
          Monthly Income:
          <input type="number" name="income" value={eligibilityData.income} onChange={handleChange} />
        </label>
        <label>
          Monthly Expenses:
          <input type="number" name="expenses" value={eligibilityData.expenses} onChange={handleChange} />
        </label>
        <button type="button" onClick={calculateEMI}>Calculate EMI</button>
        <button type="button" onClick={checkEligibility}>Check Eligibility</button>
      </form>
      {emi && <p>Calculated EMI: ₹{emi}</p>}
      {eligible !== null && (
        <div className="eligibility-result">
          <h3>Loan Eligibility Result</h3>
          <p><strong>Loan Type:</strong> Personal Loan</p>
          <p><strong>Eligible Amount:</strong> ₹{eligibleAmount?.toLocaleString()}</p>
          <p><strong>Status:</strong> {eligible ? 'Approved' : 'Rejected'}</p>
          <p><strong>Interest Rate:</strong> 12%</p>
          <div className="progress-bar">
            <label>Eligibility Strength</label>
            <div className="progress">
              <div className="progress-fill" style={{width: eligible ? '85%' : '20%'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoanEligibility;