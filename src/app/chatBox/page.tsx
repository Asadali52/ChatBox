'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import searchIcon from "../../../public/assets/chatImgs/chat-search-icon.svg";
import PlusIcon from "../../../public/assets/chatImgs/chat-plus-icon.svg";
import sendBtn from "../../../public/assets/chatImgs/msg-send-btn.svg";
import DefaultImg from '../../../public/assets/svgs/haraz_logo.svg';
import {friends} from "@/utilis/MockData";

interface Friend {
  name: string;
  img: string;
  timeAgo: string;
  msg: string;
  unseenMsgCount?: string | number;
}

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: 'Hey there!', sender: 'user' },
    { text: 'Hi! How are you?', sender: 'me' },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [viewChat, setViewChat] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const tabs = ['All', 'Unread', 'Referral Doctors', 'Patients'];

  const filterFriendsByTab = (tabIndex: number) => {
    switch (tabIndex) {
      case 1:
        return friends.filter(friend => friend.unseenMsgCount);
      case 2:
        return friends.filter(friend => friend.name.includes('Dr.'));
      case 3:
        return friends.filter(friend => friend.name.includes('Patient'));
      default:
        return friends;
    }
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'me' }]);
      setNewMessage('');
    }
  };

  const handleFriendClick = (friend: Friend) => {
    setSelectedFriend(friend);
    setViewChat(true);
  };

  return (
    <div className="p-4  flex  gap-4 h-[95vh]">
      {/* Sidebar */}
      <div className={`w-[30%] max-[1400px]:w-[40%] max-[1140px]:w-[50%] border border-gray-300 bg-white rounded-lg py-2 flex flex-col h-[95vh] `}>
        <div className="p-1 font-bold">
          <h4 className='text-[28px] font-[600] text-[#0A96D4] px-4'>Chats</h4>
        </div>

        <div className='relative mt-2 px-5'>
          <Image src={searchIcon} alt='search' className='absolute top-2.5 left-6' />
          <input type="search" placeholder='Search' className='text-[15px] chat-search focus:outline-0 w-full pl-8 pr-4 py-3 rounded-[10px]' />
        </div>

        <div className="flex gap-3 mt-4 px-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-2 text-center text-[14px] px-3 rounded-[12px] whitespace-nowrap ${activeTab === index ? 'text-white bg-[#0A96D4]' : 'text-gray-500 bg-[#F1F1F1]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Friends List */}
        <ul className="flex-grow list-none p-0 m-0 mt-4 px-4 minimal-scrollbar overflow-auto">
          {filterFriendsByTab(activeTab).map((friend, index) => (
            <li
              key={index}
              className={`p-4 cursor-pointer relative my-4 rounded-[20px] bg-[#F8F8F8] ${selectedFriend?.name === friend.name ? 'selected-chat-shadow' : ''}`}
              onClick={() => handleFriendClick(friend)}
            >
              <div className="flex gap-2">
                <div className="h-[45px] w-[55px] rounded-full flex justify-center items-center relative">
                  <Image src={friend.img} alt={`${friend.name}'s Avatar`} fill objectFit='cover' />
                  <span className="absolute w-[13px] h-[13px] rounded-full bg-green-500 right-[-2px] bottom-1 border-2 border-white"></span>
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center w-full">
                    <h5 className="m-0 text-lg font-[600]">{friend.name}</h5>
                    <p className="m-0 text-gray-500 text-sm">{friend.timeAgo}</p>
                  </div>
                  <span className="text-gray-400 text-[12px] pr-4 overflow-hidden text-ellipsis line-clamp-1">{friend.msg}</span>
                </div>
                {friend.unseenMsgCount && (
                  <p className="absolute h-[20px] w-[20px] text-center leading-[22px] text-xs rounded-full bg-green-500 text-white right-5 bottom-[12px]">
                    {friend.unseenMsgCount}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat box */}
      <div className={`w-[70%] max-[1400px]:w-[60%] max-[1140px]:w-[50%] border bg-white rounded-lg overflow-hidden flex flex-col border-l border-gray-300 h-[95vh] `}>
        <div className="flex items-center p-4 font-bold border-b h-[70px]">
          {selectedFriend ? (
            <>
              <Image src={selectedFriend.img} alt={`${selectedFriend.name}'s Avatar`} width={40} height={40} />
              <div className='ml-2'>
              <h4 className='text-lg font-[600]'>{selectedFriend.name}</h4>
              <p className='font-[400] text-[#7D7D7D] text-[14px] leading-3'>Active Now</p>
              </div>
            </>
          ) : (
            <h4 className='text-lg font-[600]'>Select a friend to chat</h4>
          )}
        </div>
        <div className="flex-grow p-4 overflow-y-auto minimal-scrollbar bg-white">
          {viewChat && selectedFriend ? (
            messages.map((message, index) => (
              <div key={index} className={`my-2 p-2 rounded-lg flex ${message.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                <div className={`${message.sender === 'me' ? 'bg-blue-500 max-w-[48%] max-[1400px]:max-w-[60%] max-[1140px]:max-w-[70%] text-white' : 'bg-[#F1F1F1] max-w-[48%] max-[1400px]:max-w-[60%] max-[1140px]:max-w-[70%]'} p-2 rounded-lg`}>
                  {message.text}
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Image src={DefaultImg} alt="Default" width={200} height={200} />
              <p className='text-lg font-[500] mt-4'>Select a chat to start messaging</p>
            </div>
          )}
        </div>
        {viewChat && selectedFriend && (
          <form onSubmit={handleSendMessage} className="flex gap-2 px-6 py-4">
            <Image src={PlusIcon} alt='' />
            <input
              type="text"
              className="flex-grow rounded-full p-3 border border-[#0A96D4] focus:outline-0 px-4"
              placeholder="Type message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="ml-2 py-2">
              <Image src={sendBtn} alt='' />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
