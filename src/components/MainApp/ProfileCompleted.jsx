import { useEffect } from 'react';
import './ProfileCompleted.css';

function ProfileCompleted({ onComplete }) {
  useEffect(() => {
    // Trigger confetti animation
    createConfetti();
  }, []);

  const createConfetti = () => {
    const colors = ['#ff4e7a', '#ff6b9d', '#ff8cb5', '#ffb3c6'];
    const confettiContainer = document.querySelector('.confetti-container');
    
    if (!confettiContainer) return;
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
      confettiContainer.appendChild(confetti);
    }
  };

  const handleStartSwiping = () => {
    onComplete();
  };

  return (
    <div className="profile-completed-screen">
      <div className="confetti-container"></div>
      
      <div className="completed-container">
        {/* Success Icon */}
        <div className="success-icon">
          <div className="heart-badge">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
              <path 
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
                fill="url(#completedGradient)"
                className="heart-icon"
              />
              <circle cx="12" cy="12" r="3" fill="white" className="check-circle" />
              <path 
                d="M10 12l1.5 1.5L14 11" 
                stroke="#ff4e7a" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="check-mark"
              />
              <defs>
                <linearGradient id="completedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff4e7a" />
                  <stop offset="100%" stopColor="#ff6b9d" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="completed-content">
          <h1 className="completed-title">🎉 Your Profile is Ready!</h1>
          <p className="completed-subtitle">
            You're all set to start meeting amazing people
          </p>
          <p className="completed-message">
            Remember, quality connections take time. Be yourself, stay respectful, and enjoy the journey!
          </p>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-icon">✓</div>
            <div className="stat-label">Profile Verified</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎯</div>
            <div className="stat-label">Preferences Set</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">❤️</div>
            <div className="stat-label">Ready to Match</div>
          </div>
        </div>

        {/* Action Button */}
        <button className="start-swiping-btn" onClick={handleStartSwiping}>
          <span>Start Swiping</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path 
              d="M5 12h14m-7-7l7 7-7 7" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ProfileCompleted;
