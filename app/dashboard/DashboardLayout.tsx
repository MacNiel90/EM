// components/dashboard/DashboardLayout.tsx

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Book, CheckSquare, BarChart2, Settings, GraduationCap, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

// This is the main layout for the entire student dashboard
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { logout, userData } = useAuth();

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/dashboard/lessons', label: 'My Lessons', icon: Book },
    { href: '/dashboard/assignments', label: 'Assignments', icon: CheckSquare },
    { href: '/dashboard/progress', label: 'Progress', icon: BarChart2 },
    { href: '/dashboard/take-a-test', label: 'Practice Tests', icon: GraduationCap },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-gray-900 text-white p-6 flex-shrink-0 flex flex-col">
          <div className="mb-8">
            <Link href="/dashboard" className="text-2xl font-bold text-white flex items-center gap-2">
                <GraduationCap /> EduMath GH
            </Link>
            {userData && <p className="text-sm text-gray-400 mt-2">Student Portal</p>}
          </div>
          
          <nav className="space-y-2 flex-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                    pathname === link.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <link.icon className="mr-3 h-5 w-5" />
                {link.label}
              </Link>
            ))}
          </nav>

           <div className="mt-8">
             <button
                onClick={logout}
                className="flex items-center p-3 w-full rounded-lg transition-colors text-gray-300 hover:bg-red-800"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
           </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}