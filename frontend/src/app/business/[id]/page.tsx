"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Business {
  id: string;
  name: string;
  description: string;
  address: string;
  contact: string;
  image: string;
  reviews: { user: string; text: string }[];
}

export default function BusinessProfile() {
  const { id } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/businesses/${id}`)
      .then((res) => res.json())
      .then((data) => setBusiness(data))
      .catch((err) => console.error("Error fetching business:", err));
  }, [id]);

  const submitReview = async () => {
    if (!reviewText.trim()) return;
    
    const newReview = { user: "Anonymous", text: reviewText };
    setBusiness((prev) => prev ? { ...prev, reviews: [...prev.reviews, newReview] } : prev);

    await fetch(`http://localhost:5000/api/businesses/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    setReviewText("");
  };

  if (!business) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={business.image} alt={business.name} className="w-full h-60 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{business.name}</h1>
      <p className="text-gray-700">{business.description}</p>
      <p className="mt-2"><strong>Address:</strong> {business.address}</p>
      <p><strong>Contact:</strong> {business.contact}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <ul className="mt-2">
          {business.reviews.length > 0 ? business.reviews.map((review, index) => (
            <li key={index} className="p-2 border rounded mt-2">
              <strong>{review.user}:</strong> {review.text}
            </li>
          )) : <p>No reviews yet.</p>}
        </ul>
      </div>

      <div className="mt-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Write a review..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button
          onClick={submitReview}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
