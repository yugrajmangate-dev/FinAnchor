-- Database Schema for FinAnchor

-- User Table
CREATE TABLE User (
    User_id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Age INT NOT NULL,
    Employment_type VARCHAR(50),
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial Profile Table
CREATE TABLE Financial_Profile (
    Prof_id INT AUTO_INCREMENT PRIMARY KEY,
    User_id INT,
    Monthly_income DECIMAL(15,2),
    Expenses DECIMAL(15,2),
    Savings DECIMAL(15,2),
    Net_Savings DECIMAL(15,2),
    Existing_Emi DECIMAL(15,2),
    Monthly_NET DECIMAL(15,2),
    FOREIGN KEY (User_id) REFERENCES User(User_id)
);

-- Credit Score Table
CREATE TABLE Credit_Score (
    Score_id INT AUTO_INCREMENT PRIMARY KEY,
    User_id INT,
    Score INT CHECK (Score BETWEEN 300 AND 900),
    Score_month DATE,
    FOREIGN KEY (User_id) REFERENCES User(User_id)
);

-- Loan Type Table
CREATE TABLE Loan_Type (
    Loan_id INT AUTO_INCREMENT PRIMARY KEY,
    User_id INT,
    Loan_purpose VARCHAR(50),
    Base_interest DECIMAL(5,2),
    Max_tenure INT,
    Lender VARCHAR(255),
    FOREIGN KEY (User_id) REFERENCES User(User_id)
);