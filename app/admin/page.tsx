"use client";

import { useState, useEffect } from "react";
import { Order } from "@/types";
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  Bell,
  Eye,
  ChevronDown,
  ChevronUp,
  User,
  Phone,
  MapPin,
  Mail
} from "lucide-react";

export default function AdminPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [newOrdersCount, setNewOrdersCount] = useState(0);

  useEffect(() => {
    // Load orders from localStorage
    const loadOrders = () => {
      const savedOrders = localStorage.getItem("restaurant-orders");
      if (savedOrders) {
        const parsedOrders = JSON.parse(savedOrders);
        // Sort by date (newest first)
        const sortedOrders = parsedOrders.sort(
          (a: Order, b: Order) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        );
        setOrders(sortedOrders);
        
        // Count pending orders
        const pending = sortedOrders.filter((o: Order) => o.status === "pending").length;
        setNewOrdersCount(pending);
      }
    };

    loadOrders();

    // Poll for new orders every 5 seconds
    const interval = setInterval(loadOrders, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Filter orders based on status and search query
    let filtered = orders;

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerPhone.includes(searchQuery)
      );
    }

    setFilteredOrders(filtered);
  }, [orders, statusFilter, searchQuery]);

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("restaurant-orders", JSON.stringify(updatedOrders));
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "preparing":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "ready":
        return "bg-green-100 text-green-700 border-green-300";
      case "delivered":
        return "bg-orange-100 text-teal-700 border-teal-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <Package className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
    }
  };

  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, order) => sum + order.total, 0);

  const todayOrders = orders.filter(
    (o) =>
      new Date(o.orderDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-2">
                Admin Panel
              </h1>
              <p className="text-slate-600">
                Manage restaurant orders and track deliveries
              </p>
            </div>
            {newOrdersCount > 0 && (
              <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-6 py-3 rounded-xl font-semibold animate-pulse">
                <Bell className="w-5 h-5" />
                {newOrdersCount} New Order{newOrdersCount > 1 ? "s" : ""}
              </div>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Total Orders
                  </p>
                  <p className="text-3xl font-bold">{orders.length}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-xl">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Pending
                  </p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {orders.filter((o) => o.status === "pending").length}
                  </p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Today's Orders
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {todayOrders}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by Order ID, Customer Name, or Phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 bg-white focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  statusFilter === "all"
                    ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                    : "bg-white border-2 border-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("pending")}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  statusFilter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-white border-2 border-slate-200"
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter("preparing")}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  statusFilter === "preparing"
                    ? "bg-blue-500 text-white"
                    : "bg-white border-2 border-slate-200"
                }`}
              >
                Preparing
              </button>
              <button
                onClick={() => setStatusFilter("ready")}
                className={`px-4 py-3 rounded-xl font-medium transition-all ${
                  statusFilter === "ready"
                    ? "bg-green-500 text-white"
                    : "bg-white border-2 border-slate-200"
                }`}
              >
                Ready
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Orders Found</h3>
            <p className="text-slate-600">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your filters"
                : "Waiting for new orders to come in..."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md border-2 border-slate-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Order #{order.id}</h3>
                        <p className="text-sm text-slate-600">
                          {new Date(order.orderDate).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 border-2 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span className="text-2xl font-bold text-orange-600">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-slate-50/50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="text-xs text-slate-600">
                          Customer
                        </p>
                        <p className="font-semibold">{order.customerName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="text-xs text-slate-600">
                          Phone
                        </p>
                        <p className="font-semibold">{order.customerPhone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                      <div>
                        <p className="text-xs text-slate-600">
                          Delivery Address
                        </p>
                        <p className="font-semibold">{order.deliveryAddress}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Order Summary */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-slate-600">
                      {order.items.length} item{order.items.length > 1 ? "s" : ""} •{" "}
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} total
                      quantity
                    </div>
                    <button
                      onClick={() =>
                        setExpandedOrder(expandedOrder === order.id ? null : order.id)
                      }
                      className="flex items-center gap-2 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      {expandedOrder === order.id ? (
                        <>
                          Hide Items
                          <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          View Items
                          <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Expanded Order Items */}
                  {expandedOrder === order.id && (
                    <div className="mb-4 p-4 bg-slate-50/50 rounded-xl">
                      <h4 className="font-bold mb-3">Order Items:</h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0"
                          >
                            <div className="flex-1">
                              <p className="font-semibold">{item.name}</p>
                              <p className="text-sm text-slate-600">
                                ${item.price.toFixed(2)} × {item.quantity}
                              </p>
                            </div>
                            <p className="font-bold text-orange-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {order.status === "pending" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "preparing")}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                      >
                        Start Preparing
                      </button>
                    )}
                    {order.status === "preparing" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "ready")}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                      >
                        Mark as Ready
                      </button>
                    )}
                    {order.status === "ready" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                        className="flex-1 bg-teal-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                      >
                        Mark as Delivered
                      </button>
                    )}
                    {order.status !== "delivered" && order.status !== "cancelled" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
