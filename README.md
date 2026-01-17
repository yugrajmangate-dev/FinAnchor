# FinAnchor

A web-based platform that helps users understand and improve their credit health by tracking credit scores, checking loan eligibility, and comparing loan options.

## Features

- **User Profile & Financial Inputs**: Collect income, employment, age, expenses, and loan details with a basic financial dashboard.
- **Loan Eligibility & EMI Tools**: Mock-rule-based loan eligibility checks and EMI calculator for multiple loan types.
- **Loan Comparison Dashboard**: Compare loan products by interest rate, EMI, tenure, and total repayment.
- **Credit Score Tracking**: Monthly credit score tracking using mock/simulated data with trend visualization and score explanations.

## Dashboard Sections

### Main Dashboard
- **Credit Health Summary**: Cards showing Credit Score (735), Credit Status (Good), DTI Ratio (32%), EMI Capacity (₹18,000)
- **Credit Score Trend**: Line chart showing monthly credit score trends with tooltips
- **Loan Eligibility Result**: Displays eligible amount, status, interest rate, and eligibility strength progress bar
- **EMI Calculator**: Interactive calculator for loan amount, tenure, and interest rate
- **Loan Comparison Table**: Table comparing lenders by interest, EMI, tenure, and total cost
- **Credit Improvement Tips**: List of tips to improve credit score

## Database Schema

The application uses the following database tables:

### User Table
- User_id (AUTO_INCREMENT PRIMARY KEY)
- Name (VARCHAR)
- Email (VARCHAR UNIQUE)
- Password (VARCHAR)
- Age (INT)
- Employment_type (VARCHAR)
- Created_at (TIMESTAMP)

### Financial_Profile Table
- Prof_id (AUTO_INCREMENT PRIMARY KEY)
- User_id (FK to User)
- Monthly_income (DECIMAL)
- Expenses (DECIMAL)
- Savings (DECIMAL)
- Net_Savings (DECIMAL)
- Existing_Emi (DECIMAL)
- Monthly_NET (DECIMAL)

### Credit_Score Table
- Score_id (AUTO_INCREMENT PRIMARY KEY)
- User_id (FK to User)
- Score (INT, 300-900)
- Score_month (DATE)

### Loan_Type Table
- Loan_id (AUTO_INCREMENT PRIMARY KEY)
- User_id (FK to User)
- Loan_purpose (VARCHAR)
- Base_interest (DECIMAL)
- Max_tenure (INT)
- Lender (VARCHAR)

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
