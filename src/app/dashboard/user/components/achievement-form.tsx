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
import { useFirestore, useFirebaseApp, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { PortfolioItem } from '@/lib/definitions';
import { Loader2 } from 'lucide-react';


const achievementSchema = z.object({
  title: z.string().min(3, 'Title is required.'),
  description: z.string().optional(),
  type: z.enum(['Certificate', 'Project', 'Article', 'Video', 'Other']),
  contentUrl: z.string().optional(),
  file: z.instanceof(File).optional(),
}).refine(data => data.type !== 'Certificate' || !!data.file, {
  message: 'A file is required for certificates.',
  path: ['file'],
}).refine(data => data.type === 'Certificate' || !!data.contentUrl, {
    message: 'A URL is required if no file is uploaded.',
    path: ['contentUrl'],
});

type AchievementFormValues = z.infer<typeof achievementSchema>;

interface AchievementFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userId: string;
}

export function AchievementForm({ isOpen, setIsOpen, userId }: AchievementFormProps) {
  const firestore = useFirestore();
  const firebaseApp = useFirebaseApp();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: '',
      description: '',
      type: 'Certificate',
      contentUrl: '',
    },
  });
  
  useEffect(() => {
    if (!isOpen) {
        form.reset();
    }
  }, [isOpen, form]);

  const onSubmit = async (values: AchievementFormValues) => {
    if (!firestore || !userId) return;
    setIsUploading(true);

    let fileUrl = values.contentUrl || '';

    try {
        if (values.file) {
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `portfolios/${userId}/${Date.now()}_${values.file.name}`);
            const snapshot = await uploadBytes(storageRef, values.file);
            fileUrl = await getDownloadURL(snapshot.ref);
        }

        if (!fileUrl) {
            toast({ variant: 'destructive', title: 'Error', description: 'A file upload or a URL is required.' });
            setIsUploading(false);
            return;
        }

        const portfolioCollection = collection(firestore, 'users', userId, 'portfolio');
        
        const newPortfolioItem = {
            userId,
            title: values.title,
            description: values.description || '',
            type: values.type,
            contentUrl: fileUrl,
            createdAt: serverTimestamp(),
        };

        await addDocumentNonBlocking(portfolioCollection, newPortfolioItem);

        toast({
            title: 'Achievement Added!',
            description: `${values.title} has been added to your portfolio.`,
        });

        setIsUploading(false);
        setIsOpen(false);
    } catch (error) {
        console.error("Error uploading file or saving achievement:", error);
        toast({
            variant: 'destructive',
            title: 'Upload Failed',
            description: 'There was a problem saving your achievement. Please try again.',
        });
        setIsUploading(false);
    }
  };

  const selectedType = form.watch('type');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Achievement</DialogTitle>
          <DialogDescription>
            Showcase your accomplishments by adding them to your portfolio.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Cloud Practitioner Certificate" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select achievement type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Certificate">Certificate</SelectItem>
                      <SelectItem value="Project">Project</SelectItem>
                      <SelectItem value="Article">Article</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
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
                    <Textarea placeholder="Describe your achievement..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedType === 'Certificate' ? (
                 <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate File</FormLabel>
                      <FormControl>
                         <Input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            ) : (
                <FormField
                  control={form.control}
                  name="contentUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/my-project" {...field} />
                      </FormControl>
                       <FormDescription>
                        Link to your project, article, or video.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            )}

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} disabled={isUploading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading}>
                {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isUploading ? 'Saving...' : 'Save Achievement'}
                </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
