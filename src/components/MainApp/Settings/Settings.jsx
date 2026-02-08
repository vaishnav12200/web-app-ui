import { useState } from 'react';
import { User, ChevronRight, PenSquare, Target, Heart, Eye, MapPin, CheckCircle, HeartHandshake, MessageSquare, Mail, Ban, ClipboardList, HelpCircle, Phone, ScrollText, LogOut, AlertTriangle, Search, Bell, Lock } from 'lucide-react';
import './Settings.css';

function Settings({ userProfile, onEditProfile }) {
  const [notifications, setNotifications] = useState({
    newMatches: true,
    newMessages: true,
    someoneLiked: true,
    weeklyDigest: false,
  });
  const [discovery, setDiscovery] = useState({
    showMe: true,
    distance: 50,
    ageRange: [22, 35],
    verifiedOnly: false,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggle = (section, key) => {
    if (section === 'notifications') {
      setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    } else if (section === 'discovery') {
      setDiscovery(prev => ({ ...prev, [key]: !prev[key] }));
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      alert('Logged out successfully!');
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    alert('Account deletion requested. You have a 30-day grace period to recover your account.');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="settings-page">
      {/* Header */}
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      {/* Profile Card */}
      <div className="settings-profile-card" onClick={onEditProfile}>
        <div className="settings-avatar">
          <User size={36} color="rgba(255,78,122,0.5)" />
        </div>
        <div className="settings-profile-info">
          <h3>{userProfile?.name || 'Your Name'}</h3>
          <p>Edit your profile</p>
        </div>
        <ChevronRight size={20} color="#ccc" />
      </div>

      {/* Account Settings */}
      <div className="settings-section">
        <h2 className="settings-section-title">
          <User size={18} color="#ff4e7a" />
          Account Settings
        </h2>

        <div className="settings-items">
          <button className="settings-item" onClick={onEditProfile}>
            <span className="settings-item-icon"><PenSquare size={18} /></span>
            <span className="settings-item-label">Edit Profile</span>
            <ChevronRight size={16} color="#ccc" />
          </button>
          <button className="settings-item">
            <span className="settings-item-icon"><Target size={18} /></span>
            <span className="settings-item-label">Change Interests</span>
            <ChevronRight size={16} color="#ccc" />
          </button>
          <button className="settings-item">
            <span className="settings-item-icon"><Heart size={18} /></span>
            <span className="settings-item-label">Purpose</span>
            <span className="settings-item-value">{userProfile?.purpose || 'Dating'}</span>
            <ChevronRight size={16} color="#ccc" />
          </button>
        </div>
      </div>

      {/* Discovery Settings */}
      <div className="settings-section">
        <h2 className="settings-section-title">
          <Search size={18} color="#ff4e7a" />
          Discovery Settings
        </h2>

        <div className="settings-items">
          <div className="settings-item">
            <span className="settings-item-icon"><Eye size={18} /></span>
            <span className="settings-item-label">Show me in searches</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={discovery.showMe}
                onChange={() => handleToggle('discovery', 'showMe')}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-item">
            <span className="settings-item-icon"><MapPin size={18} /></span>
            <span className="settings-item-label">Distance</span>
            <span className="settings-item-value">{discovery.distance} km</span>
          </div>

          <div className="settings-item slider-item">
            <input
              type="range"
              min="1"
              max="100"
              value={discovery.distance}
              onChange={(e) => setDiscovery(prev => ({ ...prev, distance: parseInt(e.target.value) }))}
              className="settings-slider"
            />
          </div>

          <div className="settings-item">
            <span className="settings-item-icon"><CheckCircle size={18} /></span>
            <span className="settings-item-label">Verified profiles only</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={discovery.verifiedOnly}
                onChange={() => handleToggle('discovery', 'verifiedOnly')}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-section">
        <h2 className="settings-section-title">
          <Bell size={18} color="#ff4e7a" />
          Notifications
        </h2>

        <div className="settings-items">
          <div className="settings-item">
            <span className="settings-item-icon"><HeartHandshake size={18} /></span>
            <span className="settings-item-label">New matches</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.newMatches}
                onChange={() => handleToggle('notifications', 'newMatches')}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-item">
            <span className="settings-item-icon"><MessageSquare size={18} /></span>
            <span className="settings-item-label">New messages</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.newMessages}
                onChange={() => handleToggle('notifications', 'newMessages')}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-item">
            <span className="settings-item-icon"><Heart size={18} /></span>
            <span className="settings-item-label">Someone liked you</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.someoneLiked}
                onChange={() => handleToggle('notifications', 'someoneLiked')}
              />
              <span className="toggle-slider" />
            </label>
          </div>

          <div className="settings-item">
            <span className="settings-item-icon"><Mail size={18} /></span>
            <span className="settings-item-label">Weekly digest</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={notifications.weeklyDigest}
                onChange={() => handleToggle('notifications', 'weeklyDigest')}
              />
              <span className="toggle-slider" />
            </label>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="settings-section">
        <h2 className="settings-section-title">
          <Lock size={18} color="#ff4e7a" />
          Privacy & Security
        </h2>

        <div className="settings-items">
          <button className="settings-item">
            <span className="settings-item-icon"><Ban size={18} /></span>
            <span className="settings-item-label">Block List</span>
            <ChevronRight size={16} color="#ccc" />
          </button>
          <button className="settings-item">
            <span className="settings-item-icon"><ClipboardList size={18} /></span>
            <span className="settings-item-label">Report History</span>
            <ChevronRight size={16} color="#ccc" />
          </button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="settings-section">
        <h2 className="settings-section-title">
          <HelpCircle size={18} color="#ff4e7a" />
          Help & Support
        </h2>

        <div className="settings-items">
          <button className="settings-item">
            <span className="settings-item-icon"><HelpCircle size={18} /></span>
            <span className="settings-item-label">FAQ</span>
            <ChevronRight size={16} color="#ccc" />
          </button>
          <button className="settings-item">
            <span className="settings-item-icon"><Phone size={18} /></span>
            <span className="settings-item-label">Contact Support</span>
            <ChevronRight size={16} color="#ccc" />
          </button>
          <button className="settings-item">
            <span className="settings-item-icon"><ScrollText size={18} /></span>
            <span className="settings-item-label">Community Guidelines</span>
            <ChevronRight size={16} color="#ccc" />
          </button>
        </div>
      </div>

      {/* Account Actions */}
      <div className="settings-section">
        <h2 className="settings-section-title">
          <AlertTriangle size={18} color="#ff4e7a" />
          Account Actions
        </h2>

        <div className="settings-items">
          <button className="settings-item settings-logout" onClick={handleLogout}>
            <span className="settings-item-icon"><LogOut size={18} /></span>
            <span className="settings-item-label">Logout</span>
          </button>
          <button className="settings-item settings-delete" onClick={handleDeleteAccount}>
            <span className="settings-item-icon"><AlertTriangle size={18} /></span>
            <span className="settings-item-label">Delete Account</span>
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="settings-footer">
        <p>Dating App v1.0.0</p>
        <p>Made with <Heart size={14} fill="#ff4e7a" color="#ff4e7a" style={{ display: 'inline', verticalAlign: 'middle' }} /></p>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-modal-overlay">
          <div className="delete-modal">
            <div className="delete-modal-icon"><AlertTriangle size={48} color="#ff4444" /></div>
            <h3>Delete Account?</h3>
            <p>This action is permanent. All your data will be deleted after a 30-day grace period. This cannot be undone.</p>
            <div className="delete-modal-actions">
              <button className="delete-modal-cancel" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
              <button className="delete-modal-confirm" onClick={confirmDelete}>
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
