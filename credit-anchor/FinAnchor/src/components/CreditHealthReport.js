import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './CreditHealthReport.css';

function CreditHealthReport() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    creditScore: '',
    monthlyIncome: '',
    monthlyExpenses: '',
    totalDebt: '',
    savings: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generatePDF = async () => {
    if (!userData.name || !userData.email) {
      alert('Please fill in your name and email to generate the report.');
      return;
    }

    setIsGenerating(true);

    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yPosition = 20;

      // Header
      pdf.setFontSize(24);
      pdf.setTextColor(76, 175, 80);
      pdf.text('FinAnchor Credit Health Report', pageWidth / 2, yPosition, { align: 'center' });

      yPosition += 15;
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });

      yPosition += 20;

      // Personal Information
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Personal Information', 20, yPosition);

      yPosition += 15;
      pdf.setFontSize(11);
      pdf.setTextColor(50, 50, 50);

      const personalInfo = [
        `Name: ${userData.name}`,
        `Email: ${userData.email}`,
        `Phone: ${userData.phone || 'Not provided'}`,
        `Report Date: ${new Date().toLocaleDateString()}`
      ];

      personalInfo.forEach(info => {
        pdf.text(info, 25, yPosition);
        yPosition += 8;
      });

      yPosition += 10;

      // Credit Score Section
      if (userData.creditScore) {
        pdf.setFontSize(16);
        pdf.setTextColor(0, 0, 0);
        pdf.text('Credit Score Analysis', 20, yPosition);

        yPosition += 15;
        pdf.setFontSize(11);
        pdf.setTextColor(50, 50, 50);

        const score = parseInt(userData.creditScore);
        let scoreCategory = '';
        let scoreColor = [0, 0, 0];

        if (score >= 750) {
          scoreCategory = 'Excellent';
          scoreColor = [76, 175, 80];
        } else if (score >= 650) {
          scoreCategory = 'Good';
          scoreColor = [255, 152, 0];
        } else if (score >= 550) {
          scoreCategory = 'Fair';
          scoreColor = [255, 87, 34];
        } else {
          scoreCategory = 'Poor';
          scoreColor = [244, 67, 54];
        }

        pdf.setTextColor(...scoreColor);
        pdf.setFontSize(14);
        pdf.text(`Credit Score: ${score} (${scoreCategory})`, 25, yPosition);

        yPosition += 15;
        pdf.setFontSize(11);
        pdf.setTextColor(50, 50, 50);

        const scoreInsights = [
          'Credit score ranges: 300-549 (Poor), 550-649 (Fair), 650-749 (Good), 750-900 (Excellent)',
          'Your score indicates your creditworthiness for loans and financial products',
          'Higher scores typically qualify for better interest rates and loan terms'
        ];

        scoreInsights.forEach(insight => {
          pdf.text(`• ${insight}`, 25, yPosition);
          yPosition += 8;
        });
      }

      yPosition += 10;

      // Financial Overview
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Financial Overview', 20, yPosition);

      yPosition += 15;
      pdf.setFontSize(11);
      pdf.setTextColor(50, 50, 50);

      const income = parseFloat(userData.monthlyIncome) || 0;
      const expenses = parseFloat(userData.monthlyExpenses) || 0;
      const debt = parseFloat(userData.totalDebt) || 0;
      const savings = parseFloat(userData.savings) || 0;

      const financialData = [
        `Monthly Income: ₹${income.toLocaleString()}`,
        `Monthly Expenses: ₹${expenses.toLocaleString()}`,
        `Total Debt: ₹${debt.toLocaleString()}`,
        `Total Savings: ₹${savings.toLocaleString()}`,
        `Debt-to-Income Ratio: ${income > 0 ? ((debt / income) * 100).toFixed(1) : 0}%`,
        `Savings Rate: ${income > 0 ? ((savings / income) * 100).toFixed(1) : 0}% of income`
      ];

      financialData.forEach(data => {
        pdf.text(data, 25, yPosition);
        yPosition += 8;
      });

      yPosition += 10;

      // Recommendations
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Personalized Recommendations', 20, yPosition);

      yPosition += 15;
      pdf.setFontSize(11);
      pdf.setTextColor(50, 50, 50);

      const recommendations = [];

      if (income > 0 && expenses > 0) {
        const expenseRatio = expenses / income;
        if (expenseRatio > 0.7) {
          recommendations.push('Consider reducing monthly expenses to improve financial health');
        }
      }

      if (debt > 0 && income > 0) {
        const dtiRatio = debt / income;
        if (dtiRatio > 0.4) {
          recommendations.push('High debt-to-income ratio detected. Consider debt consolidation or reduction strategies');
        }
      }

      if (savings < income * 0.1) {
        recommendations.push('Build an emergency fund of at least 3-6 months of expenses');
      }

      if (userData.creditScore && parseInt(userData.creditScore) < 650) {
        recommendations.push('Focus on improving credit score through timely payments and low utilization');
      }

      recommendations.push('Regularly monitor your credit report for accuracy');
      recommendations.push('Consider diversifying your credit mix for better scores');
      recommendations.push('Maintain low credit utilization (below 30%)');

      recommendations.forEach(rec => {
        pdf.text(`• ${rec}`, 25, yPosition);
        yPosition += 8;

        // Check if we need a new page
        if (yPosition > pageHeight - 30) {
          pdf.addPage();
          yPosition = 20;
        }
      });

      yPosition += 20;

      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text('This report is generated by FinAnchor for educational purposes only.', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;
      pdf.text('Not intended as financial advice. Consult with financial professionals for personalized guidance.', pageWidth / 2, yPosition, { align: 'center' });

      // Save the PDF
      const fileName = `FinAnchor_Credit_Report_${userData.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      alert('Credit Health Report downloaded successfully!');

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating report. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="credit-health-report">
      <div className="report-header">
        <h2>📄 Credit Health Report Generator</h2>
        <p>Generate a comprehensive PDF report of your credit and financial health</p>
      </div>

      <div className="report-form">
        <div className="form-section">
          <h3>Personal Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                value={userData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                value={userData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 9876543210"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Financial Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Credit Score</label>
              <input
                type="number"
                value={userData.creditScore}
                onChange={(e) => handleInputChange('creditScore', e.target.value)}
                placeholder="750"
                min="300"
                max="900"
              />
            </div>

            <div className="form-group">
              <label>Monthly Income (₹)</label>
              <input
                type="number"
                value={userData.monthlyIncome}
                onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                placeholder="50000"
              />
            </div>

            <div className="form-group">
              <label>Monthly Expenses (₹)</label>
              <input
                type="number"
                value={userData.monthlyExpenses}
                onChange={(e) => handleInputChange('monthlyExpenses', e.target.value)}
                placeholder="30000"
              />
            </div>

            <div className="form-group">
              <label>Total Debt (₹)</label>
              <input
                type="number"
                value={userData.totalDebt}
                onChange={(e) => handleInputChange('totalDebt', e.target.value)}
                placeholder="200000"
              />
            </div>

            <div className="form-group">
              <label>Total Savings (₹)</label>
              <input
                type="number"
                value={userData.savings}
                onChange={(e) => handleInputChange('savings', e.target.value)}
                placeholder="150000"
              />
            </div>
          </div>
        </div>

        <div className="generate-section">
          <button
            className="generate-btn"
            onClick={generatePDF}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="spinner"></span>
                Generating Report...
              </>
            ) : (
              <>
                📄 Generate & Download PDF Report
              </>
            )}
          </button>

          <div className="report-info">
            <h4>Report Includes:</h4>
            <ul>
              <li>Personal credit score analysis</li>
              <li>Financial health overview</li>
              <li>Debt-to-income ratio calculation</li>
              <li>Personalized recommendations</li>
              <li>Credit improvement tips</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditHealthReport;