'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useToast } from '@/hooks/use-toast';
import { useLocale } from '@/context/locale-context';
import { Mail } from 'lucide-react';
import { contactFormSchema, type ContactFormValues } from '@/lib/definitions';
import { handleContactRequest } from '@/app/actions';

export default function ContactPage() {
  const { toast } = useToast();
  const { t } = useLocale();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: ContactFormValues) {
    const result = await handleContactRequest(data);
    if (result.success) {
      toast({
        title: t.contactPage.toast.title,
        description: t.contactPage.toast.description,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "There was a problem sending your message. Please try again later.",
      });
    }
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <div className="text-center mb-10">
        <Mail className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          {t.header.contact}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t.contactPage.description}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contactPage.nameLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.contactPage.namePlaceholder} {...field} />
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
                <FormLabel>{t.contactPage.emailLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.contactPage.emailPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.contactPage.messageLabel}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t.contactPage.messagePlaceholder}
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? t.contactPage.sendingButton : t.contactPage.sendButton}
          </Button>
        </form>
      </Form>
    </div>
  );
}
