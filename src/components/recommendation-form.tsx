'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { recommendationFormSchema, type RecommendationFormValues, type InternshipRecommendation } from '@/lib/definitions';
import { handleRecommendationRequest } from '@/app/actions';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocale } from '@/context/locale-context';

interface RecommendationFormProps {
  setRecommendations: React.Dispatch<React.SetStateAction<InternshipRecommendation[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export function RecommendationForm({ setRecommendations, setIsLoading, setError }: RecommendationFormProps) {
  const { toast } = useToast();
  const { t } = useLocale();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      education: '',
      skills: '',
      sectorInterests: '',
      location: '',
      affirmativeAction: false,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: RecommendationFormValues) {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    document.getElementById('recommendations')?.scrollIntoView({ behavior: 'smooth' });

    const result = await handleRecommendationRequest(values);

    setIsLoading(false);
    if ('error' in result) {
      setError(result.error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: result.error,
      });
    } else {
      setRecommendations(result.recommendations);
       if (result.recommendations.length === 0) {
        toast({
          title: "No internships found",
          description: "We couldn't find any internships matching your criteria. Try broadening your search.",
        });
      } else {
         toast({
          title: "Success!",
          description: "We've found some internships for you.",
        });
      }
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{t.recommendationForm.title}</CardTitle>
        <CardDescription>
          {t.recommendationForm.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.recommendationForm.education}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.recommendationForm.educationPlaceholder} {...field} />
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
                    <FormLabel>{t.recommendationForm.location}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.recommendationForm.locationPlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.recommendationForm.skills}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.recommendationForm.skillsPlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t.recommendationForm.skillsDescription}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sectorInterests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.recommendationForm.sectorInterests}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t.recommendationForm.sectorInterestsPlaceholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {t.recommendationForm.sectorInterestsDescription}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="affirmativeAction"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t.recommendationForm.affirmativeAction}
                    </FormLabel>
                    <FormDescription>
                      {t.recommendationForm.affirmativeActionDescription}
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t.recommendationForm.findingInternships}
                </>
              ) : (
                t.recommendationForm.getRecommendations
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
