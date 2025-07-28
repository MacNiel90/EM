'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { ChevronRight, GraduationCap, Calculator, TrendingUp, Users, Smartphone, Gift, Quote, Sparkles, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  useEffect(() => {
    // Initialize scroll animations and counter animations
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

  const features = [
    {
      icon: <GraduationCap className="w-12 h-12 text-blue-500" />,
      title: "Exam Excellence",
      description: "Full coverage of WAEC topics with past question practice and marking scheme guidance"
    },
    {
      icon: <Calculator className="w-12 h-12 text-blue-500" />,
      title: "Local Context",
      description: "Real Ghanaian examples using GH₵ currency and local scenarios you recognize"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-500" />,
      title: "Progress Tracking",
      description: "Personal dashboard to monitor your improvement and weak areas"
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Expert Tutors",
      description: "Learn from certified Ghanaian maths educators 24/7"
    },
    {
      icon: <Smartphone className="w-12 h-12 text-blue-500" />,
      title: "Mobile Access",
      description: "Learn anywhere - perfect for studying on your smartphone"
    },
    {
      icon: <Gift className="w-12 h-12 text-blue-500" />,
      title: "Completely Free",
      description: "Quality education for all - no fees, no subscriptions"
    }
  ];

  const testimonials = [
    {
      quote: "I went from failing maths to scoring A1 in WASSCE! The video lessons made everything click.",
      name: "Kofi Mensah",
      location: "WASSCE Graduate, Kumasi"
    },
    {
      quote: "The Ghanaian examples helped me understand faster. I actually enjoy maths now!",
      name: "Ama Serwaa",
      location: "JHS Student, Accra"
    },
    {
      quote: "With just my phone, I improved my BECE score by 2 grades. Life-changing!",
      name: "Esi Coleman",
      location: "SHS Student, Tamale"
    }
  ];

  const stats = [
    { number: "50K+", label: "Students Empowered" },
    { number: "94%", label: "Grade Improvement" },
    { number: "24/7", label: "Learning Access" },
    { number: "100%", label: "Free Forever" }
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
                <Link href="/courses" className="text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors">
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
                  <Link href="/signup">Start Learning</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative gradient-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 animate-on-scroll">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Learning Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-on-scroll leading-tight">
            Master WAEC Maths for Free
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto animate-on-scroll opacity-90 leading-relaxed">
            Personalized learning platform designed for Ghanaian students to ace BECE & WASSCE
          </p>
          
          <div className="flex justify-center items-center gap-6 mb-12 flex-wrap animate-on-scroll">
            <div className="glass rounded-xl p-4 flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span className="text-sm font-medium">WAEC Certified</span>
            </div>
            <div className="glass rounded-xl p-4 flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">GES Approved</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-4 flex-wrap animate-on-scroll">
            <Button variant="outline" size="lg" className="btn-modern bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-blue-600 rounded-xl px-8 py-4" asChild>
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button size="lg" className="btn-modern bg-white text-blue-600 hover:bg-gray-100 rounded-xl px-8 py-4 shadow-modern" asChild>
              <Link href="/signup">Start Learning Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Why Students Love EduMath
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of mathematics education with our cutting-edge platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group card-hover border-0 shadow-modern bg-white/80 backdrop-blur-sm animate-on-scroll">
                <CardContent className="p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="mb-6 flex justify-center relative">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
            Student Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real students across Ghana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group card-hover border-0 shadow-modern bg-white animate-on-scroll relative overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full"></div>
                  <Quote className="w-10 h-10 text-blue-500 mb-6 opacity-60" />
                  <p className="italic mb-8 text-gray-700 text-lg leading-relaxed">{testimonial.quote}</p>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 animate-on-scroll">
            Our Student Impact
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <div className="glass rounded-2xl p-8 backdrop-blur-sm">
                  <h3 className="text-5xl md:text-6xl font-bold mb-4 text-gradient bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{stat.number}</h3>
                  <p className="text-lg font-medium opacity-90">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-8 animate-on-scroll">
            Ready to Ace Your Maths Exams?
            </h2>
            <p className="text-xl mb-12 text-gray-700 animate-on-scroll leading-relaxed">
            Join thousands of Ghanaian students learning for free
            </p>
            <Button size="lg" className="btn-modern gradient-primary text-white rounded-xl px-12 py-4 text-lg font-semibold shadow-modern-lg animate-on-scroll" asChild>
            <Link href="/signup">Start Learning Now</Link>
            </Button>
          </div>
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
                WAEC-aligned maths tutoring platform designed specifically for Ghanaian schools and students.
              </p>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">PROGRAMMES</h5>
              <ul className="space-y-2">
                <li><Link href="/courses" className="text-gray-400 hover:text-orange-400 transition-colors">Primary School</Link></li>
                <li><Link href="/courses" className="text-gray-400 hover:text-orange-400 transition-colors">Junior High (BECE)</Link></li>
                <li><Link href="/courses" className="text-gray-400 hover:text-orange-400 transition-colors">Senior High (WASSCE)</Link></li>
                <li><Link href="/courses" className="text-gray-400 hover:text-orange-400 transition-colors">University Entrance</Link></li>
              </ul>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">QUICK LINKS</h5>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">About Us</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">Our Tutors</Link></li>
                <li><Link href="/resources" className="text-gray-400 hover:text-orange-400 transition-colors">Free Resources</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">Success Stories</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">CONTACT</h5>
              <address className="text-gray-400 space-y-2 not-italic">
                <p>📍 Accra, Ghana</p>
                <p>📞 <Link href="tel:+233241234567" className="hover:text-orange-400 transition-colors">+233 24 123 4567</Link></p>
                <p>✉️ <Link href="mailto:info@edumathgh.com" className="hover:text-orange-400 transition-colors">info@edumathgh.com</Link></p>
              </address>
            </div>
          </div>
          
          <hr className="my-8 border-gray-700" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 EduMath GH. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-orange-400 text-sm transition-colors">Terms of Service</Link>
            </div>
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