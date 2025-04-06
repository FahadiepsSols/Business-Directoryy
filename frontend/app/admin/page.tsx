'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import Header from '../components/header';

const ADMIN_EMAIL = "fahad.iepssols@gmail.com";

interface Business {
  _id: string;
  name: string;
  category: string;
  location: string;
  contactInfo: string;
}

export default function AdminPanel() {
  const { user, isLoaded } = useUser();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBusinesses = async () => {
    const res = await fetch("http://localhost:5000/api/businesses/all");
    const data = await res.json();
    setBusinesses(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user?.emailAddresses[0]?.emailAddress === ADMIN_EMAIL) {
      fetchBusinesses();
    }
  }, [user]);

  if (!isLoaded) return <p>Loading...</p>;

  if (user?.emailAddresses[0]?.emailAddress !== ADMIN_EMAIL) {
    return (
      <>
        <Header />
        <div className="text-center mt-12 text-red-600 text-lg">
          🚫 Access Denied: You are not authorized to view this page.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
        {loading ? (
          <p>Loading businesses...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Category</th>
                <th className="p-2">Location</th>
                <th className="p-2">Contact</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((biz) => (
                <tr key={biz._id} className="border-t">
                  <td className="p-2">{biz.name}</td>
                  <td className="p-2">{biz.category}</td>
                  <td className="p-2">{biz.location}</td>
                  <td className="p-2">{biz.contactInfo}</td>
                  <td className="p-2">
                    <button
                      onClick={async () => {
                        const confirmDelete = confirm("Are you sure?");
                        if (!confirmDelete) return;
                        const res = await fetch(`http://localhost:5000/api/businesses/${biz._id}`, {
                          method: "DELETE",
                        });
                        if (res.ok) {
                          alert("Deleted");
                          fetchBusinesses();
                        } else {
                          alert("Failed to delete");
                        }
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
