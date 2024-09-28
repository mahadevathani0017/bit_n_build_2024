import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { db } from "../Firebase"; // Import your firebase config

const AddFootwear = () => {
  const [formData, setFormData] = useState({
    footwearName: "",
    color: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      // Save data to Realtime Database
      const footwearRef = ref(db, "footwear"); // Reference to the 'footwear' node
      const newFootwearRef = push(footwearRef); // Create a new unique reference for the new footwear item

      await set(newFootwearRef, {
        footwearName: formData.footwearName,
        color: formData.color,
      });

      alert("Footwear added successfully");
      setFormData({
        footwearName: "",
        color: "",
      });
    } catch (error) {
      console.error("Error adding to Realtime Database: ", error);
      alert("Error adding footwear");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <form
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Add Footwear</h1>

        {/* Footwear Name Dropdown */}
        <label className="block mb-2">Footwear Name</label>
        <select
          name="footwearName"
          value={formData.footwearName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        >
          <option value="" disabled>
            Select footwear name
          </option>
          <option value="Sneakers">Sneakers</option>
          <option value="Boots">Boots</option>
          <option value="Sandals">Sandals</option>
          <option value="Loafers">Loafers</option>
          <option value="Flip Flops">Flip Flops</option>
          <option value="Heels">Heels</option>
          <option value="Others">Others</option>
        </select>

        {/* Color Input */}
        <label className="block mb-2">Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          placeholder="Enter color"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={uploading}
        >
          {uploading ? "Adding..." : "Add Footwear"}
        </button>
      </form>
    </div>
  );
};

export default AddFootwear;
