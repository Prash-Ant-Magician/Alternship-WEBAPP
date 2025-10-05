'use client';

import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { UserProfileCard } from './components/user-profile-card';
import { Loader2 } from 'lucide-react';
import { doc } from 'firebase/firestore';

type UserProfile = {
  role?: 'user' | 'admin' | 'company';
};

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);

  useEffect(() => {
    if (isUserLoading || isProfileLoading) {
      return;
    }

    if (!user) {
      router.push('/login');
    } else if (userProfile?.role && userProfile.role !== 'user') {
      // If user has a role but it's not 'user', redirect them.
      if (userProfile.role === 'admin') {
        router.push('/dashboard/admin');
      } else if (userProfile.role === 'company') {
        router.push('/dashboard/company');
      }
    }
    // If user exists and role is 'user', or role is undefined (mid-signup), they can stay.
  }, [user, userProfile, isUserLoading, isProfileLoading, router]);

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    // This case is primarily for the server-render or if the auth state is briefly null
    // The useEffect above will handle the redirect on the client.
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
            {/* <UserProfileCard /> */}  
            //add on of the feature google icons
        </aside>
        <main className="md:col-span-3">
          {children}
        </main>
      </div>
    </div>
  );
}
