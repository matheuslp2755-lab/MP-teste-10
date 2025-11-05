
import React, { useState } from 'react';
import { MailIcon, LockIcon, UserIcon, LogoIcon } from './Icons';

interface LoginPageProps {
  onLogin: (email: string) => void;
  onRegister: (name: string, email: string, age: number) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onRegister }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (isLoginView) {
      onLogin(email);
    } else {
      // FIX: Check if age is a number before comparing it. The `age` state can be an empty string.
      if (typeof age !== 'number' || age < 10) {
        setError('Você deve ter pelo menos 10 anos para se registrar.');
        return;
      }
      onRegister(name, email, age);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
            <div className="inline-block text-indigo-400">
                <LogoIcon />
            </div>
            <h1 className="text-3xl font-bold text-white mt-2">MP SOCIAL</h1>
            <p className="text-gray-400 mt-1">Conecte-se com o mundo</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700">
          <div className="flex border-b border-gray-700 mb-6">
            <button
              onClick={() => setIsLoginView(true)}
              className={`flex-1 py-3 font-semibold text-sm transition-colors duration-300 ${isLoginView ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLoginView(false)}
              className={`flex-1 py-3 font-semibold text-sm transition-colors duration-300 ${!isLoginView ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-400 hover:text-white'}`}
            >
              Registrar
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {isLoginView ? (
              <div className="space-y-6">
                <div>
                    <label className="text-sm font-medium text-gray-300" htmlFor="login-email">Email</label>
                    <div className="relative mt-2">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@exemplo.com"
                        required
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-300" htmlFor="login-password">Senha</label>
                    <div className="relative mt-2">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                    </div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                  Entrar
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                 <div>
                    <label className="text-sm font-medium text-gray-300" htmlFor="register-name">Nome</label>
                    <div className="relative mt-2">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="register-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Seu Nome"
                        required
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                    </div>
                </div>
                 <div>
                    <label className="text-sm font-medium text-gray-300" htmlFor="register-email">Email</label>
                    <div className="relative mt-2">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MailIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="register-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="voce@exemplo.com"
                        required
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                    </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300" htmlFor="register-age">Idade</label>
                  <div className="relative mt-2">
                    <input
                      id="register-age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                      placeholder="Sua idade"
                      required
                      className="w-full px-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    />
                  </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-300" htmlFor="register-password">Senha</label>
                    <div className="relative mt-2">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        id="register-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Crie uma senha forte"
                        required
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                      />
                    </div>
                </div>
                {error && <p className="text-sm text-red-400 text-center">{error}</p>}
                <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                  Criar Conta
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
