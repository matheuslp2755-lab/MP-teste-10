
import React, { useState } from 'react';
import { LogoIcon, HomeIcon, UserIcon, SearchIcon, MessageIcon, PlusCircleIcon } from './Icons';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import MessagesPage from './MessagesPage';
import ProfilePage from './ProfilePage';
import EditProfilePage from './EditProfilePage';
import CreatePostModal from './CreatePostModal';
import type { User, Post, Conversation } from '../App';

interface LayoutProps {
  currentUser: User;
  allUsers: User[];
  allPosts: Post[];
  conversations: Conversation[];
  onAddPost: (content: string, image?: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

type Page = 'home' | 'search' | 'messages' | 'profile' | 'editProfile';
type ViewState = { type: Page } | { type: 'viewProfile', userId: string };

const Layout: React.FC<LayoutProps> = ({ currentUser, allUsers, allPosts, conversations, onAddPost, onSendMessage }) => {
  const [viewState, setViewState] = useState<ViewState>({ type: 'home' });
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);

  const handleViewProfile = (userId: string) => {
    setViewState({ type: 'viewProfile', userId });
  };
  
  const getActivePage = (): Page => {
    if (viewState.type === 'viewProfile') return 'profile';
    return viewState.type;
  }

  const renderContent = () => {
    switch (viewState.type) {
      case 'home':
        return <HomePage posts={allPosts} allUsers={allUsers} onViewProfile={handleViewProfile} />;
      case 'search':
        return <SearchPage allUsers={allUsers} currentUser={currentUser} onViewProfile={handleViewProfile}/>;
      case 'messages':
        return <MessagesPage currentUser={currentUser} allUsers={allUsers} conversations={conversations} onSendMessage={onSendMessage} />;
      case 'profile':
        return <ProfilePage user={currentUser} isCurrentUser={true} onEditProfile={() => setViewState({ type: 'editProfile' })} />;
      case 'editProfile':
        return <EditProfilePage onBack={() => setViewState({ type: 'profile' })} />;
      case 'viewProfile':
        const userToView = allUsers.find(u => u.id === viewState.userId);
        if (!userToView) return <div>Usuário não encontrado</div>;
        return <ProfilePage user={userToView} isCurrentUser={userToView.id === currentUser.id} onEditProfile={() => setViewState({ type: 'editProfile' })} />;
      default:
        return <HomePage posts={allPosts} allUsers={allUsers} onViewProfile={handleViewProfile}/>;
    }
  };

  const NavButton: React.FC<{ page: Page, children: React.ReactNode }> = ({ page, children }) => (
    <button
      onClick={() => setViewState({ type: page })}
      aria-label={`Go to ${page}`}
      className={`p-2 rounded-full transition-colors ${getActivePage() === page ? 'text-indigo-400 bg-gray-700' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="sticky top-0 bg-gray-900/80 backdrop-blur-md border-b border-gray-700 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setViewState({ type: 'home' })}>
              <div className="text-indigo-400">
                <LogoIcon />
              </div>
              <span className="text-xl font-bold text-white">MP SOCIAL</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <NavButton page="home"><HomeIcon className="w-6 h-6" /></NavButton>
              <button
                onClick={() => setCreatePostModalOpen(true)}
                aria-label="Create new post"
                className="p-2 rounded-full text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                <PlusCircleIcon className="w-6 h-6" />
              </button>
              <NavButton page="search"><SearchIcon className="w-6 h-6" /></NavButton>
              <NavButton page="messages"><MessageIcon className="w-6 h-6" /></NavButton>
               <button
                  onClick={() => setViewState({ type: 'viewProfile', userId: currentUser.id })}
                  aria-label="Go to your profile"
                  className={`p-2 rounded-full transition-colors ${getActivePage() === 'profile' && (viewState as any).userId === currentUser.id ? 'text-indigo-400 bg-gray-700' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                  <img src={currentUser.avatar} alt="Seu perfil" className="w-6 h-6 rounded-full" />
                </button>
            </div>
          </div>
        </nav>
      </header>
      
      <div className="flex-grow">
        {renderContent()}
      </div>

      {isCreatePostModalOpen && (
        <CreatePostModal 
          onClose={() => setCreatePostModalOpen(false)}
          onAddPost={onAddPost}
        />
      )}
    </div>
  );
};

export default Layout;
