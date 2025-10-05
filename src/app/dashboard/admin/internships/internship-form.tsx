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
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useFirestore, setDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import type { Internship } from '@/lib/definitions';
import { useEffect } from 'react';

const internshipSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  company: z.string().min(2, 'Company name is required.'),
  sector: z.string().min(2, 'Sector is required.'),
  location: z.string().min(2, 'Location is required.'),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1.'),
  skillsRequired: z.string().min(2, 'At least one skill is required.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
});

type InternshipFormValues = z.infer<typeof internshipSchema>;

interface InternshipFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  internship?: Internship;
}

export function InternshipForm({ isOpen, setIsOpen, internship }: InternshipFormProps) {
  const firestore = useFirestore();

  const form = useForm<InternshipFormValues>({
    resolver: zodResolver(internshipSchema),
    defaultValues: {
      title: '',
      company: '',
      sector: '',
      location: '',
      capacity: 1,
      skillsRequired: '',
      description: '',
    },
  });
  
  useEffect(() => {
    if (internship) {
        form.reset({
            ...internship,
            skillsRequired: internship.skillsRequired.join(', '),
        });
    } else {
        form.reset({
          title: '',
          company: '',
          sector: '',
          location: '',
          capacity: 1,
          skillsRequired: '',
          description: '',
        });
    }
  }, [internship, form, isOpen])

  const onSubmit = (values: InternshipFormValues) => {
    if (!firestore) return;

    const dataToSave = {
        ...values,
        skillsRequired: values.skillsRequired.split(',').map(s => s.trim()),
    };

    if (internship?.id) {
        // Update existing document
        const docRef = doc(firestore, 'internships', internship.id);
        setDocumentNonBlocking(docRef, dataToSave, { merge: true });
    } else {
        // Create new document
        const collectionRef = collection(firestore, 'internships');
        addDocumentNonBlocking(collectionRef, dataToSave);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{internship ? 'Edit Internship' : 'Add Internship'}</DialogTitle>
          <DialogDescription>
            Fill out the details for the internship listing.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                 <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Engineer Intern" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Google" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <div className="grid grid-cols-3 gap-4">
                 <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sector</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Technology" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Mountain View, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="capacity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capacity</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
             <FormField
              control={form.control}
              name="skillsRequired"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills Required</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., C++, Java, Python" {...field} />
                  </FormControl>
                  <FormDescription>
                    Separate skills with a comma.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the internship."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
