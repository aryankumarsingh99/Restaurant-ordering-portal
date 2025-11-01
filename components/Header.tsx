"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Utensils, Home, Menu, ClipboardList } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/menu", label: "Menu", icon: Menu },
    { href: "/orders", label: "My Orders", icon: ClipboardList },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <Utensils className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Delicious Bites
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-orange-100 text-orange-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            {/* Admin Link */}
            <Link
              href="/admin"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                pathname === "/admin"
                  ? "bg-purple-100 text-purple-600"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Admin
            </Link>
          </div>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-around mt-4 gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-orange-100 text-orange-600"
                    : "text-slate-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
