import React, { useState } from 'react';

function WhatIfSimulator() {
  const [payOffAmount, setPayOffAmount] = useState(0);
  const [missPayment, setMissPayment] = useState(false);
  const [newLoan, setNewLoan] = useState(false);

  const currentScore = 735; // Fixed current score for simulation

  const calculateSimulatedScore = () => {
    let score = currentScore;

    // Pay off balance: +10-20 points depending on amount
    if (payOffAmount > 0) {
      const bonus = Math.min(payOffAmount / 1000, 20);
      score += bonus;
    }

    // Miss payment: -50 points
    if (missPayment) {
      score -= 50;
    }

    // New loan: -10 points
    if (newLoan) {
      score -= 10;
    }

    return Math.max(300, Math.min(900, Math.round(score)));
  };

  const simulatedScore = calculateSimulatedScore();
  const scoreChange = simulatedScore - currentScore;

  return (
    <div className="what-if-simulator">
      <h2>What-If Credit Simulator</h2>
      <p>Simulate how your credit score might change with different financial decisions.</p>

      <div className="simulator-controls">
        <div className="control-group">
          <label>
            Pay off credit card balance: ₹
            <input
              type="number"
              value={payOffAmount}
              onChange={(e) => setPayOffAmount(Number(e.target.value))}
              min="0"
              step="1000"
            />
          </label>
          <p className="help-text">Paying off balances can improve your score by reducing utilization.</p>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={missPayment}
              onChange={(e) => setMissPayment(e.target.checked)}
            />
            Miss one EMI payment
          </label>
          <p className="help-text">Late payments severely impact your credit score.</p>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={newLoan}
              onChange={(e) => setNewLoan(e.target.checked)}
            />
            Apply for a new loan
          </label>
          <p className="help-text">New credit inquiries temporarily lower your score.</p>
        </div>
      </div>

      <div className="simulation-result">
        <h3>Simulation Result</h3>
        <div className="score-display">
          <div className="current-score">
            <h4>Current Score</h4>
            <p>{currentScore}</p>
          </div>
          <div className="arrow">→</div>
          <div className="simulated-score">
            <h4>Simulated Score</h4>
            <p style={{ color: scoreChange > 0 ? 'green' : scoreChange < 0 ? 'red' : 'black' }}>
              {simulatedScore}
            </p>
            <p className="change" style={{ color: scoreChange > 0 ? 'green' : scoreChange < 0 ? 'red' : 'black' }}>
              {scoreChange > 0 ? '+' : ''}{scoreChange} points
            </p>
          </div>
        </div>

        <div className="insights">
          <h4>Key Insights</h4>
          <ul>
            {payOffAmount > 0 && (
              <li>Paying off ₹{payOffAmount.toLocaleString()} could improve your score by up to {Math.min(Math.round(payOffAmount / 1000), 20)} points.</li>
            )}
            {missPayment && (
              <li>Missing a payment typically reduces your score by 50-100 points and stays on your report for 7 years.</li>
            )}
            {newLoan && (
              <li>A new loan inquiry reduces your score by 5-10 points temporarily (usually recovers within 3-6 months).</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WhatIfSimulator;