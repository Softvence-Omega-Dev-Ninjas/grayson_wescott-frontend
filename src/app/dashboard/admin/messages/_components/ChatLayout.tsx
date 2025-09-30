'use client';
import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatDetails from './ChatDetails';
import a1 from '../../../../../assets/dashboard/messages/Avatar1.png';
import a2 from '../../../../../assets/dashboard/messages/Avatar2.png';
import a3 from '../../../../../assets/dashboard/messages/Avatar3.png';
import a4 from '../../../../../assets/dashboard/messages/Avatar.png';
// Dummy chat data with messages
const dummyChats = [
  {
    id: '1',
    img: a1.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
  {
    id: '2',
    img: a2.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
  {
    id: '3',
    img: a3.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
  {
    id: '4',
    img: a4.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
  {
    id: '5',
    img: a1.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
  {
    id: '6',
    img: a1.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
  {
    id: '7',
    img: a1.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
  {
    id: '8',
    img: a1.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
  {
    id: '9',
    img: a1.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
  {
    id: '10',
    img: a1.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
  {
    id: '11',
    img: a1.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
  {
    id: '12',
    img: a1.src,
    name: 'Kate Morrison',
    status: true,
    lastMessage: 'Sure, I’ll send it now.',
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
    ],
  },
];

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  const chat = dummyChats.find((c) => c.id === selectedChat) || null;

  return (
    <div className="h-[calc(100vh-80px-60px)]  flex gap-5 w-full  bg-black text-white p-2">
      {/* Chat List - Mobile: hidden when chat is selected, Desktop: always visible */}
      <div
        className={`${
          selectedChat ? 'hidden lg:block' : 'block'
        } w-full lg:w-80 xl:w-96 flex-shrink-0 border-r border-gray-700`}
      >
        <ChatList
          chats={dummyChats}
          onSelect={setSelectedChat}
          selectedChat={selectedChat}
        />
      </div>

      {/* Chat Details - Mobile: visible when chat is selected, Desktop: always visible */}
      <div
        className={`${selectedChat ? 'block' : 'hidden lg:block'} flex-1 min-w-0`}
      >
        <ChatDetails chat={chat} onBack={() => setSelectedChat(null)} />
      </div>
    </div>
  );
}
