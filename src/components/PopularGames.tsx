import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchGames } from '../context/getGames'; // Adjust the import path as needed
import Link from 'next/link';

const PopularGames: React.FC = () => {
  const [games, setGames] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadPopularGames = async () => {
      try {
        const data = await fetchGames('all', 1, 10, '-metacritic');
        setGames(data.results);
      } catch (err) {
        console.error('Failed to fetch popular games:', err);
      }
    };

    loadPopularGames();
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? games.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === games.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full border-t border-gray-900 pt-10 text-center">
      <h2 className="text-5xl font-bold text-yellow-500 mb-10">Popular Games</h2>
      <div className="relative overflow-hidden rounded-lg" style={{width:"100%", height:"80vh"}}>
        {games.map((game, index) => (
          <div
            key={game.id}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === currentSlide ? 'block' : 'hidden'}`}
          >
            <Link href={`/browse/game/${game.slug}`}>
            <Image
              src={game.background_image || ''} 
              alt={`${game.title} Poster`}
              layout="fill"
              objectFit="cover"
              className="block w-full h-full"
            />
            </Link>
          </div>
        ))}
      </div>

      <div className="absolute z-30 flex space-x-3 bottom-5 left-1/2 transform -translate-x-1/2">
        {games.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-yellow-500' : 'bg-gray-500'}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handlePrevSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full group-hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300">
          <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={handleNextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full group-hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300">
          <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default PopularGames;
