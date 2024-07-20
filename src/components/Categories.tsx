import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchGenres } from '../context/getGames';

type Category = {
  id: number;
  name: string;
  image_background: string;
  games: { name: string }[];
};

const Categories: React.FC = () => {
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

  const handleCategoryClick = (slug: string) => {
    router.push(`/categories/${slug}`);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-yellow-500 text-center mt-10 mb-10">All Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.slice(0, 18).map((cat) => (
          <div
            key={cat.id}
            className="relative bg-cover bg-center bg-gray-900 rounded-lg shadow-md cursor-pointer"
            style={{ backgroundImage: `url(${cat.image_background})`, height: '300px' }}
            onClick={() => handleCategoryClick(cat.name.toLowerCase())}
          >
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <h2 className="text-yellow-500 text-2xl font-bold">{cat.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
