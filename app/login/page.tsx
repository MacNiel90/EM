'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ghana Flag Bar */}
      <div className="h-2 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"></div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold text-gray-900">EduMath GH</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
              <Link href="/courses" className="text-gray-700 hover:text-blue-500">Courses</Link>
              <Link href="/resources" className="text-gray-700 hover:text-blue-500">Resources</Link>
              <Link href="/students" className="text-gray-700 hover:text-blue-500">For Students</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-500">About Us</Link>
              <Button asChild variant="outline">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card className="shadow-lg">
            <CardHeader className="bg-blue-500 text-white text-center rounded-t-lg">
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-blue-100">Sign in to continue your maths journey</p>
            </CardHeader>
            
            <CardContent className="p-6">
              {errors.general && (
                <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {errors.general}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email or Phone Number</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'border-red-500' : ''}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.remember}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, remember: checked as boolean }))
                      }
                    />
                    <Label htmlFor="remember" className="text-sm">Remember me</Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                    Forgot password?
                  </Link>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="bg-gray-50 text-center py-4">
              <p className="text-sm text-gray-600">
                                  Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="ml-2 text-lg font-bold">EduMath GH</span>
              </div>
              <p className="text-gray-400">
                WAEC-aligned maths tutoring platform designed specifically for Ghanaian schools and students.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-orange-400 mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-orange-400">Home</Link></li>
                <li><Link href="/courses" className="text-gray-400 hover:text-orange-400">Courses</Link></li>
                <li><Link href="/resources" className="text-gray-400 hover:text-orange-400">Resources</Link></li>
                <li><Link href="/students" className="text-gray-400 hover:text-orange-400">For Students</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-orange-400 mb-4">Support</h5>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-gray-400 hover:text-orange-400">FAQ</Link></li>
                <li><Link href="/help" className="text-gray-400 hover:text-orange-400">Help Center</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-orange-400">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-orange-400 mb-4">Contact</h5>
              <div className="text-gray-400 space-y-2">
                <p>📍 Accra, Ghana</p>
                <p>📞 +233 24 123 4567</p>
                <p>✉️ support@edumathgh.com</p>
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-700" />
          <div className="text-center">
            <p className="text-gray-400">&copy; 2024 EduMath GH. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}