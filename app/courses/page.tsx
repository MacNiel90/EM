'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Check, ArrowRight, Calculator, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function CoursesPage() {
  useEffect(() => {
    // Initialize scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const programmes = [
    {
      title: "Primary School Maths",
      subtitle: "(BECE Foundation)",
      description: "Build a strong mathematical base for future success.",
      color: "bg-orange-500",
      features: [
        "Fundamental concepts mastery",
        "Problem-solving in Ghanaian context",
        "Engaging & interactive lessons",
        "Early BECE readiness"
      ]
    },
    {
      title: "JHS Maths",
      subtitle: "(BECE Intensive)",
      description: "Comprehensive preparation for the BECE Mathematics papers.",
      color: "bg-blue-500",
      features: [
        "Full WAEC Maths syllabus coverage",
        "Extensive BECE past questions",
        "Exam technique & time management",
        "Detailed performance analytics"
      ]
    },
    {
      title: "SHS Maths",
      subtitle: "(WASSCE Excellence)",
      description: "Master Core and Elective Maths for WASSCE and beyond.",
      color: "bg-gray-800",
      features: [
        "Core & Elective Mathematics",
        "Focus on WAEC marking schemes",
        "Solid foundation for university maths",
        "Insights into STEM career pathways"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ghana Flag Bar */}
      <div className="h-2 bg-gradient-to-r from-green-600 via-yellow-400 to-red-600"></div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">EduMath GH</span>
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors">
                  Home
                </Link>
                <Link href="/courses" className="text-blue-500 font-medium px-3 py-2 transition-colors">
                  Courses
                </Link>
                <Link href="/resources" className="text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors">
                  Resources
                </Link>
                <Link href="/students" className="text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors">
                  For Students
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors">
                  About Us
                </Link>
                <Button asChild>
                  <Link href="/signup">
                    Get Started <span className="text-yellow-300 font-bold ml-1">Free</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll">
            Excel in Mathematics - For Free!
          </h1>
          <p className="text-xl mb-4 animate-on-scroll">
            Access our specialized, WAEC-aligned Mathematics courses for Primary, JHS & SHS students at absolutely{' '}
            <span className="text-green-300 font-bold">no cost</span>.
          </p>
          <p className="text-lg animate-on-scroll">
            <strong>Our exclusive focus on Mathematics helps you build confidence and achieve top grades, completely free.</strong>
          </p>
        </div>
      </section>

      {/* Programme Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-16 animate-on-scroll">
            Choose Your Free Mathematics Level
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programmes.map((programme, index) => (
              <Card key={index} className="h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll">
                <CardHeader className={`${programme.color} text-white text-center py-6`}>
                  <h3 className="text-2xl font-bold">{programme.title}</h3>
                  <p className="text-lg opacity-90">{programme.subtitle}</p>
                </CardHeader>
                <CardContent className="p-6 flex flex-col h-full">
                  <p className="mb-6 text-gray-600">{programme.description}</p>
                  <ul className="space-y-3 flex-grow mb-6">
                    {programme.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center">
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                      <Link href="/signup">
                        Start {programme.title.split(' ')[0]} Maths{' '}
                        <span className="text-yellow-200 font-bold ml-1">(Free)</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Alignment Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">
                Stay Ahead with the Ghana Maths Curriculum
              </h2>
              <p className="text-lg mb-6">
                Our <span className="text-green-600 font-bold">free</span> Mathematics programmes perfectly match:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                  <span>Current WAEC examination requirements for Maths</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                  <span>Official GES curriculum standards for Maths</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                  <span>The national teaching syllabus for Maths</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-1" />
                  <span>Common mathematical challenges faced by students</span>
                </li>
              </ul>
              <p className="text-gray-600 mb-6">
                We ensure you cover every topic needed for success in BECE and WASSCE Mathematics effectively, all for free.
              </p>
              <Button asChild>
                <Link href="/resources">
                  Explore the Curriculum Details
                </Link>
              </Button>
            </div>
            <div className="animate-on-scroll">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-8 text-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <Calculator className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-800">WAEC Aligned</h4>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-800">Grade Improvement</h4>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-800">Expert Tutors</h4>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <GraduationCap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-800">GES Standards</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 animate-on-scroll">
            Ready to Boost Your Maths Grade for Free?
          </h2>
          <p className="text-xl mb-8 text-gray-700 animate-on-scroll">
            Sign up today and start mastering Mathematics with EduMath GH at{' '}
            <span className="text-green-600 font-bold">no cost</span>. Unlock your potential!
          </p>
          <Button size="lg" className="bg-green-600 hover:bg-green-700 animate-on-scroll" asChild>
            <Link href="/signup">
              Sign Up for Free Now <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="ml-2 text-lg font-bold">EduMath GH</span>
              </div>
              <p className="text-gray-400 mb-4">
                Helping Ghanaian students excel in Mathematics through{' '}
                <span className="text-green-400 font-bold">free</span> WAEC-aligned courses.
              </p>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">Free Maths Programmes</h5>
              <ul className="space-y-2">
                <li><Link href="/courses" className="text-gray-400 hover:text-orange-400 transition-colors">Primary School Maths</Link></li>
                <li><Link href="/courses" className="text-gray-400 hover:text-orange-400 transition-colors">JHS Maths (BECE Prep)</Link></li>
                <li><Link href="/courses" className="text-gray-400 hover:text-orange-400 transition-colors">SHS Maths (WASSCE Prep)</Link></li>
              </ul>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">Free Maths Resources</h5>
              <ul className="space-y-2">
                <li><Link href="/resources#pastquestions" className="text-gray-400 hover:text-orange-400 transition-colors">Maths Past Questions</Link></li>
                <li><Link href="/resources#lessons" className="text-gray-400 hover:text-orange-400 transition-colors">Maths Video Lessons</Link></li>
                <li><Link href="/resources#tests" className="text-gray-400 hover:text-orange-400 transition-colors">Maths Practice Tests</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-orange-400 transition-colors">Study Tips Blog</Link></li>
              </ul>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">Contact</h5>
              <address className="text-gray-400 space-y-2 not-italic">
                <p>📍 Accra, Ghana</p>
                <p>📞 <Link href="tel:+233241234567" className="hover:text-orange-400 transition-colors">+233 24 123 4567</Link></p>
                <p>✉️ <Link href="mailto:info@edumathgh.com" className="hover:text-orange-400 transition-colors">info@edumathgh.com</Link></p>
                <p><Link href="/contact" className="hover:text-orange-400 transition-colors">❓ Help & Support</Link></p>
              </address>
            </div>
          </div>
          
          <hr className="my-8 border-gray-700" />
          
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 EduMath GH. Providing <span className="text-green-400 font-bold">Free</span> Mathematics Education for Ghanaian Students. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-on-scroll {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}