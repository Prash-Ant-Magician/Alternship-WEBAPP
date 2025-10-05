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
import type { FAQ } from '@/lib/definitions';
import { useEffect } from 'react';

const faqSchema = z.object({
  question: z.string().min(5, 'Question must be at least 5 characters.'),
  answer: z.string().min(10, 'Answer must be at least 10 characters.'),
});

type FaqFormValues = z.infer<typeof faqSchema>;

interface FaqFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  faq?: FAQ;
}

export function FaqForm({ isOpen, setIsOpen, faq }: FaqFormProps) {
  const firestore = useFirestore();

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: {
      question: '',
      answer: '',
    },
  });
  
  useEffect(() => {
    if (faq) {
        form.reset(faq);
    } else {
        form.reset({ question: '', answer: ''});
    }
  }, [faq, form, isOpen])

  const onSubmit = (values: FaqFormValues) => {
    if (!firestore) return;

    if (faq?.id) {
        // Update existing document
        const docRef = doc(firestore, 'faqs', faq.id);
        setDocumentNonBlocking(docRef, values, { merge: true });
    } else {
        // Create new document
        const collectionRef = collection(firestore, 'faqs');
        addDocumentNonBlocking(collectionRef, values);
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{faq ? 'Edit FAQ' : 'Add FAQ'}</DialogTitle>
          <DialogDescription>
            Add or edit a frequently asked question.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., What is Alternship?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a clear and concise answer."
                      className="min-h-[150px]"
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
