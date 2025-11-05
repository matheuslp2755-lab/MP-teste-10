
import React from 'react';
import Fireworks from './Fireworks';

const WelcomePage: React.FC = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      <Fireworks />
      <div className="z-10 text-center animate-pulse">
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 15px rgba(255,255,255,0.7)' }}>
          Bem-vindo
        </h1>
      </div>
    </div>
  );
};

export default WelcomePage;
