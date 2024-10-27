import React from 'react';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Review Guardian</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">About</a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;