'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  BookOpen, 
  Target, 
  Award, 
  Calendar,
  Clock,
  Zap,
  Brain,
  Star,
  Trophy,
  ChevronRight,
  BarChart3,
  PieChart,
  Activity,
  Flame,
  CheckCircle2,
  AlertCircle,
  Users,
  Medal,
  Sparkles,
  TrendingDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/app/dashboard/LoadingSpinner/page';

export default function ProgressPage() {
  const { userData, loading } = useAuth();
  const [timeFilter, setTimeFilter] = useState('30days');
  const [animatedStats, setAnimatedStats] = useState({
    averageScore: 0,
    topicsMastered: 0,
    studyStreak: 0,
    totalStudyTime: 0,
    weeklyGoal: 0
  });

  // Dynamic progress data based on user grade
  const getProgressData = () => {
    if (!userData) return null;
    
    const isNewUser = true; // In real app, check user creation date
    const gradeLevel = userData.grade.toLowerCase();
    
    if (isNewUser) {
      return {
        averageScore: 0,
        topicsMastered: 0,
        topicsToReview: 0,
        studyStreak: 1,
        totalStudyTime: 0,
        weeklyGoal: 0,
        totalTopics: gradeLevel.includes('primary') ? 15 : gradeLevel.includes('jhs') ? 25 : 35,
        completedAssignments: 0,
        totalAssignments: 5,
        currentLevel: 'Beginner',
        nextLevel: 'Intermediate',
        pointsToNextLevel: 100,
        currentPoints: 10
      };
    }
    
    // For existing users, return actual progress
    return {
      averageScore: 78,
      topicsMastered: 12,
      topicsToReview: 3,
      studyStreak: 7,
      totalStudyTime: 24,
      weeklyGoal: 85,
      totalTopics: gradeLevel.includes('primary') ? 15 : gradeLevel.includes('jhs') ? 25 : 35,
      completedAssignments: 8,
      totalAssignments: 12,
      currentLevel: 'Intermediate',
      nextLevel: 'Advanced',
      pointsToNextLevel: 250,
      currentPoints: 180
    };
  };

  const progressData = getProgressData();

  // Animate stats on load
  useEffect(() => {
    if (!progressData) return;
    
    const timer = setTimeout(() => {
      setAnimatedStats({
        averageScore: progressData.averageScore,
        topicsMastered: progressData.topicsMastered,
        studyStreak: progressData.studyStreak,
        totalStudyTime: progressData.totalStudyTime,
        weeklyGoal: progressData.weeklyGoal
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, [progressData]);

  // Dynamic subjects based on grade
  const getSubjectsForGrade = () => {
    if (!userData) return [];
    
    const grade = userData.grade.toLowerCase();
    
    if (grade.includes('primary')) {
      return [
        { name: 'Counting & Numbers', progress: 15, color: 'bg-blue-500', lessons: 8, completed: 1 },
        { name: 'Basic Shapes', progress: 0, color: 'bg-green-500', lessons: 6, completed: 0 },
        { name: 'Simple Addition', progress: 0, color: 'bg-purple-500', lessons: 10, completed: 0 },
        { name: 'Money & Time', progress: 0, color: 'bg-orange-500', lessons: 7, completed: 0 }
      ];
    } else if (grade.includes('jhs')) {
      return [
        { name: 'Algebra', progress: 25, color: 'bg-blue-500', lessons: 15, completed: 3 },
        { name: 'Geometry', progress: 0, color: 'bg-green-500', lessons: 12, completed: 0 },
        { name: 'Statistics', progress: 0, color: 'bg-purple-500', lessons: 8, completed: 0 },
        { name: 'Number Theory', progress: 10, color: 'bg-orange-500', lessons: 10, completed: 1 }
      ];
    } else {
      return [
        { name: 'Advanced Algebra', progress: 30, color: 'bg-blue-500', lessons: 20, completed: 6 },
        { name: 'Calculus', progress: 0, color: 'bg-green-500', lessons: 18, completed: 0 },
        { name: 'Trigonometry', progress: 15, color: 'bg-purple-500', lessons: 15, completed: 2 },
        { name: 'Statistics', progress: 0, color: 'bg-orange-500', lessons: 12, completed: 0 }
      ];
    }
  };

  const subjects = getSubjectsForGrade();

  // Dynamic achievements based on progress
  const getAchievements = () => {
    const achievements = [
      {
        title: 'Welcome to EduMath GH! 🎉',
        description: 'Started your mathematics journey',
        date: 'Today',
        icon: <Award className="w-5 h-5 text-yellow-500" />,
        type: 'milestone'
      }
    ];

    if (progressData?.studyStreak && progressData.studyStreak >= 3) {
      achievements.push({
        title: 'Study Streak Master! 🔥',
        description: `${progressData.studyStreak} days in a row`,
        date: 'Today',
        icon: <Flame className="w-5 h-5 text-orange-500" />,
        type: 'streak'
      });
    }

    if (progressData?.topicsMastered && progressData.topicsMastered >= 1) {
      achievements.push({
        title: 'First Topic Mastered! ⭐',
        description: 'Completed your first lesson',
        date: 'Today',
        icon: <Star className="w-5 h-5 text-blue-500" />,
        type: 'learning'
      });
    }

    return achievements;
  };

  const recentAchievements = getAchievements();

  // Weekly activity data
  const weeklyActivity = [
    { day: 'Mon', minutes: 0, lessons: 0 },
    { day: 'Tue', minutes: 0, lessons: 0 },
    { day: 'Wed', minutes: 0, lessons: 0 },
    { day: 'Thu', minutes: 0, lessons: 0 },
    { day: 'Fri', minutes: 0, lessons: 0 },
    { day: 'Sat', minutes: 0, lessons: 0 },
    { day: 'Sun', minutes: 15, lessons: 1 }
  ];

  // Learning insights
  const insights = [
    {
      icon: <Brain className="w-5 h-5 text-blue-500" />,
      title: 'Best Learning Time',
      value: 'Evenings',
      description: 'You learn best between 6-8 PM'
    },
    {
      icon: <Target className="w-5 h-5 text-green-500" />,
      title: 'Favorite Subject',
      value: userData?.grade.includes('primary') ? 'Counting' : 'Algebra',
      description: 'Your most engaged topic'
    },
    {
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      title: 'Learning Speed',
      value: 'Steady',
      description: 'Consistent progress pace'
    }
  ];

  if (loading || !userData || !progressData) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Progress Dashboard</h1>
            <p className="text-xl text-gray-600">Track your learning journey, {userData.firstName}! 📊</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-xl p-2 shadow-modern border">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-sm font-medium"
              >
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="3months">Last 3 Months</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Average Score */}
          <Card className="card-hover border-0 shadow-modern bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 text-center relative">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gradient mb-2">
                {animatedStats.averageScore}%
              </div>
              <div className="text-sm font-medium mb-1 text-gray-700">Average Score</div>
              <div className="text-xs text-gray-500">
                {progressData.averageScore === 0 ? 'Complete lessons to see score' : '+5% from last week'}
              </div>
            </CardContent>
          </Card>

          {/* Topics Mastered */}
          <Card className="card-hover border-0 shadow-modern bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 text-center relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {animatedStats.topicsMastered}
              </div>
              <div className="text-sm font-medium mb-1 text-gray-700">Topics Mastered</div>
              <div className="text-xs text-gray-500">
                {progressData.totalTopics - progressData.topicsMastered} remaining
              </div>
            </CardContent>
          </Card>

          {/* Study Streak */}
          <Card className="card-hover border-0 shadow-modern bg-gradient-to-br from-orange-50 to-yellow-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 text-center relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {animatedStats.studyStreak}
              </div>
              <div className="text-sm font-medium mb-1 text-gray-700">Study Streak</div>
              <div className="text-xs text-gray-500">
                {progressData.studyStreak === 1 ? 'Keep it up!' : 'Days in a row'}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Goal */}
          <Card className="card-hover border-0 shadow-modern bg-gradient-to-br from-purple-50 to-pink-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-6 text-center relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {animatedStats.weeklyGoal}%
              </div>
              <div className="text-sm font-medium mb-1 text-gray-700">Weekly Goal</div>
              <div className="text-xs text-gray-500">
                {100 - progressData.weeklyGoal}% to reach target
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress & Activity Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Level Progress */}
          <Card className="border-0 shadow-modern">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Medal className="w-6 h-6 mr-3 text-yellow-500" />
                Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-bold mb-4">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {progressData.currentLevel}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {progressData.currentPoints} / {progressData.pointsToNextLevel} XP
                </div>
                <Progress 
                  value={(progressData.currentPoints / progressData.pointsToNextLevel) * 100} 
                  className="h-3 progress-modern mb-4" 
                />
                <p className="text-sm text-gray-600">
                  {progressData.pointsToNextLevel - progressData.currentPoints} XP to reach {progressData.nextLevel}
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{progressData.completedAssignments}</div>
                  <div className="text-xs text-gray-500">Assignments Done</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{progressData.studyStreak}</div>
                  <div className="text-xs text-gray-500">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{progressData.totalStudyTime}h</div>
                  <div className="text-xs text-gray-500">Study Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card className="border-0 shadow-modern">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Activity className="w-6 h-6 mr-3 text-green-500" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyActivity.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-medium">
                        {day.day}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{day.minutes} minutes</div>
                        <div className="text-xs text-gray-500">{day.lessons} lessons</div>
                      </div>
                    </div>
                    <div className="flex-1 mx-4">
                      <Progress value={day.minutes > 0 ? (day.minutes / 60) * 100 : 0} className="h-2" />
                    </div>
                    <div className="text-xs text-gray-400">
                      {day.minutes > 0 ? '✓' : '—'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Progress & Learning Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject Mastery */}
          <Card className="border-0 shadow-modern">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <BookOpen className="w-6 h-6 mr-3 text-blue-500" />
                Subject Mastery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjects.map((subject, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 ${subject.color} rounded-full`}></div>
                      <span className="font-medium text-gray-900">{subject.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">{subject.progress}%</div>
                      <div className="text-xs text-gray-500">{subject.completed}/{subject.lessons}</div>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                  {subject.progress > 0 && (
                    <div className="flex items-center text-xs text-gray-600">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                      {subject.completed} lessons completed
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Learning Insights */}
          <Card className="border-0 shadow-modern">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Brain className="w-6 h-6 mr-3 text-purple-500" />
                Learning Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {insight.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <span className="text-sm font-bold text-blue-600">{insight.value}</span>
                    </div>
                    <p className="text-xs text-gray-600">{insight.description}</p>
                  </div>
                </div>
              ))}
              
              {/* Quick Actions */}
              <div className="pt-4 border-t space-y-3">
                <Button className="w-full btn-modern gradient-primary text-white rounded-xl" asChild>
                  <Link href="/dashboard/lessons">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Continue Learning
                  </Link>
                </Button>
                <Button variant="outline" className="w-full rounded-xl" asChild>
                  <a href="/dashboard/assignments">
                    <Target className="w-4 h-4 mr-2" />
                    View Assignments
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="border-0 shadow-modern">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Award className="w-6 h-6 mr-3 text-yellow-500" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border hover:shadow-md transition-all duration-300">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{achievement.date}</span>
                      <Badge variant="secondary" className="text-xs">
                        {achievement.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {recentAchievements.length === 1 && (
              <div className="text-center py-8 border-t mt-6">
                <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">More achievements coming!</h3>
                <p className="text-gray-600 mb-4">Complete lessons and assignments to unlock new badges</p>
                <Button asChild className="btn-modern gradient-success text-white rounded-xl">
                  <Link href="/dashboard/lessons">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Start Learning
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}