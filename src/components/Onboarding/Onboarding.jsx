import { useState, useCallback } from 'react';
import './Onboarding.css';
import onboarding1 from '../../assets/onboarding-1.svg';
import onboarding2 from '../../assets/onboarding-2.svg';
import onboarding3 from '../../assets/onboarding-3.svg';

function Onboarding({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Make friends by connecting with the world.",
      description: "You can connect with the people around the world for doing video chats, messages and make connections with them.",
      image: onboarding1
    },
    {
      id: 2,
      title: "Chat with strangers and make them your partners.",
      description: "Chat with the strangers to know eachother better and have a nice compatibility. Extend your relationship with your partners.",
      image: onboarding2
    },
    {
      id: 3,
      title: "Choose your partners of same interests.",
      description: "Choose your friends and love partners by seeing the common interests to get connected with each other in a better way.",
      image: onboarding3
    }
  ];

  const handleNext = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onComplete();
    }
  }, [currentSlide, slides.length, onComplete]);

  const handleBack = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  }, [currentSlide]);

  const handleSkip = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <div className="onboarding-screen">
      {/* Navigation Header */}
      <div className="onboarding-header">
        {currentSlide > 0 && (
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="rgba(0,0,0,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <button className="skip-btn" onClick={handleSkip}>
          Skip
        </button>
      </div>

      {/* Slide Content */}
      <div className="onboarding-content">
        {/* Illustration */}
        <div className="illustration-container">
          <img 
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].title}
            className="illustration-image"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Text Content */}
        <div className="text-content">
          <h1 className="onboarding-title">{slides[currentSlide].title}</h1>
          <p className="onboarding-description">{slides[currentSlide].description}</p>
        </div>

        {/* Pagination Dots */}
        <div className="pagination-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Navigation Button */}
        <div className="navigation-button">
          {currentSlide < slides.length - 1 ? (
            <button className="next-btn" onClick={handleNext}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button className="get-started-btn" onClick={onComplete}>
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
