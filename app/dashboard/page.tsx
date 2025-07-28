// app/dashboard/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

// Import the specialized dashboard components we will create next
import PrimaryDashboard from '@/app/dashboard/PrimaryDashboard/page';
import JhsDashboard from '@/app/dashboard/JhsDashboard/page';
import ShsDashboard from '@/app/dashboard/ShsDashboard/page';
import LoadingSpinner from '@/app/dashboard/LoadingSpinner/page';
import TakeATestPage from './waec-prep/page';
import SettingsPage from './settings/page';

export default function DashboardPage() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not logged in after loading
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Show a loading screen while fetching user data
  if (loading || !userData) {
    return <LoadingSpinner />;
  }

  // Helper function to categorize the grade
  const getGradeCategory = (grade: string) => {
    const gradeLower = grade.toLowerCase();
    if (gradeLower.includes('basic')) {
      return 'primary';
    }
    if (gradeLower.includes('jhs')) {
      return 'jhs';
    }
    if (gradeLower.includes('shs')) {
      return 'shs';
    }
    return 'primary'; // Default case
  };

  const category = getGradeCategory(userData.grade);

  // This is the core logic: Render the correct dashboard based on the category
  switch (category) {
    case 'primary':
      return <PrimaryDashboard />;
    case 'jhs':
      return <JhsDashboard />;
    case 'shs':
      return <ShsDashboard />;
    default:
      // Fallback to a default dashboard if something goes wrong
      return <PrimaryDashboard />;
  }
}