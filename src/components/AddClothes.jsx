import React, { useState } from "react";
import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "../firebase"; //

const db = getDatabase(app); // Initialize Realtime Database

const AddClothes = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    color: "",
    occasion: "",
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
      const clothesRef = ref(db, "clothes"); // Get a reference to the 'clothes' node
      const newClothRef = push(clothesRef); // Create a new unique reference for the new cloth item

      await set(newClothRef, {
        itemName: formData.itemName,
        color: formData.color,
        occasion: formData.occasion,
      });

      alert("Clothes added successfully");
      setFormData({
        itemName: "",
        color: "",
        occasion: "",
      });
    } catch (error) {
      console.error("Error adding to Realtime Database: ", error);
      alert("Error adding clothes");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-4">Add Clothes</h1>

        {/* Item Name Dropdown with Placeholder */}
        <label className="block mb-2">Item Name</label>
        <select
          name="itemName"
          value={formData.itemName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        >
          <option value="" disabled>
            Select item name
          </option>
          <option value="shirt">Shirt</option>
          <option value="jeans">Jeans</option>
          <option value="t-shirt">T-Shirt</option>
          <option value="saree">Saree</option>
          <option value="trousers">Trousers</option>
          <option value="night-pants">Night Pants</option>
          <option value="others">Others</option>
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

        {/* Occasion Input */}
        <label className="block mb-2">Occasion</label>
        <input
          type="text"
          name="occasion"
          value={formData.occasion}
          onChange={handleInputChange}
          placeholder="Enter occasion"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Clothes"}
        </button>
      </form>
    </div>
  );
};

export default AddClothes; 
