import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  // Mock data
  const creditScoreData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Credit Score',
        data: [700, 720, 710, 730, 750, 735],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Credit Score Trend',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Score: ${context.parsed.y} - Score improved due to timely payments`;
          }
        }
      }
    },
  };

  const loans = [
    { lender: 'Bank A', interest: 11.5, emi: 16200, tenure: 36, totalCost: 583200 },
    { lender: 'NBFC B', interest: 13, emi: 17000, tenure: 36, totalCost: 612000 }
  ];

  return (
    <div className="dashboard">
      <h2>Main Dashboard</h2>

      {/* SECTION 1: Credit Health Summary */}
      <section className="credit-summary">
        <h3>Credit Health Summary</h3>
        <div className="summary-cards">
          <div className="card">
            <h4>Credit Score</h4>
            <p>735</p>
          </div>
          <div className="card">
            <h4>Credit Status</h4>
            <p>Good</p>
          </div>
          <div className="card">
            <h4>DTI Ratio</h4>
            <p>32%</p>
          </div>
          <div className="card">
            <h4>EMI Capacity</h4>
            <p>₹18,000</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Credit Score Trend */}
      <section className="credit-trend">
        <h3>Credit Score Trend</h3>
        <Line data={creditScoreData} options={options} />
      </section>

      {/* SECTION 3: Loan Eligibility Result */}
      <section className="loan-eligibility">
        <h3>Loan Eligibility Result</h3>
        <div className="eligibility-card">
          <p><strong>Loan Type:</strong> Personal Loan</p>
          <p><strong>Eligible Amount:</strong> ₹8,50,000</p>
          <p><strong>Status:</strong> Approved</p>
          <p><strong>Interest Rate:</strong> 12%</p>
          <div className="progress-bar">
            <label>Eligibility Strength</label>
            <div className="progress">
              <div className="progress-fill" style={{width: '85%'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: EMI Calculator */}
      <section className="emi-calculator">
        <h3>EMI Calculator</h3>
        <form>
          <label>
            Loan Amount: ₹
            <input type="number" defaultValue="500000" />
          </label>
          <label>
            Tenure: 
            <input type="number" defaultValue="36" /> months
          </label>
          <label>
            Interest: 
            <input type="number" defaultValue="12" step="0.1" /> %
          </label>
        </form>
        <div className="emi-results">
          <p><strong>Calculated EMI:</strong> ₹16,600</p>
          <p><strong>Total Repayment:</strong> ₹5,97,600</p>
        </div>
      </section>

      {/* SECTION 5: Loan Comparison Table */}
      <section className="loan-comparison">
        <h3>Loan Comparison Table</h3>
        <table>
          <thead>
            <tr>
              <th>Lender</th>
              <th>Interest</th>
              <th>EMI</th>
              <th>Tenure</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, index) => (
              <tr key={index}>
                <td>{loan.lender}</td>
                <td>{loan.interest}%</td>
                <td>₹{loan.emi.toLocaleString()}</td>
                <td>{loan.tenure}</td>
                <td>₹{loan.totalCost.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* SECTION 6: Credit Improvement Tips */}
      <section className="credit-tips">
        <h3>Credit Improvement Tips</h3>
        <ul>
          <li>Pay EMIs before due date</li>
          <li>Reduce credit utilization below 30%</li>
          <li>Avoid multiple loan enquiries</li>
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;