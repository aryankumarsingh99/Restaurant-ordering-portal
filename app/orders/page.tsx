"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Order } from "@/types";
import { Package, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const newOrderId = searchParams.get("new");

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem("restaurant-orders");
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders);
      
      // Auto-expand new order
      if (newOrderId) {
        setExpandedOrder(newOrderId);
      }
    }
  }, [newOrderId]);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "preparing":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "ready":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = (status: Order["status"]) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "preparing":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "ready":
        return "bg-green-100 text-green-700";
      case "delivered":
        return "bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700";
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">No Orders Yet</h1>
          <p className="text-slate-600 mb-8">
            You haven't placed any orders yet. Start exploring our delicious menu!
          </p>
          <a
            href="/menu"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            Browse Menu
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {newOrderId && (
          <div className="bg-green-100 border-2 border-green-500 rounded-xl p-4 mb-6">
            <p className="text-green-800 dark:text-green-200 font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Order placed successfully! Your food will arrive in approximately 30 minutes.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">Order #{order.id}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {new Date(order.orderDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-600">
                      ${order.total.toFixed(2)}
                    </p>
                    <p className="text-sm text-slate-600">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                    </p>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-600">Customer</p>
                    <p className="font-semibold">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Delivery Address</p>
                    <p className="font-semibold">{order.deliveryAddress}</p>
                  </div>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() =>
                    setExpandedOrder(expandedOrder === order.id ? null : order.id)
                  }
                  className="w-full flex items-center justify-center gap-2 text-orange-600 font-semibold hover:bg-orange-50 dark:hover:bg-teal-900/20 py-2 rounded-lg transition-colors"
                >
                  {expandedOrder === order.id ? (
                    <>
                      Hide Details
                      <ChevronUp className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      View Details
                      <ChevronDown className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-slate-200 p-6 bg-slate-50/50">
                  <h4 className="font-bold mb-4">Order Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 bg-white p-4 rounded-xl"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-bold">{item.name}</h5>
                          <p className="text-sm text-slate-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-orange-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-slate-600">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Contact</span>
                        <span className="font-semibold">{order.customerPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Email</span>
                        <span className="font-semibold">{order.customerEmail}</span>
                      </div>
                      {order.status === "pending" && (
                        <div className="flex justify-between">
                          <span className="text-slate-600">
                            Estimated Delivery
                          </span>
                          <span className="font-semibold text-orange-600">
                            {new Date(order.estimatedDelivery).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
