"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
// import Header from "../../../components/header";

export default function EditBusinessPage() {
  const router = useRouter();
//   const { id } = useParams();
  const params = useParams();
  const id = params.id as string;
  const [business, setBusiness] = useState<any>(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    contactInfo: "",
    // image: "",
  });

  useEffect(() => {
    if (id) {
      // fetch(`http://localhost:5000/api/businesses/${id}`)
      fetch(`https://business-directoryy.onrender.com/api/businesses/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setBusiness(data);
          setForm({
            name: data.name,
            category: data.category,
            location: data.location,
            description: data.description,
            contactInfo: data.contactInfo,
            // image: data.image,
          });
        });
    }
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/businesses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

    if (res.ok) {
        alert("Business Details Updated Sucessfully")
      router.push("/my_business");
    } else {
      alert("Failed to update business");
    }
  };

  if (!business) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      {/* <Header /> */}
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h1 className="text-2xl font-bold mb-4">Edit Business</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(form).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium">{key}</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
}
