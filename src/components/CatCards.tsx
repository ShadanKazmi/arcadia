import React from 'react';
import Image from 'next/image';
import { StaticImageData } from "next/image"
type CardProps = {
  title: string;
  image: StaticImageData;
};

const CatCard: React.FC<CardProps> = ({ title, image }) => {
    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden w-80 h-80 mx-auto">
          <Image src={image} alt={title} className="w-full h-40 object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-bold">{title}</h2>
          </div>
        </div>
      );
    };

export default CatCard;
