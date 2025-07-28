'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
// <-- 1. IMPORT the Select components for the dropdown menu
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/hooks/useAuth';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  
  // <-- 2. ADD 'grade' to the form's state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    grade: '', // Added grade field
    password: '',
    confirmPassword: '',
    terms: false
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
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // <-- 3. ADD a special handler for the Select component
  const handleGradeChange = (value: string) => {
    setFormData(prev => ({ ...prev, grade: value }));
    if (errors.grade) {
      setErrors(prev => ({ ...prev, grade: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';

    // <-- 4. ADD validation for the new grade field
    if (!formData.grade) {
      newErrors.grade = 'Please select your grade';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // <-- 5. PASS the 'grade' from the form data to the signup function
      await signup(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.phone,
        formData.grade // Pass the grade here
      );
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... (Your existing Ghana Flag Bar and Navigation) ... */}
       <div className="h-2 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"></div>
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
                    <Link href="/login">Login</Link>
                </Button>
                </div>
            </div>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <Card className="shadow-lg">
            <CardHeader className="text-center py-8">
              {/* ... (Your existing Card Header) ... */}
              <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Student Sign Up</h2>
              <p className="text-gray-600">Create your account to start learning</p>
            </CardHeader>
            
            <CardContent className="p-8">
              {errors.general && (
                <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {errors.general}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name Input */}
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} className={errors.firstName ? 'border-red-500' : ''} placeholder="Enter your first name" />
                    {errors.firstName && (<p className="mt-1 text-sm text-red-600">{errors.firstName}</p>)}
                  </div>

                  {/* Last Name Input */}
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} className={errors.lastName ? 'border-red-500' : ''} placeholder="Enter your last name" />
                    {errors.lastName && (<p className="mt-1 text-sm text-red-600">{errors.lastName}</p>)}
                  </div>
                </div>

                {/* Phone Number Input */}
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className={errors.phone ? 'border-red-500' : ''} placeholder="Enter your phone number" />
                  {errors.phone && (<p className="mt-1 text-sm text-red-600">{errors.phone}</p>)}
                </div>

                {/* <-- 6. ADD the grade selector UI component --> */}
                <div>
                  <Label htmlFor="grade">Grade / Class</Label>
                  <Select onValueChange={handleGradeChange} value={formData.grade}>
                    <SelectTrigger className={errors.grade ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select your current grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Primary 1">Primary 1</SelectItem>
                      <SelectItem value="Primary 2">Primary 2</SelectItem>
                      <SelectItem value="Primary 3">Primary 3</SelectItem>
                      <SelectItem value="Primary 4">Primary 4</SelectItem>
                      <SelectItem value="Primary 5">Primary 5</SelectItem>
                      <SelectItem value="Primary 6">Primary 6</SelectItem>
                      
                      <SelectItem value="JHS 1">JHS 1</SelectItem>
                      <SelectItem value="JHS 2">JHS 2</SelectItem>
                      <SelectItem value="JHS 3">JHS 3</SelectItem>
                      <SelectItem value="SHS 1">SHS 1</SelectItem>
                      <SelectItem value="SHS 2">SHS 2</SelectItem>
                      <SelectItem value="SHS 3">SHS 3</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.grade && (
                    <p className="mt-1 text-sm text-red-600">{errors.grade}</p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className={errors.email ? 'border-red-500' : ''} placeholder="Enter your email address" />
                  {errors.email && (<p className="mt-1 text-sm text-red-600">{errors.email}</p>)}
                </div>

                {/* Password Input */}
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} className={errors.password ? 'border-red-500' : ''} placeholder="Create a password (8+ characters)" />
                  {errors.password && (<p className="mt-1 text-sm text-red-600">{errors.password}</p>)}
                </div>

                {/* Confirm Password Input */}
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} className={errors.confirmPassword ? 'border-red-500' : ''} placeholder="Confirm your password" />
                  {errors.confirmPassword && (<p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>)}
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms" checked={formData.terms} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, terms: checked as boolean }))} className={errors.terms ? 'border-red-500' : ''} />
                  <div className="flex-1">
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{' '} <Link href="/terms" className="text-blue-500 hover:text-blue-600">Terms and Conditions</Link>{' '} and{' '} <Link href="/privacy" className="text-blue-500 hover:text-blue-600">Privacy Policy</Link>
                    </Label>
                    {errors.terms && (<p className="mt-1 text-sm text-red-600">{errors.terms}</p>)}
                  </div>
                </div>

                <Button type="submit" className="w-full py-3 text-lg" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="bg-gray-50 text-center py-4">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">Log in</Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* ... (Your existing Footer) ... */}
      <footer className="bg-gray-900 text-white py-12">
      {/*... Whole footer code ...*/}
      </footer>
    </div>
  );
}