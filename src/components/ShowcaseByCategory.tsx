import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchGenres } from '../context/getGames';

type Game = {
  slug: string;
  name: string;
};

type Category = {
  name: string;
  image_background: string;
  games: Game[];
};

const ShowcaseByCategory: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const genresData = await fetchGenres();
        setCategories(genresData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    getCategories();
  }, []);

  const handleSeeAllCategories = () => {
    router.push('/categories');
  };

  const handleCategoryClick = (slug: string) => {
    router.push(`/categories/${slug}`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-yellow-500 text-center mt-10 mb-10">
        Games by Category
      </h1>
      {categories.slice(0, 6).map((cat, index) => (
        <div
          key={index}
          className="relative bg-cover bg-center bg-gray-900 p-10 rounded-lg shadow-md"
          style={{ backgroundImage: `url(${cat.image_background})` }}
        >
          <h2 className="text-yellow-500 text-2xl font-bold mb-10 border-b-2 border-yellow-500 pb-10">
            {cat.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.games.slice(0, 6).map((game, idx) => (
              <div key={idx} className="bg-gray-800 rounded-lg p-4 shadow-lg">
                <Link href={`/browse/game/${game.slug}`}>
                  <h3 className="text-yellow-400 text-xl font-semibold mt-2 cursor-pointer">
                    {game.name}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button
              className="bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
              onClick={() => handleCategoryClick(cat.name.toLowerCase())}
            >
              Show More
            </button>
          </div>
        </div>
      ))}
      <div className="text-center mt-10" style={{ marginBottom: '30px' }}>
        <button
          className="bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
          onClick={handleSeeAllCategories}
        >
          See All Categories
        </button>
      </div>
    </div>
  );
};

export default ShowcaseByCategory;
