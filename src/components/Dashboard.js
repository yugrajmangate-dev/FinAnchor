import React from 'react';
import { Line, Doughnut, Bar, Pie, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler, BarElement, RadialLinearScale } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler, BarElement, RadialLinearScale);

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

  // New static data for enhancements
  const totalIncome = 100000; // Can be fetched from backend
  const totalExpenses = 80000; // Can be fetched from backend
  const netSurplus = totalIncome - totalExpenses;
  const currentCreditScore = 735;
  const dtiRatio = 32; // Percentage
  const currentDebts = [
    { type: 'Personal Loan', outstandingBalance: 500000, interestRate: 11.5 },
    { type: 'Home Loan', outstandingBalance: 2000000, interestRate: 8.5 }
  ];
  const upcomingEmi = { date: '2026-02-15', amount: 16200 };
  const repaymentProgress = [65, 45]; // Percentage paid for each loan

  // Credit Score Gauge Data
  const creditScoreGaugeData = {
    datasets: [{
      data: [currentCreditScore, 850 - currentCreditScore], // Assuming max 850
      backgroundColor: ['#4CAF50', '#E0E0E0'],
      borderWidth: 0,
    }],
  };

  const gaugeOptions = {
    responsive: true,
    cutout: '70%',
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  // Financial Overview Chart (Income vs Expenses vs Surplus)
  const financialOverviewData = {
    labels: ['Income', 'Expenses', 'Surplus'],
    datasets: [{
      label: 'Monthly Financial Overview (₹)',
      data: [totalIncome, totalExpenses, netSurplus],
      backgroundColor: ['#2196F3', '#FF9800', '#4CAF50'],
      borderRadius: 8,
      borderSkipped: false,
    }],
  };

  const financialOverviewOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      y: { beginAtZero: true }
    },
  };

  // Debt Distribution Pie Chart
  const debtDistributionData = {
    labels: currentDebts.map(debt => debt.type),
    datasets: [{
      data: currentDebts.map(debt => debt.outstandingBalance),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderColor: '#fff',
      borderWidth: 2,
    }],
  };

  const debtDistributionOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₹${context.parsed.toLocaleString()}`;
          }
        }
      }
    },
  };

  // EMI Payment Status Radar Chart
  const emiPaymentStatusData = {
    labels: loans.map((loan, idx) => `${loan.lender} EMI`),
    datasets: [{
      label: 'Payment Status (%)',
      data: repaymentProgress,
      borderColor: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.2)',
      borderWidth: 2,
      pointBackgroundColor: '#2196F3',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    }],
  };

  const emiPaymentStatusOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
      }
    }
  };

  return (
    <div className="dashboard">
      <h2>Main Dashboard</h2>

      {/* Net Monthly Surplus */}
      <div className="net-surplus" style={{
        background: netSurplus > 0 ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 'linear-gradient(135deg, #F44336 0%, #da190b 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}>
        <h3 style={{margin: '0 0 10px 0'}}>Net Monthly Surplus</h3>
        <p style={{fontSize: '28px', fontWeight: 'bold', margin: '10px 0'}}>₹{netSurplus.toLocaleString()}</p>
        <p style={{margin: '0', fontSize: '14px'}}>{netSurplus > 0 ? '✓ You are in the green!' : '⚠ You are in the red.'}</p>
      </div>

      {/* Financial Overview Chart */}
      <section className="financial-overview" style={{marginBottom: '30px'}}>
        <h3>Monthly Financial Overview</h3>
        <div style={{background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
          <Bar data={financialOverviewData} options={financialOverviewOptions} height={300} />
        </div>
      </section>

      {/* SECTION 1: Credit Health Summary */}
      <section className="credit-summary" style={{marginBottom: '30px'}}>
        <h3>Credit Health Summary</h3>
        <div className="summary-cards" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'}}>
          <div className="card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '2px solid #4CAF50'
          }}>
            <h4 style={{marginBottom: '15px'}}>Current Credit Score</h4>
            <div style={{height: '120px', marginBottom: '10px'}}>
              <Doughnut data={creditScoreGaugeData} options={gaugeOptions} />
            </div>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: '#4CAF50', margin: '10px 0'}}>{currentCreditScore}</p>
            <p style={{fontSize: '12px', color: '#666'}}>Out of 850</p>
          </div>
          <div className="card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '2px solid #2196F3'
          }}>
            <h4 style={{marginBottom: '15px'}}>Credit Status</h4>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: '#2196F3', margin: '20px 0'}}>Good</p>
            <p style={{fontSize: '12px', color: '#666'}}>Excellent payment history</p>
          </div>
          <div className="card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: `2px solid ${dtiRatio > 40 ? '#F44336' : '#4CAF50'}`
          }}>
            <h4 style={{marginBottom: '15px'}}>DTI Ratio</h4>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: dtiRatio > 40 ? '#F44336' : '#4CAF50', margin: '20px 0'}}>{dtiRatio}%</p>
            {dtiRatio > 40 ? <p style={{fontSize: '12px', color: '#F44336', fontWeight: 'bold'}}>⚠ High - Consider reducing debt</p> : <p style={{fontSize: '12px', color: '#666'}}>✓ Within healthy range</p>}
          </div>
          <div className="card" style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            border: '2px solid #FF9800'
          }}>
            <h4 style={{marginBottom: '15px'}}>EMI Capacity</h4>
            <p style={{fontSize: '24px', fontWeight: 'bold', color: '#FF9800', margin: '20px 0'}}>₹18,000</p>
            <p style={{fontSize: '12px', color: '#666'}}>Monthly affordability</p>
          </div>
        </div>
      </section>

      {/* SECTION 1.5: Current Debts */}
      <section className="current-debts" style={{marginBottom: '30px'}}>
        <h3>Current Debts</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
          <div style={{background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
            <h4 style={{marginBottom: '15px'}}>Debt Distribution</h4>
            <div style={{height: '300px'}}>
              <Pie data={debtDistributionData} options={debtDistributionOptions} />
            </div>
          </div>
          <div className="debts-cards" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            {currentDebts.map((debt, index) => (
              <div key={index} className="debt-card" style={{
                background: '#fff',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                borderLeft: `4px solid ${['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index]}`
              }}>
                <h4 style={{margin: '0 0 10px 0', color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index]}}>{debt.type}</h4>
                <p style={{margin: '5px 0'}}><strong>Balance:</strong> ₹{debt.outstandingBalance.toLocaleString()}</p>
                <p style={{margin: '5px 0'}}><strong>Interest Rate:</strong> <span style={{color: '#FF9800', fontWeight: 'bold'}}>{debt.interestRate}%</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 1.6: Upcoming EMI Calendar */}
      <section className="upcoming-emi" style={{marginBottom: '30px'}}>
        <h3>Upcoming EMI Calendar</h3>
        <div className="emi-card" style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{margin: '0 0 15px 0', fontSize: '18px'}}>Next Payment Due</h4>
          <p style={{fontSize: '28px', fontWeight: 'bold', margin: '10px 0'}}>₹{upcomingEmi.amount.toLocaleString()}</p>
          <p style={{fontSize: '14px', margin: '10px 0'}}>Due Date: <strong>{upcomingEmi.date}</strong></p>
          <p style={{fontSize: '12px', margin: '10px 0', opacity: 0.9}}>📅 Set a reminder</p>
        </div>
      </section>

      {/* SECTION 2: Credit Score Trend */}
      <section className="credit-trend" style={{marginBottom: '30px'}}>
        <h3>Credit Score Trend</h3>
        <div style={{background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
          <Line data={creditScoreData} options={options} height={300} />
        </div>
      </section>

      {/* SECTION 3: Loan Eligibility Result */}
      <section className="loan-eligibility" style={{marginBottom: '30px'}}>
        <h3>Loan Eligibility Result</h3>
        <div className="eligibility-card" style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          border: '2px solid #4CAF50'
        }}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
            <div>
              <p style={{marginBottom: '10px'}}><strong style={{fontSize: '14px', color: '#666'}}>Loan Type</strong></p>
              <p style={{fontSize: '18px', fontWeight: 'bold', color: '#2196F3'}}>Personal Loan</p>
            </div>
            <div>
              <p style={{marginBottom: '10px'}}><strong style={{fontSize: '14px', color: '#666'}}>Eligible Amount</strong></p>
              <p style={{fontSize: '18px', fontWeight: 'bold', color: '#4CAF50'}}>₹8,50,000</p>
            </div>
            <div>
              <p style={{marginBottom: '10px'}}><strong style={{fontSize: '14px', color: '#666'}}>Interest Rate</strong></p>
              <p style={{fontSize: '18px', fontWeight: 'bold', color: '#FF9800'}}>12%</p>
            </div>
            <div>
              <p style={{marginBottom: '10px'}}><strong style={{fontSize: '14px', color: '#666'}}>Status</strong></p>
              <p style={{fontSize: '18px', fontWeight: 'bold', color: '#4CAF50'}}>✓ Approved</p>
            </div>
          </div>
          <div className="progress-bar" style={{marginTop: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#666'}}>Eligibility Strength</label>
            <div className="progress" style={{
              background: '#E0E0E0',
              height: '12px',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <div className="progress-fill" style={{
                width: '85%',
                background: 'linear-gradient(90deg, #4CAF50 0%, #45a049 100%)',
                height: '100%',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
            <p style={{marginTop: '8px', fontSize: '12px', color: '#666', textAlign: 'right'}}>85% Strong</p>
          </div>
        </div>
      </section>

      {/* SECTION 4: EMI Calculator */}
      <section className="emi-calculator" style={{marginBottom: '30px'}}>
        <h3>EMI Calculator</h3>
        <div style={{background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
          <form style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px'}}>
            <label style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{fontWeight: 'bold', marginBottom: '8px', color: '#333'}}>Loan Amount</span>
              <div style={{position: 'relative'}}>
                <span style={{position: 'absolute', left: '10px', top: '10px', color: '#999', fontWeight: 'bold'}}>₹</span>
                <input type="number" defaultValue="500000" style={{
                  width: '100%',
                  padding: '10px 10px 10px 30px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }} />
              </div>
            </label>
            <label style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{fontWeight: 'bold', marginBottom: '8px', color: '#333'}}>Tenure</span>
              <input type="number" defaultValue="36" style={{
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }} />
              <span style={{fontSize: '12px', color: '#999', marginTop: '4px'}}>months</span>
            </label>
            <label style={{display: 'flex', flexDirection: 'column'}}>
              <span style={{fontWeight: 'bold', marginBottom: '8px', color: '#333'}}>Interest Rate</span>
              <div style={{position: 'relative'}}>
                <input type="number" defaultValue="12" step="0.1" style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }} />
                <span style={{position: 'absolute', right: '10px', top: '10px', color: '#999', fontWeight: 'bold'}}>%</span>
              </div>
            </label>
          </form>
          <div className="emi-results" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
          }}>
            <div>
              <p style={{margin: '0 0 5px 0', fontSize: '12px', opacity: 0.9}}>Calculated EMI</p>
              <p style={{fontSize: '24px', fontWeight: 'bold', margin: '0'}}>₹16,600</p>
            </div>
            <div>
              <p style={{margin: '0 0 5px 0', fontSize: '12px', opacity: 0.9}}>Total Repayment</p>
              <p style={{fontSize: '24px', fontWeight: 'bold', margin: '0'}}>₹5,97,600</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Loan Comparison Table */}
      <section className="loan-comparison" style={{marginBottom: '30px'}}>
        <h3>Loan Comparison with Repayment Progress</h3>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
          <div style={{background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>
            <h4 style={{marginBottom: '15px'}}>EMI Repayment Status</h4>
            <div style={{height: '300px'}}>
              <Radar data={emiPaymentStatusData} options={emiPaymentStatusOptions} />
            </div>
          </div>
          <div style={{background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflowX: 'auto'}}>
            <h4 style={{marginBottom: '15px'}}>Loan Details</h4>
            <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '14px'}}>
              <thead>
                <tr style={{borderBottom: '2px solid #ddd'}}>
                  <th style={{padding: '10px', textAlign: 'left', fontWeight: 'bold', color: '#333'}}>Lender</th>
                  <th style={{padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#333'}}>Interest</th>
                  <th style={{padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#333'}}>EMI</th>
                  <th style={{padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#333'}}>Tenure</th>
                  <th style={{padding: '10px', textAlign: 'center', fontWeight: 'bold', color: '#333'}}>Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan, index) => (
                  <tr key={index} style={{borderBottom: '1px solid #eee'}}>
                    <td style={{padding: '10px', color: '#333'}}>{loan.lender}</td>
                    <td style={{padding: '10px', textAlign: 'center', color: '#FF9800', fontWeight: 'bold'}}>{loan.interest}%</td>
                    <td style={{padding: '10px', textAlign: 'center', color: '#2196F3', fontWeight: 'bold'}}>₹{loan.emi.toLocaleString()}</td>
                    <td style={{padding: '10px', textAlign: 'center', color: '#666'}}>{loan.tenure} mo</td>
                    <td style={{padding: '10px', textAlign: 'center', color: '#4CAF50', fontWeight: 'bold'}}>₹{loan.totalCost.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Detailed Progress Bars */}
        <div style={{background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginTop: '20px'}}>
          <h4 style={{marginBottom: '15px'}}>Repayment Progress</h4>
          {loans.map((loan, index) => (
            <div key={index} style={{marginBottom: '20px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                <span style={{fontWeight: 'bold', color: '#333'}}>{loan.lender}</span>
                <span style={{color: '#666', fontWeight: 'bold'}}>{repaymentProgress[index]}% Paid</span>
              </div>
              <div style={{
                background: '#E0E0E0',
                height: '16px',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${repaymentProgress[index]}%`,
                  background: `linear-gradient(90deg, ${repaymentProgress[index] > 60 ? '#4CAF50' : '#FF9800'} 0%, ${repaymentProgress[index] > 60 ? '#45a049' : '#F57C00'} 100%)`,
                  height: '100%',
                  transition: 'width 0.3s ease'
                }}></div>
              </div>
              <p style={{fontSize: '12px', color: '#999', marginTop: '5px'}}>Remaining: {100 - repaymentProgress[index]}%</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: Credit Improvement Tips */}
      <section className="credit-tips" style={{marginBottom: '30px'}}>
        <h3>Credit Improvement Tips</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'}}>
          {[
            { icon: '⏰', title: 'Pay EMIs on Time', desc: 'Always pay EMIs before due date to maintain payment history' },
            { icon: '📊', title: 'Reduce Credit Utilization', desc: 'Keep utilization below 30% for better credit health' },
            { icon: '🔍', title: 'Avoid Multiple Enquiries', desc: 'Multiple enquiries can negatively impact your score' },
            { icon: '💳', title: 'Diversify Credit Mix', desc: 'Have a mix of credit cards, loans for better score' }
          ].map((tip, index) => (
            <div key={index} style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '2px solid #E0E0E0',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <div style={{fontSize: '32px', marginBottom: '10px'}}>{tip.icon}</div>
              <h4 style={{margin: '0 0 10px 0', color: '#2196F3'}}>{tip.title}</h4>
              <p style={{margin: '0', fontSize: '13px', color: '#666', lineHeight: '1.4'}}>{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;