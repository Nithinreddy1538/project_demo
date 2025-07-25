'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/components/providers/CartProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    setIsLoading(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success('Added to cart!');
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">
            Featured
          </Badge>
        )}
        <Button
          size="sm"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">4.5</span>
          </div>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-gray-500 line-through">₹{(product.price * 1.2).toLocaleString('en-IN')}</span>
          </div>
          <Badge variant={product.stock > 0 ? "default" : "destructive"}>
            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
          </Badge>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isLoading || product.stock === 0}
        >
          {isLoading ? (
            <span className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </span>
          ) : (
            <span className="flex items-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}