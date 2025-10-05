'use client';

import { useLocale } from '@/context/locale-context';
import { Briefcase, Lightbulb, Users } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLocale();

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-5xl">
          {t.header.about}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t.aboutPage.tagline}
        </p>
      </div>

      <div className="space-y-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">
              {t.aboutPage.ourMission.title}
            </h2>
            <p className="text-muted-foreground text-lg">
             {t.aboutPage.ourMission.description}
            </p>
          </div>
          <div className="flex justify-center">
            <Briefcase className="w-32 h-32 text-accent" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center md:order-2">
            <Lightbulb className="w-32 h-32 text-accent" />
          </div>
          <div className='md:order-1'>
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">
              {t.aboutPage.ourVision.title}
            </h2>
            <p className="text-muted-foreground text-lg">
             {t.aboutPage.ourVision.description}
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4 text-primary">
              {t.aboutPage.ourTeam.title}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t.aboutPage.ourTeam.description}
            </p>
          </div>
          <div className="flex justify-center">
             <Users className="w-32 h-32 text-accent" />
          </div>
        </div>
      </div>
    </div>
  );
}
