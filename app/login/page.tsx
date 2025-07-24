'use client';
import { LoginForm } from '@/components/auth/LoginForm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      if (user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  }, [user, router]);

  // Don't render login form if user is already logged in
  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}