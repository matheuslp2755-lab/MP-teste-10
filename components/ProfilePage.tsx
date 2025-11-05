
import React from 'react';
import { SettingsIcon } from './Icons';
import type { User } from '../App';

interface ProfilePageProps {
  user: User;
  isCurrentUser: boolean;
  onEditProfile: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, isCurrentUser, onEditProfile }) => {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
          <div className="flex flex-col items-center sm:flex-row sm:items-start text-center sm:text-left">
            <img 
              src={user.avatar}
              alt="User Avatar" 
              className="w-32 h-32 rounded-full border-4 border-gray-600 object-cover"
            />
            <div className="mt-4 sm:mt-0 sm:ml-6 flex-grow">
              <div className="flex items-center justify-center sm:justify-between">
                  <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                  {isCurrentUser && (
                    <button 
                      onClick={onEditProfile}
                      className="hidden sm:flex items-center space-x-2 bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition"
                    >
                      <SettingsIcon className="w-4 h-4" />
                      <span>Editar Perfil</span>
                    </button>
                  )}
              </div>
              <p className="text-indigo-400 mt-1">{user.email}</p>
              <p className="text-gray-300 mt-4">
                Esta é uma bio de exemplo. Fale um pouco sobre você, seus hobbies e interesses.
              </p>
              {isCurrentUser && (
                 <button 
                      onClick={onEditProfile}
                      className="mt-4 sm:hidden w-full flex items-center justify-center space-x-2 bg-gray-700 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition"
                    >
                      <SettingsIcon className="w-4 h-4" />
                      <span>Editar Perfil</span>
                    </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
