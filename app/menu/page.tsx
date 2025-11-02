"use client";

import { useState } from "react";
import MenuCard from "@/components/MenuCard";
import { menuItems, categories, cuisineCategories } from "@/lib/menuData";
import { Search, Grid3x3, List, LayoutGrid, Leaf, Flame } from "lucide-react";

type ViewMode = "grid-4" | "grid-3" | "grid-2" | "list";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid-4");
  const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high" | "rating">("popular");
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "non-veg">("all");
  const [showSpicyOnly, setShowSpicyOnly] = useState(false);

  const filteredItems = menuItems
    .filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesCuisine = selectedCuisine === "all" || item.cuisine === selectedCuisine;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiet = dietFilter === "all" || 
                         (dietFilter === "veg" && item.isVegetarian) ||
                         (dietFilter === "non-veg" && !item.isVegetarian);
      const matchesSpicy = !showSpicyOnly || item.isSpicy;
      return matchesCategory && matchesCuisine && matchesSearch && matchesDiet && matchesSpicy;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header with Background Image */}
      <div className="relative text-white py-20 mb-8 shadow-lg overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/restaurant1.jpg')",
          }}
        ></div>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-center drop-shadow-2xl">
            Explore Our Menu
          </h1>
          <p className="text-lg text-center text-white/95 max-w-2xl mx-auto drop-shadow-lg">
            42 delicious dishes from 6 cuisines
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Search & Controls Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 sticky top-4 z-20">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for your favorite dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 focus:border-orange-500 focus:outline-none focus:bg-white transition-all"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 focus:border-orange-500 focus:outline-none cursor-pointer font-medium transition-all"
            >
              <option value="popular">🔥 Most Popular</option>
              <option value="rating">⭐ Top Rated</option>
              <option value="price-low">💰 Price Low-High</option>
              <option value="price-high">💎 Price High-Low</option>
            </select>

            {/* View Toggle */}
            <div className="flex gap-2 bg-slate-100 rounded-xl p-1.5">
              <button
                onClick={() => setViewMode("grid-4")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid-4"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid-3")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "grid-3"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2.5 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content: Sidebar + Menu Grid */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32 space-y-6 max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-slate-100">
              {/* Cuisine Filter */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  🌍 Cuisines
                </h3>
                <div className="space-y-2">
                  {cuisineCategories.map((cuisine) => (
                    <button
                      key={cuisine.id}
                      onClick={() => setSelectedCuisine(cuisine.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-left ${
                        selectedCuisine === cuisine.id
                          ? "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md scale-105"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:shadow-sm"
                      }`}
                    >
                      <span className="text-xl">{cuisine.icon}</span>
                      <span className="text-sm">{cuisine.name}</span>
                      {selectedCuisine === cuisine.id && (
                        <span className="ml-auto text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-slate-200"></div>

              {/* Food Type Filter */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  🍽️ Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full px-4 py-2.5 rounded-lg font-medium transition-all text-left text-sm ${
                        selectedCategory === category.id
                          ? "bg-slate-800 text-white shadow-md"
                          : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-slate-200"></div>

              {/* Diet Preference */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  🥗 Diet Preference
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setDietFilter("all")}
                    className={`w-full px-4 py-2.5 rounded-lg font-medium transition-all text-sm ${
                      dietFilter === "all"
                        ? "bg-orange-100 text-orange-700 border-2 border-orange-500"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    All Dishes
                  </button>
                  <button
                    onClick={() => setDietFilter("veg")}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all text-sm ${
                      dietFilter === "veg"
                        ? "bg-green-500 text-white shadow-md"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Leaf className="w-4 h-4" />
                    Vegetarian
                  </button>
                  <button
                    onClick={() => setDietFilter("non-veg")}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all text-sm ${
                      dietFilter === "non-veg"
                        ? "bg-orange-600 text-white shadow-md"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    🍗 Non-Vegetarian
                  </button>
                </div>
              </div>

              {/* Spicy Toggle */}
              <div>
                <button
                  onClick={() => setShowSpicyOnly(!showSpicyOnly)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all ${
                    showSpicyOnly
                      ? "bg-red-500 text-white shadow-md"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Flame className="w-5 h-5" />
                    Spicy Dishes Only
                  </span>
                  <span className={`w-12 h-6 rounded-full transition-all ${showSpicyOnly ? 'bg-white/30' : 'bg-slate-300'} relative`}>
                    <span className={`absolute top-1 w-4 h-4 rounded-full transition-all ${showSpicyOnly ? 'right-1 bg-white' : 'left-1 bg-white'}`}></span>
                  </span>
                </button>
              </div>

              {/* Clear Filters */}
              {(selectedCuisine !== "all" || selectedCategory !== "all" || dietFilter !== "all" || showSpicyOnly || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCuisine("all");
                    setSelectedCategory("all");
                    setDietFilter("all");
                    setShowSpicyOnly(false);
                    setSearchQuery("");
                  }}
                  className="w-full px-4 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Menu Items */}
          <main className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {filteredItems.length} {filteredItems.length === 1 ? 'Dish' : 'Dishes'} Available
              </h2>
            </div>

            {/* Menu Grid/List */}
            {filteredItems.length > 0 ? (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid-4"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : viewMode === "grid-3"
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {filteredItems.map((item) => (
                  <MenuCard key={item.id} item={item} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <div className="text-7xl mb-6">😔</div>
                <h3 className="text-3xl font-bold text-slate-800 mb-3">No Dishes Found</h3>
                <p className="text-slate-600 text-lg mb-8">
                  We couldn't find any dishes matching your criteria
                </p>
                <button
                  onClick={() => {
                    setSelectedCuisine("all");
                    setSelectedCategory("all");
                    setDietFilter("all");
                    setShowSpicyOnly(false);
                    setSearchQuery("");
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  Reset & Browse All
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
