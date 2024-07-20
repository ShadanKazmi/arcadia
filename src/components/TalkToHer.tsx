import React from 'react';
import { useRouter } from 'next/navigation';
import glados from '../assets/glados.png';

const TalkToHer: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/chat');
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900"
      style={{
        backgroundImage: `url(${glados.src})`,
        backgroundSize: '30vh',
        backgroundPosition: 'top right',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="bg-gray-800 text-white flex flex-col items-center justify-center rounded-lg shadow-4xl"
        style={{ 
          width: '500px', 
          height: '500px', 
          backgroundColor: 'rgba(0, 0, 0, 0.5)' 
        }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          Feeling Lonely? Why not have a chat? She likes baking cake!
        </h2>
        <button
          onClick={handleClick}
          className="bg-yellow-500 hover:bg-blue-800 text-black font-bold py-4 px-8 rounded-lg transition duration-300 ease-in-out"
          style={{ fontSize: '1.25rem' }}
        >
          Go to Chat
        </button>
      </div>
    </div>
  );
};

export default TalkToHer;
