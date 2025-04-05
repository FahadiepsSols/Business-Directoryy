

// "use client";

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-gray-800">MyLogo</a>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex flex-grow mx-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition duration-200">
            Search
          </button>
        </div>

        {/* About Button */}
        <Link href="/add_business" legacyBehavior>
          <a className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200">
            Add Your Business
          </a>
        </Link>
      </div>
    </header>
  );
};

export default Header;