import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Globe, MessageCircle, Share2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-warm-900 text-cream-300 pt-16 pb-8 border-t border-warm-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group inline-flex">
              <div className="bg-primary-600 p-2 rounded-xl text-white">
                <Train size={24} strokeWidth={2.5} />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                Rail<span className="text-primary-500">Ease</span>
              </span>
            </Link>
            <p className="text-sm text-cream-400 leading-relaxed max-w-xs">
              Experience the future of railway booking. Plan, book, and travel with ease across India's vast railway network.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-warm-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all text-cream-400">
                <Globe size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-warm-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all text-cream-400">
                <MessageCircle size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-warm-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all text-cream-400">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/search" className="hover:text-primary-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary-500 rounded-full"></span> Search Trains</Link></li>
              <li><Link to="/pnr-status" className="hover:text-primary-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary-500 rounded-full"></span> PNR Status</Link></li>
              <li><Link to="/register" className="hover:text-primary-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary-500 rounded-full"></span> Create Account</Link></li>
              <li><Link to="/help" className="hover:text-primary-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary-500 rounded-full"></span> FAQ & Help</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary-500 rounded-full"></span> Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refunds" className="hover:text-primary-400 transition-colors">Cancellation & Refunds</Link></li>
              <li><Link to="/accessibility" className="hover:text-primary-400 transition-colors">Accessibility</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary-500 shrink-0 mt-1" size={20} />
                <span className="text-sm text-cream-400">123 Railway Avenue, Tech District, New Delhi, 110001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary-500 shrink-0" size={20} />
                <span className="text-sm text-cream-400">1800-111-RAIL (7245)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary-500 shrink-0" size={20} />
                <span className="text-sm text-cream-400">support@railease.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-warm-800 text-center text-sm text-warm-400 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} RailEase Reservation System. All rights reserved.</p>
          <p className="flex items-center gap-1">Designed with <span className="text-warm-500">♥</span> for MCA Project</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
