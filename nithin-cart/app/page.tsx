'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { ProductGrid } from '@/components/products/ProductGrid';
import { CategoryFilter } from '@/components/filters/CategoryFilter';
import { SearchBar } from '@/components/filters/SearchBar';
import { ShoppingCart } from '@/components/cart/ShoppingCart';
import { Footer } from '@/components/layout/Footer';
import { useCart } from '@/components/providers/CartProvider';
import { productService } from '@/services/productService';
import { Product } from '@/types';
import toast from 'react-hot-toast';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { isCartOpen } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchQuery]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Shop Our Collection</h2>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>

        <ProductGrid 
          products={filteredProducts}
          loading={loading}
        />
      </main>

      <Footer />
      
      {isCartOpen && <ShoppingCart />}
    </div>
  );
}