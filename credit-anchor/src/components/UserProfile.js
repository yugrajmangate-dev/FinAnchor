import React, { useState } from 'react';

function UserProfile() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    employmentType: '',
    user_id: ''
  });

  const [financialProfile, setFinancialProfile] = useState({
    monthlyIncome: '',
    expenses: '',
    savings: '',
    netSavings: '',
    existingEmi: '',
    monthlyNet: ''
  });

  // const []

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFinancialChange = (e) => {
    setFinancialProfile({ ...financialProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user and financial profile data (mock)
    console.log('User saved:', user);
    console.log('Financial Profile saved:', financialProfile);
  };

  return (
    <div className="user-profile">
      <h2>User Profile & Financial Inputs</h2>
      <form onSubmit={handleSubmit}>
        <h3>User Information</h3>
        <label>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleUserChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleUserChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={user.password} onChange={handleUserChange} required />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={user.age} onChange={handleUserChange} required />
        </label>
        <label>
          Employment Type:
          <select name="employmentType" value={user.employmentType} onChange={handleUserChange} required>
            <option value="">Select</option>
            <option value="salaried">Salaried</option>
            <option value="self-employed">Self-Employed</option>
            <option value="business">Business</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </label>

        <h3>Financial Profile</h3>
        <label>
          Monthly Income:
          <input type="number" name="monthlyIncome" value={financialProfile.monthlyIncome} onChange={handleFinancialChange} />
        </label>
        <label>
          Monthly Expenses:
          <input type="number" name="expenses" value={financialProfile.expenses} onChange={handleFinancialChange} />
        </label>
        <label>
          Savings:
          <input type="number" name="savings" value={financialProfile.savings} onChange={handleFinancialChange} />
        </label>
        <label>
          Net Savings:
          <input type="number" name="netSavings" value={financialProfile.netSavings} onChange={handleFinancialChange} />
        </label>
        <label>
          Existing EMI:
          <input type="number" name="existingEmi" value={financialProfile.existingEmi} onChange={handleFinancialChange} />
        </label>
        <label>
          Monthly NET:
          <input type="number" name="monthlyNet" value={financialProfile.monthlyNet} onChange={handleFinancialChange} />
        </label>

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}

export default UserProfile;