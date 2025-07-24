'use client';
'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star, Shield, Truck } from 'lucide-react';

export function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {user ? (
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome back, <span className="text-yellow-400">{user.email.split('@')[0]}!</span>
              </h1>
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to <span className="text-yellow-400">Nithin-cart</span>
              </h1>
            )}
            <p className="text-xl mb-8 text-blue-100">
              {user 
                ? "Ready to explore our amazing collection? Start shopping now!"
                : "Discover premium quality products at unbeatable prices. From latest mobiles to trendy fashion, we have everything you need."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
                Explore Categories
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="text-sm text-green-100">Hand-picked products</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <Shield className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <h3 className="font-semibold">Secure Shopping</h3>
                <p className="text-sm text-green-100">100% secure payments</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <Truck className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-green-100">Free shipping available</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-pink-400" />
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-sm text-green-100">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}