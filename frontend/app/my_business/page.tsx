// app/my-business/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
// import Header from "../components/header";

interface Business {
  _id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  contactInfo: string;
  image: string;
}

export default function MyBusiness() {
  const { user } = useUser();
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    if (user?.id) {
        // fetch(`http://localhost:5000/api/businesses/my_businesses?userId=${user.id}`)
        fetch(`https://business-directoryy.onrender.com/api/businesses/my_businesses?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setBusinesses(data))
        .catch((err) => console.error("Error fetching businesses:", err));
    }
  }, [user]);

  if (!user) return <div className="text-center mt-8">Loading...</div>;

  return (
    <>
    {/* <Header/> */}
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Businesses</h1>

      {businesses.length === 0 ? (
        <p className="text-center text-gray-600">You haven't added any businesses yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <div key={business._id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={business.image}
                alt={business.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-2">{business.name}</h2>
              <p className="text-gray-600">{business.category}</p>
              <p className="text-gray-500">{business.location}</p>
              <Link href={`/business/${business._id}`}>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md">
                  View Details
                </button>
              </Link>

            <Link href={`/my_business/edit/${business._id}`}>
                <button className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded-md ml-2">
                    Edit
                </button>
            </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}
