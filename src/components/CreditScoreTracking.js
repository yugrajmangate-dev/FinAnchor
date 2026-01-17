import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function CreditScoreTracking() {
  const mockData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Credit Score',
        data: [700, 720, 710, 730, 750, 740],
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
    },
  };

  return (
    <div className="credit-score-tracking">
      <h2>Credit Score Tracking</h2>
      <Line data={mockData} options={options} />
      <div className="score-explanation">
        <h3>Score Explanation</h3>
        <p>Your credit score is 740. This is considered good. Factors affecting your score include payment history, credit utilization, and length of credit history.</p>
      </div>
    </div>
  );
}

export default CreditScoreTracking;