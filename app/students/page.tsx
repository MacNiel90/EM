'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { GraduationCap, Bot, Smartphone, Gift, CheckCircle, PieChart, Tag as Tasks, Target, Lightbulb, Trophy, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function StudentsPage() {
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

  const features = [
    {
      icon: <Bot className="w-12 h-12 text-blue-500" />,
      title: "Personalized AI Tutor",
      description: "Get step-by-step help, hints, and explanations tailored just for you from our smart AI assistant, 24/7."
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-blue-500" />,
      title: "WAEC Exam Focus",
      description: "Master BECE & WASSCE topics with aligned lessons, past questions, mock tests, and exam technique tips."
    },
    {
      icon: <Smartphone className="w-12 h-12 text-blue-500" />,
      title: "Learn Anywhere, Anytime",
      description: "Study on your phone, tablet, or computer whenever it suits your schedule. Our platform is easy to use on any device."
    },
    {
      icon: <Gift className="w-12 h-12 text-green-500" />,
      title: "Completely Free Access",
      description: "Zero fees, zero hidden costs. Get full access to all lessons, AI features, and resources absolutely free."
    }
  ];

  const journeySteps = [
    {
      step: "1",
      title: "Sign Up in Seconds",
      description: "Create your free account quickly and easily to unlock all features.",
      isAI: false
    },
    {
      step: "2",
      title: "Interactive Lessons",
      description: "Engage with clear video and text lessons covering the full Primary to SHS maths curriculum.",
      isAI: false
    },
    {
      step: "AI",
      title: "AI-Powered Practice",
      description: "Take smart quizzes that adapt to your level. Stuck? Get hints and explanations from our AI tutor.",
      isAI: true
    },
    {
      step: "AI",
      title: "Instant AI Feedback",
      description: "Don't just see if you're right or wrong. Understand *why* with clear, step-by-step AI explanations.",
      isAI: true
    },
    {
      step: "5",
      title: "Track Your Progress",
      description: "See your strengths and weaknesses on your personal dashboard. Watch your scores improve!",
      isAI: false
    },
    {
      step: "6",
      title: "Exam Prep Zone",
      description: "Access a huge library of WAEC past questions (BECE & WASSCE) and take realistic mock tests.",
      isAI: false
    }
  ];

  const freeFeatures = [
    "Full Curriculum Access (Primary, JHS, SHS)",
    "AI Tutor Assistance & Explanations",
    "Interactive Video & Text Lessons",
    "Large WAEC Past Questions Library",
    "Adaptive Practice Quizzes",
    "Mock Exams (BECE & WASSCE)",
    "Personal Progress Dashboard",
    "Performance Analytics & Insights",
    "Works on All Devices (Mobile Friendly)",
    "Regular Content Updates"
  ];

  const dashboardFeatures = [
    {
      icon: <PieChart className="w-5 h-5 text-blue-500" />,
      text: "See your scores on quizzes and tests instantly."
    },
    {
      icon: <Tasks className="w-5 h-5 text-blue-500" />,
      text: "Track completed lessons and topics mastered."
    },
    {
      icon: <Target className="w-5 h-5 text-blue-500" />,
      text: "Identify weak areas needing more practice."
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-blue-500" />,
      text: "Get AI-driven suggestions on what to study next."
    },
    {
      icon: <Trophy className="w-5 h-5 text-blue-500" />,
      text: "Celebrate your achievements and milestones!"
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
                <Link href="/courses" className="text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors">
                  Courses
                </Link>
                <Link href="/resources" className="text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors">
                  Resources
                </Link>
                <Link href="/students" className="text-blue-500 font-medium px-3 py-2 transition-colors">
                  For Students
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors">
                  About Us
                </Link>
                <Button asChild>
                  <Link href="/signup">
                    Start Learning <span className="text-yellow-300 font-bold ml-1">Free</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll">
            Ace Your Maths Exams with AI Power!
          </h1>
          <p className="text-xl mb-8 animate-on-scroll">
            Personalized learning, WAEC focus, and smart AI support designed just for{' '}
            <span className="underline decoration-orange-400">you</span>. Master BECE & WASSCE Maths -{' '}
            <span className="text-green-300 font-bold">100% Free!</span>
          </p>
          <div className="flex justify-center gap-4 flex-wrap animate-on-scroll">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/signup">
                Sign Up Free Now <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Student Benefits */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Why EduMath GH is Your Best Maths Partner
            </h2>
            <p className="text-xl text-gray-700">Everything you need to succeed in Maths, tailored for Ghana.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 animate-on-scroll hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-300 hover:scale-110">
                  {feature.icon}
                </div>
                <h5 className="font-semibold text-lg mb-3">{feature.title}</h5>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey */}
      <section className="py-16 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-12 animate-on-scroll">
            Your Learning Journey with EduMath GH
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeySteps.map((step, index) => (
              <Card key={index} className={`h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll ${step.isAI ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-blue-500'}`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 ${step.isAI ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white'}`}>
                      {step.isAI ? <Bot className="w-6 h-6" /> : <span className="font-bold">{step.step}</span>}
                    </div>
                    <h5 className="font-semibold">{step.title}</h5>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get Free */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Everything You Need to Succeed - Absolutely{' '}
              <span className="text-green-600">Free</span>!
            </h2>
            <p className="text-xl text-gray-700">
              No trials, no hidden costs. Just pure maths learning power for every Ghanaian student.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg animate-on-scroll">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {freeFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">Your Personal Progress Hub</h2>
              <p className="text-xl mb-6 text-gray-700">
                Track your learning journey and see your improvement.
              </p>
              <ul className="space-y-4 mb-8">
                {dashboardFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    {feature.icon}
                    <span className="ml-3">{feature.text}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link href="/signup">View Your Dashboard (Sign Up Free)</Link>
              </Button>
            </div>
            <div className="animate-on-scroll">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-8 text-center">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Student Dashboard Preview</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-sm text-gray-600">Overall Progress</div>
                    </div>
                    <div className="bg-green-100 p-3 rounded">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-sm text-gray-600">Topics Mastered</div>
                    </div>
                  </div>
                  <div className="bg-orange-100 p-3 rounded">
                    <div className="text-lg font-semibold text-orange-600">Next: Algebra Practice</div>
                    <div className="text-sm text-gray-600">AI Recommendation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Master Maths?</h2>
          <p className="text-xl mb-6">
            Stop struggling and start succeeding. Join thousands of Ghanaian students using EduMath GH&apos;s powerful AI learning platform{' '}
            <span className="text-green-300 font-bold">for free</span>!
          </p>
          <div className="flex items-center justify-center mb-6">
            <Users className="w-8 h-8 mr-3" />
            <span className="text-lg font-semibold">Join 15,000+ Students Already Learning!</span>
          </div>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-bold shadow-lg" asChild>
            <Link href="/signup">Sign Up Free Now & Boost Your Grades!</Link>
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
                Empowering Ghanaian students with free, AI-driven, WAEC-aligned maths education.
              </p>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">For Students</h5>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-gray-400 hover:text-orange-400 transition-colors">How It Works</Link></li>
                <li><Link href="/courses" className="text-gray-400 hover:text-orange-400 transition-colors">Courses (Primary-SHS)</Link></li>
                <li><Link href="/resources" className="text-gray-400 hover:text-orange-400 transition-colors">Free Resources</Link></li>
                <li><Link href="/signup" className="text-gray-400 hover:text-orange-400 transition-colors">Sign Up Free</Link></li>
              </ul>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Help & Support</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-orange-400 transition-colors">FAQ</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">Contact Support</h5>
              <ul className="space-y-2">
                <li className="text-gray-400">📍 Accra, Ghana</li>
                <li className="text-gray-400">✉️ support@edumathgh.com</li>
                <li className="text-gray-400">📱 WhatsApp Support</li>
                <li className="text-gray-400">🕒 Support: Mon-Fri, 9am-4pm</li>
              </ul>
            </div>
          </div>
          
          <hr className="my-8 border-gray-700" />
          
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 EduMath GH. All Maths Learning Features are{' '}
              <span className="text-green-400 font-bold">100% Free</span> for Ghanaian Students.
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