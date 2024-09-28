import React, { useState } from 'react'
import { motion } from 'framer-motion'

const categories = [
  { name: "Clothes", icon: "👕" },
  { name: "Electronics", icon: "📱" },
  { name: "Accessories", icon: "👜" },
]

export default function UserInventory() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className="min-h-screen font-oswald bg-gradient-to-br from-purple-900 via-purple-700 to-pink-500 flex flex-col items-center justify-center p-4">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-white mb-12 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        User Inventory
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            className={`bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border border-gray-700 ${
              hoveredIndex === index ? 'bg-opacity-70' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span className="text-6xl mb-4">{category.icon}</span>
            <h2 className="text-2xl font-semibold text-white">{category.name}</h2>
          </motion.div>
        ))}
      </div>
    </div>
  )
}