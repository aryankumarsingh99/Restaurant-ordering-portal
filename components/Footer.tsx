import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-700 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">Delicious Bites</h3>
            <p className="text-sm">
              Experience the finest dining with fresh ingredients and authentic flavors.
              Order online for quick delivery!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/menu" className="hover:text-orange-400 transition-colors">Menu</a></li>
              <li><a href="/orders" className="hover:text-orange-400 transition-colors">My Orders</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-600" />
                <span>info@deliciousbites.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-600" />
                <span>123 Food Street, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-slate-100 p-3 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-100 p-3 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-100 p-3 rounded-full hover:bg-orange-600 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Delicious Bites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
