import React, { useState, useEffect, useCallback } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './CreditReadyScore.css';

function CreditReadyScore() {
  const [userData, setUserData] = useState({
    monthlyIncome: '',
    employmentType: 'salaried',
    savingsAmount: '',
    monthlyExpenses: '',
    dependents: '',
    residenceType: 'owned',
    educationLevel: 'graduate',
    age: ''
  });

  const [creditReadyScore, setCreditReadyScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({});
  const [recommendations, setRecommendations] = useState([]);

  const calculateCreditReadyScore = useCallback(() => {
    const data = userData;
    let score = 0;
    const breakdown = {};

    // Income factor (30% weight)
    const income = parseFloat(data.monthlyIncome) || 0;
    let incomeScore = 0;
    if (income >= 100000) incomeScore = 30;
    else if (income >= 75000) incomeScore = 25;
    else if (income >= 50000) incomeScore = 20;
    else if (income >= 30000) incomeScore = 15;
    else if (income >= 15000) incomeScore = 10;
    else incomeScore = 5;
    score += incomeScore;
    breakdown.income = incomeScore;

    // Savings factor (25% weight)
    const savings = parseFloat(data.savingsAmount) || 0;
    const savingsRatio = savings / income;
    let savingsScore = 0;
    if (savingsRatio >= 0.5) savingsScore = 25;
    else if (savingsRatio >= 0.3) savingsScore = 20;
    else if (savingsRatio >= 0.2) savingsScore = 15;
    else if (savingsRatio >= 0.1) savingsScore = 10;
    else savingsScore = 5;
    score += savingsScore;
    breakdown.savings = savingsScore;

    // Expense ratio factor (20% weight)
    const expenses = parseFloat(data.monthlyExpenses) || 0;
    const expenseRatio = expenses / income;
    let expenseScore = 0;
    if (expenseRatio <= 0.3) expenseScore = 20;
    else if (expenseRatio <= 0.4) expenseScore = 15;
    else if (expenseRatio <= 0.5) expenseScore = 12;
    else if (expenseRatio <= 0.6) expenseScore = 8;
    else expenseScore = 5;
    score += expenseScore;
    breakdown.expenses = expenseScore;

    // Employment stability (15% weight)
    let employmentScore = 0;
    switch (data.employmentType) {
      case 'government': employmentScore = 15; break;
      case 'salaried': employmentScore = 12; break;
      case 'self-employed': employmentScore = 10; break;
      case 'business-owner': employmentScore = 8; break;
      default: employmentScore = 5;
    }
    score += employmentScore;
    breakdown.employment = employmentScore;

    // Other factors (10% weight)
    let otherScore = 0;
    const dependents = parseInt(data.dependents) || 0;
    const age = parseInt(data.age) || 0;

    // Age factor
    if (age >= 25 && age <= 55) otherScore += 3;
    else if (age >= 21 && age <= 60) otherScore += 2;
    else otherScore += 1;

    // Dependents factor
    if (dependents <= 2) otherScore += 2;
    else if (dependents <= 4) otherScore += 1;
    else otherScore += 0;

    // Residence factor
    if (data.residenceType === 'owned') otherScore += 2;
    else if (data.residenceType === 'rented') otherScore += 1;

    // Education factor
    if (data.educationLevel === 'post-graduate') otherScore += 2;
    else if (data.educationLevel === 'graduate') otherScore += 1;

    score += otherScore;
    breakdown.other = otherScore;

    setCreditReadyScore(Math.min(100, Math.max(0, score)));
    setScoreBreakdown(breakdown);

    // Generate recommendations
    generateRecommendations(score, breakdown);
  }, [userData]);

  const generateRecommendations = (score, breakdown) => {
    const recs = [];

    if (breakdown.income < 15) {
      recs.push("Consider increasing your income through side hustles or skill development");
    }
    if (breakdown.savings < 15) {
      recs.push("Build an emergency fund of at least 3-6 months of expenses");
    }
    if (breakdown.expenses < 12) {
      recs.push("Track and reduce unnecessary expenses to improve your financial health");
    }
    if (breakdown.employment < 10) {
      recs.push("Consider stable employment options for better credit prospects");
    }
    if (score < 50) {
      recs.push("Start with secured credit cards to build credit history");
      recs.push("Pay all bills on time and maintain low utilization");
    } else if (score < 70) {
      recs.push("You're on the right track! Continue building good financial habits");
    } else {
      recs.push("Excellent financial foundation! Consider applying for credit products");
    }

    setRecommendations(recs);
  };

  useEffect(() => {
    if (Object.values(userData).some(value => value !== '')) {
      calculateCreditReadyScore();
    }
  }, [userData, calculateCreditReadyScore]);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const chartData = {
    labels: ['Income', 'Savings', 'Expenses', 'Employment', 'Other'],
    datasets: [{
      data: [
        scoreBreakdown.income || 0,
        scoreBreakdown.savings || 0,
        scoreBreakdown.expenses || 0,
        scoreBreakdown.employment || 0,
        scoreBreakdown.other || 0
      ],
      backgroundColor: [
        '#4CAF50',
        '#2196F3',
        '#FF9800',
        '#9C27B0',
        '#607D8B'
      ],
      borderWidth: 2
    }]
  };

  const getScoreColor = (score) => {
    if (score >= 70) return '#4CAF50';
    if (score >= 50) return '#FF9800';
    return '#F44336';
  };

  const getScoreLabel = (score) => {
    if (score >= 70) return 'Excellent';
    if (score >= 50) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="credit-ready-score">
      <div className="score-header">
        <h2>Credit-Ready Score</h2>
        <p>For users with no credit history - based on your financial profile</p>
      </div>

      <div className="score-display">
        <div className="score-circle" style={{ borderColor: getScoreColor(creditReadyScore) }}>
          <div className="score-number">{creditReadyScore}</div>
          <div className="score-label">{getScoreLabel(creditReadyScore)}</div>
        </div>

        {creditReadyScore > 0 && (
          <div className="score-breakdown">
            <h3>Score Breakdown</h3>
            <Doughnut data={chartData} options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels: { padding: 20, usePointStyle: true }
                }
              }
            }} />
          </div>
        )}
      </div>

      <div className="input-form">
        <h3>Enter Your Financial Details</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Monthly Income (₹)</label>
            <input
              type="number"
              value={userData.monthlyIncome}
              onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
              placeholder="50000"
            />
          </div>

          <div className="form-group">
            <label>Employment Type</label>
            <select
              value={userData.employmentType}
              onChange={(e) => handleInputChange('employmentType', e.target.value)}
            >
              <option value="government">Government Employee</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-Employed</option>
              <option value="business-owner">Business Owner</option>
              <option value="student">Student</option>
            </select>
          </div>

          <div className="form-group">
            <label>Total Savings (₹)</label>
            <input
              type="number"
              value={userData.savingsAmount}
              onChange={(e) => handleInputChange('savingsAmount', e.target.value)}
              placeholder="200000"
            />
          </div>

          <div className="form-group">
            <label>Monthly Expenses (₹)</label>
            <input
              type="number"
              value={userData.monthlyExpenses}
              onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
              placeholder="25000"
            />
          </div>

          <div className="form-group">
            <label>Number of Dependents</label>
            <input
              type="number"
              value={userData.dependents}
              onChange={(e) => handleInputChange('dependents', e.target.value)}
              placeholder="2"
            />
          </div>

          <div className="form-group">
            <label>Residence Type</label>
            <select
              value={userData.residenceType}
              onChange={(e) => handleInputChange('residenceType', e.target.value)}
            >
              <option value="owned">Owned</option>
              <option value="rented">Rented</option>
              <option value="with-family">Living with Family</option>
            </select>
          </div>

          <div className="form-group">
            <label>Education Level</label>
            <select
              value={userData.educationLevel}
              onChange={(e) => handleInputChange('educationLevel', e.target.value)}
            >
              <option value="post-graduate">Post Graduate</option>
              <option value="graduate">Graduate</option>
              <option value="under-graduate">Under Graduate</option>
              <option value="high-school">High School</option>
            </select>
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={userData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="30"
            />
          </div>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations">
          <h3>Personalized Recommendations</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CreditReadyScore;