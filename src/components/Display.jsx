import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../Firebase"; // Assuming firebase is initialized here

const db = getDatabase(app); // Initialize Realtime Database

const Display = () => {
  const [clothesList, setClothesList] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Search state

  useEffect(() => {
    const clothesRef = ref(db, "clothes"); // Reference to the 'clothes' node in the Realtime Database

    // Fetch the data from Firebase Realtime Database
    onValue(clothesRef, (snapshot) => {
      const data = snapshot.val();
      const clothesArray = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setClothesList(clothesArray);
    });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter clothes based on search query
  const filteredClothes = clothesList.filter((cloth) => {
    return (
      cloth.itemName.toLowerCase().includes(searchQuery) ||
      cloth.color.toLowerCase().includes(searchQuery) ||
      cloth.occasion.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Clothes List</h1>

      {/* Search Input */}
      <div className="w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search by item name, color, or occasion"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
      </div>

      {/* Display Clothes List */}
      <div className="w-full max-w-md">
        {filteredClothes.length > 0 ? (
          filteredClothes.map((cloth) => (
            <div
              key={cloth.id}
              className="bg-white p-5 rounded-lg shadow-md mb-4 hover:shadow-lg transition transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-gray-800">{cloth.itemName}</h2>
              <p className="text-gray-600">Color: <span className="font-medium">{cloth.color}</span></p>
              <p className="text-gray-600">Occasion: <span className="font-medium">{cloth.occasion}</span></p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No clothes found</p>
        )}
      </div>
    </div>
  );
};

export default Display;
