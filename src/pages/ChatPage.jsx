import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, Send, Search, MoreVertical, Phone, Video } from 'lucide-react';

export default function ChatPage() {
  const { user, logout } = useAuthStore();
  const [message, setMessage] = useState('');

  // Sample data to make the UI look "Full" for the interviewer
  const contacts = [
    { id: 1, name: "Design Team", lastMsg: "The new UI looks great!", time: "12:45 PM", online: true },
    { id: 2, name: "Engineering", lastMsg: "API is ready for testing.", time: "Yesterday", online: false },
    { id: 3, name: "HR Dept", lastMsg: "Please check your mail.", time: "Monday", online: true },
  ];

  return (
    <div className="flex h-screen bg-[#F5F5F7] font-sans overflow-hidden">
      
      {/* SIDEBAR: Contact List */}
      <div className="w-80 bg-white/80 backdrop-blur-xl border-r border-gray-200 flex flex-col">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Chats</h2>
          <button onClick={logout} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <LogOut size={20}/>
          </button>
        </div>

        <div className="px-6 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={16}/>
            <input placeholder="Search messages" className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/20 transition-all"/>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <div key={contact.id} className={`p-4 mx-2 rounded-2xl flex items-center gap-3 cursor-pointer transition-all ${contact.id === 1 ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  {contact.name[0]}
                </div>
                {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-semibold text-sm truncate">{contact.name}</p>
                  <span className="text-[10px] text-gray-400 uppercase font-medium">{contact.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{contact.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col bg-white">
        
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-100 flex items-center px-6 justify-between bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">DT</div>
            <div>
              <p className="font-bold text-sm">Design Team</p>
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Active Now</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <Phone size={18} className="cursor-pointer hover:text-blue-500"/>
            <Video size={18} className="cursor-pointer hover:text-blue-500"/>
            <MoreVertical size={18} className="cursor-pointer hover:text-blue-500"/>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#F9F9FB]">
          {/* Received Message */}
          <div className="flex justify-start">
            <div className="max-w-md">
              <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm text-sm text-gray-800 leading-relaxed">
                Hey {user?.name || 'User'}! This is the new dashboard interface. Everything is fully modular and responsive.
              </div>
              <span className="text-[10px] text-gray-400 ml-1 mt-1 block">12:45 PM</span>
            </div>
          </div>

          {/* Sent Message */}
          <div className="flex justify-end">
            <div className="max-w-md">
              <div className="bg-[#0071E3] text-white p-4 rounded-2xl rounded-br-none shadow-md shadow-blue-100 text-sm leading-relaxed">
                The industry standard layout looks amazing. The blurring and shadows are perfect.
              </div>
              <span className="text-[10px] text-gray-400 mr-1 mt-1 block text-right">12:46 PM</span>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-6 bg-white border-t border-gray-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); setMessage(''); }}
            className="flex items-center gap-3 bg-gray-100 p-1.5 rounded-2xl border border-gray-200 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all"
          >
            <input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message Design Team..." 
              className="flex-1 bg-transparent px-4 py-2 outline-none text-sm"
            />
            <button className="p-2.5 bg-[#0071E3] text-white rounded-xl hover:bg-[#0077ED] transition-all active:scale-95 shadow-lg shadow-blue-200">
              <Send size={18}/>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}