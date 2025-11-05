
import React from 'react';
import PostCard from './PostCard';
import type { Post, User } from '../App';
import { PlusCircleIcon } from './Icons';

interface HomePageProps {
  posts: Post[];
  allUsers: User[];
  onViewProfile: (userId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ posts, allUsers, onViewProfile }) => {
  const findUser = (userId: string) => {
    return allUsers.find(user => user.id === userId);
  };

  return (
    <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {posts.length > 0 ? (
          posts.map(post => {
            const author = findUser(post.authorId);
            if (!author) return null; // Or some placeholder
            return <PostCard key={post.id} post={post} author={author} onViewProfile={onViewProfile} />;
          })
        ) : (
          <div className="text-center mt-16 p-8 bg-gray-800/50 border border-gray-700 rounded-xl">
            <div className="flex justify-center items-center mx-auto w-16 h-16 bg-gray-700 rounded-full">
              <PlusCircleIcon className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mt-6">Seu feed está vazio</h2>
            <p className="mt-2 text-gray-400">Nenhuma publicação ainda. Que tal criar uma e começar a interagir?</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
