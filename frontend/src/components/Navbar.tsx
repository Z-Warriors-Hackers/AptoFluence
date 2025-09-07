import React from 'react';
import { Zap, LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
  onRegisterClick: (type: 'seller' | 'influencer') => void;
}

export default function Navbar({ onLoginClick, onRegisterClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-teal-500">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">AptoFluence</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-300">
              Home
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors duration-300">
              How It Works
            </a>
            <a href="#faq" className="text-gray-300 hover:text-white transition-colors duration-300">
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </button>
            
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Register</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <button
                  onClick={() => onRegisterClick('seller')}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300 rounded-t-lg"
                >
                  Register as Seller
                </button>
                <button
                  onClick={() => onRegisterClick('influencer')}
                  className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300 rounded-b-lg"
                >
                  Register as Influencer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}