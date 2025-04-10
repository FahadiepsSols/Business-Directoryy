'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

interface Business {
  _id: string;
  name: string;
  category: string;
  location: string;
  image: string;
}

export default function FollowingPage() {
  const { user } = useUser();
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`https://business-directoryy.onrender.com/api/following/${user.id}`)
        .then(res => res.json())
        .then(data => setBusinesses(data));
    }
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please sign in to view your followed businesses.</p>;

  if (!businesses) return <p className="text-center mt-10">No Businesses in Your WishList</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Followed Businesses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map(business => (
          <div key={business._id} className="bg-white shadow-md rounded-lg p-4">
            <img src={business.image} alt={business.name} className="w-full h-40 object-cover rounded-md" />
            <h2 className="text-xl font-semibold mt-2">{business.name}</h2>
            <p className="text-gray-600">{business.category}</p>
            <p className="text-gray-500">{business.location}</p>
            <Link href={`/business/${business._id}`}>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
