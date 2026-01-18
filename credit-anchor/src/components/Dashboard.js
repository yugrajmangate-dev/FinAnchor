import React, { useState, useEffect } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler, BarElement, RadialLinearScale } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler, BarElement, RadialLinearScale);

// v2.0 - Enhanced Dashboard with Mobile Responsive Design
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

function Dashboard() {
  const [hoveredMetric, setHoveredMetric] = useState(null);

  // Mock data
  const creditScoreData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Credit Score',
        data: [700, 720, 710, 730, 750, 735],
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const financialOverviewData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [50000, 52000, 51000, 53000, 54000, 55000],
        backgroundColor: 'rgba(76, 175, 80, 0.6)',
        borderRadius: 8,
      },
      {
        label: 'Expenses',
        data: [35000, 36000, 35500, 37000, 38000, 39000],
        backgroundColor: 'rgba(244, 67, 54, 0.6)',
        borderRadius: 8,
      },
    ],
  };

  const debtDistributionData = {
    labels: ['Home Loan', 'Car Loan', 'Personal Loan', 'Credit Card'],
    datasets: [
      {
        data: [5000000, 800000, 200000, 50000],
        backgroundColor: ['#1e40af', '#dc2626', '#9333ea', '#ea580c'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const repaymentData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Home Loan',
        data: [80, 82, 85, 87, 88, 90],
        borderColor: '#1e40af',
        backgroundColor: 'rgba(30, 64, 175, 0.1)',
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Car Loan',
        data: [60, 65, 70, 72, 75, 77],
        borderColor: '#dc2626',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          font: { size: 12, family: "'Inter', sans-serif" },
          padding: 15,
          color: '#666',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 12 },
        padding: 12,
        borderRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { font: { size: 11 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
    },
  };

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h2>Your Financial Dashboard</h2>
        <p>Monitor your credit score, loans, and financial metrics at a glance</p>
      </div>

      {/* Key Metrics Section */}
      <div className="metrics-grid">
        <div 
          className={`metric-card ${hoveredMetric === 0 ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredMetric(0)}
          onMouseLeave={() => setHoveredMetric(null)}
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          <div className="metric-icon">📊</div>
          <h3>Credit Score</h3>
          <div className="metric-value"><AnimatedCounter target={735} suffix="" /></div>
          <p className="metric-label">out of 850</p>
          <p className="metric-change">↑ 35 points this year</p>
        </div>

        <div 
          className={`metric-card ${hoveredMetric === 1 ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredMetric(1)}
          onMouseLeave={() => setHoveredMetric(null)}
          style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}
        >
          <div className="metric-icon">💰</div>
          <h3>Monthly Surplus</h3>
          <div className="metric-value">₹<AnimatedCounter target={16000} suffix="" /></div>
          <p className="metric-label">Available funds</p>
          <p className="metric-change">↑ 12% from last month</p>
        </div>

        <div 
          className={`metric-card ${hoveredMetric === 2 ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredMetric(2)}
          onMouseLeave={() => setHoveredMetric(null)}
          style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}
        >
          <div className="metric-icon">💳</div>
          <h3>Total Debt</h3>
          <div className="metric-value">₹<AnimatedCounter target={6050000} suffix="" /></div>
          <p className="metric-label">All loans & credit</p>
          <p className="metric-change">↓ 2% from last month</p>
        </div>

        <div 
          className={`metric-card ${hoveredMetric === 3 ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredMetric(3)}
          onMouseLeave={() => setHoveredMetric(null)}
          style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}
        >
          <div className="metric-icon">📈</div>
          <h3>DTI Ratio</h3>
          <div className="metric-value"><AnimatedCounter target={65} suffix="%" /></div>
          <p className="metric-label">Debt to income</p>
          <p className="metric-change">Good - Keep improving</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart-container half-width">
          <h3 className="chart-title">💹 Financial Overview</h3>
          <div className="chart-wrapper" style={{ height: '300px' }}>
            <Bar data={financialOverviewData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-container half-width">
          <h3 className="chart-title">🥧 Debt Distribution</h3>
          <div className="chart-wrapper" style={{ height: '300px' }}>
            <Pie data={debtDistributionData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Active Loans Section */}
      <div className="section-card">
        <h2 className="section-title">📋 Active Loans</h2>
        <div className="loans-grid">
          <div className="loan-card">
            <div className="loan-header">
              <h4>Home Loan</h4>
              <span className="loan-status active">Active</span>
            </div>
            <div className="loan-details">
              <div className="loan-detail">
                <span className="detail-label">Principal Amount</span>
                <span className="detail-value">₹50,00,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-label">Current Balance</span>
                <span className="detail-value">₹45,00,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-label">Monthly EMI</span>
                <span className="detail-value">₹45,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-label">Interest Rate</span>
                <span className="detail-value">7.5%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '90%', backgroundColor: '#1e40af' }}></div>
              </div>
            </div>
          </div>

          <div className="loan-card">
            <div className="loan-header">
              <h4>Car Loan</h4>
              <span className="loan-status active">Active</span>
            </div>
            <div className="loan-details">
              <div className="loan-detail">
                <span className="detail-label">Principal Amount</span>
                <span className="detail-value">₹8,00,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-label">Current Balance</span>
                <span className="detail-value">₹5,20,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-label">Monthly EMI</span>
                <span className="detail-value">₹12,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-label">Interest Rate</span>
                <span className="detail-value">8.2%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '65%', backgroundColor: '#dc2626' }}></div>
              </div>
            </div>
          </div>

          <div className="loan-card">
            <div className="loan-header">
              <h4>Personal Loan</h4>
              <span className="loan-status active">Active</span>
            </div>
            <div className="loan-details">
              <div className="loan-detail">
                <span className="detail-label">Principal Amount</span>
                <span className="detail-value">₹2,00,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-label">Current Balance</span>
                <span className="detail-value">₹1,50,000</span>
              </div>
              <div className="loan-detail">
                <span className="detail-label">Monthly EMI</span>
                <span className="detail-value">₹5,500</span>
              </div>
              <div className="loan-detail">
                <span className="detail-label">Interest Rate</span>
                <span className="detail-value">11.5%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%', backgroundColor: '#9333ea' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Score Trend */}
      <div className="section-card">
        <h2 className="section-title">📉 Credit Score Trend</h2>
        <div style={{ height: '300px' }}>
          <Line data={creditScoreData} options={chartOptions} />
        </div>
      </div>

      {/* Upcoming EMI Section */}
      <div className="upcoming-emi-section" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <h2>⏰ Upcoming EMI Payments</h2>
        <div className="emi-list">
          <div className="emi-item">
            <div className="emi-details">
              <h4>Home Loan EMI</h4>
              <p>Due on: 5th Jan, 2025</p>
            </div>
            <div className="emi-amount">₹45,000</div>
          </div>
          <div className="emi-item">
            <div className="emi-details">
              <h4>Car Loan EMI</h4>
              <p>Due on: 10th Jan, 2025</p>
            </div>
            <div className="emi-amount">₹12,000</div>
          </div>
          <div className="emi-item">
            <div className="emi-details">
              <h4>Personal Loan EMI</h4>
              <p>Due on: 12th Jan, 2025</p>
            </div>
            <div className="emi-amount">₹5,500</div>
          </div>
        </div>
      </div>

      {/* EMI Repayment Progress */}
      <div className="section-card">
        <h2 className="section-title">📊 EMI Repayment Progress</h2>
        <div className="repayment-grid">
          <div style={{ height: '300px', flex: 1 }}>
            <Line data={repaymentData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Loan Comparison Table */}
      <div className="section-card">
        <h2 className="section-title">🔍 Loan Comparison</h2>
        <table className="loan-table">
          <thead>
            <tr>
              <th>Loan Type</th>
              <th>Principal</th>
              <th>Current Balance</th>
              <th>Monthly EMI</th>
              <th>Interest Rate</th>
              <th>Remaining Tenure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Home Loan</td>
              <td>₹50,00,000</td>
              <td>₹45,00,000</td>
              <td>₹45,000</td>
              <td>7.5%</td>
              <td>10 years</td>
            </tr>
            <tr>
              <td>Car Loan</td>
              <td>₹8,00,000</td>
              <td>₹5,20,000</td>
              <td>₹12,000</td>
              <td>8.2%</td>
              <td>4 years</td>
            </tr>
            <tr>
              <td>Personal Loan</td>
              <td>₹2,00,000</td>
              <td>₹1,50,000</td>
              <td>₹5,500</td>
              <td>11.5%</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>Credit Card</td>
              <td>₹50,000</td>
              <td>₹15,000</td>
              <td>Varies</td>
              <td>2.5%</td>
              <td>N/A</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Credit Improvement Tips */}
      <div className="section-card">
        <h2 className="section-title">💡 Credit Improvement Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">✅</div>
            <h4>Pay on Time</h4>
            <p>Set up automatic payments to ensure you never miss a due date. Even one late payment can significantly impact your credit score.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">📉</div>
            <h4>Lower Credit Usage</h4>
            <p>Keep your credit card utilization below 30%. This shows lenders that you can manage credit responsibly.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🔒</div>
            <h4>Maintain Mix</h4>
            <p>Having different types of credit (secured & unsecured) positively impacts your score. Keep all accounts active.</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🛡️</div>
            <h4>Monitor Reports</h4>
            <p>Check your credit report regularly for errors. Dispute any inaccuracies immediately to protect your score.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
