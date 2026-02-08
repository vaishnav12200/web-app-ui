// Mock data for matches, likes, and conversations

export const mockMatches = [
  {
    id: 101,
    name: 'Sarah',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    verified: true,
    matchedAt: '2026-02-07T10:30:00',
    lastMessage: 'Hey! How are you? 😊',
    lastMessageTime: 'Just now',
    unread: 1,
    online: true,
  },
  {
    id: 102,
    name: 'Emma',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop',
    verified: true,
    matchedAt: '2026-02-06T14:20:00',
    lastMessage: 'Loved your travel photos!',
    lastMessageTime: '2h',
    unread: 0,
    online: true,
  },
  {
    id: 103,
    name: 'Olivia',
    age: 27,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    verified: true,
    matchedAt: '2026-02-05T09:15:00',
    lastMessage: 'That sounds fun!',
    lastMessageTime: '1d',
    unread: 0,
    online: false,
  },
];

export const mockLikedYou = [
  {
    id: 201,
    name: 'Sophia',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=200&h=200&fit=crop',
    verified: true,
    likedAt: '2026-02-07T15:00:00',
  },
  {
    id: 202,
    name: 'Ava',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1464863979621-258859e62245?w=200&h=200&fit=crop',
    verified: true,
    likedAt: '2026-02-07T12:30:00',
  },
  {
    id: 203,
    name: 'Isabella',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=200&h=200&fit=crop',
    verified: false,
    likedAt: '2026-02-06T20:00:00',
  },
];

export const mockYouLiked = [
  {
    id: 301,
    name: 'Charlotte',
    age: 29,
    photo: 'https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd?w=200&h=200&fit=crop',
    verified: true,
    likedAt: '2026-02-07T08:00:00',
    status: 'waiting',
  },
  {
    id: 302,
    name: 'Mia',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    verified: true,
    likedAt: '2026-02-06T16:45:00',
    status: 'waiting',
  },
];

export const mockConversations = {
  101: [
    { id: 1, senderId: 101, text: 'Hey! How are you? 😊', time: '9:30 AM', type: 'received' },
    { id: 2, senderId: 'me', text: "I'm great! How about you?", time: '9:32 AM', type: 'sent' },
    { id: 3, senderId: 101, text: "Doing well! I noticed we both love travel. What's your favorite destination?", time: '9:35 AM', type: 'received' },
    { id: 4, senderId: 'me', text: 'Japan was incredible! The food, the culture... everything was perfect 🇯🇵', time: '9:38 AM', type: 'sent' },
    { id: 5, senderId: 101, text: "Oh wow, Japan is on my bucket list! What's the best time to visit?", time: '9:40 AM', type: 'received' },
  ],
  102: [
    { id: 1, senderId: 102, text: 'Loved your travel photos!', time: '2:20 PM', type: 'received' },
    { id: 2, senderId: 'me', text: 'Thank you! Photography is my passion 📸', time: '2:25 PM', type: 'sent' },
    { id: 3, senderId: 102, text: 'Me too! What camera do you use?', time: '2:30 PM', type: 'received' },
  ],
  103: [
    { id: 1, senderId: 'me', text: 'Hi Olivia! Love your fitness posts!', time: '10:00 AM', type: 'sent' },
    { id: 2, senderId: 103, text: 'Hey thanks! Do you workout too?', time: '10:15 AM', type: 'received' },
    { id: 3, senderId: 'me', text: 'Yeah, 5 times a week! Mostly strength training.', time: '10:20 AM', type: 'sent' },
    { id: 4, senderId: 103, text: 'That sounds fun!', time: '10:25 AM', type: 'received' },
  ],
};
