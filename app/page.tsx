"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star, UtensilsCrossed, Shield, Leaf, Award, Heart, Users, TrendingUp, Gift, MapPin, Phone, Mail } from "lucide-react";
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
    <div className="min-h-screen overflow-x-hidden">
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
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
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
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="mb-16 container mx-auto px-4">
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

      {/* Why Choose Us Section */}
      <section className="mb-16 bg-gradient-to-br from-orange-50 to-red-50 py-16 rounded-3xl mx-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 px-4"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Why Choose Us?
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We&apos;re committed to providing the best dining experience with quality, convenience, and care
          </p>
        </motion.div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10 }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Food Safety</h3>
            <p className="text-slate-600 text-sm">
              Certified kitchen with highest hygiene standards
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Organic Ingredients</h3>
            <p className="text-slate-600 text-sm">
              100% organic and locally sourced produce
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Award Winning</h3>
            <p className="text-slate-600 text-sm">
              Multiple culinary excellence awards
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center"
          >
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">Made With Love</h3>
            <p className="text-slate-600 text-sm">
              Every dish crafted with passion and care
            </p>
          </motion.div>
        </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mb-16 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200"
          >
            <Users className="w-10 h-10 text-orange-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-orange-600 mb-1">50K+</div>
            <div className="text-sm text-slate-600">Happy Customers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200"
          >
            <UtensilsCrossed className="w-10 h-10 text-red-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-red-600 mb-1">200+</div>
            <div className="text-sm text-slate-600">Menu Items</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200"
          >
            <TrendingUp className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-3xl font-bold text-green-600 mb-1">15+</div>
            <div className="text-sm text-slate-600">Years Experience</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center p-6 bg-white rounded-2xl shadow-lg border border-slate-200"
          >
            <Star className="w-10 h-10 text-yellow-600 mx-auto mb-3 fill-current" />
            <div className="text-3xl font-bold text-yellow-600 mb-1">4.8/5</div>
            <div className="text-sm text-slate-600">Average Rating</div>
          </motion.div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="mb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Special Offers</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Don&apos;t miss out on our exclusive deals and promotions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden"
          >
            <Gift className="w-16 h-16 absolute -right-4 -top-4 opacity-20" />
            <div className="relative z-10">
              <div className="text-sm font-semibold mb-2 uppercase tracking-wide">First Order</div>
              <div className="text-4xl font-bold mb-2">20% OFF</div>
              <p className="text-white/90 mb-4">On your first order above $30</p>
              <div className="inline-block bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold text-sm">
                Use Code: FIRST20
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden"
          >
            <Star className="w-16 h-16 absolute -right-4 -top-4 opacity-20 fill-current" />
            <div className="relative z-10">
              <div className="text-sm font-semibold mb-2 uppercase tracking-wide">Weekend Deal</div>
              <div className="text-4xl font-bold mb-2">Buy 2 Get 1</div>
              <p className="text-white/90 mb-4">Free on selected items every weekend</p>
              <div className="inline-block bg-white text-green-600 px-4 py-2 rounded-lg font-semibold text-sm">
                Use Code: WEEKEND
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden"
          >
            <Heart className="w-16 h-16 absolute -right-4 -top-4 opacity-20 fill-current" />
            <div className="relative z-10">
              <div className="text-sm font-semibold mb-2 uppercase tracking-wide">Loyalty Reward</div>
              <div className="text-4xl font-bold mb-2">Free Delivery</div>
              <p className="text-white/90 mb-4">For orders above $50 always</p>
              <div className="inline-block bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold text-sm">
                No Code Needed
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Real reviews from real food lovers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "Food Blogger",
              comment: "Absolutely amazing food! The quality and taste are unmatched. I order here at least twice a week.",
              rating: 5,
              image: "👩‍🦰"
            },
            {
              name: "Michael Chen",
              role: "Regular Customer",
              comment: "Fast delivery, hot food, and incredible flavors. This is my go-to restaurant for any occasion!",
              rating: 5,
              image: "👨‍💼"
            },
            {
              name: "Emma Davis",
              role: "Health Enthusiast",
              comment: "Love that they use organic ingredients! The healthy options are delicious and guilt-free.",
              rating: 5,
              image: "👩‍⚕️"
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200"
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">{testimonial.image}</div>
                <div>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-slate-600">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              <p className="text-slate-600 italic">&quot;{testimonial.comment}&quot;</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="mb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <UtensilsCrossed className="w-64 h-64 absolute -left-20 -top-20" />
            <UtensilsCrossed className="w-64 h-64 absolute -right-20 -bottom-20" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Have Questions?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our team is here to help you 24/7. Get in touch with us today!
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <Phone className="w-5 h-5" />
                <span className="font-semibold">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <Mail className="w-5 h-5" />
                <span className="font-semibold">info@deliciousbites.com</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">123 Food Street, NY</span>
              </div>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Order Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
