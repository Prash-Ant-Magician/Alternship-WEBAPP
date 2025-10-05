'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Loader2, Search, Frown, Code, Database, Palette, Cpu, Server } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { handleSearchRequest } from '@/app/actions';
import type { Internship } from '@/lib/definitions';

const skillCategories = [
    {
        title: "Frontend",
        icon: <Code className="w-8 h-8" />,
        skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular", "Tailwind CSS"],
    },
    {
        title: "Backend",
        icon: <Database className="w-8 h-8" />,
        skills: ["Node.js", "Python", "Java", "Ruby on Rails", "PHP", "Express.js", "SQL"],
    },
    {
        title: "UI/UX Design",
        icon: <Palette className="w-8 h-8" />,
        skills: ["Figma", "Adobe XD", "Sketch", "User Research", "Wireframing", "Prototyping"],
    },
    {
        title: "Software",
        icon: <Server className="w-8 h-8" />,
        skills: ["C++", "C#", "Go", "Kotlin", "Swift", "Scala", "Data Structures", "Algorithms"],
    },
    {
        title: "Hardware",
        icon: <Cpu className="w-8 h-8" />,
        skills: ["Verilog", "VHDL", "SystemVerilog", "Embedded C", "FPGA", "PCB Design"],
    },
]

function InternshipCard({ internship }: { internship: Internship }) {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
           <Image
                src={`https://logo.clearbit.com/${internship.company?.toLowerCase().replace(/ /g, '')}.com`}
                width={48}
                height={48}
                alt={`${internship.company} logo`}
                className="rounded-lg object-contain"
                onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${internship.company?.charAt(0)}&background=random`)}
            />
          <div>
            <h3 className="text-lg font-bold font-headline">{internship.title}</h3>
            <p className="text-muted-foreground">{internship.company}</p>
            <p className="text-sm text-muted-foreground mt-1">{internship.location}</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{internship.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
            {internship.skillsRequired?.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
        </div>
        <Button asChild className="w-full mt-6">
          <Link href={`/internships/${internship.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function NoResultsContent() {
    return (
        <div className="text-center py-16">
            <Frown className="h-12 w-12 text-muted-foreground mx-auto mb-4"/>
            <h2 className="text-2xl font-bold font-headline">No Internships Found</h2>
            <p className="text-muted-foreground mt-2 mb-8">We couldn't find any internships matching your search. Try a different keyword or explore by skill.</p>
            
            <div className="mt-12">
                <h3 className="text-2xl font-bold font-headline mb-6">Explore by Skill</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {skillCategories.map(category => (
                        <Card key={category.title} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    {category.icon}
                                </div>
                                <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map(skill => (
                                        <Badge key={skill} variant="outline">{skill}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

function SearchPageComponent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  
  const [internships, setInternships] = useState<Internship[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true);
      setError(null);
      const result = await handleSearchRequest(q);
      if ('error' in result) {
        setError(result.error);
        setInternships([]);
      } else {
        setInternships(result.internships);
      }
      setIsLoading(false);
    };

    performSearch();
  }, [q]);

  return (
    <div className="container mx-auto max-w-6xl py-8 px-4">
      <div className="flex items-center gap-2 mb-8">
        <Search className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold font-headline">
          {q ? `Search Results for "${q}"` : 'Internship Search'}
        </h1>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Searching for internships...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center py-16">
            <Frown className="h-12 w-12 text-destructive mx-auto mb-4"/>
            <p className="text-destructive font-semibold">Could not perform search.</p>
            <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && internships.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {internships.map(internship => (
            <InternshipCard key={internship.id} internship={internship as Internship} />
          ))}
        </div>
      )}

      {!isLoading && !error && internships.length === 0 && (
         <NoResultsContent />
      )}
    </div>
  );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center h-screen"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <SearchPageComponent />
        </Suspense>
    )
}
