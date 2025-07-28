'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Target, Heart, MapPin, TrendingUp, Award, Users, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
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

  const missionCards = [
    {
      icon: <Target className="w-8 h-8 text-blue-500" />,
      title: "Our Vision",
      description: "To be Ghana's most impactful maths education platform, helping students nationwide build confidence and achieve excellence in WAEC exams."
    },
    {
      icon: <Heart className="w-8 h-8 text-blue-500" />,
      title: "Our Values",
      description: "Quality, Relevance, Accessibility (Free Access!), and a passion for Ghanaian student success guide everything we do."
    },
    {
      icon: <MapPin className="w-8 h-8 text-blue-500" />,
      title: "Our Reach",
      description: "Available to students across all 16 regions of Ghana, supporting learning in both urban and rural areas."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: "Our Impact",
      description: "Over 15,000+ registered students benefiting from our free platform, showing significant score improvements."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Ama Mensah",
      role: "Curriculum Director",
      description: "Former WAEC Chief Examiner with 15+ years in maths pedagogy. Ensures perfect curriculum alignment.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Kwame Osei",
      role: "Founder & CEO",
      description: "Former Maths Teacher, EdTech Specialist. Driving the vision for accessible, quality maths education.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Esi Asante",
      role: "Technology Lead",
      description: "Ghanaian Software Engineer leading our platform development and AI integration.",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
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
                <Link href="/students" className="text-gray-700 hover:text-blue-500 px-3 py-2 transition-colors">
                  For Students
                </Link>
                <Link href="/about" className="text-blue-500 font-medium px-3 py-2 transition-colors">
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
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll">
            Our Ghanaian Education Story
          </h1>
          <p className="text-xl mb-4 animate-on-scroll">
            Empowering students through WAEC-aligned maths education,{' '}
            <span className="text-green-300 font-bold">100% free</span>.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Mission</h2>
              <p className="text-lg mb-6">
                To transform maths education in Ghana, making quality, WAEC-aligned learning accessible and engaging for every student through technology and culturally relevant methods.
              </p>
              <p className="mb-6">
                Founded in Accra in 2018 by passionate Ghanaian educators, EduMath GH addresses the need for high-quality, locally relevant maths resources. We saw students struggling with foreign examples and knew we could do better.
              </p>
              <p className="mb-6">
                We believe every Ghanaian student deserves the tools to excel in mathematics, regardless of location or resources. That&apos;s why our core platform is{' '}
                <span className="text-green-600 font-bold">completely free</span>.
              </p>
              <div className="flex items-center space-x-4 mt-6">
                <div className="bg-blue-100 p-2 rounded">
                  <span className="text-sm font-medium text-blue-800">WAEC Aligned</span>
                </div>
                <div className="bg-green-100 p-2 rounded">
                  <span className="text-sm font-medium text-green-800">GES Standards</span>
                </div>
                <div className="bg-orange-100 p-2 rounded">
                  <span className="text-sm font-medium text-orange-800">Ministry Recognized</span>
                </div>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {missionCards.map((card, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 p-3 rounded-lg mr-3">
                          {card.icon}
                        </div>
                        <h5 className="font-semibold">{card.title}</h5>
                      </div>
                      <p className="text-gray-600">{card.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-12 animate-on-scroll">
            Our Founding Story
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-lg overflow-hidden animate-on-scroll">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="text-center">
                    <Image 
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Kwame Osei - Founder" 
                      width={192}
                      height={192}
                      className="w-48 h-48 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
                    />
                    <h5 className="font-semibold text-lg">Kwame Osei</h5>
                    <p className="text-gray-600">Founder & CEO</p>
                  </div>
                  <div className="md:col-span-2">
                    <blockquote className="text-lg italic mb-4">
                      &quot;As a former maths teacher in Accra, I saw bright students stumble because the learning materials didn&apos;t speak their language or reflect their world.&quot;
                    </blockquote>
                    <p className="mb-4">
                      &quot;Why learn about dollars and cents when we use Cedis and Pesewas? Why solve problems about foreign cities when we have Accra, Kumasi, Tamale? This disconnect was hindering real understanding.&quot;
                    </p>
                    <p className="mb-4">
                      Fuelled by this, and after further studies in Education Technology, I brought together Ghanaian curriculum experts and tech innovators in 2018. Our goal: create a world-class maths platform, perfectly aligned with WAEC, rooted in Ghanaian culture, and accessible to everyone.
                    </p>
                    <p>
                      We started small, proving our impact school by school. Today, EduMath GH is a testament to the power of local solutions. We are proudly &apos;Made in Ghana, for Ghana&apos;, and committed to offering our core learning platform{' '}
                      <span className="text-green-600 font-bold">100% free</span> to empower the next generation.
                    </p>
                    <div className="flex items-center mt-6">
                      <Lightbulb className="w-8 h-8 text-blue-500 mr-3 opacity-50" />
                      <h4 className="text-xl font-bold text-orange-500">
                        Made in Ghana, for Ghana.<br />Free for All Students.
                      </h4>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6 animate-on-scroll">
            Meet Our Core Team
          </h2>
          <p className="text-xl text-center text-gray-700 mb-12 animate-on-scroll">
            Passionate Ghanaian educators and technologists driving maths success.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group animate-on-scroll">
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      width={400}
                      height={320}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end">
                      <div className="p-6 text-white">
                        <h5 className="font-semibold text-lg mb-1">{member.name}</h5>
                        <p className="text-sm font-medium mb-2">{member.role}</p>
                        <p className="text-sm">{member.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 animate-on-scroll">
            <Button variant="outline" size="lg">
              Meet the Full Team & Advisors
            </Button>
          </div>
        </div>
      </section>

      {/* Partners & Recognition */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-12 animate-on-scroll">
            Partners & Recognition
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center mb-12">
            {['WAEC Aligned', 'GES Standards', 'Ministry Recognized', 'Ghana Innovation Hub', 'Ashesi University'].map((partner, index) => (
              <div key={index} className="text-center animate-on-scroll">
                <div className="bg-gray-100 h-16 rounded-lg flex items-center justify-center mb-2 hover:bg-gray-200 transition-colors">
                  <span className="text-sm font-medium text-gray-600">{partner}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center animate-on-scroll">
            <Card className="inline-block shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 flex items-center">
                <Award className="w-12 h-12 text-orange-500 mr-4" />
                <div className="text-left">
                  <h4 className="font-bold text-lg">2023 Best EdTech Platform</h4>
                  <p className="text-gray-600">Ghana Education & Technology Awards</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Help us make quality maths education accessible to every child in Ghana. Partner with us, spread the word, or simply encourage a student to sign up!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/signup">
                Student Sign Up (<span className="text-green-600 font-bold">Free</span>)
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/students">Information for Schools</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/contact">Contact Us / Partner</Link>
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
                Empowering Ghanaian students with free, AI-driven, WAEC-aligned maths education.
              </p>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">About</h5>
              <ul className="space-y-2">
                <li><Link href="/about#story" className="text-gray-400 hover:text-orange-400 transition-colors">Our Story</Link></li>
                <li><Link href="/about#team" className="text-gray-400 hover:text-orange-400 transition-colors">Team</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-orange-400 transition-colors">Careers</Link></li>
                <li><Link href="/impact" className="text-gray-400 hover:text-orange-400 transition-colors">Our Impact</Link></li>
              </ul>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">Support</h5>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Contact Support</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-orange-400 transition-colors">FAQ</Link></li>
                <li><Link href="/help" className="text-gray-400 hover:text-orange-400 transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">Get Involved</h5>
              <ul className="space-y-2">
                <li><Link href="/students" className="text-gray-400 hover:text-orange-400 transition-colors">For Students (Free)</Link></li>
                <li><Link href="/schools" className="text-gray-400 hover:text-orange-400 transition-colors">For Schools</Link></li>
                <li><Link href="/partnerships" className="text-gray-400 hover:text-orange-400 transition-colors">Partnerships</Link></li>
                <li><Link href="/volunteer" className="text-gray-400 hover:text-orange-400 transition-colors">Volunteer</Link></li>
              </ul>
            </div>
          </div>
          
          <hr className="my-8 border-gray-700" />
          
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 EduMath GH. Made in Ghana, for Ghana.{' '}
              <span className="text-green-400 font-bold">Free</span> Maths Education for All Students.
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