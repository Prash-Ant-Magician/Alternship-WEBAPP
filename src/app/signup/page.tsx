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
import { useAuth, useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import {
  initiateEmailSignUp,
} from '@/firebase/non-blocking-login';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { doc } from 'firebase/firestore';


const signupSchema = z.object({
  displayName: z.string().min(2, 'Name is required.'),
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

type SignupValues = z.infer<typeof signupSchema>;

type UserProfile = {
  role: 'user' | 'admin' | 'company';
};

export default function SignupPage() {
  const { t } = useLocale();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  
  useEffect(() => {
    // If user is already logged in, the login page will handle redirection.
    if (!isUserLoading && user) {
        router.push('/login');
    }
  }, [user, isUserLoading, router]);


  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: SignupValues) => {
    if (!auth) return;
    initiateEmailSignUp(auth, values.email, values.password, {
      displayName: values.displayName,
    });
    toast({
      title: 'Creating Account...',
      description: 'You will be redirected to the login page.',
    });
  };

  if (isUserLoading) {
    return (
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="space-y-1 text-center">
          <div className="inline-block mx-auto bg-primary text-primary-foreground p-3 rounded-full">
            <Briefcase className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-headline">
            {t.signupPage.title}
          </CardTitle>
          <CardDescription>{t.signupPage.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="displayName">Full Name</Label>
                    <FormControl>
                      <Input
                        id="displayName"
                        placeholder='e.g., John Doe'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">{t.signupPage.emailLabel}</Label>
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
                    <Label htmlFor="password">
                      {t.signupPage.passwordLabel}
                    </Label>
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
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.signupPage.createAccountButton}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            {t.signupPage.hasAccount}{' '}
            <Link href="/login" className="underline">
              {t.signupPage.loginLink}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
