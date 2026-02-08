import { useState, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Heart, X, Info, BadgeCheck, Target, MapPin } from 'lucide-react';
import mockProfiles from '../../../data/mockProfiles';
import './Home.css';

function Home({ onMatch, onViewProfile, userProfile }) {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [passedProfiles, setPassedProfiles] = useState([]);

  const currentProfile = profiles[currentIndex];

  const goToNextProfile = useCallback(() => {
    setCurrentPhotoIndex(0);
    setSwipeOffset(0);
    setSwipeDirection(null);
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, profiles.length]);

  const handleLike = useCallback(() => {
    if (isAnimating || !currentProfile) return;
    setIsAnimating(true);
    setSwipeDirection('right');

    setLikedProfiles(prev => [...prev, currentProfile]);

    // Simulate match (30% chance)
    const isMatch = Math.random() < 0.3;

    setTimeout(() => {
      if (isMatch) {
        onMatch(userProfile, currentProfile);
      }
      goToNextProfile();
      setIsAnimating(false);
    }, 400);
  }, [isAnimating, currentProfile, userProfile, onMatch, goToNextProfile]);

  const handlePass = useCallback(() => {
    if (isAnimating || !currentProfile) return;
    setIsAnimating(true);
    setSwipeDirection('left');

    setPassedProfiles(prev => [...prev, currentProfile]);

    setTimeout(() => {
      goToNextProfile();
      setIsAnimating(false);
    }, 400);
  }, [isAnimating, currentProfile, goToNextProfile]);

  const handleInfo = () => {
    if (currentProfile) {
      onViewProfile(currentProfile);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiping: (e) => {
      if (isAnimating) return;
      setSwipeOffset(e.deltaX);
      if (e.deltaX > 50) setSwipeDirection('right');
      else if (e.deltaX < -50) setSwipeDirection('left');
      else setSwipeDirection(null);
    },
    onSwipedLeft: () => {
      if (Math.abs(swipeOffset) > 80) {
        handlePass();
      } else {
        setSwipeOffset(0);
        setSwipeDirection(null);
      }
    },
    onSwipedRight: () => {
      if (Math.abs(swipeOffset) > 80) {
        handleLike();
      } else {
        setSwipeOffset(0);
        setSwipeDirection(null);
      }
    },
    onTouchEndOrOnMouseUp: () => {
      if (Math.abs(swipeOffset) <= 80) {
        setSwipeOffset(0);
        setSwipeDirection(null);
      }
    },
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const handlePhotoNavigation = (e) => {
    if (!currentProfile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;

    if (x < width / 2) {
      // Left half - previous photo
      setCurrentPhotoIndex(prev => Math.max(0, prev - 1));
    } else {
      // Right half - next photo
      setCurrentPhotoIndex(prev =>
        Math.min(currentProfile.photos.length - 1, prev + 1)
      );
    }
  };

  // Empty state
  if (!currentProfile || currentIndex >= profiles.length) {
    return (
      <div className="home-page">
        <div className="home-header">
          <div className="home-logo">
          <Heart size={28} fill="#ff4e7a" color="#ff4e7a" />
            <h1>Discover</h1>
          </div>
        </div>
        <div className="empty-state">
          <div className="empty-icon">
            <Heart size={80} color="#ccc" strokeWidth={1.5} />
          </div>
          <h2>No more profiles nearby</h2>
          <p>Try adjusting your filters or check back later!</p>
        </div>
      </div>
    );
  }

  const cardStyle = {
    transform: swipeDirection
      ? `translateX(${swipeDirection === 'right' ? '120%' : '-120%'}) rotate(${swipeDirection === 'right' ? '15' : '-15'}deg)`
      : `translateX(${swipeOffset}px) rotate(${swipeOffset * 0.05}deg)`,
    transition: swipeDirection ? 'transform 0.4s ease-out' : 'none',
  };

  return (
    <div className="home-page">
      {/* Header */}
      <div className="home-header">
        <div className="home-logo">
          <Heart size={28} fill="#ff4e7a" color="#ff4e7a" />
          <h1>Discover</h1>
        </div>
      </div>

      {/* Card Stack */}
      <div className="card-stack">
        {/* Next card (preview behind) */}
        {currentIndex + 1 < profiles.length && (
          <div className="profile-card next-card">
            <div className="card-photo">
              <img
                src={profiles[currentIndex + 1].photos[0]}
                alt={profiles[currentIndex + 1].name}
              />
            </div>
          </div>
        )}

        {/* Current card */}
        <div
          className={`profile-card current-card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
          style={cardStyle}
          {...swipeHandlers}
        >
          {/* Like/Pass indicators */}
          <div className={`swipe-indicator like-indicator ${swipeOffset > 50 ? 'visible' : ''}`}>
            LIKE
          </div>
          <div className={`swipe-indicator pass-indicator ${swipeOffset < -50 ? 'visible' : ''}`}>
            PASS
          </div>

          {/* Photo carousel */}
          <div className="card-photo" onClick={handlePhotoNavigation}>
            <img
              src={currentProfile.photos[currentPhotoIndex]}
              alt={currentProfile.name}
              draggable={false}
            />

            {/* Photo dots */}
            <div className="photo-dots">
              {currentProfile.photos.map((_, idx) => (
                <div
                  key={idx}
                  className={`photo-dot ${idx === currentPhotoIndex ? 'active' : ''}`}
                />
              ))}
            </div>

            {/* Gradient overlay */}
            <div className="card-gradient" />
          </div>

          {/* Profile info */}
          <div className="card-info">
            <div className="card-name-row">
              <h2>
                {currentProfile.name}, {currentProfile.age}
                {currentProfile.verified && (
                  <span className="verified-badge" title="Verified">
                    <BadgeCheck size={20} fill="#1DA1F2" color="white" />
                  </span>
                )}
              </h2>
              <span className="card-distance">{currentProfile.distance}</span>
            </div>

            <div className="card-purpose">
              <span className="purpose-tag"><Target size={14} /> {currentProfile.purpose}</span>
            </div>

            {currentProfile.country && (
              <div className="card-country">
                <span className="country-tag"><MapPin size={14} /> {currentProfile.country}</span>
              </div>
            )}

            <div className="card-interests">
              {currentProfile.interests.slice(0, 4).map((interest, idx) => (
                <span key={idx} className="interest-chip">{interest}</span>
              ))}
            </div>

            <p className="card-bio">{currentProfile.bio}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="swipe-actions">
        <button className="action-btn pass-btn" onClick={handlePass} disabled={isAnimating}>
          <X size={24} strokeWidth={2.5} />
        </button>
        <button className="action-btn info-btn" onClick={handleInfo}>
          <Info size={22} strokeWidth={2} />
        </button>
        <button className="action-btn like-btn" onClick={handleLike} disabled={isAnimating}>
          <Heart size={24} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default Home;
