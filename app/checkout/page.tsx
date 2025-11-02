"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { User, CreditCard, CheckCircle, Wallet, Smartphone, DollarSign } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "upi" | "wallet">("card");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    upiId: "",
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
        customerEmail: "N/A",
        customerPhone: formData.phone,
        deliveryAddress: "In-store pickup / Dine-in",
        orderDate: new Date(),
        estimatedDelivery: new Date(Date.now() + 30 * 60000), // 30 minutes
      };

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem("restaurant-orders") || "[]");
      localStorage.setItem("restaurant-orders", JSON.stringify([order, ...existingOrders]));

      // Clear cart
      clearCart();

      // Show success alert
      setShowSuccessAlert(true);
      setIsProcessing(false);

      // Hide alert and redirect after 2 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
        router.push(`/orders?new=${order.id}`);
      }, 2000);
    }, 2000);
  };

  if (cart.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-4 transform animate-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-4 mb-4 animate-bounce">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                Order Placed Successfully! 🎉
              </h2>
              <p className="text-slate-600 text-lg mb-4">
                Your order has been confirmed and is being prepared.
              </p>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl px-6 py-3 w-full">
                <p className="text-sm text-orange-600 font-semibold">
                  Redirecting to your orders...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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

                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number *</label>
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

              {/* Payment Information */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                  Payment Method
                </h2>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === "card" ? "text-orange-600" : "text-slate-400"
                    }`} />
                    <p className={`text-sm font-semibold ${
                      paymentMethod === "card" ? "text-orange-600" : "text-slate-600"
                    }`}>
                      Card
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "upi"
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <Smartphone className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === "upi" ? "text-orange-600" : "text-slate-400"
                    }`} />
                    <p className={`text-sm font-semibold ${
                      paymentMethod === "upi" ? "text-orange-600" : "text-slate-600"
                    }`}>
                      UPI
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("wallet")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "wallet"
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <Wallet className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === "wallet" ? "text-orange-600" : "text-slate-400"
                    }`} />
                    <p className={`text-sm font-semibold ${
                      paymentMethod === "wallet" ? "text-orange-600" : "text-slate-600"
                    }`}>
                      Wallet
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "cash"
                        ? "border-orange-500 bg-orange-50"
                        : "border-slate-200 hover:border-orange-300"
                    }`}
                  >
                    <DollarSign className={`w-6 h-6 mx-auto mb-2 ${
                      paymentMethod === "cash" ? "text-orange-600" : "text-slate-400"
                    }`} />
                    <p className={`text-sm font-semibold ${
                      paymentMethod === "cash" ? "text-orange-600" : "text-slate-600"
                    }`}>
                      Cash
                    </p>
                  </button>
                </div>

                {/* Card Payment Fields */}
                {paymentMethod === "card" && (
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
                )}

                {/* UPI Payment Fields */}
                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">UPI ID *</label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="username@upi"
                      />
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-700">
                        📱 Popular UPI Apps: Google Pay, PhonePe, Paytm, Amazon Pay
                      </p>
                    </div>
                  </div>
                )}

                {/* Wallet Payment */}
                {paymentMethod === "wallet" && (
                  <div className="space-y-4">
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                      <Wallet className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2 text-purple-900">Digital Wallet</h3>
                      <p className="text-sm text-purple-700 mb-4">
                        Select your preferred digital wallet
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          className="bg-white border-2 border-purple-300 hover:border-purple-500 rounded-lg p-3 font-semibold text-purple-700 transition-all"
                        >
                          Paytm
                        </button>
                        <button
                          type="button"
                          className="bg-white border-2 border-purple-300 hover:border-purple-500 rounded-lg p-3 font-semibold text-purple-700 transition-all"
                        >
                          PhonePe
                        </button>
                        <button
                          type="button"
                          className="bg-white border-2 border-purple-300 hover:border-purple-500 rounded-lg p-3 font-semibold text-purple-700 transition-all"
                        >
                          Amazon Pay
                        </button>
                        <button
                          type="button"
                          className="bg-white border-2 border-purple-300 hover:border-purple-500 rounded-lg p-3 font-semibold text-purple-700 transition-all"
                        >
                          Google Pay
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cash Payment */}
                {paymentMethod === "cash" && (
                  <div className="space-y-4">
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                      <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2 text-green-900">Cash on Delivery</h3>
                      <p className="text-sm text-green-700 mb-2">
                        💵 Pay with cash when you receive your order
                      </p>
                      <p className="text-xs text-green-600">
                        Please keep exact change for faster service
                      </p>
                    </div>
                  </div>
                )}
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
