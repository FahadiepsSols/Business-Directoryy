'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useSignIn
} from '@clerk/nextjs';

// import { RedirectToSignIn } from "@clerk/nextjs";
// import Header from '../../components/header';

type Review = {
  user: string;
  text: string;
};

type Business = {
  _id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  contactInfo: string;
  image: string;
  reviews: Review[];
};

export default function BusinessProfile() {
  const { id } = useParams();
  const { user } = useUser();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchBusiness = async () => {
    try {
      const res = await fetch(`https://business-directoryy.onrender.com/api/businesses/${id}`);
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

  useEffect(() => {
    if (id) fetchBusiness();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!reviewText.trim() || !user) return;

    try {
      setSubmitting(true);
      const res = await fetch(`https://business-directoryy.onrender.com/api/businesses/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.fullName || 'Anonymous',
          text: reviewText,
        }),
      });

      console.log("Review response:", res);

      if (res.ok) {
        setReviewText('');
        fetchBusiness(); 
      } else {
        alert('Failed to submit review');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!business) return <p>No business found.</p>;

  return (
    <>
      {/* <Header /> */}
      <div className="max-w-4xl mx-auto p-6">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-60 object-cover rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-4">{business.name}</h1>
        <p className="text-gray-700">{business.description}</p>
        <p className="mt-2">
          <strong>Category:</strong> {business.category}
        </p>
        <p className="mt-2">
          <strong>Address:</strong> {business.location}
        </p>
        <p>
          <strong>Contact:</strong> {business.contactInfo}
        </p>

        
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-2">Reviews</h2>

          {business.reviews?.length > 0 ? (
            <ul className="space-y-2">
              {business.reviews.map((review, index) => (
                <li key={index} className="p-3 border rounded bg-gray-50">
                  <strong>{review.user}:</strong> {review.text}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}

         
          { (
            <div className="mt-6">
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full border p-3 rounded mb-2"
                rows={4}
              />
            <SignedIn>
              <button
                onClick={handleReviewSubmit}
                disabled={submitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {submitting ? 'Publishing...' : 'Publish Review'}
              </button>
            </SignedIn>
            <SignedOut>
              <button
                disabled
                // onClick={() => RedirectToSignIn}
                
                className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed block"
              >
                {submitting ? 'Publishing...' : 'Sign-in To Publish A Review'}
              </button>
            </SignedOut>
            </div>
          )}
        </div>
      </div>
    </>
  );
}




