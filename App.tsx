
import React, { useState, useCallback } from 'react';
import LoginPage from './components/LoginPage';
import MainContent from './components/MainContent';
import ProfileSetupPage from './components/ProfileSetupPage';

// Data Structures for the simulated multi-user app
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  age: number;
}

export interface Post {
  id: number;
  authorId: string;
  content: string;
  image?: string;
  timestamp: string;
}

export interface Message {
  id: number;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  messages: Message[];
}

// --- App State ---
type AuthState = 'loggedOut' | 'profileSetup' | 'loggedIn';
type NewUserInfo = { name: string; email: string; age: number; };

function App() {
  const [authState, setAuthState] = useState<AuthState>('loggedOut');
  
  // Simulated Database
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [allConversations, setAllConversations] = useState<Conversation[]>([]);

  // Current session state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUserInfo, setNewUserInfo] = useState<NewUserInfo | null>(null);

  const handleLogin = useCallback((email: string) => {
    // In a real app, you'd verify password. Here, we just find by email.
    const user = allUsers.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setAuthState('loggedIn');
    } else {
      // For simulation, let's allow login to a default user if not found
      // or show an error. For now, we just won't log in.
      alert("Usuário não encontrado. Por favor, registre-se.");
    }
  }, [allUsers]);

  const handleRegister = useCallback((name: string, email: string, age: number) => {
    setNewUserInfo({ name, email, age });
    setAuthState('profileSetup');
  }, []);

  const handleProfileSetupComplete = useCallback((name: string, avatarUrl?: string) => {
    if (!newUserInfo) return;

    const newUser: User = {
      id: `user_${Date.now()}`,
      email: newUserInfo.email,
      age: newUserInfo.age,
      name,
      avatar: avatarUrl || `https://i.pravatar.cc/150?u=${Date.now()}`,
    };
    
    setAllUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    setAuthState('loggedIn');
    setNewUserInfo(null);
  }, [newUserInfo]);
  
  const handleAddPost = useCallback((content: string, image?: string) => {
    if (!currentUser) return;
    const newPost: Post = {
      id: Date.now(),
      authorId: currentUser.id,
      content,
      image,
      timestamp: new Date().toISOString(),
    };
    setAllPosts(prev => [newPost, ...prev]);
  }, [currentUser]);

  const handleSendMessage = useCallback((conversationId: string, text: string) => {
    if (!currentUser) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
    };

    const conversationExists = allConversations.some(c => c.id === conversationId);

    if (conversationExists) {
        setAllConversations(prev => prev.map(c => 
            c.id === conversationId ? { ...c, messages: [...c.messages, newMessage] } : c
        ));
    } else {
        const participantIds = conversationId.split('_');
        const newConversation: Conversation = {
            id: conversationId,
            participantIds,
            messages: [newMessage],
        };
        setAllConversations(prev => [...prev, newConversation]);
    }
  }, [currentUser, allConversations]);

  const renderContent = () => {
    switch (authState) {
      case 'loggedOut':
        return <LoginPage onLogin={handleLogin} onRegister={handleRegister} />;
      case 'profileSetup':
        return <ProfileSetupPage initialName={newUserInfo?.name || ''} onComplete={handleProfileSetupComplete} />;
      case 'loggedIn':
        if (!currentUser) {
           // Fallback if currentUser is somehow null
          setAuthState('loggedOut');
          return null;
        }
        return <MainContent 
                  currentUser={currentUser} 
                  allUsers={allUsers}
                  allPosts={allPosts}
                  conversations={allConversations}
                  onAddPost={handleAddPost}
                  onSendMessage={handleSendMessage}
                />;
      default:
        return <LoginPage onLogin={handleLogin} onRegister={handleRegister} />;
    }
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {renderContent()}
    </div>
  );
}

export default App;
