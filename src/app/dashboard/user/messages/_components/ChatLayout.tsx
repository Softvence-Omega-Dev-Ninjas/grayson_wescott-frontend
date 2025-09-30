'use client';
import React, { useState } from 'react';
import ChatDetails from './ChatDetails';
import a1 from '../../../../../assets/dashboard/messages/Avatar1.png';

// Dummy chat data with messages
const dummyChats = [
  {
    id: '1',
    img: a1.src,
    name: 'Kate Morrison',
    status: true,
    messages: [
      {
        id: 'm1',
        sender: 'Kate',
        text: 'Hi there! How are you?',
        time: '10:00 AM',
      },
      {
        id: 'm2',
        sender: 'Me',
        text: 'I’m good, what about you?',
        time: '10:02 AM',
      },
      {
        id: 'm3',
        sender: 'Kate',
        text: 'Great! Did you check the docs?',
        time: '10:05 AM',
      },
      {
        id: 'm4',
        sender: 'Kate',
        text: 'Hi there! How are you?',
        time: '10:00 AM',
      },
      {
        id: 'm5',
        sender: 'Me',
        text: 'I’m good, what about you?',
        time: '10:02 AM',
      },
      {
        id: 'm6',
        sender: 'Kate',
        text: 'Great! Did you check the docs?',
        time: '10:05 AM',
      },
      {
        id: 'm7',
        sender: 'Kate',
        text: 'Hi there! How are you?',
        time: '10:00 AM',
      },
      {
        id: 'm8',
        sender: 'Me',
        text: 'I’m good, what about you?',
        time: '10:02 AM',
      },
      {
        id: 'm9',
        sender: 'Kate',
        text: 'Great! Did you check the docs?',
        time: '10:05 AM',
      },
      {
        id: 'm10',
        sender: 'Kate',
        text: 'Great! Did you check the docs?',
        time: '10:05 AM',
      },
      {
        id: 'm11',
        sender: 'Kate',
        text: 'Great! Did you check the docs?',
        time: '10:05 AM',
      },
      {
        id: 'm12',
        sender: 'Kate',
        text: 'Great! Did you check the docs?',
        time: '10:05 AM',
      },
      {
        id: 'm13',
        sender: 'Kate',
        text: 'Great! Did you check the docs?',
        time: '10:05 AM',
      },
      {
        id: 'm14',
        sender: 'Kate',
        text: 'Great! Did you check the docs?',
        time: '10:05 AM',
      },
      {
        id: 'm15',
        sender: 'Kate',
        text: 'Great! Did you check the docs?',
        time: '10:05 AM',
      },
    ],
  },
];

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>('1'); // Set initial chat to show on load

  // Find the selected chat object from the array
  const chat = dummyChats.find((c) => c.id === selectedChat) || null;

  return (
    <div className="h-[calc(100vh-80px-60px)] flex gap-5 w-full bg-black text-white p-2">
      {/* You would have a chat list component here */}
      {/* For now, we'll just render the ChatDetails component with the selected chat */}

      <div
        className={`${selectedChat ? 'block' : 'hidden lg:block'} flex-1 min-w-0`}
      >
        <ChatDetails chat={chat} onBack={() => setSelectedChat(null)} />
      </div>
    </div>
  );
}
