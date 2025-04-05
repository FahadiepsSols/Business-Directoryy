"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBusiness() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    contactInfo: "",
    image: "", // base64 image string
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Business Added Successfully");
        router.push("/");
      } else {
        const error = await res.json();
        alert("Failed: " + error?.error);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Add Your Business</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Business Name" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        {/* <input type="text" name="category" placeholder="Category" onChange={handleChange} required className="w-full p-2 border rounded-md" /> */}
        <select
          name="category"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md bg-white"
        >
  <option value="" disabled selected>Select Category</option>
  <option value="Raw Food">Raw Food</option>
  <option value="DTF Printing">DTF Printing</option>
  <option value="Sports">Sports</option>
  <option value="cafe">cafe</option>
  <option value="Accessories">Accessories</option>
  <option value="Raw Vegetables and Spices">Raw Vegetables and Spices</option>
</select>

        
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        <input type="text" name="contactInfo" placeholder="Contact Info" onChange={handleChange} required className="w-full p-2 border rounded-md" />
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border rounded-md" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Submit</button>
      </form>
    </div>
  );
}
