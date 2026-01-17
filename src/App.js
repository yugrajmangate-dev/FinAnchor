import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import LoanEligibility from './components/LoanEligibility';
import LoanComparison from './components/LoanComparison';
import CreditScoreTracking from './components/CreditScoreTracking';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>FinAnchor</h1>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/profile">User Profile</Link></li>
          <li><Link to="/eligibility">Loan Eligibility</Link></li>
          <li><Link to="/comparison">Loan Comparison</Link></li>
          <li><Link to="/credit-score">Credit Score</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/eligibility" element={<LoanEligibility />} />
        <Route path="/comparison" element={<LoanComparison />} />
        <Route path="/credit-score" element={<CreditScoreTracking />} />
      </Routes>
    </div>
  );
}

export default App;
