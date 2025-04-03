'use client'
import { useEffect, useState } from "react";
import Link from "next/link";

interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  contact: string;
  image: string;
}

export default function Home() {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/businesses")
      .then((res) => res.json())
      .then((data) => setBusinesses(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Business Directory</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <div key={business.id} className="bg-white shadow-md rounded-lg p-4">
            <img
              src={business.image}
              alt={business.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{business.name}</h2>
            <p className="text-gray-600">{business.category}</p>
            <p className="text-gray-500">{business.location}</p>
            <Link href={`/business/${business.id}`}>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
