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
  Mail,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  AlertCircle,
  RefreshCw
} from "lucide-react";

export default function AdminPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

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
    <div className="min-h-screen bg-slate-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">Order Management</p>
            </div>
            <div className="flex items-center gap-3">
              {newOrdersCount > 0 && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
                  <div className="relative">
                    <Bell className="w-5 h-5 text-red-600" />
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {newOrdersCount}
                    </span>
                  </div>
                  <span className="font-semibold text-sm text-red-900">
                    {newOrdersCount} New
                  </span>
                </div>
              )}
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors text-sm font-medium text-slate-700"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Dashboard */}
        <div className="mb-6">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Total Orders Card */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <ShoppingBag className="w-5 h-5 text-slate-400" />
                <span className="text-2xl font-bold text-slate-900">{orders.length}</span>
              </div>
              <h3 className="text-slate-600 text-sm">Total Orders</h3>
            </div>

            {/* Pending Orders Card */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-slate-400" />
                <span className="text-2xl font-bold text-slate-900">
                  {orders.filter((o) => o.status === "pending").length}
                </span>
              </div>
              <h3 className="text-slate-600 text-sm">Pending Orders</h3>
            </div>

            {/* Today Orders Card */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-slate-400" />
                <span className="text-2xl font-bold text-slate-900">{todayOrders}</span>
              </div>
              <h3 className="text-slate-600 text-sm">Today&apos;s Orders</h3>
            </div>

            {/* Revenue Card */}
            <div className="bg-white rounded-lg p-5 border border-slate-200 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-5 h-5 text-slate-400" />
                <span className="text-2xl font-bold text-slate-900">
                  ${totalRevenue.toFixed(2)}
                </span>
              </div>
              <h3 className="text-slate-600 text-sm">Total Revenue</h3>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-lg p-5 border border-slate-200 mb-6">
            <div className="flex flex-col xl:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-slate-300 focus:outline-none transition-colors text-sm"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 text-sm font-medium ${
                    viewMode === "grid"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 text-sm font-medium ${
                    viewMode === "list"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  List
                </button>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-2 xl:pb-0">
                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors text-sm font-medium ${
                    statusFilter === "all"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  All Orders
                </button>
                <button
                  onClick={() => setStatusFilter("pending")}
                  className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors text-sm font-medium ${
                    statusFilter === "pending"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setStatusFilter("preparing")}
                  className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors text-sm font-medium ${
                    statusFilter === "preparing"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Preparing
                </button>
                <button
                  onClick={() => setStatusFilter("ready")}
                  className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors text-sm font-medium ${
                    statusFilter === "ready"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Ready
                </button>
                <button
                  onClick={() => setStatusFilter("delivered")}
                  className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-colors text-sm font-medium ${
                    statusFilter === "delivered"
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Delivered
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-4">
          <p className="text-sm text-slate-500">
            {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"}
          </p>
        </div>

        {/* Orders Display */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg border border-slate-200">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-700 mb-1">No Orders Found</h3>
            <p className="text-slate-500 text-sm">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Waiting for new orders to come in..."}
            </p>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6" 
            : "space-y-5"
          }>
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-colors p-4"
              >
                <div className="flex flex-col gap-3">
                  {/* Top Section: Order ID & Date */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">#{order.id}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {new Date(order.orderDate).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium text-xs ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <User className="w-4 h-4" />
                      <span>{order.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span>{order.customerPhone}</span>
                    </div>
                  </div>

                  {/* Items Count & Total */}
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-100">
                    <span className="text-slate-600">{order.items.length} items</span>
                    <span className="font-bold text-slate-900">${order.total.toFixed(2)}</span>
                  </div>

                  {/* Order Items Toggle Button */}
                  <button
                    onClick={() =>
                      setExpandedOrder(expandedOrder === order.id ? null : order.id)
                    }
                    className="w-full bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-lg transition-colors font-medium text-slate-700 flex items-center justify-center gap-2 text-sm mt-3"
                  >
                    {expandedOrder === order.id ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>Hide Items</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>View Items</span>
                      </>
                    )}
                  </button>

                  {/* Expanded Order Items */}
                  {expandedOrder === order.id && (
                    <div className="mt-3 bg-slate-50 p-3 rounded-lg max-h-64 overflow-y-auto">
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-100 text-sm"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-slate-900 truncate">{item.name}</p>
                              <p className="text-xs text-slate-500 mt-0.5">
                                ${item.price.toFixed(2)} × {item.quantity}
                              </p>
                            </div>
                            <p className="font-semibold text-slate-900 ml-3">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-3 space-y-2">
                    {order.status === "pending" && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, "preparing")}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Clock className="w-4 h-4" />
                          Start Preparing
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                          className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    )}
                    {order.status === "preparing" && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, "ready")}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark as Ready
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                          className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    )}
                    {order.status === "ready" && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(order.id, "delivered")}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Mark as Delivered
                        </button>
                        <button
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                          className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </button>
                      </>
                    )}
                    {order.status === "delivered" && (
                      <div className="w-full bg-green-50 border border-green-200 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-700 text-sm">
                          Completed
                        </span>
                      </div>
                    )}
                    {order.status === "cancelled" && (
                      <div className="w-full bg-red-50 border border-red-200 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2">
                        <XCircle className="w-4 h-4 text-red-600" />
                        <span className="font-medium text-red-700 text-sm">
                          Cancelled
                        </span>
                      </div>
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
