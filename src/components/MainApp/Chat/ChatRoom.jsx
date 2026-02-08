import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, MoreVertical, User, Ban, AlertTriangle, HeartOff, Plus, Send } from 'lucide-react';
import { mockConversations } from '../../../data/mockData';
import './ChatRoom.css';

function ChatRoom({ match, onBack }) {
  const [messages, setMessages] = useState(mockConversations[match.id] || []);
  const [newMessage, setNewMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      senderId: 'me',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'sent',
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replies = [
        'That sounds great! 😊',
        'Haha, I love that!',
        'Tell me more about that!',
        'Oh nice! I feel the same way 💕',
        "That's so cool!",
        'I totally agree with you!',
      ];
      const reply = {
        id: messages.length + 2,
        senderId: match.id,
        text: replies[Math.floor(Math.random() * replies.length)],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'received',
      };
      setMessages(prev => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="chat-room">
      {/* Header */}
      <div className="cr-header">
        <button className="cr-back-btn" onClick={onBack}>
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
        <div className="cr-user-info">
          <div className="cr-user-photo">
            <img src={match.photo} alt={match.name} />
            {match.online && <span className="cr-online-dot" />}
          </div>
          <div>
            <h3>{match.name}, {match.age}</h3>
            <span className="cr-status">{match.online ? 'Online' : 'Offline'}</span>
          </div>
        </div>
        <button className="cr-options-btn" onClick={() => setShowOptions(!showOptions)}>
          <MoreVertical size={20} />
        </button>

        {/* Options dropdown */}
        {showOptions && (
          <div className="cr-options-dropdown">
            <button onClick={() => { alert('Profile viewed'); setShowOptions(false); }}>
              <User size={16} />
              View Profile
            </button>
            <button onClick={() => { alert('User blocked'); setShowOptions(false); }}>
              <Ban size={16} />
              Block User
            </button>
            <button onClick={() => { alert('User reported'); setShowOptions(false); }} className="cr-report">
              <AlertTriangle size={16} />
              Report
            </button>
            <button onClick={() => { if(confirm('Unmatch this person?')) alert('Unmatched'); setShowOptions(false); }} className="cr-unmatch">
              <HeartOff size={16} />
              Unmatch
            </button>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="cr-messages" onClick={() => setShowOptions(false)}>
        <div className="cr-date-divider">
          <span>Today</span>
        </div>
        {messages.map(msg => (
          <div key={msg.id} className={`cr-message ${msg.type}`}>
            <div className="cr-bubble">
              <p>{msg.text}</p>
              <span className="cr-time">{msg.time}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form className="cr-input-bar" onSubmit={handleSendMessage}>
        <button type="button" className="cr-attach-btn">
          <Plus size={20} />
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className={`cr-send-btn ${newMessage.trim() ? 'active' : ''}`}
          disabled={!newMessage.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
