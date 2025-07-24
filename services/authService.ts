import { supabase } from '@/lib/supabase';
import { User } from '@/types';

// Mock data for demo purposes when Supabase is not configured
const mockUsers = [
  { id: '1', email: 'admin@nithin-cart.com', role: 'admin' as const },
  { id: '2', email: 'user@nithin-cart.com', role: 'user' as const },
];
export const authService = {
  async login(email: string, password: string): Promise<User | null> {
    // If Supabase is not configured, use mock authentication
    if (!supabase) {
      // Check demo users first
      const demoUsers = JSON.parse(localStorage.getItem('demoUsers') || '[]');
      const demoUser = demoUsers.find((u: any) => u.email === email);
      
      if (demoUser && password.length >= 6) {
        localStorage.setItem('mockUser', JSON.stringify(demoUser));
        return demoUser;
      }
      
      // Fallback to default mock users
      const mockUser = mockUsers.find(u => u.email === email);
      if (mockUser && (password === 'admin123' || password === 'password')) {
        localStorage.setItem('mockUser', JSON.stringify(mockUser));
        return mockUser;
      }
      throw new Error('Invalid credentials');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;
      return profile;
    }

    return null;
  },

  async register(email: string, password: string, role: 'admin' | 'user' = 'user'): Promise<User | null> {
    if (!supabase) {
      // In demo mode, create a new user and store in localStorage
      const newUser = {
        id: Date.now().toString(),
        email,
        role,
        created_at: new Date().toISOString(),
      };
      
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('demoUsers') || '[]');
      if (existingUsers.find((u: any) => u.email === email)) {
        throw new Error('User already exists');
      }
      
      // Add to demo users
      existingUsers.push(newUser);
      localStorage.setItem('demoUsers', JSON.stringify(existingUsers));
      localStorage.setItem('mockUser', JSON.stringify(newUser));
      
      return newUser;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          email: data.user.email,
          role,
        }])
        .select()
        .single();

      if (profileError) throw profileError;
      return profile;
    }

    return null;
  },

  async logout(): Promise<void> {
    if (!supabase) {
      localStorage.removeItem('mockUser');
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    // If Supabase is not configured, use mock user from localStorage
    if (!supabase) {
      const mockUser = localStorage.getItem('mockUser');
      return mockUser ? JSON.parse(mockUser) : null;
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return profile;
  },
};