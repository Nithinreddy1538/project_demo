import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

// Mock products for demo purposes when Supabase is not configured
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    price: 134900,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    category: 'mobiles',
    stock: 25,
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone with AI-powered features',
    price: 74999,
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg',
    category: 'mobiles',
    stock: 30,
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'OnePlus 12',
    description: 'Flagship killer with Snapdragon 8 Gen 3 and 120Hz display',
    price: 64999,
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    category: 'mobiles',
    stock: 20,
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Xiaomi 14 Pro',
    description: 'Premium smartphone with Leica cameras and fast charging',
    price: 79999,
    image: 'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg',
    category: 'mobiles',
    stock: 15,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Elegant Evening Dress',
    description: 'Beautiful black evening dress perfect for special occasions',
    price: 12499,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg',
    category: 'ladies-dresses',
    stock: 15,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Designer Saree',
    description: 'Traditional silk saree with intricate embroidery work',
    price: 8999,
    image: 'https://images.pexels.com/photos/1926620/pexels-photo-1926620.jpeg',
    category: 'ladies-dresses',
    stock: 12,
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'Casual Summer Dress',
    description: 'Light and comfortable dress perfect for summer outings',
    price: 2999,
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
    category: 'ladies-dresses',
    stock: 25,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '8',
    name: 'Party Wear Lehenga',
    description: 'Stunning lehenga set for weddings and special occasions',
    price: 15999,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg',
    category: 'ladies-dresses',
    stock: 8,
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '9',
    name: 'Apple Watch Series 9',
    description: 'Advanced smartwatch with health monitoring and fitness tracking',
    price: 41900,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    category: 'watches',
    stock: 20,
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '10',
    name: 'Rolex Submariner',
    description: 'Luxury diving watch with automatic movement',
    price: 899999,
    image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg',
    category: 'watches',
    stock: 3,
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '11',
    name: 'Casio G-Shock',
    description: 'Rugged sports watch with shock resistance and water protection',
    price: 8999,
    image: 'https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg',
    category: 'watches',
    stock: 35,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '12',
    name: 'Fossil Smartwatch',
    description: 'Stylish smartwatch with fitness tracking and notifications',
    price: 18999,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg',
    category: 'watches',
    stock: 18,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '13',
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with excellent cushioning',
    price: 10799,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    category: 'shoes',
    stock: 40,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '14',
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoes with responsive cushioning',
    price: 16999,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
    category: 'shoes',
    stock: 28,
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '15',
    name: 'Converse Chuck Taylor',
    description: 'Classic canvas sneakers perfect for casual wear',
    price: 4999,
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
    category: 'shoes',
    stock: 50,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '16',
    name: 'Formal Leather Shoes',
    description: 'Premium leather formal shoes for business and special occasions',
    price: 7999,
    image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg',
    category: 'shoes',
    stock: 22,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '17',
    name: 'Classic Polo Shirt',
    description: 'Premium cotton polo shirt for casual and business casual wear',
    price: 2499,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
    category: 'mens-wear',
    stock: 35,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '18',
    name: 'Formal Blazer',
    description: 'Tailored blazer perfect for business meetings and formal events',
    price: 8999,
    image: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg',
    category: 'mens-wear',
    stock: 15,
    featured: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '19',
    name: 'Casual Jeans',
    description: 'Comfortable denim jeans with modern fit and style',
    price: 3999,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
    category: 'mens-wear',
    stock: 45,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '20',
    name: 'Cotton T-Shirt',
    description: 'Soft cotton t-shirt available in multiple colors',
    price: 1299,
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
    category: 'mens-wear',
    stock: 60,
    featured: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  },
];
export const productService = {
  async getProducts(): Promise<Product[]> {
    // If Supabase is not configured, return mock products
    if (!supabase) {
      return mockProducts;
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getProduct(id: string): Promise<Product | null> {
    if (!supabase) {
      return mockProducts.find(p => p.id === id) || null;
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    if (!supabase) {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      mockProducts.unshift(newProduct);
      return newProduct;
    }

    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    if (!supabase) {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      mockProducts[index] = { ...mockProducts[index], ...updates, updated_at: new Date().toISOString() };
      return mockProducts[index];
    }

    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    if (!supabase) {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      mockProducts.splice(index, 1);
      return;
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    if (!supabase) {
      return mockProducts.filter(p => p.featured).slice(0, 8);
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .limit(8);

    if (error) throw error;
    return data || [];
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (!supabase) {
      return mockProducts.filter(p => p.category === category);
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },
};