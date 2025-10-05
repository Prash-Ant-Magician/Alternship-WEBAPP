'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useFirestore, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { UserProfile } from '@/lib/definitions';

const profileSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters.'),
  headline: z.string().max(100, 'Headline is too long.').optional(),
  location: z.string().max(50, 'Location is too long.').optional(),
  availability: z.string().max(50, 'Availability is too long.').optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userProfile: UserProfile;
}

export function EditProfileDialog({ isOpen, setIsOpen, userProfile }: EditProfileDialogProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: '',
      headline: '',
      location: '',
      availability: '',
    },
  });
  
  useEffect(() => {
    if (isOpen && userProfile) {
        form.reset({
            displayName: userProfile.displayName || '',
            headline: userProfile.headline || '',
            location: userProfile.location || '',
            availability: userProfile.availability || '',
        });
    }
  }, [isOpen, userProfile, form])

  const onSubmit = (values: ProfileFormValues) => {
    if (!firestore || !userProfile?.id) return;

    const userRef = doc(firestore, 'users', userProfile.id);

    setDocumentNonBlocking(userRef, values, { merge: true });
    
    toast({
        title: "Profile updated!",
        description: "Your new profile details have been saved.",
    })
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headline</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., B.Tech CSE | Cybersecurity Enthusiast" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Remote/On-site" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
    