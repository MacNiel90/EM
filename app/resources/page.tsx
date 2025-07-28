'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  FileText, 
  Play, 
  ClipboardCheck, 
  Users, 
  Download,
  ExternalLink,
  Filter,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ResourcesPage() {
  const [levelFilter, setLevelFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

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

  const resourceCategories = [
    {
      icon: <FileText className="w-12 h-12 text-blue-500" />,
      title: "Past Questions",
      description: "Years of WAEC past questions with marking schemes for BECE and WASSCE.",
      filter: "past-questions"
    },
    {
      icon: <Play className="w-12 h-12 text-blue-500" />,
      title: "Video Lessons",
      description: "Hundreds of tutorial videos covering the Ghanaian maths curriculum topics.",
      filter: "video-lessons"
    },
    {
      icon: <ClipboardCheck className="w-12 h-12 text-blue-500" />,
      title: "Practice Tests",
      description: "Interactive quizzes with instant feedback and performance analysis.",
      filter: "practice-tests"
    },
    {
      icon: <Users className="w-12 h-12 text-blue-500" />,
      title: "Teacher Guides",
      description: "Lesson plans, teaching strategies, and materials aligned with GES standards.",
      filter: "teacher-materials"
    }
  ];

  const featuredResources = [
    {
      title: "BECE Ultimate Question Bank",
      description: "500+ classified questions from 2018-2024 WAEC papers, organized by topic with complete solutions.",
      badge: "BECE",
      badgeColor: "bg-blue-500",
      format: "PDF • 15MB",
      icon: <GraduationCap className="w-16 h-16 text-white" />,
      bgColor: "bg-blue-500",
      tags: ["jhs", "bece", "past-questions", "featured"],
      updated: "May 2024"
    },
    {
      title: "Core Maths Video Series",
      description: "75+ video lessons covering all WASSCE Core Maths topics with clear Ghanaian teaching approaches.",
      badge: "WASSCE",
      badgeColor: "bg-gray-800",
      format: "50+ Hours Content",
      icon: <Play className="w-16 h-16 text-white" />,
      bgColor: "bg-gray-800",
      tags: ["shs", "wassce", "video-lessons", "featured"],
      updated: "June 2024"
    },
    {
      title: "Effective Maths Teaching Toolkit",
      description: "Collection of lesson plan templates, assessment strategies, and activity ideas for Primary to SHS.",
      badge: "Teacher Resource",
      badgeColor: "bg-green-600",
      format: "ZIP • 8MB",
      icon: <Users className="w-16 h-16 text-white" />,
      bgColor: "bg-orange-500",
      tags: ["teachers", "teacher-materials", "all", "featured"],
      updated: "July 2024"
    },
    {
      title: "BECE & WASSCE Mock Tests",
      description: "Timed online mock exams simulating real WAEC conditions with instant scoring and feedback.",
      badge: "Practice Test",
      badgeColor: "bg-blue-400",
      format: "Online Platform",
      icon: <ClipboardCheck className="w-16 h-16 text-white" />,
      bgColor: "bg-green-600",
      tags: ["jhs", "shs", "practice-tests", "featured"],
      updated: "Interactive"
    }
  ];

  const allResources = [
    {
      title: "2024 BECE Maths Paper 1 & 2",
      type: "Past Questions",
      typeColor: "bg-blue-500",
      level: "JHS",
      format: "PDF",
      tags: ["jhs", "bece", "past-questions"]
    },
    {
      title: "Algebra Video Tutorials (SHS Chapters 1-5)",
      type: "Video Lessons",
      typeColor: "bg-green-600",
      level: "SHS",
      format: "MP4 Access",
      tags: ["shs", "wassce", "video-lessons", "algebra"]
    },
    {
      title: "Teacher's Guide to Teaching Geometry",
      type: "Teacher Materials",
      typeColor: "bg-yellow-600",
      level: "All Levels",
      format: "DOCX",
      tags: ["teachers", "teacher-materials", "geometry", "all"]
    },
    {
      title: "WASSCE 2023 Elective Maths",
      type: "Past Questions",
      typeColor: "bg-blue-500",
      level: "SHS",
      format: "PDF",
      tags: ["shs", "wassce", "past-questions", "elective"]
    },
    {
      title: "Interactive Fractions Quiz (Primary 4-6)",
      type: "Practice Tests",
      typeColor: "bg-blue-400",
      level: "Primary",
      format: "Online",
      tags: ["primary", "practice-tests", "fractions"]
    },
    {
      title: "BECE Maths Formulae Sheet",
      type: "Guides & Notes",
      typeColor: "bg-gray-600",
      level: "JHS",
      format: "PNG",
      tags: ["jhs", "bece", "guides-notes", "formulae"]
    }
  ];

  const filteredResources = allResources.filter(resource => {
    const levelMatch = levelFilter === 'all' || resource.tags.includes(levelFilter);
    const categoryMatch = categoryFilter === 'all' || resource.tags.includes(categoryFilter);
    return levelMatch && categoryMatch;
  });

  const filteredFeaturedResources = featuredResources.filter(resource => {
    const levelMatch = levelFilter === 'all' || resource.tags.includes(levelFilter);
    const categoryMatch = categoryFilter === 'all' || resource.tags.includes(categoryFilter);
    return levelMatch && categoryMatch;
  });

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
                <Link href="/resources" className="text-blue-500 font-medium px-3 py-2 transition-colors">
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
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll">
            Free Maths Resources
          </h1>
          <p className="text-xl mb-8 animate-on-scroll">
            WAEC-aligned materials for Ghanaian students and teachers. Completely Free.
          </p>
          
          <div className="mt-8 animate-on-scroll">
            <p className="mb-4">Filter Resources By Level:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['all', 'primary', 'jhs', 'shs', 'teachers'].map((level) => (
                <Button
                  key={level}
                  variant={levelFilter === level ? "secondary" : "outline"}
                  onClick={() => setLevelFilter(level)}
                  className={levelFilter === level ? "bg-white text-blue-600" : "border-white text-white hover:bg-white hover:text-blue-600"}
                >
                  {level === 'all' ? 'All Levels' : 
                   level === 'jhs' ? 'JHS (BECE)' :
                   level === 'shs' ? 'SHS (WASSCE)' :
                   level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-16 animate-on-scroll">
            Resource Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resourceCategories.map((category, index) => (
              <Card key={index} className="h-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-on-scroll border-l-4 border-l-blue-500">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCategoryFilter(category.filter)}
                  >
                    View Collection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-16 animate-on-scroll">
            Featured Resources
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredFeaturedResources.map((resource, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-on-scroll">
                <div className="flex h-full">
                  <div className={`${resource.bgColor} flex items-center justify-center p-6 rounded-l-lg`}>
                    {resource.icon}
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className={resource.badgeColor}>{resource.badge}</Badge>
                      <span className="text-sm text-gray-500">Updated: {resource.updated}</span>
                    </div>
                    <h4 className="text-xl font-semibold mb-3">{resource.title}</h4>
                    <p className="text-gray-600 mb-4 flex-grow">{resource.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{resource.format}</span>
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Access Now
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Resources Table */}
      <section className="py-16" id="all-resources-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center mb-8 animate-on-scroll">
            <h2 className="text-3xl font-bold text-blue-600">All Free Resources</h2>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="past-questions">Past Questions</option>
                <option value="video-lessons">Video Lessons</option>
                <option value="practice-tests">Practice Tests</option>
                <option value="teacher-materials">Teacher Materials</option>
                <option value="guides-notes">Guides & Notes</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-on-scroll">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resource Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level(s)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Format
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResources.map((resource, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={resource.typeColor}>{resource.type}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resource.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {resource.format}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No resources found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-on-scroll">
          <h2 className="text-3xl font-bold mb-4">
            Get New <span className="text-yellow-300 font-bold">Free</span> Resources Directly
          </h2>
          <p className="text-xl mb-8">Subscribe to receive monthly updates with our latest free maths resources for Ghana.</p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6">
                Subscribe
              </Button>
            </div>
            <p className="text-sm mt-2 opacity-75">We respect your privacy. Unsubscribe anytime.</p>
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
                Your partner for free, quality WAEC-aligned Mathematics resources in Ghana.
              </p>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">Resource Types</h5>
              <ul className="space-y-2">
                <li><button onClick={() => setCategoryFilter('past-questions')} className="text-gray-400 hover:text-orange-400 transition-colors text-left">Past Questions</button></li>
                <li><button onClick={() => setCategoryFilter('video-lessons')} className="text-gray-400 hover:text-orange-400 transition-colors text-left">Video Lessons</button></li>
                <li><button onClick={() => setCategoryFilter('practice-tests')} className="text-gray-400 hover:text-orange-400 transition-colors text-left">Practice Tests</button></li>
                <li><button onClick={() => setCategoryFilter('teacher-materials')} className="text-gray-400 hover:text-orange-400 transition-colors text-left">Teacher Guides</button></li>
              </ul>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">By Level</h5>
              <ul className="space-y-2">
                <li><button onClick={() => setLevelFilter('primary')} className="text-gray-400 hover:text-orange-400 transition-colors text-left">Primary Resources</button></li>
                <li><button onClick={() => setLevelFilter('jhs')} className="text-gray-400 hover:text-orange-400 transition-colors text-left">JHS (BECE) Resources</button></li>
                <li><button onClick={() => setLevelFilter('shs')} className="text-gray-400 hover:text-orange-400 transition-colors text-left">SHS (WASSCE) Resources</button></li>
                <li><button onClick={() => setLevelFilter('teachers')} className="text-gray-400 hover:text-orange-400 transition-colors text-left">Teacher Resources</button></li>
              </ul>
            </div>
            
            <div className="animate-on-scroll">
              <h5 className="font-semibold text-orange-400 mb-4">Contact</h5>
              <address className="text-gray-400 space-y-2 not-italic">
                <p>📍 Accra, Ghana</p>
                <p>📞 <Link href="tel:+233241234567" className="hover:text-orange-400 transition-colors">+233 24 123 4567</Link></p>
                <p>✉️ <Link href="mailto:resources@edumathgh.com" className="hover:text-orange-400 transition-colors">resources@edumathgh.com</Link></p>
                <p><Link href="/contact" className="hover:text-orange-400 transition-colors">❓ Help & Support</Link></p>
              </address>
            </div>
          </div>
          
          <hr className="my-8 border-gray-700" />
          
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 EduMath GH. All resources are provided free for educational use in Ghana.
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