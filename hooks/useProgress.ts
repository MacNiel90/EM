// hooks/useProgress.ts
'use client';

import { useState, useEffect } from 'react';
import { getFirebase } from '@/lib/firebase';
import { useAuth } from '@/hooks/useAuth';

export interface LessonProgress {
  lessonId: string;
  lessonTitle: string;
  completed: boolean;
  score?: number;
  timeSpent: number; // in minutes
  completedAt?: Date;
  attempts: number;
}

export interface AssignmentProgress {
  assignmentId: string;
  title: string;
  subject: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  score?: number;
  submittedAt?: Date;
  gradedAt?: Date;
  timeSpent: number;
}

export interface StudentProgress {
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
  totalStudyTime: number; // in minutes
  studyStreak: number;
  weeklyGoal: number;
  currentLevel: string;
  nextLevel: string;
  currentPoints: number;
  pointsToNextLevel: number;
  topicsMastered: string[];
  topicsToReview: string[];
  recentActivity: ActivityItem[];
  subjectProgress: SubjectProgress[];
}

export interface ActivityItem {
  id: string;
  type: 'lesson' | 'assignment' | 'achievement' | 'test';
  title: string;
  timestamp: Date;
  score?: number;
  icon: string;
  bgColor: string;
}

export interface SubjectProgress {
  name: string;
  progress: number;
  color: string;
  lessons: number;
  completed: number;
}

export const useProgress = () => {
  const { userData, user } = useAuth();
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [assignmentProgress, setAssignmentProgress] = useState<AssignmentProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate dynamic progress based on user interactions
  const calculateProgress = (lessons: LessonProgress[], assignments: AssignmentProgress[]): StudentProgress => {
    const completedLessons = lessons.filter(l => l.completed).length;
    const totalLessons = lessons.length || 1;
    const averageScore = lessons.length > 0 
      ? lessons.filter(l => l.score).reduce((sum, l) => sum + (l.score || 0), 0) / lessons.filter(l => l.score).length || 0
      : 0;
    
    const totalStudyTime = lessons.reduce((sum, l) => sum + l.timeSpent, 0) + 
                          assignments.reduce((sum, a) => sum + a.timeSpent, 0);
    
    // Calculate study streak
    const today = new Date();
    let streak = 0;
    const sortedLessons = lessons
      .filter(l => l.completedAt)
      .sort((a, b) => (b.completedAt?.getTime() || 0) - (a.completedAt?.getTime() || 0));
    
    for (let i = 0; i < sortedLessons.length; i++) {
      const lessonDate = sortedLessons[i].completedAt;
      if (lessonDate) {
        const daysDiff = Math.floor((today.getTime() - lessonDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff === i) {
          streak++;
        } else {
          break;
        }
      }
    }

    // Calculate level and points
    const points = completedLessons * 20 + Math.floor(averageScore / 10) * 5;
    const level = points < 100 ? 'Beginner' : points < 300 ? 'Intermediate' : points < 600 ? 'Advanced' : 'Expert';
    const nextLevel = level === 'Beginner' ? 'Intermediate' : level === 'Intermediate' ? 'Advanced' : level === 'Advanced' ? 'Expert' : 'Master';
    const pointsToNext = level === 'Beginner' ? 100 : level === 'Intermediate' ? 300 : level === 'Advanced' ? 600 : 1000;

    // Generate recent activity
    const recentActivity: ActivityItem[] = [
      ...lessons.filter(l => l.completed).slice(0, 3).map(l => ({
        id: l.lessonId,
        type: 'lesson' as const,
        title: `Completed: ${l.lessonTitle}`,
        timestamp: l.completedAt || new Date(),
        score: l.score,
        icon: 'BookOpen',
        bgColor: 'bg-blue-100'
      })),
      ...assignments.filter(a => a.status === 'graded').slice(0, 2).map(a => ({
        id: a.assignmentId,
        type: 'assignment' as const,
        title: `Assignment: ${a.title}`,
        timestamp: a.gradedAt || new Date(),
        score: a.score,
        icon: 'ClipboardCheck',
        bgColor: 'bg-green-100'
      }))
    ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5);

    // Calculate subject progress based on grade
    const getSubjectsForGrade = () => {
      if (!userData) return [];
      
      const grade = userData.grade.toLowerCase();
      
      if (grade.includes('primary')) {
        return [
          { name: 'Counting & Numbers', lessons: 8 },
          { name: 'Basic Shapes', lessons: 6 },
          { name: 'Simple Addition', lessons: 10 },
          { name: 'Money & Time', lessons: 7 }
        ];
      } else if (grade.includes('jhs')) {
        return [
          { name: 'Algebra', lessons: 15 },
          { name: 'Geometry', lessons: 12 },
          { name: 'Statistics', lessons: 8 },
          { name: 'Number Theory', lessons: 10 }
        ];
      } else {
        return [
          { name: 'Advanced Algebra', lessons: 20 },
          { name: 'Calculus', lessons: 18 },
          { name: 'Trigonometry', lessons: 15 },
          { name: 'Statistics', lessons: 12 }
        ];
      }
    };

    const subjects = getSubjectsForGrade();
    const subjectProgress = subjects.map((subject, index) => {
      const subjectLessons = lessons.filter(l => 
        l.lessonTitle.toLowerCase().includes(subject.name.toLowerCase().split(' ')[0])
      );
      const completed = subjectLessons.filter(l => l.completed).length;
      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
      
      return {
        name: subject.name,
        progress: subject.lessons > 0 ? Math.round((completed / subject.lessons) * 100) : 0,
        color: colors[index % colors.length],
        lessons: subject.lessons,
        completed
      };
    });

    return {
      totalLessons,
      completedLessons,
      averageScore: Math.round(averageScore),
      totalStudyTime: Math.round(totalStudyTime),
      studyStreak: streak,
      weeklyGoal: Math.round((completedLessons / totalLessons) * 100),
      currentLevel: level,
      nextLevel,
      currentPoints: points,
      pointsToNextLevel: pointsToNext,
      topicsMastered: lessons.filter(l => l.completed && (l.score || 0) >= 80).map(l => l.lessonTitle),
      topicsToReview: lessons.filter(l => l.completed && (l.score || 0) < 60).map(l => l.lessonTitle),
      recentActivity,
      subjectProgress
    };
  };

  // Load progress from Firebase
  useEffect(() => {
    const loadProgress = async () => {
      if (!user || !userData) return;

      const { db } = getFirebase();
      if (!db) return;

      try {
        // Load lesson progress
        const lessonsSnapshot = await db
          .collection('progress')
          .doc(user.uid)
          .collection('lessons')
          .get();

        const lessons: LessonProgress[] = lessonsSnapshot.docs.map(doc => ({
          ...doc.data(),
          completedAt: doc.data().completedAt?.toDate()
        })) as LessonProgress[];

        // Load assignment progress
        const assignmentsSnapshot = await db
          .collection('progress')
          .doc(user.uid)
          .collection('assignments')
          .get();

        const assignments: AssignmentProgress[] = assignmentsSnapshot.docs.map(doc => ({
          ...doc.data(),
          submittedAt: doc.data().submittedAt?.toDate(),
          gradedAt: doc.data().gradedAt?.toDate()
        })) as AssignmentProgress[];

        setLessonProgress(lessons);
        setAssignmentProgress(assignments);
        setProgress(calculateProgress(lessons, assignments));

      } catch (error) {
        console.error('Error loading progress:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, [user, userData]);

  // Update lesson progress
  const updateLessonProgress = async (lessonId: string, data: Partial<LessonProgress>) => {
    if (!user) return;

    const { db } = getFirebase();
    if (!db) return;

    try {
      await db
        .collection('progress')
        .doc(user.uid)
        .collection('lessons')
        .doc(lessonId)
        .set({
          ...data,
          lessonId,
          updatedAt: new Date()
        }, { merge: true });

      // Update local state
      setLessonProgress(prev => {
        const updated = prev.filter(l => l.lessonId !== lessonId);
        updated.push({ ...data, lessonId } as LessonProgress);
        const newProgress = calculateProgress(updated, assignmentProgress);
        setProgress(newProgress);
        return updated;
      });

    } catch (error) {
      console.error('Error updating lesson progress:', error);
    }
  };

  // Update assignment progress
  const updateAssignmentProgress = async (assignmentId: string, data: Partial<AssignmentProgress>) => {
    if (!user) return;

    const { db } = getFirebase();
    if (!db) return;

    try {
      await db
        .collection('progress')
        .doc(user.uid)
        .collection('assignments')
        .doc(assignmentId)
        .set({
          ...data,
          assignmentId,
          updatedAt: new Date()
        }, { merge: true });

      // Update local state
      setAssignmentProgress(prev => {
        const updated = prev.filter(a => a.assignmentId !== assignmentId);
        updated.push({ ...data, assignmentId } as AssignmentProgress);
        const newProgress = calculateProgress(lessonProgress, updated);
        setProgress(newProgress);
        return updated;
      });

    } catch (error) {
      console.error('Error updating assignment progress:', error);
    }
  };

  return {
    progress,
    lessonProgress,
    assignmentProgress,
    loading,
    updateLessonProgress,
    updateAssignmentProgress
  };
};