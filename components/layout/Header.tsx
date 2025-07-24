'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-600">
              Nithin-cart
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600 transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user && user.role === 'admin' && (
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  Admin Panel
                </Button>
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-700 hover:text-green-600 py-2">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-green-600 py-2">
                Products
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-green-600 py-2">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600 py-2">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}