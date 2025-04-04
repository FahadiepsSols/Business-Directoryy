"use client";

import { useState } from "react";
//import { useUser } from "@clerk/nextjs"; // Clerk authentication
import { useRouter } from "next/navigation";

export default function AddBusiness() {
 // const { user } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    contactInfo: "",
    image: null as File | null,
  });

//   if (!user) {
//     return <p>Please log in to add a business.</p>;
//   }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("contactInfo", formData.contactInfo);
    if (formData.image) formDataToSend.append("image", formData.image);

    const res = await fetch(`http://localhost:5000/api/businesses`, {
      method: "POST",
      body: formDataToSend,
    });

    if (res.ok) {
        alert('Business Added Sucessfully');
      router.push("/"); // Redirect after success
    } else {
      console.error("Failed to add business");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Your Business</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Business Name" onChange={handleChange} className="w-full p-2 border rounded-md" required />
        <input type="text" name="category" placeholder="Category" onChange={handleChange} className="w-full p-2 border rounded-md" required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 border rounded-md" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded-md" required />
        <input type="text" name="contactInfo" placeholder="Contact Info" onChange={handleChange} className="w-full p-2 border rounded-md" required />
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
      </form>
    </div>
  );
}
