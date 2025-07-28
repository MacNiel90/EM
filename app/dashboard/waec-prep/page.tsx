// app/dashboard/take-a-test/page.tsx
'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Edit } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/app/dashboard/LoadingSpinner/page';

export default function TakeATestPage() {
    const { userData, loading } = useAuth();

    if (loading || !userData) return <LoadingSpinner />;
    
    const isJHS = userData.grade.toLowerCase().includes('jhs');
    const isSHS = userData.grade.toLowerCase().includes('shs');

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-bold mb-6">Practice Tests</h1>
            
            {(isJHS || isSHS) ? (
                <div className="space-y-8">
                    {isJHS && (
                        <Card>
                            <CardHeader>
                                <CardTitle>BECE Preparation</CardTitle>
                            </CardHeader>
                            <CardContent className="flex gap-4">
                                <Button size="lg"><Edit className="mr-2 h-4 w-4" /> Start BECE Mock Test</Button>
                                <Button size="lg" variant="outline"><FileText className="mr-2 h-4 w-4" /> View BECE Past Questions</Button>
                            </CardContent>
                        </Card>
                    )}
                    {isSHS && (
                        <Card>
                            <CardHeader>
                                <CardTitle>WASSCE Preparation</CardTitle>
                            </CardHeader>
                            <CardContent className="flex gap-4">
                                <Button size="lg"><Edit className="mr-2 h-4 w-4" /> Start WASSCE Mock Test</Button>
                                <Button size="lg" variant="outline"><FileText className="mr-2 h-4 w-4" /> View WASSCE Past Questions</Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>No Tests Available</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Practice tests are available for JHS and SHS students to prepare for exams.</p>
                    </CardContent>
                </Card>
            )}
        </DashboardLayout>
    );
}