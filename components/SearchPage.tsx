
import React, { useState } from 'react';
import { SearchIcon } from './Icons';
import type { User } from '../App';

interface SearchPageProps {
  allUsers: User[];
  currentUser: User;
  onViewProfile: (userId: string) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ allUsers, currentUser, onViewProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const otherUsers = allUsers.filter(user => user.id !== currentUser.id);

  const filteredUsers = otherUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Pesquisar Usuários</h1>
        <div className="relative mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Pesquisar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                <div 
                    className="flex items-center space-x-4 cursor-pointer"
                    onClick={() => onViewProfile(user.id)}
                >
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <button 
                    onClick={() => onViewProfile(user.id)}
                    className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-indigo-500 transition"
                >
                  Ver Perfil
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
