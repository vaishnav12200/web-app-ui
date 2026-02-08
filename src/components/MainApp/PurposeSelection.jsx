import { useState } from 'react';
import { Heart, Gem, Handshake, ChevronLeft, Check } from 'lucide-react';
import './PurposeSelection.css';

function PurposeSelection({ onComplete, onBack }) {
  const [selectedPurpose, setSelectedPurpose] = useState('');

  const purposes = [
    {
      id: 'dating',
      icon: <Heart size={28} color="#ff4e7a" />,
      title: 'Dating',
      description: 'Find someone special for romantic connection'
    },
    {
      id: 'relationship',
      icon: <Gem size={28} color="#ff4e7a" />,
      title: 'Relationship',
      description: 'Looking for serious, long-term commitment'
    },
    {
      id: 'friendship',
      icon: <Handshake size={28} color="#ff4e7a" />,
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
          <ChevronLeft size={24} color="#2d2d2d" />
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
                  <Check size={24} color="white" strokeWidth={3} />
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
