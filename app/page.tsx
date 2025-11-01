"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star, UtensilsCrossed } from "lucide-react";
import MenuCard from "@/components/MenuCard";
import { menuItems } from "@/lib/menuData";

export default function Home() {
  const popularItems = menuItems.filter((item) => item.popular).slice(0, 6);
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/restaurant1.jpg', '/restaurant2.jpg', '/restaurant3.jpg','/restaurant4.jpg', '/restaurant5.jpg', '/restaurant6.jpg', '/restaurant7.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 min-h-[600px] flex items-center overflow-hidden">
        {/* Sliding Background Images */}
        {images.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${image}')`,
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-[1]"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block bg-white/90 backdrop-blur-sm text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            🎉 Welcome to Delicious Bites
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-2xl"
          >
            Delicious Food, <br />Delivered to Your Door
          </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-white mb-8 max-w-2xl mx-auto text-center drop-shadow-lg"
        >
          Experience culinary excellence with our handcrafted dishes made from fresh,
          locally-sourced ingredients. Order now and enjoy fast delivery!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/menu"
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Browse Menu
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white hover:bg-slate-100 transition-all"
          >
            My Orders
          </Link>
        </motion.div>
        
        {/* Slide Indicators - Below Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex justify-center gap-2"
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImage
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </motion.div>
        
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center hover:shadow-2xl hover:scale-105 transition-all"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Clock className="w-8 h-8 text-orange-600" />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p className="text-slate-600">
            Get your food delivered in 30 minutes or less
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center hover:shadow-2xl hover:scale-105 transition-all"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UtensilsCrossed className="w-8 h-8 text-purple-600" />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
          <p className="text-slate-600">
            We use only the freshest, highest quality ingredients
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center hover:shadow-2xl hover:scale-105 transition-all"
        >
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Star className="w-8 h-8 text-pink-600 fill-current" />
          </motion.div>
          <h3 className="text-xl font-bold mb-2">Top Rated</h3>
          <p className="text-slate-600">
            Rated 4.8/5 by thousands of satisfied customers
          </p>
        </motion.div>
      </section>

      {/* Popular Items Section */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Dishes</h2>
            <p className="text-slate-600">
              Customer favorites that keep them coming back
            </p>
          </div>
          <Link
            href="/menu"
            className="hidden md:flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all"
          >
            View All
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <MenuCard item={item} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 md:hidden"
        >
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-orange-600 font-semibold"
          >
            View All Menu Items
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
