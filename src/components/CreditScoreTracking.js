import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CreditScoreTracking() {
  const creditScoreHistory = [700, 720, 710, 730, 750, 740, 755, 740];
  const currentScore = creditScoreHistory[creditScoreHistory.length - 1];
  
  // Determine credit health based on score
  const getHealthStatus = (score) => {
    if (score >= 750) return { status: 'Excellent', color: '#2ecc71', range: '750+' };
    if (score >= 700) return { status: 'Good', color: '#3498db', range: '700-749' };
    if (score >= 650) return { status: 'Fair', color: '#f39c12', range: '650-699' };
    return { status: 'Poor', color: '#e74c3c', range: 'Below 650' };
  };

  const health = getHealthStatus(currentScore);

  const mockData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Credit Score',
        data: creditScoreHistory,
        borderColor: '#000000',
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderWidth: 2,
        pointBackgroundColor: '#000000',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: 'bold',
          },
          color: '#000000',
        },
      },
      title: {
        display: true,
        text: 'Credit Score Trend Over Time',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#000000',
        padding: 15,
      },
      tooltip: {
        backgroundColor: '#000000',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#cccccc',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 600,
        max: 800,
        ticks: {
          color: '#666666',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
      x: {
        ticks: {
          color: '#666666',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
      },
    },
  };

  return (
    <div className="credit-score-tracking">
      <h2>Credit Score Tracking</h2>
      
      <div className="score-cards-container">
        <div className="score-card current-score">
          <h3>Current Credit Score</h3>
          <div className="score-display">{currentScore}</div>
          <p className="score-range">(Out of 900)</p>
        </div>
        
        <div className="score-card health-card">
          <h3>Credit Health</h3>
          <div className="health-badge" style={{ borderColor: health.color, backgroundColor: health.color + '15' }}>
            <span className="health-indicator" style={{ backgroundColor: health.color }}></span>
            <span className="health-text">{health.status}</span>
          </div>
          <p className="health-range">Range: {health.range}</p>
        </div>
      </div>

      <div className="chart-container">
        <Line data={mockData} options={options} />
      </div>

      <div className="score-explanation">
        <h3>Score Breakdown & Tips</h3>
        <ul>
          <li><strong>Current Score:</strong> {currentScore} - {health.status} credit</li>
          <li><strong>Trend:</strong> Your score has {currentScore > creditScoreHistory[0] ? 'improved' : 'declined'} by {Math.abs(currentScore - creditScoreHistory[0])} points over the tracked period</li>
          <li><strong>Factors Affecting Your Score:</strong> Payment history, credit utilization, length of credit history, credit mix, and recent inquiries</li>
          <li><strong>Tips to Improve:</strong> Pay bills on time, reduce credit card balances, avoid opening too many accounts at once</li>
        </ul>
      </div>
    </div>
  );
}

export default CreditScoreTracking;