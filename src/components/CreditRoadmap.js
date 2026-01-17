import React, { useState } from 'react';

function CreditRoadmap() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [points, setPoints] = useState(0);

  const tasks = [
    {
      id: 1,
      title: 'Complete "How Interest Works" Module',
      description: 'Learn the basics of interest calculation in 2 minutes',
      points: 50,
      completed: completedTasks.includes(1),
      content: (
        <div>
          <h4>How Interest Works</h4>
          <p>Interest is the cost of borrowing money. It's calculated as a percentage of the principal amount.</p>
          <p><strong>Simple Interest:</strong> Interest = Principal × Rate × Time</p>
          <p><strong>Compound Interest:</strong> Interest is earned on both principal and previously earned interest.</p>
          <p>Understanding this helps you make better financial decisions!</p>
        </div>
      )
    },
    {
      id: 2,
      title: 'Set up a Mock Savings Goal',
      description: 'Demonstrate financial consistency by setting a savings target',
      points: 75,
      completed: completedTasks.includes(2),
      content: (
        <div>
          <h4>Savings Goal Setup</h4>
          <form className="savings-form">
            <label>
              Goal Name:
              <input type="text" placeholder="e.g., Emergency Fund" />
            </label>
            <label>
              Target Amount: ₹
              <input type="number" placeholder="50000" />
            </label>
            <label>
              Timeframe:
              <select>
                <option>3 months</option>
                <option>6 months</option>
                <option>1 year</option>
              </select>
            </label>
            <label>
              Monthly Savings: ₹
              <input type="number" placeholder="5000" />
            </label>
          </form>
          <p>Setting and achieving savings goals shows lenders you're financially responsible!</p>
        </div>
      )
    },
    {
      id: 3,
      title: 'Track Your First Credit Payment',
      description: 'Make and track your first on-time payment',
      points: 100,
      completed: completedTasks.includes(3),
      content: (
        <div>
          <h4>Payment Tracking</h4>
          <p>Record your payment details below:</p>
          <form className="payment-form">
            <label>
              Payment Amount: ₹
              <input type="number" />
            </label>
            <label>
              Due Date:
              <input type="date" />
            </label>
            <label>
              Payment Date:
              <input type="date" />
            </label>
            <label>
              <input type="checkbox" /> Payment made on time
            </label>
          </form>
        </div>
      )
    }
  ];

  const completeTask = (taskId) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId]);
      const task = tasks.find(t => t.id === taskId);
      setPoints(points + task.points);
    }
  };

  const totalPoints = tasks.reduce((sum, task) => sum + task.points, 0);
  const progressPercentage = (completedTasks.length / tasks.length) * 100;

  return (
    <div className="credit-roadmap">
      <h2>Credit-Ready Roadmap</h2>
      <p>Turn your credit journey into an engaging learning experience. Complete tasks to earn points and improve your financial knowledge!</p>

      <div className="roadmap-header">
        <div className="points-display">
          <h3>Your Points: {points} / {totalPoints}</h3>
          <div className="progress-bar">
            <div className="progress">
              <div className="progress-fill" style={{width: `${progressPercentage}%`}}></div>
            </div>
            <p>{Math.round(progressPercentage)}% Complete</p>
          </div>
        </div>
      </div>

      <div className="tasks-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
            <div className="task-header">
              <h4>{task.title}</h4>
              <span className="points-badge">+{task.points} points</span>
            </div>
            <p>{task.description}</p>

            {!task.completed && (
              <div className="task-content">
                {task.content}
                <button onClick={() => completeTask(task.id)} className="complete-btn">
                  Mark as Complete
                </button>
              </div>
            )}

            {task.completed && (
              <div className="task-completed">
                <span className="checkmark">✓</span>
                <p>Completed! You earned {task.points} points.</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="roadmap-benefits">
        <h3>Why This Matters</h3>
        <ul>
          <li><strong>SDG 4 Alignment:</strong> Quality Education through interactive financial learning</li>
          <li><strong>SDG 8 Alignment:</strong> Decent Work and Economic Growth via financial empowerment</li>
          <li><strong>Active Management:</strong> Shift from passive tracking to proactive improvement</li>
          <li><strong>Gamification:</strong> Makes learning fun and rewarding</li>
        </ul>
      </div>
    </div>
  );
}

export default CreditRoadmap;