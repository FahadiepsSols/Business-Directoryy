
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../../components/header';

type Business = {
  _id: string;
  name: string;
  description: string;
  location: string;
  contactInfo: string;
  image: string;
  reviews: { user: string; text: string }[];
};

export default function BusinessProfile() {
  const { id } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/businesses/${id}`);
        if (!res.ok) throw new Error('Failed to fetch business data');

        const data = await res.json();
        setBusiness(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBusiness();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!business) return <p>No business found.</p>;

  return (
    <>
    <Header/>
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={business.image}
        alt={business.name}
        className="w-full h-60 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{business.name}</h1>
      <p className="text-gray-700">{business.description}</p>
      <p className="mt-2">
        <strong>Address:</strong> {business.location}
      </p>
      <p>
        <strong>Contact:</strong> {business.contactInfo}
      </p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <ul className="mt-2">
          {business?.reviews?.length > 0 ? (
            business.reviews.map((review, index) => (
              <li key={index} className="p-2 border rounded mt-2">
                <strong>{review.user}:</strong> {review.text}
              </li>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </ul>
      </div>
    </div>
    </>
  );
}
