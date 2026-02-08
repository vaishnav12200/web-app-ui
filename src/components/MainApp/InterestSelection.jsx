import { useState } from 'react';
import { Music, Gamepad2, Film, Dumbbell, BookOpen, Plane, CookingPot, Palette, Theater, Camera, Trophy, Flower2, UtensilsCrossed, PawPrint, Check, ChevronLeft } from 'lucide-react';
import './InterestSelection.css';

function InterestSelection({ onComplete, onBack }) {
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { id: 'music', icon: <Music size={20} />, label: 'Music' },
    { id: 'gaming', icon: <Gamepad2 size={20} />, label: 'Gaming' },
    { id: 'movies', icon: <Film size={20} />, label: 'Movies' },
    { id: 'fitness', icon: <Dumbbell size={20} />, label: 'Fitness' },
    { id: 'reading', icon: <BookOpen size={20} />, label: 'Reading' },
    { id: 'travel', icon: <Plane size={20} />, label: 'Travel' },
    { id: 'cooking', icon: <CookingPot size={20} />, label: 'Cooking' },
    { id: 'art', icon: <Palette size={20} />, label: 'Art' },
    { id: 'theatre', icon: <Theater size={20} />, label: 'Theatre' },
    { id: 'photography', icon: <Camera size={20} />, label: 'Photography' },
    { id: 'sports', icon: <Trophy size={20} />, label: 'Sports' },
    { id: 'yoga', icon: <Flower2 size={20} />, label: 'Yoga' },
    { id: 'foodie', icon: <UtensilsCrossed size={20} />, label: 'Foodie' },
    { id: 'pets', icon: <PawPrint size={20} />, label: 'Pets' },
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
          <ChevronLeft size={24} color="#2d2d2d" />
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
            {selectedInterests.length} selected {selectedInterests.length >= 3 && <Check size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />}
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
