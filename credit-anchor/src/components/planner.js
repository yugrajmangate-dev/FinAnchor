import React, { useState } from 'react';

const Planner = () => {
  const [calculatorType, setCalculatorType] = useState('loan');
  const [amount, setAmount] = useState(100000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(12);
  const [inflationRate, setInflationRate] = useState(5);
  const [result, setResult] = useState({
    totalAmount: 0,
    totalInterest: 0,
    realValue: 0,
    cagr: 0,
  });

  // Compound Interest Formula: A = P(1 + r)^n
  // where P = principal, r = rate per period, n = number of periods
  const calculateLoan = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate) / 100;
    const years = parseFloat(tenure);
    const inflation = parseFloat(inflationRate) / 100;
    
    // Compound Interest (compounded annually)
    const totalAmount = principal * Math.pow(1 + annualRate, years);
    const totalInterest = totalAmount - principal;
    
    // Real Value (inflation-adjusted): Real Value = Nominal Value / (1 + inflation)^years
    const realValue = totalAmount / Math.pow(1 + inflation, years);
    
    // CAGR = (Ending Value / Beginning Value)^(1/n) - 1
    const cagr = (Math.pow(totalAmount / principal, 1 / years) - 1) * 100;
    
    setResult({
      totalAmount,
      totalInterest,
      realValue,
      cagr,
    });
  };

  // EMI Calculation Formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  // where P = principal, r = monthly rate, n = number of months
  const calculateEMI = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const monthlyRate = annualRate / 12 / 100;
    const numPayments = parseFloat(tenure);
    const inflation = parseFloat(inflationRate) / 100;
    
    let emi = 0;
    let totalAmountPaid = 0;
    
    if (monthlyRate === 0) {
      emi = principal / numPayments;
      totalAmountPaid = principal;
    } else {
      // Standard EMI formula
      emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
      totalAmountPaid = emi * numPayments;
    }
    
    const totalInterest = totalAmountPaid - principal;
    const years = numPayments / 12;
    
    // Real Value for EMI: Adjusted for inflation over the tenure
    const realValue = totalAmountPaid / Math.pow(1 + inflation, years);
    
    // Effective CAGR for the loan: (Total Amount Paid / Principal)^(1/years) - 1
    const cagr = (Math.pow(totalAmountPaid / principal, 1 / years) - 1) * 100;
    
    setResult({
      totalAmount: emi,
      totalInterest,
      realValue,
      cagr,
    });
  };

  const handleCalculate = () => {
    if (calculatorType === 'loan') {
      calculateLoan();
    } else {
      calculateEMI();
    }
  };

  const handleAmountSlider = (e) => {
    setAmount(e.target.value);
  };

  const handleAmountInput = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="planner-container">
      <h1>Financial Calculator</h1>
      
      <div className="calculator-selector">
        <button
          className={`btn ${calculatorType === 'loan' ? 'active' : ''}`}
          onClick={() => {
            setCalculatorType('loan');
            setResult(0);
          }}
        >
          Loan Calculator
        </button>
        <button
          className={`btn ${calculatorType === 'emi' ? 'active' : ''}`}
          onClick={() => {
            setCalculatorType('emi');
            setResult(0);
          }}
        >
          EMI Calculator
        </button>
      </div>

      <div className="calculator-form">
        <div className="form-group">
          <label>Loan Amount: ₹{amount}</label>
          <input
            type="range"
            min="10000"
            max="5000000"
            step="10000"
            value={amount}
            onChange={handleAmountSlider}
            className="slider"
          />
          <input
            type="number"
            value={amount}
            onChange={handleAmountInput}
            className="text-input"
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label>Interest Rate (% per annum): {rate}%</label>
          <input
            type="range"
            min="1"
            max="30"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="slider"
          />
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="text-input"
            placeholder="Enter rate"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Tenure (years): {tenure}</label>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="slider"
          />
          <input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="text-input"
            placeholder="Enter tenure in years"
          />
        </div>

        <div className="form-group">
          <label>Inflation Rate (% per annum): {inflationRate}%</label>
          <input
            type="range"
            min="1"
            max="15"
            step="0.1"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            className="slider"
          />
          <input
            type="number"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            className="text-input"
            placeholder="Enter inflation rate"
            step="0.1"
          />
        </div>

        <button className="calculate-btn" onClick={handleCalculate}>
          Calculate
        </button>
      </div>

      {result.totalAmount > 0 && (
        <div className="result-section">
          <h2>Result</h2>
          <div className="result-box">
            {calculatorType === 'loan' ? (
              <>
                <div className="result-item">
                  <p className="result-label">Principal Amount:</p>
                  <p className="result-value">₹ {parseFloat(amount).toFixed(2)}</p>
                </div>
                <div className="result-item">
                  <p className="result-label">Total Amount to be Paid (Nominal):</p>
                  <p className="result-value">₹ {result.totalAmount.toFixed(2)}</p>
                </div>
                <div className="result-item">
                  <p className="result-label">Total Interest:</p>
                  <p className="result-value">₹ {result.totalInterest.toFixed(2)}</p>
                </div>
                <div className="result-item highlight">
                  <p className="result-label">Real Value (Inflation-Adjusted):</p>
                  <p className="result-value">₹ {result.realValue.toFixed(2)}</p>
                </div>
                <div className="result-item highlight">
                  <p className="result-label">CAGR (Compound Annual Growth Rate):</p>
                  <p className="result-value">{result.cagr.toFixed(2)}%</p>
                </div>
              </>
            ) : (
              <>
                <div className="result-item">
                  <p className="result-label">Loan Amount:</p>
                  <p className="result-value">₹ {parseFloat(amount).toFixed(2)}</p>
                </div>
                <div className="result-item">
                  <p className="result-label">Monthly EMI:</p>
                  <p className="result-value">₹ {result.totalAmount.toFixed(2)}</p>
                </div>
                <div className="result-item">
                  <p className="result-label">Total Amount Paid Over Tenure:</p>
                  <p className="result-value">₹ {(result.totalAmount + result.totalInterest).toFixed(2)}</p>
                </div>
                <div className="result-item">
                  <p className="result-label">Total Interest:</p>
                  <p className="result-value">₹ {result.totalInterest.toFixed(2)}</p>
                </div>
                <div className="result-item highlight">
                  <p className="result-label">Real Value (Inflation-Adjusted):</p>
                  <p className="result-value">₹ {result.realValue.toFixed(2)}</p>
                </div>
                <div className="result-item highlight">
                  <p className="result-label">Effective CAGR:</p>
                  <p className="result-value">{result.cagr.toFixed(2)}%</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Planner;
