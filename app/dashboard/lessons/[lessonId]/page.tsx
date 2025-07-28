// app/dashboard/lessons/[lessonId]/page.tsx
// SERVER COMPONENT "SHELL"

import curriculumData from '@/lib/lessons.json';
import LessonClient from './LessonClient'; 
import { notFound } from 'next/navigation'; // Import the notFound function

// Helper function remains the same
const createTopicId = (title: string): string => {
  if (typeof title !== 'string' || !title) return '';
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

// generateStaticParams remains the same
export async function generateStaticParams() {
  const allTopics: string[] = [];
  for (const key in curriculumData) {
    const curriculumPart = curriculumData[key as keyof typeof curriculumData];
    if (curriculumPart && curriculumPart.length > 0) {
      const item = curriculumPart[0];
      if ('topics' in item && Array.isArray(item.topics)) allTopics.push(...item.topics);
      if ('core_topics' in item && Array.isArray(item.core_topics)) allTopics.push(...item.core_topics);
      if ('elective_topics' in item && Array.isArray(item.elective_topics)) allTopics.push(...item.elective_topics);
    }
  }
  const safeTopics = allTopics.filter(topic => typeof topic === 'string' && topic.length > 0);
  return safeTopics.map(topic => ({
    lessonId: createTopicId(topic),
  }));
}

// Updated for Next.js 15 async params
export default async function LessonDetailPage({ 
  params 
}: { 
  params: Promise<{ lessonId?: string }> 
}) {
  const { lessonId } = await params;

  // If there's no lessonId in the URL, render a 404 page.
  // This prevents the crash.
  if (!lessonId) {
    notFound();
  }

  // If lessonId exists, render the client component as normal.
  return <LessonClient lessonId={lessonId} />;
}