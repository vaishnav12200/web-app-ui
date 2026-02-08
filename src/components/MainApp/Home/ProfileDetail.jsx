import { useState } from 'react';
import { ArrowLeft, BadgeCheck, Heart, Gem, Handshake, Tag, Music, Gamepad2, Film, Dumbbell, BookOpen, Plane, CookingPot, Palette, Theater, Camera, Trophy, Flower2, UtensilsCrossed, PawPrint, MapPin } from 'lucide-react';
import './ProfileDetail.css';

function ProfileDetail({ profile, onClose }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const handlePhotoNav = (direction) => {
    if (direction === 'prev') {
      setCurrentPhotoIndex(prev => Math.max(0, prev - 1));
    } else {
      setCurrentPhotoIndex(prev => Math.min(profile.photos.length - 1, prev + 1));
    }
  };

  const interestIcons = {
    'Music': <Music size={16} />, 'Gaming': <Gamepad2 size={16} />, 'Movies': <Film size={16} />, 'Fitness': <Dumbbell size={16} />,
    'Reading': <BookOpen size={16} />, 'Travel': <Plane size={16} />, 'Cooking': <CookingPot size={16} />, 'Art': <Palette size={16} />,
    'Theatre': <Theater size={16} />, 'Photography': <Camera size={16} />, 'Sports': <Trophy size={16} />, 'Yoga': <Flower2 size={16} />,
    'Foodie': <UtensilsCrossed size={16} />, 'Pets': <PawPrint size={16} />,
  };

  return (
    <div className="profile-detail-overlay">
      <div className="profile-detail">
        {/* Close button */}
        <button className="pd-close-btn" onClick={onClose}>
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>

        {/* Photo section */}
        <div className="pd-photo-section">
          <img
            src={profile.photos[currentPhotoIndex]}
            alt={profile.name}
            className="pd-photo"
          />

          {/* Photo navigation */}
          <div className="pd-photo-nav">
            <button
              className="pd-nav-btn"
              onClick={() => handlePhotoNav('prev')}
              disabled={currentPhotoIndex === 0}
            >
              ‹
            </button>
            <button
              className="pd-nav-btn"
              onClick={() => handlePhotoNav('next')}
              disabled={currentPhotoIndex === profile.photos.length - 1}
            >
              ›
            </button>
          </div>

          {/* Photo dots */}
          <div className="pd-photo-dots">
            {profile.photos.map((_, idx) => (
              <div
                key={idx}
                className={`pd-dot ${idx === currentPhotoIndex ? 'active' : ''}`}
                onClick={() => setCurrentPhotoIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* Profile content */}
        <div className="pd-content">
          <div className="pd-header">
            <h1>
              {profile.name}, {profile.age}
              {profile.verified && (
                <span className="pd-verified">
                  <BadgeCheck size={22} fill="#1DA1F2" color="white" />
                  Verified
                </span>
              )}
            </h1>
            <p className="pd-distance">{profile.distance}</p>
          </div>

          <div className="pd-section">
            <h3>Purpose</h3>
            <div className="pd-purpose-tag">
              {profile.purpose === 'Dating' && <Heart size={16} color="#ff4e7a" />}
              {profile.purpose === 'Relationship' && <Gem size={16} color="#ff4e7a" />}
              {profile.purpose === 'Friendship' && <Handshake size={16} color="#ff4e7a" />}
              {' '}{profile.purpose}
            </div>
          </div>

          {profile.country && (
            <div className="pd-section">
              <h3>Country</h3>
              <div className="pd-country-tag">
                <MapPin size={16} color="#4a90d9" /> {profile.country}
              </div>
            </div>
          )}

          <div className="pd-section">
            <h3>About</h3>
            <p className="pd-bio">{profile.bio}</p>
          </div>

          <div className="pd-section">
            <h3>Interests</h3>
            <div className="pd-interests">
              {profile.interests.map((interest, idx) => (
                <span key={idx} className="pd-interest-chip">
                  {interestIcons[interest] || <Tag size={16} />} {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
