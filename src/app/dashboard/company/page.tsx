'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CompanyDashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <Button>Post New Internship</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Software Engineer Intern</CardTitle>
            <CardDescription>Summer 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Location: San Francisco, CA</p>
            <p className="text-sm text-muted-foreground">Applications: 152</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">View Applicants</Button>
              <Button variant="secondary" size="sm">Edit Listing</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Manager Intern</CardTitle>
            <CardDescription>Fall 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Location: New York, NY</p>
            <p className="text-sm text-muted-foreground">Applications: 89</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">View Applicants</Button>
              <Button variant="secondary" size="sm">Edit Listing</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
