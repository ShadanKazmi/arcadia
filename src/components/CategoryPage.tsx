import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import { fetchGamesbyGenre } from '../context/getGames'; 
import Link from 'next/link';

type Game = {
  id: number;
  name: string;
  background_image: string;
  slug: string,
};

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); 
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customPage, setCustomPage] = useState('');

  const gamesPerPage = 20;

  useEffect(() => {
    const getGamesByGenre = async () => {
      setLoading(true);
      setError(null);
      try {
        if (slug) {
          const gamesData = await fetchGamesbyGenre(currentPage, gamesPerPage, slug);
          setGames(gamesData.results);
          setTotalPages(gamesData.total_pages);
        }
      } catch (error) {
        setError('Error fetching games by genre');
        console.error('Error fetching games by genre:', error);
      } finally {
        setLoading(false);
      }
    };

    getGamesByGenre();
  }, [slug, currentPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-4xl font-bold text-yellow-500 text-center mt-10 mb-10">Games in Category: {slug}</h1>
      <div className="inline-flex mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-l-lg hover:bg-gray-900 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Prev
        </button>
        <p className="flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800">
          Page {currentPage}
        </p>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-r-lg hover:bg-gray-900 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game.id} className="relative bg-gray-900 rounded-lg shadow-md p-4">
            <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <Link href={`/browse/game/${game.slug}`}>
            <h2 className="text-yellow-500 text-xl font-bold">{game.name}</h2>
            </Link>
          </div>
        ))}
      </div>
      <div className="inline-flex mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-l-lg hover:bg-gray-900 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Prev
        </button>
        <p className="flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800">
          Page {currentPage}
        </p>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-r-lg hover:bg-gray-900 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
