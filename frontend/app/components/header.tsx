'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearch } from '../context/SearchContext';
import logo from '../../public/images/logo.jpg';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs';

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const role = user?.unsafeMetadata?.role; // 👈 using unsafeMetadata as discussed

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4 flex-wrap md:flex-nowrap">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold text-gray-800 flex items-center">
              <Image src={logo} alt="LOGO" width={50} height={50} />
            </a>
          </Link>
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className={`w-full md:flex md:items-center md:space-x-4 ${menuOpen ? 'block' : 'hidden'} md:w-auto mt-4 md:mt-0`}>
          {/* Search Bar */}
          <div className="flex w-full md:w-auto md:flex-grow md:mx-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Cafe / Sports Shop / Vegetable Markets"
              className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-gray-800 text-white p-2 rounded-r-md hover:bg-gray-700 transition duration-200"
            >
              Search
            </button>
          </div>

          {/* Add Your Business */}
          <div className="mt-2 md:mt-0">
            {role === 'business-owner' && (
              <Link href="/add_business" legacyBehavior>
                <a className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 block text-center">
                  Add Your Business
                </a>
              </Link>
            )}
            <SignedOut>
              <button
                disabled
                className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed block w-full"
                title="Login as a business owner to add your business"
              >
                Add Your Business
              </button>
            </SignedOut>
          </div>

          
          <div className="mt-2 md:mt-0">
            <SignedIn>
            {role === 'business-owner' && (
              <Link href="/my_business" legacyBehavior>
                <a className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 block text-center">
                  My Business
                </a>
              </Link>
            )}
          
            </SignedIn>
            <SignedOut>
              <button
                disabled
                className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed block w-full"
                title="Login to view your business"
              >
                My Business
              </button>
            </SignedOut>
          </div>


          <div className="mt-2 md:mt-0">
          <SignedIn>
            {/* {role === 'customer' || role === 'business-owner' && ( */}
              <Link href="/following" legacyBehavior>
                <a className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 block text-center">
                  My Wish-List
                </a>
              </Link>
            {/* )} */}
          </SignedIn>
          </div>

          
          <div className="mt-2 md:mt-0">
            <SignedOut>
              <SignInButton mode="redirect" forceRedirectUrl="/Authentication">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 w-full">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
