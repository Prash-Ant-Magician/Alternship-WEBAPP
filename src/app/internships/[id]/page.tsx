'use client';

import { useParams } from 'next/navigation';
import backendData from '@/../docs/backend.json';
import type { Internship } from '@/lib/definitions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { MapPin, Briefcase, Code, ArrowLeft, Building, Layers } from 'lucide-react';
import Link from 'next/link';

export default function InternshipDetailsPage() {
  const params = useParams();
  const { id } = params;

  // In a real app, this would be a Firestore query. For now, we get it from the seed data.
  const allInternships: Internship[] = (backendData.firestore?.['/internships/{internshipId}']?.seed || []).map((internship: any) => ({
    id: internship.id,
    title: internship.title,
    description: internship.description,
    company: internship.company,
    sector: internship.sector,
    location: internship.location,
    capacity: internship.capacity,
    skillsRequired: internship.skillsRequired,
    applicationUrl: internship.applicationUrl,
  }));

  const internship = allInternships.find((internship) => internship.id === id);

  if (!internship) {
    return (
      <div className="container mx-auto max-w-3xl py-12 px-4 text-center">
        <h1 className="text-2xl font-bold">Internship not found</h1>
        <p className="text-muted-foreground mt-2">The internship you are looking for does not exist or has been removed.</p>
        <Button asChild className="mt-6">
          <Link href="/search">Back to Search</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-muted/40 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <Button asChild variant="ghost" className="mb-6">
           <Link href="/search">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Search
            </Link>
        </Button>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start gap-6">
            <Image
                src={`https://logo.clearbit.com/${internship.company?.toLowerCase().replace(/ /g, '')}.com`}
                width={80}
                height={80}
                alt={`${internship.company} logo`}
                className="rounded-lg object-contain border p-2 bg-white"
                onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${internship.company?.charAt(0)}&background=random&size=80`)}
            />
            <div className='flex-grow'>
                <CardTitle className="text-3xl font-headline mb-2">{internship.title}</CardTitle>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
                    <span className='flex items-center gap-2'><Building className='w-4 h-4' /> {internship.company}</span>
                    <span className='flex items-center gap-2'><MapPin className='w-4 h-4' /> {internship.location}</span>
                    <span className='flex items-center gap-2'><Layers className='w-4 h-4' /> {internship.sector}</span>
                </div>
            </div>
             <Button size="lg" asChild className='w-full sm:w-auto mt-4 sm:mt-0'>
              <a href={internship.applicationUrl} target="_blank" rel="noopener noreferrer">Apply Now</a>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none text-foreground text-base">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-3"><Briefcase className='w-5 h-5'/> Job Description</h3>
                <p>{internship.description}</p>
            </div>
            
            <div className="mt-8">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-4"><Code className='w-5 h-5'/> Skills Required</h3>
                 <div className="flex flex-wrap gap-2">
                    {internship.skillsRequired.map((skill) => (
                        <Badge key={skill} variant="secondary" className='text-base py-1 px-3'>{skill}</Badge>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
