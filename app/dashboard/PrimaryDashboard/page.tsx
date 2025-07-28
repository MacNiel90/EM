'use client';

import Link from 'next/link';
import { GraduationCap, TrendingUp, BookOpen, ClipboardCheck, Award, Play, HelpCircle, FileText, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function PrimaryDashboard() {
  const { userData } = useAuth();
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOverallProgress(0);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const quickActions = [
    { icon: <Play className="w-8 h-8 text-blue-500" />, title: "Start Learning", href: "/dashboard/lessons" },
    { icon: <HelpCircle className="w-8 h-8 text-blue-500" />, title: "Ask a Tutor", href: "/dashboard/tutor" },
    { icon: <FileText className="w-8 h-8 text-blue-500" />, title: "Past Questions", href: "/dashboard/resources" },
    { icon: <PieChart className="w-8 h-8 text-blue-500" />, title: "View Progress", href: "/dashboard/progress" }
  ];

  const upcomingTopics = [
    { title: "Counting Numbers", subject: "Number Theory", duration: "30 min", badge: "Today", badgeColor: "bg-blue-500", href: "/dashboard/lessons/counting-numbers" },
    { title: "Basic Shapes", subject: "Geometry", duration: "30 min", badge: "Tomorrow", badgeColor: "bg-gray-500" },
    { title: "Simple Addition", subject: "Number Theory", duration: "30 min", badge: "Wed", badgeColor: "bg-gray-500" }
  ];

  const recentActivity = [
    { icon: <BookOpen className="w-5 h-5 text-blue-500" />, title: "Started: Counting Numbers", time: "Today", score: "0%", bgColor: "bg-blue-100" },
    { icon: <ClipboardCheck className="w-5 h-5 text-orange-500" />, title: "Assignment Due: Shapes Practice", time: "Tomorrow", score: "", bgColor: "bg-orange-100" },
    { icon: <Award className="w-5 h-5 text-green-500" />, title: "Welcome to EduMath GH!", time: "Today", score: "", bgColor: "bg-green-100" }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gradient">Welcome Back, {userData?.firstName || 'Student'}!</h1>
                <p className="text-xl text-gray-600 mt-2">Let&apos;s learn math with fun games! 🎮</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Mastery */}
          <Card className="card-hover border-0 shadow-modern bg-gradient-to-br from-blue-50 to-indigo-100">
            <CardContent className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10"></div>
              <div className="relative w-24 h-24 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="#f0f0f0" strokeWidth="10" fill="transparent" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallProgress / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gradient">{overallProgress}%</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Overall Progress</h3>
              <p className="text-gray-600">You&apos;re just getting started! 🌟</p>
            </CardContent>
          </Card>

          {/* Current Focus */}
          <Card className="card-hover border-0 shadow-modern bg-gradient-to-br from-green-50 to-emerald-100">
            <CardContent className="p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10"></div>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">Counting Numbers</h4>
                  <p className="text-sm text-gray-600">Number Theory • Beginner</p>
                </div>
              </div>
              <Progress value={0} className="mb-4 progress-modern" />
              <p className="text-sm text-gray-600 mb-6">Ready to start learning!</p>
              <Button asChild className="w-full btn-modern gradient-success text-white rounded-xl">
                <Link href="/dashboard/lessons/counting-numbers">
                  <Play className="w-4 h-4 mr-2" />
                  Start Lesson
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Achievement Card */}
          <Card className="card-hover border-0 shadow-modern bg-gradient-to-br from-purple-50 to-pink-100">
            <CardContent className="p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Achievements</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Welcome Badge</span>
                </div>
                <p className="text-xs text-gray-500">Complete your first lesson to earn more!</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-modern">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-8 flex items-center">
              <TrendingUp className="w-6 h-6 mr-3 text-blue-500" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href} className="group">
                  <Card className="card-hover border-0 shadow-md hover:shadow-lg bg-white group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
                        {action.icon}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">{action.title}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Topics & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Topics */}
          <Card className="h-fit border-0 shadow-modern">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-3 text-green-500" />
                Upcoming Topics
              </h3>
              <div className="space-y-4">
                {upcomingTopics.map((topic, index) => (
                  <div key={index} className={`p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${index === 0 ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50' : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-gray-900">{topic.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{topic.subject} • {topic.duration}</p>
                      </div>
                      <Badge className={`${topic.badgeColor} text-white rounded-xl px-3 py-1`}>{topic.badge}</Badge>
                    </div>
                    {topic.href && (
                      <Button asChild variant="outline" size="sm" className="mt-4 rounded-xl border-2">
                        <Link href={topic.href}>Start Now</Link>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="h-fit border-0 shadow-modern">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Award className="w-5 h-5 mr-3 text-purple-500" />
                Recent Activity
              </h3>
              <div className="space-y-5">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`p-3 rounded-xl ${activity.bgColor} shadow-sm`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                        <span>{activity.time}</span>
                        {activity.score && (
                          <>
                            <span>•</span>
                            <span>Score: {activity.score}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
