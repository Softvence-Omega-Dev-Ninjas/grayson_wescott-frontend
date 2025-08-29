"use client";
import Image from "next/image";
import React from "react";
import audio from "../../../../../assets/dashboard/messages/audio.png";
import video from "../../../../../assets/dashboard/messages/video.png";
import a1 from '../../../../../assets/dashboard/messages/Avatar2.png'
import { ArrowLeft, Plus, Mic } from "lucide-react";

interface ChatDetailsProps {
  chat: {
    id: string;
    name: string;
    img: string;
    status: boolean;
    messages: { id: string; sender: string; text: string; time: string }[];
  } | null;
  onBack: () => void;
}

export default function ChatDetails({ chat, onBack }: ChatDetailsProps) {
  if (!chat) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#151519] text-gray-400 rounded-lg">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black text-white rounded-lg">
      {/* Header */}
      <div className="bg-[#151519]  flex items-center justify-between p-4 border-b border-gray-700 rounded-t-lg ">
        <div className="flex w-full items-center gap-2">
          <button onClick={onBack} className="lg:hidden text-white">
            <ArrowLeft size={24} />
          </button>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Image src={chat.img} alt="image" width={50} height={50} />
                {chat.status ? (
                  <div className="w-3 h-3 bg-green-600 rounded-full absolute bottom-0 right-0" />
                ) : (
                  <div className="w-3 h-3 bg-gray-600 rounded-full absolute bottom-0 right-0" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{chat.name}</h3>
                {chat.status ? (
                  <p className="text-green-600">Active Now</p>
                ) : (
                  <p className="text-gray-400">Offline</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Image
                src={audio.src}
                alt="audio"
                height={20}
                width={20}
                className="cursor-pointer"
              />
              <Image
                src={video.src}
                alt="video"
                height={20}
                width={20}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Messages (scrollable middle) */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {chat.messages.length > 0 ? (
          chat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "Me" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex gap-1 items-center ">
                {
                    msg.sender !== "Me" ? (
                        <Image src={a1.src} alt="image" className="rounded-full object-cover" height={30} width={30}/>
                    ):("")
                }
                <div className="flex flex-col">
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      msg.sender === "Me"
                        ? "bg-[#2A2D33] text-white rounded-br-none"
                        : "bg-[#2A2D33] text-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No messages yet
          </div>
        )}
      </div>

      {/* Input (always bottom) */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-2">
        <button className="cursor-pointer">
          <Plus className="bg-[#2A2D33] p-2 rounded-full" size={30} />
        </button>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 rounded-lg bg-[#2A2D33] text-white outline-none"
        />
        <button className="cursor-pointer">
          <Mic className="bg-[#2A2D33] p-2 rounded-full" size={30} />
        </button>
        <button className="md:px-4 px-2 py-2 bg-[#2A2D33] rounded-md md:rounded-2xl text-xs md:text-lg cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
}
