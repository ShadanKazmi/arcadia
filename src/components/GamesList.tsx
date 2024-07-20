import React, { useState, useEffect, useContext, FC } from 'react';
import Image from 'next/image';
import { fetchPopularGames, fetchNewGames, fetchUpcomingGames, fetchGameDescription, fetchGames } from '../context/getGames';
import { FaStar, FaMedal, FaCalendarAlt, FaInfoCircle, FaSpinner } from 'react-icons/fa';
import { menuContext } from '../context/MenuContext';
import Link from 'next/link';

interface Game {
  id: number;
  slug: string;
  title: string;
  released: string;
  background_image: string;
  rating: number;
  rating_top: number;
  metacritic: number | null;
  description: string;
}

const GamesList: FC = () => {
  const { selectedItem } = useContext(menuContext);
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customPage, setCustomPage] = useState('');
  const [sortOption, setSortOption] = useState('title');

  const gamesPerPage = 50;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0 });
  };

  const goToCustomPage = () => {
    const pageNumber = parseInt(customPage);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      paginate(pageNumber);
      setCustomPage('');
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;

        switch (selectedItem) {
          case 'Popular':
            data = await fetchPopularGames(currentPage, gamesPerPage);
            break;
          case 'New':
            data = await fetchNewGames(currentPage, gamesPerPage);
            break;
          case 'Upcoming':
            data = await fetchUpcomingGames(currentPage, gamesPerPage);
            break;
          default:
            data = await fetchGames('', currentPage, gamesPerPage, sortOption);
            break;
        }

        const totalGames = data.count;
        const calculatedTotalPages = Math.ceil(totalGames / gamesPerPage);
        setTotalPages(calculatedTotalPages);

        const gamesWithDescriptions = await Promise.all(data.results.map(async (game: any) => {
          const gameData: Game = {
            id: game.id,
            title: game.name,
            slug: game.slug,
            released: game.released || 'TBA',
            background_image: game.background_image || '',
            rating: game.rating,
            rating_top: game.rating_top,
            metacritic: game.metacritic,
            description: ''
          };

          try {
            const descriptionData = await fetchGameDescription(game.id);
            gameData.description = descriptionData.description;
          } catch (err) {
            console.error(`Failed to fetch description for game ID ${game.id}`);
          }

          return gameData;
        }));

        setGames(gamesWithDescriptions);
      } catch (err) {
        setError('Failed to fetch games data');
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [currentPage, selectedItem]);

  if (loading) return (
    <div className="flex justify-center items-center h-96">
      <FaSpinner className="animate-spin text-yellow-500 text-4xl" />
    </div>
  );
  if (error) return <p>{error}</p>;

  const stripHtmlTags = (html: string) => {
    return html.replace(/<\/?[^>]+>/gi, '');
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length <= maxLength) return description;

    const endOfSentenceIndex = description.lastIndexOf('.', maxLength);
    const endOfParagraphIndex = description.lastIndexOf('\n', maxLength);

    const endIndex = Math.max(endOfSentenceIndex, endOfParagraphIndex);

    if (endIndex === -1) {
      return description.slice(0, maxLength);
    }

    return description.slice(0, endIndex + 1);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-yellow-500 text-center">{selectedItem}</h1>
      <div className="inline-flex mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-l-lg hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Prev
        </button>
        <input
          type="number"
          value={customPage}
          onChange={(e) => setCustomPage(e.target.value)}
          className="px-2 py-1 text-sm bg-gray-800 text-white border border-gray-700 rounded-none mx-2"
          placeholder={`Page 1 - ${totalPages}`}
          min="1"
          max={totalPages}
        />
        <button
          onClick={goToCustomPage}
          className="flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-r-lg hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Go
        </button>
        <p className="flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-r-lg hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
        <div className="flex items-center space-x-4 ml-10">
          <label htmlFor="sort-by" className="text-white font-medium">Sort By:</label>
          <select
            id="sort-by"
            value={sortOption}
            onChange={handleSortChange}
            className="bg-gray-800 text-white border border-gray-700 rounded-md px-3 py-1"
          >
            <option value="-rating">Rating</option>
            <option value="-released">Release Date</option>
            <option value="-title">Name</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <Image
              src={game.background_image}
              alt={game.title}
              className="w-full h-48 object-cover"
              width={500}
              height={300}
            />
            <div className="p-4 space-y-2">
              <Link href={`/browse/game/${game.slug}`}>
                <h3 className="text-xl font-bold text-yellow-500 cursor-pointer">{game.title}</h3>  
              </Link>
              <p className="text-gray-400">{truncateDescription(stripHtmlTags(game.description || ''), 200)}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-yellow-500">
                  <FaStar className="mr-1" /> {game.rating} / {game.rating_top}
                </div>
                <div className="flex items-center text-green-500">
                  <FaMedal className="mr-1" /> {game.metacritic || 'N/A'}
                </div>
                <div className="flex items-center text-blue-500">
                  <FaCalendarAlt className="mr-1" /> {game.released}
                </div>
                <a href={`/games/${game.id}`} className="flex items-center text-gray-400 hover:text-yellow-500">
                  <FaInfoCircle className="mr-1" /> Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="inline-flex mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-l-lg hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Prev
        </button>
        <input
          type="number"
          value={customPage}
          onChange={(e) => setCustomPage(e.target.value)}
          className="px-2 py-1 text-sm bg-gray-800 text-white border border-gray-700 rounded-none mx-2"
          placeholder={`Page 1 - ${totalPages}`}
          min="1"
          max={totalPages}
        />
        <button
          onClick={goToCustomPage}
          className="flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-r-lg hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Go
        </button>
        <p className="flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-gray-800 rounded-r-lg hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GamesList;
