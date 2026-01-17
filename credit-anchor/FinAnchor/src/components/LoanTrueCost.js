import React, { useState, useEffect, useCallback } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import './LoanTrueCost.css';

function LoanTrueCost() {
  const [loanDetails, setLoanDetails] = useState({
    principal: '',
    interestRate: '',
    tenure: '',
    processingFee: '',
    insurance: '',
    prepaymentCharges: '',
    otherCharges: ''
  });

  const [trueCost, setTrueCost] = useState({
    totalInterest: 0,
    totalFees: 0,
    totalAmount: 0,
    emi: 0,
    costBreakdown: {}
  });

  const calculateTrueCost = useCallback(() => {
    const P = parseFloat(loanDetails.principal) || 0;
    const r = (parseFloat(loanDetails.interestRate) || 0) / 100 / 12; // Monthly interest rate
    const n = (parseFloat(loanDetails.tenure) || 0) * 12; // Total months

    if (P === 0 || r === 0 || n === 0) return;

    // Calculate EMI using standard formula
    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;

    // Calculate fees
    const processingFee = parseFloat(loanDetails.processingFee) || 0;
    const insurance = parseFloat(loanDetails.insurance) || 0;
    const prepaymentCharges = parseFloat(loanDetails.prepaymentCharges) || 0;
    const otherCharges = parseFloat(loanDetails.otherCharges) || 0;
    const totalFees = processingFee + insurance + prepaymentCharges + otherCharges;

    const costBreakdown = {
      principal: P,
      interest: totalInterest,
      processingFee: processingFee,
      insurance: insurance,
      prepaymentCharges: prepaymentCharges,
      otherCharges: otherCharges
    };

    setTrueCost({
      totalInterest,
      totalFees,
      totalAmount: totalAmount + totalFees,
      emi,
      costBreakdown
    });
  }, [loanDetails]);

  useEffect(() => {
    calculateTrueCost();
  }, [calculateTrueCost]);

  const handleInputChange = (field, value) => {
    setLoanDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const barChartData = {
    labels: ['Principal', 'Interest', 'Processing Fee', 'Insurance', 'Prepayment', 'Other'],
    datasets: [{
      label: 'Amount (₹)',
      data: [
        trueCost.costBreakdown.principal || 0,
        trueCost.costBreakdown.interest || 0,
        trueCost.costBreakdown.processingFee || 0,
        trueCost.costBreakdown.insurance || 0,
        trueCost.costBreakdown.prepaymentCharges || 0,
        trueCost.costBreakdown.otherCharges || 0
      ],
      backgroundColor: [
        '#4CAF50',
        '#F44336',
        '#FF9800',
        '#9C27B0',
        '#607D8B',
        '#795548'
      ],
      borderWidth: 1
    }]
  };

  const pieChartData = {
    labels: ['Principal Amount', 'Total Interest', 'Total Fees & Charges'],
    datasets: [{
      data: [
        trueCost.costBreakdown.principal || 0,
        trueCost.totalInterest || 0,
        trueCost.totalFees || 0
      ],
      backgroundColor: [
        '#4CAF50',
        '#F44336',
        '#FF9800'
      ],
      borderWidth: 2
    }]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="loan-true-cost">
      <div className="cost-header">
        <h2>Loan True Cost Calculator</h2>
        <p>Understand the complete cost of your loan including all fees and charges</p>
      </div>

      <div className="cost-calculator">
        <div className="input-section">
          <h3>Loan Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Principal Amount (₹)</label>
              <input
                type="number"
                value={loanDetails.principal}
                onChange={(e) => handleInputChange('principal', e.target.value)}
                placeholder="500000"
              />
            </div>

            <div className="form-group">
              <label>Interest Rate (% per annum)</label>
              <input
                type="number"
                step="0.1"
                value={loanDetails.interestRate}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
                placeholder="12.5"
              />
            </div>

            <div className="form-group">
              <label>Loan Tenure (years)</label>
              <input
                type="number"
                value={loanDetails.tenure}
                onChange={(e) => handleInputChange('tenure', e.target.value)}
                placeholder="5"
              />
            </div>

            <div className="form-group">
              <label>Processing Fee (₹)</label>
              <input
                type="number"
                value={loanDetails.processingFee}
                onChange={(e) => handleInputChange('processingFee', e.target.value)}
                placeholder="5000"
              />
            </div>

            <div className="form-group">
              <label>Insurance Premium (₹)</label>
              <input
                type="number"
                value={loanDetails.insurance}
                onChange={(e) => handleInputChange('insurance', e.target.value)}
                placeholder="15000"
              />
            </div>

            <div className="form-group">
              <label>Prepayment Charges (₹)</label>
              <input
                type="number"
                value={loanDetails.prepaymentCharges}
                onChange={(e) => handleInputChange('prepaymentCharges', e.target.value)}
                placeholder="25000"
              />
            </div>

            <div className="form-group">
              <label>Other Charges (₹)</label>
              <input
                type="number"
                value={loanDetails.otherCharges}
                onChange={(e) => handleInputChange('otherCharges', e.target.value)}
                placeholder="2000"
              />
            </div>
          </div>
        </div>

        {trueCost.totalAmount > 0 && (
          <div className="results-section">
            <div className="cost-summary">
              <h3>True Cost Summary</h3>
              <div className="summary-cards">
                <div className="summary-card">
                  <div className="card-label">Monthly EMI</div>
                  <div className="card-value">{formatCurrency(trueCost.emi)}</div>
                </div>
                <div className="summary-card">
                  <div className="card-label">Total Interest</div>
                  <div className="card-value interest">{formatCurrency(trueCost.totalInterest)}</div>
                </div>
                <div className="summary-card">
                  <div className="card-label">Total Fees & Charges</div>
                  <div className="card-value fees">{formatCurrency(trueCost.totalFees)}</div>
                </div>
                <div className="summary-card">
                  <div className="card-label">Total Amount Payable</div>
                  <div className="card-value total">{formatCurrency(trueCost.totalAmount)}</div>
                </div>
              </div>
            </div>

            <div className="cost-visualization">
              <div className="chart-container">
                <h4>Cost Breakdown</h4>
                <Bar
                  data={barChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          callback: function(value) {
                            return '₹' + value.toLocaleString();
                          }
                        }
                      }
                    }
                  }}
                />
              </div>

              <div className="chart-container">
                <h4>Principal vs Interest vs Fees</h4>
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'bottom',
                        labels: { padding: 20, usePointStyle: true }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="cost-insights">
              <h4>💡 Key Insights</h4>
              <div className="insights-list">
                <div className="insight-item">
                  <span className="insight-icon">📊</span>
                  <span>
                    Interest forms {((trueCost.totalInterest / trueCost.totalAmount) * 100).toFixed(1)}%
                    of your total loan cost
                  </span>
                </div>
                <div className="insight-item">
                  <span className="insight-icon">💰</span>
                  <span>
                    Hidden fees add {formatCurrency(trueCost.totalFees)} to your loan cost
                  </span>
                </div>
                <div className="insight-item">
                  <span className="insight-icon">⏰</span>
                  <span>
                    You'll pay {formatCurrency(trueCost.totalAmount - trueCost.costBreakdown.principal)}
                    extra over {loanDetails.tenure} years
                  </span>
                </div>
                <div className="insight-item">
                  <span className="insight-icon">🎯</span>
                  <span>
                    Consider prepaying to save on interest costs
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoanTrueCost;