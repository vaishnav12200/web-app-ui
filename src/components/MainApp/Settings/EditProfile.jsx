import { useState } from 'react';
import { ArrowLeft, Plus, Check, X, BadgeCheck } from 'lucide-react';
import './EditProfile.css';

function EditProfile({ userProfile, onBack }) {
  const [name, setName] = useState(userProfile?.name || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [age, setAge] = useState(userProfile?.age || '');

  const handleSave = () => {
    console.log('Profile saved:', { name, bio, age });
    alert('Profile updated successfully!');
    onBack();
  };

  return (
    <div className="edit-profile">
      {/* Header */}
      <div className="ep-header">
        <button className="ep-back-btn" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <h1>Edit Profile</h1>
        <button className="ep-save-btn" onClick={handleSave}>Save</button>
      </div>

      {/* Photo Section */}
      <div className="ep-section">
        <h3>Photos</h3>
        <div className="ep-photos-grid">
          {[0, 1, 2, 3, 4, 5].map(idx => (
            <div key={idx} className="ep-photo-slot">
              {userProfile?.photos?.[idx] ? (
                <img src={userProfile.photos[idx]} alt="" />
              ) : (
                <div className="ep-photo-empty">
                  <Plus size={24} color="#ccc" />
                </div>
              )}
              {idx === 0 && <span className="ep-main-badge">Main</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="ep-section">
        <h3>Name</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="ep-input"
        />
      </div>

      {/* Bio */}
      <div className="ep-section">
        <h3>About Me</h3>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Write something about yourself..."
          className="ep-textarea"
          maxLength={300}
          rows={4}
        />
        <span className="ep-char-count">{bio.length}/300</span>
      </div>

      {/* Age */}
      <div className="ep-section">
        <h3>Age</h3>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Your age"
          className="ep-input"
          min={18}
          max={99}
        />
      </div>

      {/* Verification Status */}
      <div className="ep-section">
        <h3>Verification</h3>
        <div className="ep-verification-status">
          <BadgeCheck size={24} fill="#4ecdc4" color="white" />
          <div>
            <p className="ep-verified-text">Profile Verified</p>
            <p className="ep-verified-sub">Your selfie verification is complete</p>
          </div>
        </div>
      </div>

      {/* Photo Guidelines */}
      <div className="ep-section">
        <h3>Photo Guidelines</h3>
        <div className="ep-guidelines">
          <div className="ep-guideline do">
            <h4><Check size={16} color="#22c55e" /> Do</h4>
            <ul>
              <li>Use clear, recent photos</li>
              <li>Show your face clearly</li>
              <li>Use good lighting</li>
              <li>Be yourself</li>
            </ul>
          </div>
          <div className="ep-guideline dont">
            <h4><X size={16} color="#ef4444" /> Don't</h4>
            <ul>
              <li>Use group photos as main</li>
              <li>Upload blurry images</li>
              <li>Use heavy filters</li>
              <li>Post screenshots</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
