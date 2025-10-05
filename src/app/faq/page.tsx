'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLocale } from '@/context/locale-context';

export default function FAQPage() {
  const { t } = useLocale();

  const faqs = [
    { question: t.faqPage.q1, answer: t.faqPage.a1 },
    { question: t.faqPage.q2, answer: t.faqPage.a2 },
    { question: t.faqPage.q3, answer: t.faqPage.a3 },
    { question: t.faqPage.q4, answer: t.faqPage.a4 },
    { question: t.faqPage.q5, answer: t.faqPage.a5 },
    { question: t.faqPage.q6, answer: t.faqPage.a6 },
  ];

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold">{t.faqPage.title}</h1>
        <p className="text-muted-foreground mt-2">
          {t.faqPage.description}
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
