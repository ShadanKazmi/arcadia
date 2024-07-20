import React from 'react';
import Image from 'next/image';
import bg from '../assets/bg.jpg';

const GameCarousel: React.FC = () => {
  return (
    <div className="relative w-full h-56 md:h-96 overflow-hidden rounded-lg">
      <div className="relative w-full h-full">
        <Image
          src={bg}
          layout="fill"
          objectFit="cover"
          className="block w-full"
          alt="Background"
        />
      </div>
    </div>
  );
};

export default GameCarousel;
