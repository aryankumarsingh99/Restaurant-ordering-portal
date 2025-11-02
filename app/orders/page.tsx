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
    <div className="min-h-screen bg-slate-50">
      {/* Modern Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
              <p className="text-sm text-slate-500">{orders.length} total orders</p>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-semibold text-slate-700">Order History</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          {/* Success Alert */}
          {newOrderId && (
            <div className="bg-white border-l-4 border-green-500 rounded-xl p-4 mb-6 shadow-md">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 mb-1">Order Confirmed!</p>
                  <p className="text-sm text-slate-600">Your order has been placed successfully. Estimated ready time: 30 minutes.</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200"
              >
                {/* Order Header */}
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900">Order #{order.id}</h3>
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                          {new Date(order.orderDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </p>
                    </div>
                  </div>

                  {/* Quick Summary */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-600">Customer:</span>
                      <span className="font-medium text-slate-900">{order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-600">Phone:</span>
                      <span className="font-medium text-slate-900">{order.customerPhone}</span>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() =>
                    setExpandedOrder(expandedOrder === order.id ? null : order.id)
                  }
                  className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 border-t border-slate-100 transition-colors flex items-center justify-center gap-2 text-sm font-semibold text-slate-700"
                >
                  {expandedOrder === order.id ? (
                    <>
                      Hide Items
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      View Items ({order.items.length})
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div className="border-t border-slate-100 bg-slate-50">
                    <div className="p-4">
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200"
                          >
                            <div className="relative w-14 h-14 rounded-md overflow-hidden bg-slate-200 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="56px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-slate-900 text-sm truncate">{item.name}</h5>
                              <p className="text-xs text-slate-500 mt-0.5">
                                ${item.price.toFixed(2)} × {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-slate-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Summary */}
                      <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Subtotal</span>
                          <span className="font-medium text-slate-900">
                            ${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Tax (10%)</span>
                          <span className="font-medium text-slate-900">
                            ${(order.items.reduce((sum, item) => sum + item.price * item.quantity, 0) * 0.1).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-200">
                          <span className="text-slate-900">Total</span>
                          <span className="text-orange-600">${order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Additional Info */}
                      {order.status === "pending" && (
                        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-orange-600" />
                            <span className="text-sm text-slate-700">
                              <span className="font-semibold">Estimated Ready:</span>{" "}
                              {new Date(order.estimatedDelivery).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
