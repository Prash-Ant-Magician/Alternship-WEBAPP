'use client';

import { useLocale } from '@/context/locale-context';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Target, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ForCompaniesPage() {
  const { t } = useLocale();

  const features = [
    {
      icon: <Target className="h-10 w-10 text-primary" />,
      title: t.forCompaniesPage.features.feature1.title,
      description: t.forCompaniesPage.features.feature1.description,
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: t.forCompaniesPage.features.feature2.title,
      description: t.forCompaniesPage.features.feature2.description,
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: t.forCompaniesPage.features.feature3.title,
      description: t.forCompaniesPage.features.feature3.description,
    },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-headline font-bold tracking-tight sm:text-6xl">
          {t.forCompaniesPage.title}
        </h1>
        <p className="mt-6 text-lg max-w-2xl mx-auto leading-8 text-muted-foreground">
          {t.forCompaniesPage.description}
        </p>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle className="mt-6 font-headline">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-base leading-7">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
      
       <div className="container mx-auto px-4 pb-16 text-center">
          <h2 className="text-3xl font-bold font-headline mb-4">{t.forCompaniesPage.cta.title}</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">{t.forCompaniesPage.cta.description}</p>
          <Button asChild size="lg">
              <Link href="/contact">{t.header.contact}</Link>
          </Button>
       </div>
    </div>
  );
}
