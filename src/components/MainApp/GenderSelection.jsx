import { useState, useEffect } from 'react';
import { ChevronLeft, User, UserRound, ChevronDown } from 'lucide-react';
import './GenderSelection.css';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'India',
  'Germany', 'France', 'Japan', 'Brazil', 'South Korea',
  'Mexico', 'Italy', 'Spain', 'Netherlands', 'Sweden',
  'Switzerland', 'Singapore', 'New Zealand', 'Ireland', 'Norway',
  'Denmark', 'Portugal', 'Argentina', 'Colombia', 'Philippines',
  'Thailand', 'Vietnam', 'Indonesia', 'Malaysia', 'South Africa',
  'Nigeria', 'Egypt', 'Turkey', 'Saudi Arabia', 'UAE',
  'Pakistan', 'Bangladesh', 'Sri Lanka', 'Nepal', 'China',
  'Russia', 'Ukraine', 'Poland', 'Czech Republic', 'Romania',
  'Greece', 'Israel', 'Chile', 'Peru', 'Kenya',
];

function GenderSelection({ onComplete, onBack }) {
  const [selectedGender, setSelectedGender] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [dob, setDob] = useState('');
  const [dobError, setDobError] = useState('');
  const [ageRange, setAgeRange] = useState([18, 35]);
  const [country, setCountry] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

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

  const filteredCountries = COUNTRIES.filter(c =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleCountrySelect = (c) => {
    setCountry(c);
    setCountrySearch(c);
    setShowCountryDropdown(false);
  };

  const handleContinue = () => {
    if (selectedGender && lookingFor && isDobValid && country) {
      onComplete({
        gender: selectedGender,
        lookingFor,
        dateOfBirth: dob,
        age: getAge(dob),
        ageRange,
        country
      });
    }
  };

  const isButtonEnabled = selectedGender && lookingFor && isDobValid && country;

  return (
    <div className="gender-selection-screen">
      {/* Fixed Back Arrow */}
      {onBack && (
        <button className="screen-back-btn" onClick={onBack}>
          <ChevronLeft size={24} color="#2d2d2d" />
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
              <span className="gender-icon"><User size={28} /></span>
              <span className="gender-text">Male</span>
            </button>
            <button
              className={`gender-card ${selectedGender === 'female' ? 'selected' : ''}`}
              onClick={() => handleGenderSelect('female')}
            >
              <span className="gender-icon"><UserRound size={28} /></span>
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
              <span className="gender-icon"><User size={28} /></span>
              <span className="gender-text">Male</span>
            </button>
            <button
              className={`gender-card ${lookingFor === 'female' ? 'selected' : ''}`}
              onClick={() => handleLookingForChange('female')}
            >
              <span className="gender-icon"><UserRound size={28} /></span>
              <span className="gender-text">Female</span>
            </button>
          </div>
        </div>

        {/* Country Selection */}
        <div className="selection-section">
          <h3 className="section-label">Country <span className="required-star">*</span></h3>
          <div className="country-selector">
            <div className="country-input-wrapper">
              <input
                type="text"
                value={countrySearch}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  setShowCountryDropdown(true);
                  if (!e.target.value) setCountry('');
                }}
                onFocus={() => setShowCountryDropdown(true)}
                placeholder="Search your country..."
                className="country-input"
              />
              <ChevronDown size={18} className="country-chevron" />
            </div>
            {showCountryDropdown && countrySearch && (
              <div className="country-dropdown">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map(c => (
                    <button
                      key={c}
                      className={`country-option ${country === c ? 'selected' : ''}`}
                      onClick={() => handleCountrySelect(c)}
                    >
                      {c}
                    </button>
                  ))
                ) : (
                  <div className="country-no-results">No countries found</div>
                )}
              </div>
            )}
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
