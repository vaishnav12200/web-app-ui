import { useState } from 'react';
import { Home as HomeIcon, Heart, MessageSquare, Settings as SettingsIcon } from 'lucide-react';
import Home from './Home/Home';
import Likes from './Likes/Likes';
import ChatList from './Chat/ChatList';
import ChatRoom from './Chat/ChatRoom';
import Settings from './Settings/Settings';
import EditProfile from './Settings/EditProfile';
import MatchModal from './Home/MatchModal';
import ProfileDetail from './Home/ProfileDetail';
import './MainApp.css';

function MainApp({ userProfile }) {
  const [activeTab, setActiveTab] = useState('home');
  const [matchModalData, setMatchModalData] = useState(null);
  const [profileDetail, setProfileDetail] = useState(null);
  const [chatRoom, setChatRoom] = useState(null);
  const [editProfile, setEditProfile] = useState(false);

  const handleMatch = (myProfile, matchedProfile) => {
    setMatchModalData({ myProfile, matchedProfile });
  };

  const handleCloseMatch = () => {
    setMatchModalData(null);
  };

  const handleSendMessage = (profile) => {
    setMatchModalData(null);
    setChatRoom(profile);
    setActiveTab('chats');
  };

  const handleViewProfile = (profile) => {
    setProfileDetail(profile);
  };

  const handleCloseProfile = () => {
    setProfileDetail(null);
  };

  const handleOpenChat = (match) => {
    setChatRoom(match);
  };

  const handleCloseChat = () => {
    setChatRoom(null);
  };

  const handleEditProfile = () => {
    setEditProfile(true);
  };

  const handleCloseEditProfile = () => {
    setEditProfile(false);
  };

  // If viewing a chat room
  if (chatRoom && activeTab === 'chats') {
    return (
      <ChatRoom
        match={chatRoom}
        onBack={handleCloseChat}
      />
    );
  }

  // If editing profile
  if (editProfile) {
    return (
      <EditProfile
        userProfile={userProfile}
        onBack={handleCloseEditProfile}
      />
    );
  }

  return (
    <div className="main-app">
      {/* Profile Detail Overlay */}
      {profileDetail && (
        <ProfileDetail
          profile={profileDetail}
          onClose={handleCloseProfile}
        />
      )}

      {/* Match Modal */}
      {matchModalData && (
        <MatchModal
          myProfile={matchModalData.myProfile}
          matchedProfile={matchModalData.matchedProfile}
          onSendMessage={() => handleSendMessage(matchModalData.matchedProfile)}
          onKeepSwiping={handleCloseMatch}
        />
      )}

      {/* Main Content */}
      <div className="main-content">
        {activeTab === 'home' && (
          <Home
            onMatch={handleMatch}
            onViewProfile={handleViewProfile}
            userProfile={userProfile}
          />
        )}
        {activeTab === 'likes' && (
          <Likes
            onViewProfile={handleViewProfile}
            onOpenChat={handleOpenChat}
          />
        )}
        {activeTab === 'chats' && (
          <ChatList
            onOpenChat={handleOpenChat}
          />
        )}
        {activeTab === 'settings' && (
          <Settings
            userProfile={userProfile}
            onEditProfile={handleEditProfile}
          />
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <HomeIcon size={22} />
          <span>Home</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'likes' ? 'active' : ''}`}
          onClick={() => setActiveTab('likes')}
        >
          <Heart size={22} />
          <span>Likes</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'chats' ? 'active' : ''}`}
          onClick={() => setActiveTab('chats')}
        >
          <MessageSquare size={22} />
          <span>Chats</span>
          {/* Unread badge */}
          <span className="nav-badge">1</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <SettingsIcon size={22} />
          <span>Settings</span>
        </button>
      </nav>
    </div>
  );
}

export default MainApp;
