import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CreditScoreTracking from './components/CreditScoreTracking';
import LoanComparison from './components/LoanComparison';
import LoanEligibility from './components/LoanEligibility';
import UserProfile from './components/UserProfile';
import WhatIfSimulator from './components/WhatIfSimulator';
import CreditRoadmap from './components/CreditRoadmap';
import Chatbot from './components/Chatbot';
import Planner from './components/planner';
import CreditReadyScore from './components/CreditReadyScore';
import LoanTrueCost from './components/LoanTrueCost';
import CreditHealthReport from './components/CreditHealthReport';
import LanguageSelector from './components/LanguageSelector';

function App() {
  return (
    <Router>
      <div className="App">
        <LanguageSelector />
        <Header />
        <nav className="navbar">
          <ul className="nav-menu">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/credit-score">Credit Score</Link></li>
            <li><Link to="/credit-ready">Credit-Ready Score</Link></li>
            <li><Link to="/simulator">What-If Simulator</Link></li>
            <li><Link to="/roadmap">Credit Roadmap</Link></li>
            <li><Link to="/loan-eligibility">Loan Eligibility</Link></li>
            <li><Link to="/loan-comparison">Loan Comparison</Link></li>
            <li><Link to="/loan-true-cost">Loan True Cost</Link></li>
            <li><Link to="/credit-report">Credit Report</Link></li>
            <li><Link to="/calculator">Calculator</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/credit-score" element={<CreditScoreTracking />} />
            <Route path="/credit-ready" element={<CreditReadyScore />} />
            <Route path="/simulator" element={<WhatIfSimulator />} />
            <Route path="/roadmap" element={<CreditRoadmap />} />
            <Route path="/loan-eligibility" element={<LoanEligibility />} />
            <Route path="/loan-comparison" element={<LoanComparison />} />
            <Route path="/loan-true-cost" element={<LoanTrueCost />} />
            <Route path="/credit-report" element={<CreditHealthReport />} />
            <Route path="/calculator" element={<Planner />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
