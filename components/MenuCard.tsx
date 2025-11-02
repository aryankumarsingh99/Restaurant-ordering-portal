"use client";

import { useState } from "react";
import Image from "next/image";
import { MenuItem } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Plus, Star, Flame, Leaf, Check } from "lucide-react";

type ViewMode = "grid-4" | "grid-3" | "grid-2" | "list";

interface MenuCardProps {
  item: MenuItem;
  viewMode?: ViewMode;
}

export default function MenuCard({ item, viewMode = "grid-4" }: MenuCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // List View Layout
  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 flex flex-col sm:flex-row">
        {/* Image Container */}
        <div className="relative h-48 sm:h-auto sm:w-64 flex-shrink-0 overflow-hidden bg-slate-200">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 256px"
          />
          {item.popular && (
            <div className="absolute top-3 right-3 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Popular
            </div>
          )}
          <div className="absolute top-3 left-3 flex gap-2">
            {item.isVegetarian && (
              <div className="bg-green-500 text-white p-1.5 rounded-full" title="Vegetarian">
                <Leaf className="w-4 h-4" />
              </div>
            )}
            {item.isSpicy && (
              <div className="bg-red-500 text-white p-1.5 rounded-full" title="Spicy">
                <Flame className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors mb-2">
                {item.name}
              </h3>
              <span className="inline-block text-xs font-semibold px-2 py-1 bg-orange-100 text-orange-700 rounded-full capitalize">
                {item.cuisine.replace('-', ' ')}
              </span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 ml-4">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold text-slate-700">
                {item.rating}
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 mb-4 flex-1">
            {item.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-orange-600">
              ${item.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={added}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:scale-105"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {item.popular && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isVegetarian && (
            <div className="bg-green-500 text-white p-1.5 rounded-full" title="Vegetarian">
              <Leaf className="w-4 h-4" />
            </div>
          )}
          {item.isSpicy && (
            <div className="bg-red-500 text-white p-1.5 rounded-full" title="Spicy">
              <Flame className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
              {item.name}
            </h3>
            <span className="inline-block mt-1 text-xs font-semibold px-2 py-1 bg-orange-100 text-orange-700 rounded-full capitalize">
              {item.cuisine.replace('-', ' ')}
            </span>
          </div>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold text-slate-700">
              {item.rating}
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            ${item.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              added
                ? "bg-green-500 text-white"
                : "bg-gradient-to-r from-orange-500 to-red-600 text-white hover:shadow-lg hover:scale-105"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
