"use client";

import { useState } from "react";
import MenuCard from "@/components/MenuCard";
import { menuItems, categories } from "@/lib/menuData";
import { Search } from "lucide-react";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Our Menu
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore our wide selection of delicious dishes, crafted with love and the finest ingredients
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 focus:border-orange-500 dark:focus:border-orange-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-105"
                  : "bg-white text-slate-700 dark:text-slate-300 border-2 border-slate-200 hover:border-orange-500 dark:hover:border-orange-500"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-slate-600">
            No items found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}
