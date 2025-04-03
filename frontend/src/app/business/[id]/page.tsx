import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Business {
  _id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  contact: string;
  image: string;
}

export default function BusinessProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [business, setBusiness] = useState<Business | null>(null);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/businesses/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBusiness(data);
          setReviews(data.reviews || []);
        });
    }
  }, [id]);

  const handleReviewSubmit = async () => {
    if (review.trim() === "") return;

    const newReviews = [...reviews, review];
    setReviews(newReviews);
    setReview("");

    await fetch(`/api/businesses/${id}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ review }),
    });
  };

  if (!business) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <img
        src={business.image}
        alt={business.name}
        className="w-full h-64 object-cover rounded-md"
      />
      <h1 className="text-3xl font-bold mt-4">{business.name}</h1>
      <p className="text-gray-600">{business.category}</p>
      <p className="text-gray-500">{business.location}</p>
      <p className="mt-3">{business.description}</p>
      <p className="mt-3 font-semibold">Contact: {business.contact}</p>

      {/* Reviews Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        <ul className="mt-2">
          {reviews.map((r, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded-md mt-2">
              {r}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <textarea
            className="w-full border p-2 rounded-md"
            placeholder="Write a review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
            onClick={handleReviewSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
