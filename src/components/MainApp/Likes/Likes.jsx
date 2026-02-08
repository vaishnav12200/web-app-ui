import { useState } from 'react';
import { HeartHandshake, Heart, BadgeCheck, MessageSquare, Lock, RotateCcw } from 'lucide-react';
import { mockMatches, mockLikedYou, mockYouLiked } from '../../../data/mockData';
import './Likes.css';

function Likes({ onViewProfile, onOpenChat }) {
  const [activeTab, setActiveTab] = useState('matched');
  const [matches] = useState(mockMatches);
  const [likedYou] = useState(mockLikedYou);
  const [youLiked, setYouLiked] = useState(mockYouLiked);

  const handleUndoLike = (profileId) => {
    setYouLiked(prev => prev.filter(p => p.id !== profileId));
  };

  return (
    <div className="likes-page">
      {/* Header */}
      <div className="likes-header">
        <h1>Likes</h1>
      </div>

      {/* Tabs */}
      <div className="likes-tabs">
        <button
          className={`likes-tab ${activeTab === 'matched' ? 'active' : ''}`}
          onClick={() => setActiveTab('matched')}
        >
          Matched
          {matches.length > 0 && <span className="tab-count">{matches.length}</span>}
        </button>
        <button
          className={`likes-tab ${activeTab === 'liked-you' ? 'active' : ''}`}
          onClick={() => setActiveTab('liked-you')}
        >
          Liked You
          {likedYou.length > 0 && <span className="tab-count">{likedYou.length}</span>}
        </button>
        <button
          className={`likes-tab ${activeTab === 'you-liked' ? 'active' : ''}`}
          onClick={() => setActiveTab('you-liked')}
        >
          You Liked
          {youLiked.length > 0 && <span className="tab-count">{youLiked.length}</span>}
        </button>
      </div>

      {/* Tab Content */}
      <div className="likes-content">
        {/* Matched Tab */}
        {activeTab === 'matched' && (
          <div className="likes-grid">
            {matches.length === 0 ? (
              <div className="likes-empty">
                <span className="likes-empty-icon"><HeartHandshake size={48} color="#ff4e7a" /></span>
                <h3>No matches yet</h3>
                <p>Keep swiping to find your match!</p>
              </div>
            ) : (
              matches.map(match => (
                <div key={match.id} className="match-card" onClick={() => onOpenChat(match)}>
                  <div className="match-card-photo">
                    <img src={match.photo} alt={match.name} />
                    {match.verified && (
                      <span className="match-verified-badge">
                        <BadgeCheck size={14} fill="#1DA1F2" color="white" />
                      </span>
                    )}
                    {match.online && <span className="match-online-dot" />}
                  </div>
                  <div className="match-card-info">
                    <h4>{match.name}, {match.age}</h4>
                    <p className="match-last-msg">{match.lastMessage}</p>
                  </div>
                  <button className="match-chat-btn">
                    <MessageSquare size={18} color="#ff4e7a" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Liked You Tab */}
        {activeTab === 'liked-you' && (
          <div className="liked-you-section">
            <div className="liked-you-count">
              <span className="liked-count-number">{likedYou.length}</span>
              <span className="liked-count-text">people liked you</span>
            </div>
            <div className="liked-you-grid">
              {likedYou.map((person, idx) => (
                <div key={person.id} className={`liked-you-card ${idx > 0 ? 'blurred' : ''}`}>
                  <div className="liked-you-photo">
                    <img src={person.photo} alt={person.name} />
                    {person.verified && (
                      <span className="match-verified-badge">
                        <BadgeCheck size={14} fill="#1DA1F2" color="white" />
                      </span>
                    )}
                  </div>
                  <div className="liked-you-info">
                    <h4>{idx === 0 ? `${person.name}, ${person.age}` : '???'}</h4>
                  </div>
                  {idx > 0 && (
                    <div className="liked-you-lock">
                      <Lock size={20} color="#fff" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {likedYou.length > 1 && (
              <p className="liked-you-hint">Get 1 free reveal per day!</p>
            )}
          </div>
        )}

        {/* You Liked Tab */}
        {activeTab === 'you-liked' && (
          <div className="likes-grid">
            {youLiked.length === 0 ? (
              <div className="likes-empty">
                <span className="likes-empty-icon"><Heart size={48} color="#22c55e" /></span>
                <h3>No likes yet</h3>
                <p>Start swiping to like profiles!</p>
              </div>
            ) : (
              youLiked.map(person => (
                <div key={person.id} className="you-liked-card">
                  <div className="you-liked-photo">
                    <img src={person.photo} alt={person.name} />
                    {person.verified && (
                      <span className="match-verified-badge">
                        <BadgeCheck size={14} fill="#1DA1F2" color="white" />
                      </span>
                    )}
                  </div>
                  <div className="you-liked-info">
                    <h4>{person.name}, {person.age}</h4>
                    <span className="you-liked-status">
                      <span className="waiting-dot" /> Waiting for response
                    </span>
                  </div>
                  <button className="undo-like-btn" onClick={() => handleUndoLike(person.id)}>
                    <RotateCcw size={16} />
                    Undo
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Likes;
