'use client';

import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';
import { useAiTutor } from '@/hooks/useAiTutor';
import { useSettings } from '@/hooks/useSettings';
import { useNotifications } from '@/hooks/useNotifications';
import PrimaryGameLesson from './PrimaryGameLesson';
import { useState, useEffect } from 'react';
import { Book, Clock, Star, Trophy, ArrowLeft, Bot, Play, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LoadingSpinner from '@/app/dashboard/LoadingSpinner/page';

interface LessonClientProps {
  lessonId: string;
}

export default function LessonClient({ lessonId }: LessonClientProps) {
  const { user, userData } = useAuth();
  const { updateLessonProgress } = useProgress();
  const { sendMessage, messages, isLoading } = useAiTutor('', userData?.firstName);
  const { settings } = useSettings();
  const { addNotification } = useNotifications();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lessonStarted, setLessonStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // Create lesson title from lessonId
        const lessonTitle = lessonId
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Mock lesson data - in real app, this would come from Firebase
        const mockLesson = {
          id: lessonId,
          title: lessonTitle,
          description: `Interactive ${lessonTitle.toLowerCase()} lesson with Ella, your AI tutor`,
          grade: userData?.grade || 'primary',
          subject: 'mathematics',
          difficulty: 'beginner',
          estimatedTime: 15,
          type: 'game',
          objectives: [
            `Master ${lessonTitle.toLowerCase()} concepts`,
            'Practice with real examples',
            'Build confidence through games',
            'Prepare for assessments'
          ]
        };
        
        setLesson(mockLesson);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lesson:', error);
        setLoading(false);
      }
    };

    if (lessonId && userData) {
      fetchLesson();
    }
  }, [lessonId, userData]);

  const handleStartLesson = async () => {
    if (!lesson || !user || !userData) return;
    
    try {
      // Initialize AI tutor with lesson context
      const systemPrompt = `You are Ella, EduMath GH's friendly AI tutor. You're teaching ${userData.firstName} about ${lesson.title}.

CRITICAL TEACHING RULES:
1. ALWAYS address the student as ${userData.firstName}
2. Break down explanations into clear, numbered steps
3. Only give ONE step at a time unless specifically asked for the full solution
4. After each step, ask if they understand before continuing
5. Use encouraging language and Ghanaian examples (GH₵, local names, familiar scenarios)
6. Keep explanations simple and age-appropriate for ${userData.grade}
7. Make learning fun and engaging!

PERSONALITY: You are Ella - patient, encouraging, and enthusiastic about mathematics. You make learning fun!

Current lesson: ${lesson.title}
Student grade: ${userData.grade}

Start by greeting ${userData.firstName} warmly and introducing today's lesson topic. Ask if they're ready to begin!`;

      await sendMessage(`Hello Ella! I'm ready to learn about ${lesson.title}`, systemPrompt);
      setLessonStarted(true);
      setTotalSteps(5); // Typical lesson has 5 steps
      setCurrentStep(1);
      
      // Add notification
      await addNotification({
        title: 'Lesson Started! 🎓',
        message: `Ella is ready to guide you through ${lesson.title}!`,
        type: 'lesson',
        priority: 'medium',
        category: 'learning'
      });
    } catch (error) {
      console.error('Error starting lesson:', error);
    }
  };

  const handleLessonComplete = async (score: number) => {
    if (!lesson || !user || !userData) return;
    
    try {
      await updateLessonProgress(lesson.id, {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        completed: true,
        score,
        timeSpent: lesson.estimatedTime,
        completedAt: new Date(),
        attempts: 1
      });
      
      // Add completion notification
      await addNotification({
        title: 'Lesson Completed! 🎉',
        message: `Great job completing ${lesson.title}! Score: ${score}%`,
        type: 'success',
        priority: 'high',
        category: 'achievement',
        actionUrl: '/dashboard/progress'
      });

      // Add achievement notification for high scores
      if (score >= 90) {
        await addNotification({
          title: 'Excellent Performance! ⭐',
          message: `You scored ${score}% on ${lesson.title}! You're a math star!`,
          type: 'achievement',
          priority: 'high',
          category: 'achievement'
        });
      }
    } catch (error) {
      console.error('Error updating lesson progress:', error);
    }
  };

  const handleNextStep = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      await sendMessage("Please continue with the next step", undefined, true);
    }
  };

  const handlePreviousStep = async () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      await sendMessage("Can you explain the previous step again?", undefined, true);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!lesson) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Lesson Not Found</h1>
            <p className="text-gray-600 mb-6">The requested lesson could not be found.</p>
            <Link 
              href="/dashboard/lessons"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // For primary students, show game-based lessons
  if (userData?.grade?.toLowerCase().includes('primary') || userData?.grade?.toLowerCase().includes('basic')) {
    return (
      <PrimaryGameLesson
        lessonId={lesson.id}
        lessonTitle={lesson.title}
        onComplete={handleLessonComplete}
      />
    );
  }

  // For JHS/SHS students, show AI tutor interface
  if (lessonStarted) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="rounded-xl">
              <Link href="/dashboard/lessons">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Lessons
              </Link>
            </Button>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                Step {currentStep} of {totalSteps}
              </Badge>
              <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-xl">
                <Bot className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">Learning with Ella</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <Card className="border-0 shadow-modern">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-gray-900">{lesson.title}</h2>
                <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="border-0 shadow-modern">
            <CardContent className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}
                    >
                      {message.role === 'bot' && (
                        <div className="flex items-center mb-2">
                          <Bot className="w-4 h-4 mr-2 text-blue-500" />
                          <span className="text-xs font-medium text-blue-600">Ella</span>
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.timestamp && (
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-blue-500" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step Navigation */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviousStep}
                  disabled={currentStep <= 1 || isLoading}
                  className="rounded-xl"
                >
                  Previous Step
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage("Can you give me a hint?")}
                    disabled={isLoading}
                    className="rounded-xl"
                  >
                    💡 Hint
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendMessage("Can you explain this differently?")}
                    disabled={isLoading}
                    className="rounded-xl"
                  >
                    🔄 Explain Again
                  </Button>
                </div>

                <Button
                  onClick={handleNextStep}
                  disabled={currentStep >= totalSteps || isLoading}
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  size="sm"
                >
                  Next Step
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lesson Complete */}
          {currentStep >= totalSteps && (
            <Card className="border-0 shadow-modern bg-gradient-to-r from-green-50 to-emerald-50">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Lesson Complete! 🎉</h3>
                <p className="text-gray-600 mb-4">
                  Great job completing {lesson.title} with Ella! You're making excellent progress.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button asChild className="rounded-xl">
                    <Link href="/dashboard/lessons">
                      <Book className="w-4 h-4 mr-2" />
                      More Lessons
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href="/dashboard/assignments">
                      <Target className="w-4 h-4 mr-2" />
                      Practice Questions
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // Lesson start screen
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <Link 
              href="/dashboard/lessons"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Link>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{lesson.estimatedTime} min</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{lesson.title}</h1>
            <p className="text-gray-600 text-lg">{lesson.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <Target className="w-5 h-5 mr-2 text-blue-500" />
                Learning Objectives
              </h3>
              <ul className="space-y-2">
                {lesson.objectives.map((objective: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-600">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">Difficulty</h4>
                <p className="text-gray-600 capitalize">{lesson.difficulty}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-800">Grade Level</h4>
                <p className="text-gray-600 capitalize">{lesson.grade}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="flex items-center mb-4">
              <Bot className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h3 className="font-bold text-gray-900">Meet Ella, Your AI Tutor!</h3>
                <p className="text-gray-600">I'll guide you step-by-step through this lesson</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                <span>Personalized explanations</span>
              </div>
              <div className="flex items-center">
                <Target className="w-4 h-4 text-green-500 mr-2" />
                <span>Step-by-step guidance</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-purple-500 mr-2" />
                <span>Ghanaian examples</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartLesson}
              disabled={isLoading}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Starting...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning with Ella
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}