import React, { useState, useRef, useEffect, useCallback } from 'react';

const knowledgeBase = {
  dashboard: {
    keywords: ['dashboard', 'main page', 'overview', 'summary'],
    responses: [
      "The Dashboard shows your credit health summary with key metrics like Credit Score, Credit Status, DTI Ratio, and EMI Capacity. It also displays your credit score trend over time and loan eligibility results.",
      "You can view your EMI calculator, loan comparison table, and credit improvement tips directly from the dashboard."
    ]
  },
  credit_score: {
    keywords: ['credit score', 'score', 'cibil', 'rating'],
    responses: [
      "Your credit score ranges from 300-900. 735+ is considered good, 670-734 is fair, and below 670 needs improvement.",
      "Factors affecting your score: Payment history (35%), Credit utilization (30%), Length of credit history (15%), New credit (10%), Credit mix (10%).",
      "To improve: Pay bills on time, reduce credit utilization below 30%, avoid multiple loan inquiries."
    ]
  },
  loan_eligibility: {
    keywords: ['loan eligibility', 'eligible', 'can i get loan', 'qualification'],
    responses: [
      "Loan eligibility depends on your credit score, income, existing EMIs, and debt-to-income ratio.",
      "For personal loans: Usually need 650+ score, stable income, DTI below 50%.",
      "Check your eligibility on the Loan Eligibility page for personalized assessment."
    ]
  },
  emi_calculator: {
    keywords: ['emi', 'calculator', 'monthly payment', 'installment'],
    responses: [
      "The EMI calculator helps you estimate monthly loan payments. Input loan amount, tenure, and interest rate to see calculations.",
      "Formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1] where P=Principal, R=Monthly rate, N=Number of months.",
      "Use it to compare different loan options and plan your budget."
    ]
  },
  loan_comparison: {
    keywords: ['loan comparison', 'compare loans', 'different lenders'],
    responses: [
      "The loan comparison table shows different lenders with their interest rates, EMI amounts, tenure options, and total costs.",
      "Compare based on your needs: lowest EMI, lowest total cost, or best interest rate.",
      "Remember to consider processing fees, prepayment charges, and other terms."
    ]
  },
  what_if_simulator: {
    keywords: ['what if', 'simulator', 'simulation', 'predict'],
    responses: [
      "The What-If Simulator lets you see how financial decisions affect your credit score before making them.",
      "Try scenarios like: paying off credit card balance, missing EMI payment, or applying for new loan.",
      "It's a safe way to understand the impact of different financial choices."
    ]
  },
  credit_roadmap: {
    keywords: ['roadmap', 'learning', 'gamified', 'tasks', 'education'],
    responses: [
      "The Credit-Ready Roadmap is a gamified learning path for first-time borrowers.",
      "Complete tasks like learning about interest rates and setting savings goals to earn points.",
      "It turns credit building into an engaging educational journey aligned with SDG 4 and SDG 8."
    ]
  },
  loan_advice: {
    keywords: ['loan advice', 'should i take', 'borrow money', 'when to borrow'],
    responses: [
      "Only borrow when necessary. Consider if you can save or use existing funds first.",
      "Good reasons: Home purchase, education, emergency medical expenses.",
      "Avoid borrowing for: Luxury items, vacations, or things that depreciate quickly.",
      "Always compare interest rates and terms from multiple lenders."
    ]
  },
  debt_management: {
    keywords: ['debt', 'manage debt', 'too much debt', 'overwhelmed'],
    responses: [
      "If you have too much debt: Create a budget, prioritize high-interest debts, consider debt consolidation.",
      "Keep DTI ratio below 36% for good credit health.",
      "Seek professional advice if debt payments exceed 40% of income."
    ]
  },
  savings: {
    keywords: ['save money', 'savings', 'emergency fund', 'invest'],
    responses: [
      "Build an emergency fund covering 3-6 months of expenses before taking loans.",
      "Save 20% of income for long-term goals, invest in low-risk options.",
      "Use the Credit Roadmap to set up savings goals and track progress."
    ]
  }
};

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hi! I\'m your FinAnchor Advisor. You can type your questions or use voice commands with the microphone button. I\'ll speak my responses too! What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const speakText = (text) => {
    if (synthRef.current) {
      // Cancel any ongoing speech
      synthRef.current.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;
      utterance.volume = 0.8;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      synthRef.current.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const toggleVoice = () => {
    if (isSpeaking) {
      if (synthRef.current) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }
    } else {
      startListening();
    }
  };

  const findResponse = useCallback((userMessage) => {
    const message = userMessage.toLowerCase();

    for (const data of Object.values(knowledgeBase)) {
      for (const keyword of data.keywords) {
        if (message.includes(keyword)) {
          return data.responses[Math.floor(Math.random() * data.responses.length)];
        }
      }
    }

    // Default responses
    const defaults = [
      "I'm here to help with credit and loan questions. Try asking about the dashboard, credit scores, or loan advice!",
      "I can assist with: dashboard features, credit score explanation, loan eligibility, EMI calculations, loan comparison, and general financial advice.",
      "Feel free to ask about any aspect of your financial dashboard or loan-related questions."
    ];

    return defaults[Math.floor(Math.random() * defaults.length)];
  }, []);

  const handleSendMessage = useCallback((messageText) => {
    if (!messageText || messageText.trim() === '') return;

    const userMessage = {
      type: 'user',
      text: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage(''); // Clear input after sending

    // Simulate bot thinking
    setTimeout(() => {
      const botResponseText = findResponse(messageText);
      const botResponse = {
        type: 'bot',
        text: botResponseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);

      // Speak the response
      speakText(botResponseText);
    }, 1000);
  }, [findResponse]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isListening) {
      handleSendMessage(inputMessage);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="chatbot-button" onClick={toggleChat}>
        {isOpen ? '✕' : '💬'}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>FinAnchor Advisor</h4>
            <span>Type or speak - Your AI Financial Guide</span>
            {(!recognitionRef.current || !synthRef.current) && (
              <div className="voice-warning">
                ⚠️ Voice features not supported in this browser
              </div>
            )}
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.text}
                  {message.type === 'bot' && isSpeaking && index === messages.length - 1 && (
                    <span className="speaking-indicator"> 🔊</span>
                  )}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message or use voice..."
              disabled={isListening}
            />
            <div className="voice-controls">
              <button
                className={`voice-btn mic ${isListening ? 'active' : ''}`}
                onClick={toggleVoice}
                title={isListening ? 'Stop listening' : 'Start voice input'}
                disabled={!recognitionRef.current}
              >
                {isListening ? '🎤' : '🎙️'}
              </button>
              <button
                className={`voice-btn speaker ${isSpeaking ? 'active' : ''}`}
                onClick={() => isSpeaking ? synthRef.current?.cancel() : speakText(messages[messages.length - 1]?.text || '')}
                title={isSpeaking ? 'Stop speaking' : 'Read last message'}
                disabled={!synthRef.current}
              >
                {isSpeaking ? '🔊' : '🔈'}
              </button>
            </div>
            <button onClick={() => handleSendMessage(inputMessage)} disabled={isListening}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;