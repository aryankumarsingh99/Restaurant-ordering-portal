"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { User, Mail, Phone, MapPin, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
  });

  const total = getCartTotal();
  const tax = total * 0.1;
  const deliveryFee = 5.99;
  const grandTotal = total + tax + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      // Create order
      const order = {
        id: `ORD-${Date.now()}`,
        items: cart,
        total: grandTotal,
        status: "pending" as const,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        deliveryAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
        orderDate: new Date(),
        estimatedDelivery: new Date(Date.now() + 30 * 60000), // 30 minutes
      };

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("restaurant-orders") || "[]");
      localStorage.setItem("restaurant-orders", JSON.stringify([order, ...existingOrders]));

      // Clear cart
      clearCart();

      // Redirect to orders page
      router.push(`/orders?new=${order.id}`);
    }, 2000);
  };

  if (cart.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <User className="w-6 h-6 text-orange-600" />
                  Personal Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-orange-600" />
                  Delivery Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="New York"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                  Payment Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        required
                        maxLength={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="text-sm text-slate-600">
                    {cart.length} {cart.length === 1 ? "item" : "items"}
                  </div>

                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="border-t border-slate-200 pt-3 mt-3 space-y-2">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Tax (10%)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery</span>
                      <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-orange-600">
                        ${grandTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </button>

                <p className="text-xs text-center text-slate-500 mt-4">
                  By placing this order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
