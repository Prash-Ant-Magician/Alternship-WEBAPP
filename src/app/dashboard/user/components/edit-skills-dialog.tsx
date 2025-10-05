'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
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


const skillsSchema = z.object({
  skills: z.string().min(1, 'Please enter at least one skill.'),
});

type SkillsFormValues = z.infer<typeof skillsSchema>;

interface EditSkillsDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentSkills: string[];
  userId: string;
}

export function EditSkillsDialog({ isOpen, setIsOpen, currentSkills, userId }: EditSkillsDialogProps) {
  const firestore = useFirestore();
  const { toast } = useToast();

  const form = useForm<SkillsFormValues>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: '',
    },
  });
  
  useEffect(() => {
    if (isOpen) {
        form.reset({ skills: currentSkills.join(', ') });
    }
  }, [isOpen, currentSkills, form])

  const onSubmit = (values: SkillsFormValues) => {
    if (!firestore || !userId) return;

    const skillsArray = values.skills.split(',').map(s => s.trim()).filter(s => s);
    const userRef = doc(firestore, 'users', userId);

    setDocumentNonBlocking(userRef, { skills: skillsArray }, { merge: true });
    
    toast({
        title: "Skills updated!",
        description: "Your new skills have been saved to your profile.",
    })
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Skills</DialogTitle>
          <DialogDescription>
            Add or remove your skills. Separate each skill with a comma.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Python, React, Figma" {...field} />
                  </FormControl>
                   <FormDescription>
                    Use commas to separate your skills.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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

    