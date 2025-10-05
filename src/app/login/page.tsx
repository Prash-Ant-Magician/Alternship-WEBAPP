'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Briefcase, Loader2 } from 'lucide-react';
import { useLocale } from '@/context/locale-context';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useAuth, useUser, useDoc, useMemoFirebase, useFirestore } from '@/firebase';
import {
  initiateEmailSignIn,
  initiateGoogleSignIn,
} from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc } from 'firebase/firestore';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginValues = z.infer<typeof loginSchema>;

type UserProfile = {
  role: 'user' | 'admin' | 'company';
};

export default function LoginPage() {
  const { t } = useLocale();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userDocRef);
  
  useEffect(() => {
    // This is the single source of truth for redirection after login/signup.
    // It will only run when the user and their profile are fully loaded.
    if (!isUserLoading && user && userProfile) {
      switch (userProfile.role) {
        case 'admin':
          router.push('/dashboard/admin');
          break;
        case 'company':
          router.push('/dashboard/company');
          break;
        default:
          router.push('/dashboard/user');
      }
    } else if (!isUserLoading && user && !userProfile && !isProfileLoading) {
        // If user exists but profile doesn't, they might be mid-signup.
        // For safety, we can push them to the user dashboard, which has its own checks.
        router.push('/dashboard/user');
    }
  }, [user, userProfile, isUserLoading, isProfileLoading, router]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginValues) => {
    if (!auth) return;
    initiateEmailSignIn(auth, values.email, values.password);
    toast({
      title: 'Logging in...',
      description: 'You will be redirected shortly.',
    });
  };

  const handleGoogleSignIn = () => {
    if (!auth) return;
    initiateGoogleSignIn(auth);
  };


  // Display loading state while we wait for auth state or profile to load,
  // which might trigger a redirect.
  if (isUserLoading || (user && isProfileLoading)) {
    return (
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading your dashboard...</p>
            </div>
        </div>
    );
  }

  // If user is already logged in and we have a profile, they will be redirected by the useEffect.
  // This return is for when there is no user, so we show the login form.
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="space-y-1 text-center">
          <div className="inline-block mx-auto bg-primary text-primary-foreground p-3 rounded-full">
            <Briefcase className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-headline">
            {t.loginPage.title}
          </CardTitle>
          <CardDescription>{t.loginPage.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">{t.loginPage.emailLabel}</Label>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <Label htmlFor="password">
                          {t.loginPage.passwordLabel}
                        </Label>
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline"
                        >
                          {t.loginPage.forgotPassword}
                        </Link>
                      </div>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {t.loginPage.loginButton}
                </Button>
              </form>
            </Form>
             <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
             <Button variant="outline" className="w-full gap-2" onClick={handleGoogleSignIn}>
              <Icons.google className="h-5 w-5" />
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {t.loginPage.noAccount}{' '}
            <Link href="/signup" className="underline">
              {t.loginPage.signupLink}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
