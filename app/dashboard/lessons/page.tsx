// app/dashboard/lessons/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import LoadingSpinner from '@/app/dashboard/LoadingSpinner/page';
import { useAuth } from '@/hooks/useAuth';
import curriculumData from '@/lib/lessons.json';

// This helper function creates the URL-friendly ID for a topic.
const createTopicId = (title: string): string => {
  if (typeof title !== 'string' || !title) return 'untitled-topic';
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

export default function LessonsListPage() {
  const { userData, loading } = useAuth();
  const [userTopics, setUserTopics] = useState<string[]>([]);

  // This useEffect correctly finds the topics for the user's grade
  useEffect(() => {
    if (userData?.grade) {
      const gradeLower = userData.grade.toLowerCase();
      let curriculumKey: keyof typeof curriculumData;

      if (gradeLower.includes('basic')) curriculumKey = 'basic-1';
      else if (gradeLower.includes('jhs')) curriculumKey = 'jhs-1';
      else if (gradeLower.includes('shs')) curriculumKey = 'shs-1';
      else curriculumKey = 'basic-1';
      
      const curriculumPart = curriculumData[curriculumKey];
      
      if (curriculumPart && curriculumPart.length > 0) {
        const item = curriculumPart[0];
        const topics = (item as any)?.topics ?? (item as any)?.core_topics ?? (item as any)?.elective_topics ?? [];
        const safeTopics = topics.filter((topic: any): topic is string => typeof topic === 'string' && topic.length > 0);
        setUserTopics(safeTopics);
      }
    }
  }, [userData]);

  if (loading || !userData) {
    return <LoadingSpinner />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Lessons</h1>
          <p className="text-lg text-gray-600 mt-1">
            Showing topics for <span className="font-semibold text-blue-600">{userData.grade}</span>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userTopics.map((topic, index) => {
            const topicId = createTopicId(topic);
            const isLocked = index > 5;

            return (
              <Card 
                key={`${topicId}-${index}`}
                className={`hover:shadow-lg transition-all duration-300 ${isLocked ? 'opacity-60 bg-gray-50' : 'hover:-translate-y-1'}`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-4">
                      {isLocked ? <Lock className="w-5 h-5 text-gray-400" /> : <BookOpen className="w-5 h-5 text-gray-600" />}
                      <Badge variant="secondary">{isLocked ? 'Locked' : 'Available'}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{topic}</h3>
                  </div>
                  <Button 
                    asChild={!isLocked}
                    disabled={isLocked}
                    className="w-full mt-4"
                  >
                    {isLocked ? (
                      <span>Complete previous lessons</span>
                    ) : (
                      <Link href={`/dashboard/lessons/${topicId}`}>
                        Start Lesson
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}