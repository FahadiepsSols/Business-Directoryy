// 'use client';
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Header from "./components/header";
// import { useSearch } from './context/SearchContext'


// interface Business {
//   _id: string;
//   name: string;
//   category: string;
//   location: string;
//   description: string;
//   contactInfo: string;
//   image: string;
// }

// export default function Home() {
//   const [businesses, setBusinesses] = useState<Business[]>([]);
//   const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [allCategories, setAllCategories] = useState<string[]>([]);
//   const { searchQuery } = useSearch();

  
//   useEffect(() => {
//     // fetch("http://localhost:5000/api/businesses")
//     fetch("https://business-directoryy.onrender.com/api/businesses")
//       .then((res) => res.json())
//       .then((data) => {
//         setBusinesses(data);
//         setFilteredBusinesses(data);

//         const categories = Array.from(new Set(data.map((b: Business) => b.category))) as string[];
//         setAllCategories(categories);
//       });
//   }, []);

  
//   useEffect(() => {
//     const filtered = businesses.filter((b) => {
//       const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(b.category);
//       const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesCategory && matchesSearch;
//     });

//     setFilteredBusinesses(filtered);
//   }, [selectedCategories, searchQuery, businesses]);

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev) =>
//       prev.includes(category)
//         ? prev.filter((c) => c !== category) 
//         : [...prev, category]
//     );
//   };

//   return (
//     <>
//       <Header />

//       <div className="container mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">Businesses Available Near You</h1>

//         {/* Category Buttons */}
//         <div className="mb-6 flex flex-wrap gap-4 justify-center">
//           {allCategories.map((category) => (
//             <button
//               key={category}
//               onClick={() => handleCategoryChange(category)}
//               className={`px-4 py-2 rounded-md border ${
//                 selectedCategories.includes(category)
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-200"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>

        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredBusinesses.map((business) => (
//             <div key={business._id} className="bg-white shadow-md rounded-lg p-4">
//               <img
//                 src={business.image}
//                 alt={business.name}
//                 className="w-full h-40 object-cover rounded-md"
//               />
//               <h2 className="text-xl font-semibold mt-2">{business.name}</h2>
//               <p className="text-gray-600">{business.category}</p>
//               <p className="text-gray-500">{business.location}</p>
//               <Link href={`/business/${business._id}`}>
//                 <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md">
//                   View Details
//                 </button>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }


// app/page.tsx
// import Header from './components/header';
import BusinessListWrapper from './components/BusinessListWrapper';

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <BusinessListWrapper />
    </>
  );
}


