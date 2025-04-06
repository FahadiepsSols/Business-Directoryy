import React from 'react';
import Link from 'next/link';
import { useSearch } from '../context/SearchContext';
import Image from 'next/image';
import logo from '../../public/images/logo.jpg'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">

        
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-gray-800"><Image src={logo} alt="LOGO" width={50} height={50} /></a>
            {/* <Image src={logo} alt="LOGO" /> */}
          </Link>
        </div>

        
        <div className="flex flex-grow mx-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Cafe / Sports Shop / Vegetable Markets"
            className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition duration-200"
          >
            Search
          </button>
        </div>

        
        <div className="ml-2">
          <SignedIn>
            <Link href="/add_business" legacyBehavior>
              <a className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200">
                Add Your Business
              </a>
            </Link>
          </SignedIn>
          <SignedOut>
            <button
              disabled
              className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
              title="Login to add your business"
            >
              Add Your Business
            </button>
          </SignedOut>
        </div>

        <div className="ml-2">
          <SignedIn>
            <Link href="/my_business" legacyBehavior>
              <a className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200">
                My Business
              </a>
            </Link>
          </SignedIn>
          <SignedOut>
            <button
              disabled
              className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
              title="Login to add your business"
            >
              My Business
            </button>
          </SignedOut>
        </div>

        {/* Auth Button */}
        <div className="ml-2">
          <SignedOut>
            <SignInButton>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
