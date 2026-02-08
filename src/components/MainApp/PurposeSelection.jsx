import { useState } from 'react';
import './PurposeSelection.css';

function PurposeSelection({ onComplete, onBack }) {
  const [selectedPurpose, setSelectedPurpose] = useState('');

  const purposes = [
    {
      id: 'dating',
      icon: '❤️',
      title: 'Dating',
      description: 'Find someone special for romantic connection'
    },
    {
      id: 'relationship',
      icon: '💍',
      title: 'Relationship',
      description: 'Looking for serious, long-term commitment'
    },
    {
      id: 'friendship',
      icon: '🤝',
      title: 'Friendship',
      description: 'Meet new friends and expand social circle'
    }
  ];

  const handlePurposeSelect = (purposeId) => {
    setSelectedPurpose(purposeId);
  };

  const handleContinue = () => {
    if (selectedPurpose) {
      onComplete({ purpose: selectedPurpose });
    }
  };

  const isButtonEnabled = selectedPurpose !== '';

  return (
    <div className="purpose-selection-screen">
      {/* Fixed Back Arrow */}
      {onBack && (
        <button className="screen-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="purpose-container">
        {/* Header */}
        <div className="purpose-header">
          <h1 className="purpose-title">What brings you here?</h1>
          <p className="purpose-subtitle">
            Help us understand what you're looking for
          </p>
        </div>

        {/* Purpose Cards */}
        <div className="purpose-cards">
          {purposes.map((purpose) => (
            <button
              key={purpose.id}
              className={`purpose-card ${selectedPurpose === purpose.id ? 'selected' : ''}`}
              onClick={() => handlePurposeSelect(purpose.id)}
            >
              <div className="purpose-card-content">
                <span className="purpose-icon">{purpose.icon}</span>
                <h3 className="purpose-card-title">{purpose.title}</h3>
                <p className="purpose-card-description">{purpose.description}</p>
              </div>
              <div className="purpose-check">
                {selectedPurpose === purpose.id && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          className={`purpose-continue-btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
          onClick={handleContinue}
          disabled={!isButtonEnabled}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default PurposeSelection;
