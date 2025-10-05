'use client';
import { useState, useRef } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Youtube, FileText, UserCircle, ArrowUpRight, CheckCircle, Lightbulb, AlertTriangle, FileUp, Sparkles, Wand2, PlusCircle, Trophy, MoreVertical, Upload } from 'lucide-react';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUser, useDoc, useFirestore, useMemoFirebase, useCollection, deleteDocumentNonBlocking } from '@/firebase';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import type { UserProfile, PortfolioItem } from '@/lib/definitions';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AchievementForm } from './components/achievement-form';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDistanceToNow } from 'date-fns';


const careerGrowthContent = {
  videos: [
    {
      title: "The SINGLE Most Important Skill for Your Career",
      channel: "Fahad Shaikh",
      thumbnail: "https://picsum.photos/seed/career-video-2/400/225",
      url: "https://www.youtube.com/watch?v=u432wVqjB-A",
    },
  ],
  articles: [
    {
      title: "The 'Skills-First' Approach to Hiring",
      source: "Harvard Business Review",
      excerpt: "Companies are increasingly prioritizing skills over degrees, opening up new pathways to great jobs.",
      url: "#",
    },
    {
      title: "How to Network Your Way to a Dream Internship",
      source: "Forbes",
      excerpt: "Practical tips and strategies for building connections that can lead to incredible opportunities.",
      url: "#",
    }
  ],
  leaders: [
    {
      name: "Satya Nadella",
      company: "Microsoft",
      bio: "Known for transforming Microsoft's culture to one of empathy and a 'learn-it-all' mindset, driving innovation in cloud computing and AI.",
      image: "https://picsum.photos/seed/leader-1/100/100"
    },
    {
      name: "Jensen Huang",
      company: "NVIDIA",
      bio: "A visionary in graphics processing, he led NVIDIA to become a dominant force in gaming, data centers, and the AI revolution.",
      image: "https://picsum.photos/seed/leader-2/100/100"
    }
  ]
}

const marketDemandData = [
  { sector: 'Technology', demand: 85 },
  { sector: 'Finance', demand: 70 },
  { sector: 'Healthcare', demand: 60 },
  { sector: 'Marketing', demand: 75 },
  { sector: 'Design', demand: 65 },
]

export default function UserDashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const [isAchievementFormOpen, setIsAchievementFormOpen] = useState(false);
  const resumeUploadRef = useRef<HTMLInputElement>(null);


  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile } = useDoc<UserProfile>(userDocRef);

  const portfolioCollectionRef = useMemoFirebase(
    () => (user ? query(collection(firestore, 'users', user.uid, 'portfolio'), orderBy('createdAt', 'desc')) : null),
    [firestore, user]
  );
  const { data: portfolioItems, isLoading: isLoadingPortfolio } = useCollection<PortfolioItem>(portfolioCollectionRef);

  const handleDeleteAchievement = (itemId: string) => {
    if (!user) return;
    if (confirm('Are you sure you want to delete this achievement?')) {
        const itemRef = doc(firestore, 'users', user.uid, 'portfolio', itemId);
        deleteDocumentNonBlocking(itemRef);
    }
  }
  
  const handleUploadClick = () => {
    resumeUploadRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
      // Here you would handle the file upload and AI analysis
    }
  };


  const profileStrength = userProfile?.skills?.length ? 25 + (userProfile.skills.length * 5) : 25;
  const profileChecklist = [
    { id: 'skills', text: 'Add at least 3 skills', completed: (userProfile?.skills?.length ?? 0) >= 3 },
    { id: 'headline', text: 'Add a profile headline', completed: !!userProfile?.headline },
    { id: 'location', text: 'Set your location', completed: !!userProfile?.location },
    { id: 'resume', text: 'Upload your resume', completed: false },
  ];
  
  return (
    <>
     <Tabs defaultValue="applications" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="applications">Applications</TabsTrigger>
        <TabsTrigger value="ai-evaluation">AI Evaluation</TabsTrigger>
        <TabsTrigger value="career-growth">Career Growth</TabsTrigger>
        <TabsTrigger value="achievements">Achievements</TabsTrigger>
      </TabsList>
      <TabsContent value="applications">
        <Card>
          <CardHeader>
            <CardTitle>My Applications</CardTitle>
            <CardDescription>Track the status of your internship applications.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
             <div className="border p-4 rounded-lg">
                <div className='flex justify-between items-start'>
                    <div>
                        <h3 className="font-semibold">Software Engineer Intern</h3>
                        <p className="text-sm text-muted-foreground">Google</p>
                    </div>
                    <p className='text-sm font-medium text-green-600'>Under Review</p>
                </div>
                 <p className="text-xs text-muted-foreground mt-2">Applied on: 2024-07-15</p>
            </div>
             <div className="border p-4 rounded-lg">
                <div className='flex justify-between items-start'>
                    <div>
                        <h3 className="font-semibold">Product Manager Intern</h3>
                        <p className="text-sm text-muted-foreground">Microsoft</p>
                    </div>
                    <p className='text-sm font-medium text-blue-600'>Applied</p>
                </div>
                 <p className="text-xs text-muted-foreground mt-2">Applied on: 2024-07-12</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="ai-evaluation">
        <div className="space-y-6">
          <Card className="bg-gradient-to-r from-blue-50 to-teal-50">
             <CardHeader>
                <div className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Wand2 className="w-6 h-6 text-primary" />
                   </div>
                   <div>
                    <CardTitle className='font-headline text-2xl'>AI Profile Evaluation</CardTitle>
                    <CardDescription>Unlock insights to make your profile stand out.</CardDescription>
                   </div>
                </div>
             </CardHeader>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Profile Strength</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                 <div className="relative h-32 w-32">
                    <svg className="h-full w-full" viewBox="0 0 36 36">
                        <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        className="stroke-current text-gray-200"
                        strokeWidth="3"
                        fill="none"
                        />
                        <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        className="stroke-current text-primary"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray={`${profileStrength}, 100`}
                        strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
                        {profileStrength}%
                    </div>
                </div>
                <div className="w-full space-y-3">
                    <p className='text-sm font-medium text-center'>Complete these steps to improve your score:</p>
                    {profileChecklist.map(item => (
                        <div key={item.id} className={cn("flex items-center gap-2 text-sm p-2 rounded-md", item.completed ? "bg-green-100 text-green-800" : "bg-gray-100")}>
                            <CheckCircle className={cn("h-4 w-4", item.completed ? "text-green-600" : "text-gray-400")} />
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>AI-Generated Skill Gap Analysis</CardTitle>
                        <CardDescription>Based on your profile, here are skills you could learn to boost your opportunities.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <Badge variant='outline' className='border-blue-300 bg-blue-50 text-blue-800'><Lightbulb className='w-3 h-3 mr-1.5'/> Data Analysis</Badge>
                        <Badge variant='outline' className='border-blue-300 bg-blue-50 text-blue-800'><Lightbulb className='w-3 h-3 mr-1.5'/> SQL</Badge>
                        <Badge variant='outline' className='border-blue-300 bg-blue-50 text-blue-800'><Lightbulb className='w-3 h-3 mr-1.5'/> User Research</Badge>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Skill Market Demand</CardTitle>
                        <CardDescription>How your skills match up with top industry sectors.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={{}} className="h-[200px] w-full">
                            <BarChart data={marketDemandData} accessibilityLayer>
                                <XAxis dataKey="sector" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                <YAxis hide={true} />
                                <Tooltip cursor={false} content={<ChartTooltipContent hideIndicator />} />
                                <Bar dataKey="demand" radius={5} fill="var(--color-primary)" />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
          </div>
          
           <Card>
              <CardHeader>
                <CardTitle>AI Resume Feedback</CardTitle>
                <CardDescription>Upload your resume to get instant, actionable feedback from our AI.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg text-center'>
                    <FileUp className='w-12 h-12 text-muted-foreground mb-3'/>
                    <h3 className='text-lg font-medium mb-1'>No resume uploaded yet</h3>
                    <p className='text-sm text-muted-foreground mb-4'>Upload your resume to kickstart the AI analysis.</p>
                    <Button variant="outline" onClick={handleUploadClick}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Resume
                    </Button>
                    <input
                        type="file"
                        ref={resumeUploadRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                    />
                </div>
                <Alert className='mt-6'>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Example Feedback</AlertTitle>
                    <AlertDescription>
                        <ul className='list-disc pl-5 space-y-1 mt-2'>
                           <li>Strengthen your summary by adding quantifiable achievements.</li>
                           <li>Consider adding a "Projects" section to showcase hands-on experience.</li>
                           <li>The "Skills" section could be formatted for better readability.</li>
                        </ul>
                    </AlertDescription>
                </Alert>
              </CardContent>
               <CardFooter>
                 <Button>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze My Resume
                 </Button>
               </CardFooter>
            </Card>

        </div>
      </TabsContent>
       <TabsContent value="career-growth">
        <Card>
          <CardHeader>
            <CardTitle>Career Growth Resources</CardTitle>
            <CardDescription>Discover content to help you boost your career.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-8'>
            {/* Featured Videos */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Youtube className="h-6 w-6 text-red-600"/> Featured Videos</h3>
              <div className="grid md:grid-cols-1 gap-6">
                <Card className='overflow-hidden'>
                  <div className="aspect-video">
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/Mk6Njr52WJ0" title="How To Find The RIGHT Career For YOU" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <CardContent className='p-4'>
                    <h4 className="font-semibold truncate">How To Find The RIGHT Career For YOU</h4>
                    <p className="text-sm text-muted-foreground">Andrew Huberman</p>
                  </CardContent>
                </Card>
                <Card className='overflow-hidden'>
                  <div className="aspect-video">
                    <iframe className="w-full h-full" src="https://www.youtube.com/embed/JJjBPBWaeYU" title="Top Skills Every Software Engineer Should Learn in 2025 🔥" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                  </div>
                  <CardContent className='p-4'>
                    <h4 className="font-semibold truncate">Top Skills Every Software Engineer Should Learn in 2025 🔥</h4>
                    <p className="text-sm text-muted-foreground">Fireship</p>
                  </CardContent>
                </Card>
              </div>
            </div>

             {/* Recommended Articles */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><FileText className="h-6 w-6 text-blue-600"/> Recommended Articles</h3>
              <div className="space-y-4">
                 {careerGrowthContent.articles.map((article, index) => (
                  <Card key={index}>
                    <CardContent className='p-4 flex justify-between items-center'>
                      <div>
                        <h4 className="font-semibold">{article.title}</h4>
                        <p className="text-sm text-muted-foreground">{article.source}</p>
                        <p className="text-sm mt-1 line-clamp-2">{article.excerpt}</p>
                      </div>
                      <Button asChild variant="ghost" size="icon">
                        <Link href={article.url} target='_blank'><ArrowUpRight/></Link>
                      </Button>
                    </CardContent>
                  </Card>
                 ))}
              </div>
            </div>
            
             {/* Inspiring Leaders */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><UserCircle className="h-6 w-6 text-primary"/> Inspiring Leaders</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {careerGrowthContent.leaders.map((leader, index) => (
                  <Card key={index}>
                    <CardContent className='p-4 flex items-start gap-4'>
                      <Image src={leader.image} alt={leader.name} width={80} height={80} className="rounded-full" />
                      <div>
                        <h4 className="font-bold text-lg">{leader.name}</h4>
                        <p className="font-medium text-primary">{leader.company}</p>
                        <p className="text-sm text-muted-foreground mt-2">{leader.bio}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>
      </TabsContent>
       <TabsContent value="achievements">
        <Card>
          <CardHeader className='flex-row items-center justify-between'>
             <div>
                <CardTitle>My Portfolio</CardTitle>
                <CardDescription>Showcase your certificates, projects, and more.</CardDescription>
             </div>
             <Button onClick={() => setIsAchievementFormOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Achievement
            </Button>
          </CardHeader>
          <CardContent>
             {isLoadingPortfolio && <p>Loading achievements...</p>}
             {!isLoadingPortfolio && portfolioItems && portfolioItems.length === 0 && (
                 <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <Trophy className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No Achievements Yet</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Click "Add Achievement" to start building your portfolio.
                    </p>
                </div>
             )}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {!isLoadingPortfolio && portfolioItems?.map((item) => (
                    <Card key={item.id}>
                        <CardContent className='p-4'>
                             <div className="flex justify-between items-start">
                                <div>
                                    <Badge variant="secondary" className='mb-2'>{item.type}</Badge>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                                </div>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className='-mr-2 -mt-2'>
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild><Link href={item.contentUrl} target='_blank'>View Content</Link></DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => handleDeleteAchievement(item.id)} className='text-red-600'>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                             </div>
                             <p className="text-xs text-muted-foreground mt-3">
                                Added {item.createdAt ? formatDistanceToNow(item.createdAt.toDate(), { addSuffix: true }) : 'just now'}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    {user && <AchievementForm isOpen={isAchievementFormOpen} setIsOpen={setIsAchievementFormOpen} userId={user.uid} />}
    </>
  );
}
