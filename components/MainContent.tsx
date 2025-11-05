
import React, { useState, useEffect } from 'react';
import WelcomePage from './WelcomePage';
import Layout from './Layout';
import type { User, Post, Conversation } from '../App';

interface MainContentProps {
  currentUser: User;
  allUsers: User[];
  allPosts: Post[];
  conversations: Conversation[];
  onAddPost: (content: string, image?: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

const MainContent: React.FC<MainContentProps> = (props) => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 4000); // Show welcome animation for 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return showWelcome ? <WelcomePage /> : <Layout {...props} />;
};

export default MainContent;
