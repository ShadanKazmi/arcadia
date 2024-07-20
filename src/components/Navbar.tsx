import React, { useContext } from 'react';
import { menuContext } from '../context/MenuContext';

const Navbar: React.FC = () => {
  const { selectedItem, setSelectedItem } = useContext(menuContext);

  const menuItems = [
    'All Games',
    'Popular',
    'New',
    'Upcoming',
  ];

  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-yellow-500 text-2xl font-bold">Browse Topics</span>
          </div>
          <div className="hidden md:block">
            <div className="flex space-x-4">
              {menuItems.map((item) => (
                <a
                  key={item}
                  onClick={() => handleMenuItemClick(item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${
                    selectedItem === item
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
