import { useEffect, useRef } from 'react';
import { Heart, HeartHandshake, MessageSquare, User } from 'lucide-react';
import './MatchModal.css';

function MatchModal({ myProfile, matchedProfile, onSendMessage, onKeepSwiping }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // Animate hearts on mount
    const container = modalRef.current;
    if (!container) return;

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'match-floating-heart';
      heart.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ff4e7a" stroke="#ff4e7a" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
      heart.style.fontSize = (Math.random() * 16 + 14) + 'px';
      container.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    };

    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="match-modal-overlay" ref={modalRef}>
      <div className="match-modal">
        <div className="match-title">
          <span className="match-heart-left"><HeartHandshake size={24} color="#ff4e7a" /></span>
          <h1>It's a Match!</h1>
          <span className="match-heart-right"><HeartHandshake size={24} color="#ff4e7a" /></span>
        </div>

        <div className="match-photos">
          <div className="match-photo-circle">
            <div className="match-photo-placeholder">
              <User size={40} color="rgba(255,255,255,0.6)" />
            </div>
          </div>
          <div className="match-heart-center">
            <Heart size={40} fill="#ff4e7a" color="#ff4e7a" />
          </div>
          <div className="match-photo-circle">
            <img src={matchedProfile.photo || matchedProfile.photos?.[0]} alt={matchedProfile.name} />
          </div>
        </div>

        <p className="match-subtitle">
          You and <strong>{matchedProfile.name}</strong> liked each other!
        </p>

        <div className="match-actions">
          <button className="match-send-btn" onClick={onSendMessage}>
            <MessageSquare size={20} />
            Send Message
          </button>
          <button className="match-swipe-btn" onClick={onKeepSwiping}>
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatchModal;
