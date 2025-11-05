
import React, { useState, useRef } from 'react';
import { UserIcon, PlusCircleIcon } from './Icons';

interface ProfileSetupPageProps {
  initialName: string;
  onComplete: (name: string, avatarUrl?: string) => void;
}

const ProfileSetupPage: React.FC<ProfileSetupPageProps> = ({ initialName, onComplete }) => {
  const [name, setName] = useState(initialName);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700 text-center">
        <h1 className="text-3xl font-bold text-white">Configure seu Perfil</h1>
        <p className="text-gray-400 mt-2">Adicione um nome de exibição e uma foto.</p>

        <div className="mt-8 flex justify-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={handleIconClick}
            className="relative w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center border-2 border-dashed border-gray-500 hover:border-indigo-400 transition-colors"
            aria-label="Upload profile picture"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full rounded-full object-cover" />
            ) : (
              <UserIcon className="w-20 h-20 text-gray-500" />
            )}
            <div className="absolute bottom-1 right-1 bg-indigo-600 p-1.5 rounded-full">
              <PlusCircleIcon className="w-6 h-6 text-white" />
            </div>
          </button>
        </div>

        <div className="mt-8 text-left">
            <label className="text-sm font-medium text-gray-300" htmlFor="setup-name">Seu Nome</label>
            <input
                id="setup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Como você quer ser chamado?"
                required
                className="mt-2 w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
        </div>
        
        <div className="mt-8 space-y-4">
            <button 
                onClick={() => onComplete(name, imagePreview ?? undefined)}
                disabled={!name}
                className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
                Salvar e Continuar
            </button>
            <button 
                onClick={() => onComplete(name)}
                disabled={!name}
                className="w-full bg-transparent text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-700/50 disabled:text-gray-500 disabled:hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition"
            >
                Pular foto por enquanto
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
