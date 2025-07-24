'use client';

import { useCart } from '@/components/providers/CartProvider';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import Link from 'next/link';

export function ShoppingCart() {
  const { items, removeItem, updateQuantity, total, setIsCartOpen } = useCart();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCartOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">₹{item.price.toLocaleString('en-IN')}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="space-y-2">
              <Link href="/checkout">
                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setIsCartOpen(false)}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Proceed to Checkout
                </Button>
              </Link>
              <Link href="/payment">
                <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50" onClick={() => setIsCartOpen(false)}>
                  Quick Pay Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}