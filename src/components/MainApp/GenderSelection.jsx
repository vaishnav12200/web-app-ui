import { useState, useEffect } from 'react';
import './GenderSelection.css';

function GenderSelection({ onComplete, onBack }) {
  const [selectedGender, setSelectedGender] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [dob, setDob] = useState('');
  const [dobError, setDobError] = useState('');
  const [ageRange, setAgeRange] = useState([18, 35]);

  // Smart auto-preference logic
  useEffect(() => {
    if (selectedGender === 'male') {
      setLookingFor('female');
    } else if (selectedGender === 'female') {
      setLookingFor('male');
    }
  }, [selectedGender]);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleLookingForChange = (preference) => {
    setLookingFor(preference);
  };

  const getAge = (dateStr) => {
    const today = new Date();
    const birth = new Date(dateStr);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleDobChange = (e) => {
    const val = e.target.value;
    setDob(val);
    setDobError('');
    if (val) {
      const age = getAge(val);
      if (age < 18) {
        setDobError('You must be at least 18 years old');
      } else if (age > 120) {
        setDobError('Please enter a valid date of birth');
      }
    }
  };

  const isDobValid = dob && !dobError && getAge(dob) >= 18;

  const handleContinue = () => {
    if (selectedGender && lookingFor && isDobValid) {
      onComplete({
        gender: selectedGender,
        lookingFor,
        dateOfBirth: dob,
        age: getAge(dob),
        ageRange
      });
    }
  };

  const isButtonEnabled = selectedGender && lookingFor && isDobValid;

  return (
    <div className="gender-selection-screen">
      {/* Fixed Back Arrow */}
      {onBack && (
        <button className="screen-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="gender-container">
        {/* Header */}
        <div className="gender-header">
          <h1 className="gender-title">Tell us about yourself</h1>
          <p className="gender-subtitle">
            This helps us show you relevant matches
          </p>
        </div>

        {/* Gender Selection */}
        <div className="selection-section">
          <h3 className="section-label">I am</h3>
          <div className="gender-options">
            <button
              className={`gender-card ${selectedGender === 'male' ? 'selected' : ''}`}
              onClick={() => handleGenderSelect('male')}
            >
              <span className="gender-icon">👨</span>
              <span className="gender-text">Male</span>
            </button>
            <button
              className={`gender-card ${selectedGender === 'female' ? 'selected' : ''}`}
              onClick={() => handleGenderSelect('female')}
            >
              <span className="gender-icon">👩</span>
              <span className="gender-text">Female</span>
            </button>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="selection-section">
          <h3 className="section-label">Date of Birth <span className="required-star">*</span></h3>
          <div className="dob-input-wrapper">
            <input
              type="date"
              value={dob}
              onChange={handleDobChange}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
              min="1900-01-01"
              className={`dob-input ${dobError ? 'dob-error' : ''} ${isDobValid ? 'dob-valid' : ''}`}
              placeholder="Select your date of birth"
            />
            {isDobValid && (
              <span className="dob-age-badge">{getAge(dob)} years</span>
            )}
          </div>
          {dobError && <p className="dob-error-text">{dobError}</p>}
        </div>

        {/* Looking For Selection */}
        <div className="selection-section">
          <h3 className="section-label">Looking for</h3>
          <div className="gender-options">
            <button
              className={`gender-card ${lookingFor === 'male' ? 'selected' : ''}`}
              onClick={() => handleLookingForChange('male')}
            >
              <span className="gender-icon">👨</span>
              <span className="gender-text">Male</span>
            </button>
            <button
              className={`gender-card ${lookingFor === 'female' ? 'selected' : ''}`}
              onClick={() => handleLookingForChange('female')}
            >
              <span className="gender-icon">👩</span>
              <span className="gender-text">Female</span>
            </button>
          </div>
        </div>

        {/* Age Range */}
        <div className="selection-section">
          <h3 className="section-label">
            Age range: {ageRange[0]} - {ageRange[1]} years
          </h3>
          <div className="range-slider-container">
            <input
              type="range"
              min="18"
              max="80"
              value={ageRange[0]}
              onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
              className="range-slider"
            />
            <input
              type="range"
              min="18"
              max="80"
              value={ageRange[1]}
              onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
              className="range-slider"
            />
          </div>
          <div className="range-values">
            <span>{ageRange[0]}</span>
            <span>{ageRange[1]}</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          className={`gender-continue-btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
          onClick={handleContinue}
          disabled={!isButtonEnabled}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default GenderSelection;
