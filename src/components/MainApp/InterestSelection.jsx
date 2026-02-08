import { useState } from 'react';
import './InterestSelection.css';

function InterestSelection({ onComplete, onBack }) {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { id: 'music', icon: '🎵', label: 'Music' },
    { id: 'gaming', icon: '🎮', label: 'Gaming' },
    { id: 'movies', icon: '🎬', label: 'Movies' },
    { id: 'fitness', icon: '🏋️', label: 'Fitness' },
    { id: 'reading', icon: '📚', label: 'Reading' },
    { id: 'travel', icon: '✈️', label: 'Travel' },
    { id: 'cooking', icon: '🍳', label: 'Cooking' },
    { id: 'art', icon: '🎨', label: 'Art' },
    { id: 'theatre', icon: '🎭', label: 'Theatre' },
    { id: 'photography', icon: '📸', label: 'Photography' },
    { id: 'sports', icon: '⚽', label: 'Sports' },
    { id: 'yoga', icon: '🧘', label: 'Yoga' },
    { id: 'foodie', icon: '🍕', label: 'Foodie' },
    { id: 'pets', icon: '🐕', label: 'Pets' },
  ];

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        return prev.filter(id => id !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedInterests.length >= 3) {
      console.log('Selected interests:', selectedInterests);
      onComplete({ interests: selectedInterests });
    }
  };

  const isButtonEnabled = selectedInterests.length >= 3;

  return (
    <div className="interest-selection-screen">
      {/* Fixed Back Arrow */}
      {onBack && (
        <button className="screen-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="interest-container">
        {/* Header */}
        <div className="interest-header">
          <h1 className="interest-title">What are your interests?</h1>
          <p className="interest-subtitle">
            Select at least 3 interests to help us find your perfect match
          </p>
          <p className="interest-count">
            {selectedInterests.length} selected {selectedInterests.length >= 3 && '✓'}
          </p>
        </div>

        {/* Interest Grid */}
        <div className="interest-grid">
          {interests.map((interest) => (
            <button
              key={interest.id}
              className={`interest-chip ${selectedInterests.includes(interest.id) ? 'selected' : ''}`}
              onClick={() => toggleInterest(interest.id)}
            >
              <span className="interest-icon">{interest.icon}</span>
              <span className="interest-label">{interest.label}</span>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          className={`interest-continue-btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
          onClick={handleContinue}
          disabled={!isButtonEnabled}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default InterestSelection;
