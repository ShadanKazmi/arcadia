// import Image from 'next/image';
// import React from 'react';
// import logo from '../assets/logo.png'

// const BottomBar: React.FC = () => {
//   return (
//     <footer className="bg-black text-white py-2">
//       <div className="container mx-auto flex justify-between items-center px-2">
//         <div className="flex items-center space-x-4">
//         <Image
//             src={logo}
//             alt="logo"
//             style={{height:"100%", width:"40%"}}
//           />
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default BottomBar;

import Image from 'next/image';
import React from 'react';
import logo from '../assets/logo.png';
import { FaGithub } from 'react-icons/fa';

const BottomBar: React.FC = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <Image
            src={logo}
            alt="logo"
            style={{ height: '100%', width: '40%' }}
          />
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/ShadanKazmi"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <FaGithub className="text-2xl mr-2" />
            <span className='mr-5'>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default BottomBar;
