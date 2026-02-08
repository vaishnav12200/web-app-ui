import { useState } from 'react';
import { Search, MessageSquare, BadgeCheck } from 'lucide-react';
import { mockMatches } from '../../../data/mockData';
import './ChatList.css';

function ChatList({ onOpenChat }) {
  const [conversations] = useState(mockMatches);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="chat-list-page">
      {/* Header */}
      <div className="chat-list-header">
        <h1>Chats</h1>
      </div>

      {/* Search */}
      <div className="chat-search">
        <div className="chat-search-input">
          <Search size={18} color="#999" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* New Matches Row */}
      {conversations.length > 0 && (
        <div className="new-matches-section">
          <h3>New Matches</h3>
          <div className="new-matches-row">
            {conversations.map(match => (
              <div key={match.id} className="new-match-item" onClick={() => onOpenChat(match)}>
                <div className="new-match-photo">
                  <img src={match.photo} alt={match.name} />
                  {match.online && <span className="nm-online-dot" />}
                </div>
                <span className="new-match-name">{match.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="chat-conversations">
        <h3>Messages</h3>
        {filteredConversations.length === 0 ? (
          <div className="chat-empty">
            <MessageSquare size={60} color="#ccc" strokeWidth={1.5} />
            <h3>No conversations yet</h3>
            <p>Start swiping to make connections!</p>
          </div>
        ) : (
          filteredConversations.map(conv => (
            <div key={conv.id} className="chat-item" onClick={() => onOpenChat(conv)}>
              <div className="chat-item-photo">
                <img src={conv.photo} alt={conv.name} />
                {conv.online && <span className="chat-online-dot" />}
              </div>
              <div className="chat-item-content">
                <div className="chat-item-top">
                  <h4 className="chat-item-name">
                    {conv.name}, {conv.age}
                    {conv.verified && (
                      <BadgeCheck size={14} fill="#1DA1F2" color="white" style={{ marginLeft: 4, display: 'inline' }} />
                    )}
                  </h4>
                  <span className="chat-item-time">{conv.lastMessageTime}</span>
                </div>
                <p className="chat-item-message">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="chat-unread-badge">{conv.unread}</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ChatList;
