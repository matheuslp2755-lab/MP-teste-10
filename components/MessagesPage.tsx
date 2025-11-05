
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { MessageIcon } from './Icons';
import type { User, Conversation } from '../App';

interface MessagesPageProps {
    currentUser: User;
    allUsers: User[];
    conversations: Conversation[];
    onSendMessage: (conversationId: string, text: string) => void;
}

const MessagesPage: React.FC<MessagesPageProps> = ({ currentUser, allUsers, conversations, onSendMessage }) => {
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [messageText, setMessageText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const otherUsers = allUsers.filter(u => u.id !== currentUser.id);

    const selectedConversation = useMemo(() => {
        if (!selectedUserId) return null;
        const participantIds = [currentUser.id, selectedUserId].sort();
        const conversationId = participantIds.join('_');
        return conversations.find(c => c.id === conversationId) || { id: conversationId, participantIds, messages: [] };
    }, [selectedUserId, conversations, currentUser.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageText.trim() || !selectedConversation) return;
        onSendMessage(selectedConversation.id, messageText);
        setMessageText('');
    };
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedConversation?.messages]);

    const selectedUser = allUsers.find(u => u.id === selectedUserId);

    return (
        <main className="container mx-auto h-[calc(100vh-4rem)] p-4">
            <div className="flex h-full rounded-xl border border-gray-700 bg-gray-800/50 overflow-hidden">
                {/* Conversations List */}
                <div className="w-full md:w-1/3 border-r border-gray-700 flex flex-col">
                    <div className="p-4 border-b border-gray-700">
                        <h1 className="text-xl font-bold text-white">Conversas</h1>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        {otherUsers.length === 0 ? (
                            <div className="p-4 text-center text-gray-400">Nenhum outro usuário para conversar.</div>
                        ) : (
                            <ul>
                                {otherUsers.map(user => (
                                    <li key={user.id}>
                                        <button 
                                            onClick={() => setSelectedUserId(user.id)}
                                            className={`w-full text-left flex items-center p-4 space-x-3 transition-colors ${selectedUserId === user.id ? 'bg-indigo-500/20' : 'hover:bg-gray-700/50'}`}
                                        >
                                            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-semibold text-white">{user.name}</p>
                                                <p className="text-sm text-gray-400">{user.email}</p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="w-full md:w-2/3 flex flex-col">
                    {selectedConversation && selectedUser ? (
                        <>
                           <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
                                <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full"/>
                                <h2 className="font-bold text-white">{selectedUser.name}</h2>
                           </div>
                           <div className="flex-grow p-4 overflow-y-auto space-y-4">
                               {selectedConversation.messages.map(msg => (
                                   <div key={msg.id} className={`flex ${msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}>
                                       <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.senderId === currentUser.id ? 'bg-indigo-600 text-white rounded-br-lg' : 'bg-gray-700 text-gray-200 rounded-bl-lg'}`}>
                                           <p>{msg.text}</p>
                                       </div>
                                   </div>
                               ))}
                               <div ref={messagesEndRef} />
                           </div>
                           <div className="p-4 border-t border-gray-700">
                                <form onSubmit={handleSubmit} className="flex space-x-3">
                                    <input
                                        type="text"
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        placeholder="Digite uma mensagem..."
                                        className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <button type="submit" className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-indigo-500 transition disabled:bg-indigo-800" disabled={!messageText.trim()}>
                                        Enviar
                                    </button>
                                </form>
                           </div>
                        </>
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-center p-4">
                            <MessageIcon className="w-16 h-16 text-gray-600 mb-4" />
                            <h2 className="text-2xl font-bold text-white">Suas Mensagens</h2>
                            <p className="mt-2 text-gray-400 max-w-sm">
                                Selecione uma conversa na lista para começar a conversar.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default MessagesPage;
