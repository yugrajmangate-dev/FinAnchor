import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';

// Import components
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

const navItems = [
  { path: '/',                 label: 'Dashboard',    icon: '🏠' },
  { path: '/credit-score',     label: 'Credit Score', icon: '📈' },
  { path: '/credit-ready',     label: 'Credit-Ready', icon: '✅' },
  { path: '/simulator',        label: 'Simulator',    icon: '🧪' },
  { path: '/roadmap',          label: 'Roadmap',      icon: '🗺️' },
  { path: '/loan-eligibility', label: 'Eligibility',  icon: '🏦' },
  { path: '/loan-comparison',  label: 'Compare',      icon: '⚖️' },
  { path: '/loan-true-cost',   label: 'True Cost',    icon: '💰' },
  { path: '/credit-report',    label: 'Report',       icon: '📋' },
  { path: '/calculator',       label: 'Calculator',   icon: '🧮' },
  { path: '/profile',          label: 'Profile',      icon: '👤' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">

        {/* ── Navbar ── */}
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/" className="brand-link" onClick={() => setMenuOpen(false)}>
              <span className="navbar-logo">⚓</span>
              <h1 className="navbar-title">FinAnchor</h1>
            </Link>
          </div>

          <button
            className={`hamburger-btn${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>

          <ul className={`nav-menu${menuOpen ? ' nav-menu--open' : ''}`}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="nav-item-icon">{item.icon}</span>
                  <span className="nav-item-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
            <li className="nav-lang-item">
              <LanguageSelector />
            </li>
          </ul>
        </nav>

        {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}

        {/* ── Page Content ── */}
        <main>
          <Routes>
            <Route path="/"                 element={<Dashboard />} />
            <Route path="/credit-score"     element={<CreditScoreTracking />} />
            <Route path="/credit-ready"     element={<CreditReadyScore />} />
            <Route path="/simulator"        element={<WhatIfSimulator />} />
            <Route path="/roadmap"          element={<CreditRoadmap />} />
            <Route path="/loan-eligibility" element={<LoanEligibility />} />
            <Route path="/loan-comparison"  element={<LoanComparison />} />
            <Route path="/loan-true-cost"   element={<LoanTrueCost />} />
            <Route path="/credit-report"    element={<CreditHealthReport />} />
            <Route path="/calculator"       element={<Planner />} />
            <Route path="/profile"          element={<UserProfile />} />
          </Routes>
        </main>

        {/* ── Footer ── */}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <span>⚓</span>
              <span>FinAnchor</span>
            </div>
            <p className="footer-tagline">Your trusted financial compass — empowering smarter credit decisions.</p>
            <div className="footer-links">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="footer-link">{item.label}</Link>
              ))}
            </div>
            <p className="footer-copy">
              © {new Date().getFullYear()} FinAnchor · Live at{' '}
              <a href="https://fin-anchor.vercel.app" target="_blank" rel="noreferrer" className="footer-live-link">
                fin-anchor.vercel.app
              </a>
            </p>
          </div>
        </footer>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
