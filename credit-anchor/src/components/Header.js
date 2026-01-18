import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="financial-header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              <circle cx="12" cy="7" r="1.5" />
              <path d="M12 13v5M8 18h8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="logo-text">
            <h1 className="header-title">Fin Anchor</h1>
            <p className="header-subtitle">Manage Your Finances</p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="header-nav">
          <ul className="nav-list">
            <li><a href="#overview" className="nav-link">Overview</a></li>
            <li><a href="#loans" className="nav-link">Loans</a></li>
            <li><a href="#reports" className="nav-link">Reports</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
