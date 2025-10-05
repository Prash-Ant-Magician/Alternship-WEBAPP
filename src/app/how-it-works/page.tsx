'use client';

import { useLocale } from '@/context/locale-context';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function HowItWorksPage() {
  const { t } = useLocale();
  
  const steps = [
    { title: t.howItWorksPage.steps.step1.title, description: t.howItWorksPage.steps.step1.description },
    { title: t.howItWorksPage.steps.step2.title, description: t.howItWorksPage.steps.step2.description },
    { title: t.howItWorksPage.steps.step3.title, description: t.howItWorksPage.steps.step3.description },
    { title: t.howItWorksPage.steps.step4.title, description: t.howItWorksPage.steps.step4.description },
  ];

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold">{t.header.howItWorks}</h1>
        <p className="text-muted-foreground mt-2">
          {t.howItWorksPage.description}
        </p>
      </div>

      <div className="space-y-8 relative">
         <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-border" aria-hidden="true" />

        {steps.map((step, index) => (
           <div key={index} className="relative flex items-center">
             <div className="w-1/2 pr-8 text-right">
                {index % 2 === 0 && (
                    <Card>
                        <CardContent className='p-6'>
                            <h3 className="text-xl font-bold font-headline mb-2 text-primary">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                    </Card>
                )}
             </div>
             
             <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 z-10">
                 <span className="font-bold text-lg">{index + 1}</span>
             </div>

             <div className="w-1/2 pl-8">
                {index % 2 !== 0 && (
                    <Card>
                        <CardContent className='p-6'>
                            <h3 className="text-xl font-bold font-headline mb-2 text-primary">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                    </Card>
                )}
             </div>
           </div>
        ))}
      </div>
    </div>
  );
}
