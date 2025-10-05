'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Star,
  ArrowRight,
  Target,
  Rocket,
  Lock,
  BarChart,
  Award,
  Sparkles,
  Eye,
  FileText,
  Code,
  Paintbrush,
  Briefcase,
  Clock,
  Video,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { handleRecommendationRequest } from '@/app/actions';
import type { InternshipRecommendation } from '@/lib/definitions';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const steps = [
  {
    id: 'skills',
    label: 'What are your top skills?',
    placeholder: 'e.g., JavaScript, Python, Product Management',
  },
  {
    id: 'college',
    label: 'What college are you attending?',
    placeholder: 'e.g., University of California, Berkeley',
  },
  {
    id: 'collegeTier',
    label: 'What tier is your college?',
    placeholder: 'e.g., Tier 1, Tier 2, Tier 3',
  },
  {
    id: 'location',
    label: 'What is your preferred internship location?',
    placeholder: 'e.g., San Francisco, CA',
  },
  {
    id: 'internshipType',
    label: 'What type of internship are you looking for?',
    placeholder: 'e.g., Software Engineering, Marketing, Finance',
  },
];

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description?: string }) => (
    <div className="flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
            {icon}
        </div>
        <p className="font-semibold text-sm">{title}</p>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
);


export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 for initial screen, steps.length for test, steps.length + 1 for results
  const [answers, setAnswers] = useState({
    skills: '',
    college: '',
    collegeTier: '',
    location: '',
    internshipType: '',
  });
  const [recommendations, setRecommendations] = useState<InternshipRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testAnswer, setTestAnswer] = useState('');

  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (currentStep === steps.length) {
        const getCameraPermission = async () => {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('Camera not supported.');
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera Not Supported',
              description: 'Your browser does not support camera access.',
            });
            return;
          }

          try {
            const stream = await navigator.mediaDevices.getUserMedia({video: true});
            setHasCameraPermission(true);

            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          } catch (error) {
            console.error('Error accessing camera:', error);
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to take the test.',
            });
          }
        };

        getCameraPermission();

        // Cleanup function to stop camera stream
        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }
  }, [currentStep, toast]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length) {
      // Logic for after test submission
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Stop camera before doing anything else
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    const result = await handleRecommendationRequest({
      education: answers.college,
      skills: answers.skills,
      sectorInterests: answers.internshipType,
      location: answers.location,
      affirmativeAction: false,
    });

    setIsLoading(false);
    if ('error' in result) {
      setError(result.error);
    } else {
      setRecommendations(result.recommendations);
      setCurrentStep(steps.length + 1); // Move to recommendations view
    }
  };
  
  const progressValue = currentStep >= 0 && currentStep <= steps.length ? ((currentStep + 1) / (steps.length + 1)) * 100 : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Finding your recommendations...</p>
      </div>
    );
  }
  
  if (currentStep === steps.length + 1) {
    return (
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <div className="text-center mb-10">
            <h1 className="text-3xl font-bold font-headline mb-2">Internship Recommendations</h1>
            <p className="text-muted-foreground">Based on your assessment, here are your top 10 internship matches.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recommendations.map((rec, index) => (
            <Card key={index} className="transition-all hover:shadow-xl hover:-translate-y-1">
                <CardContent className="p-6">
                    <div className='flex items-start gap-6'>
                        <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                           <Image 
                             src={`https://logo.clearbit.com/${rec.company.toLowerCase().replace(/ /g, '')}.com`}
                             width={40}
                             height={40}
                             alt={`${rec.company} logo`}
                             className="w-10 h-10 object-contain"
                             onError={(e) => (e.currentTarget.src = `https://ui-avatars.com/api/?name=${rec.company.charAt(0)}&background=random`)}
                           />
                        </div>
                        <div className='flex-grow'>
                            <p className="text-sm text-muted-foreground">{rec.company}</p>
                            <h3 className="text-lg font-semibold font-headline mb-2">{rec.title}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-3">
                                <span className='flex items-center gap-1.5'><MapPin className='w-4 h-4' /> {rec.location}</span>
                                <span className='flex items-center gap-1.5'>&#8377;{rec.stipend || '25,000'}/month</span>
                            </div>
                             <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary">Full-time</Badge>
                                <Badge variant="secondary">Tech</Badge>
                            </div>
                        </div>
                    </div>
                    <div className='mt-6 pt-6 border-t flex justify-between items-center'>
                         <div className="flex items-center gap-1 text-sm text-amber-500">
                            <Star className='w-4 h-4 fill-amber-500'/>
                            <span className='font-semibold'>4.6</span>
                            <span className='text-muted-foreground text-xs'>(1.2k)</span>
                         </div>
                         <Button asChild>
                            <a href={rec.url} target="_blank" rel="noopener noreferrer">Apply Now <ArrowRight className="ml-2 h-4 w-4"/></a>
                         </Button>
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 md:py-20 relative overflow-hidden min-h-[calc(100vh-56px)]">
       {/* Decorative Background Elements */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-teal-100 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto max-w-5xl px-4 z-10 relative">
        {currentStep === -1 ? (
          <div className='space-y-10'>
             <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJtIDUwIDAgYyAyNy42IDAgNTAgMjIuNCA1MCA1MCBzIC0yMi40IDUwIC01MCA1MCBTIDAgNzcuNiAwIDUwIDMwIDAgNTMgMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTNSLDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50 bg-repeat bg-center"></div>
                <div className='relative'>
                    <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">
                        Prove Your Potential. Skip the Resume Guesswork.
                    </h1>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                        Our SkillBridge AI Assessment provides an objective, bias-free score that fast-tracks you to interviews at top internship providers.
                    </p>
                    <Button size="lg" className="bg-teal-500 hover:bg-teal-600 text-white" onClick={() => setCurrentStep(0)}>
                        Take the Free Assessment
                    </Button>
                    <p className="text-sm text-white/60 mt-4 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4"/> ~5 Minutes to Complete, Data Private, Results Validated
                    </p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                <Card className='hover:shadow-lg transition-shadow'>
                    <CardHeader>
                        <CardTitle className='text-center'>How It Works</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <FeatureCard icon={<Target className="h-6 w-6" />} title="Simulated Challenges" />
                        <FeatureCard icon={<BarChart className="h-6 w-6" />} title="AI Powered Objective Grading" />
                        <FeatureCard icon={<FileText className="h-6 w-6" />} title="Personalized Skill Map" />
                    </CardContent>
                </Card>
                <Card className='hover:shadow-lg transition-shadow'>
                    <CardHeader>
                        <CardTitle className='text-center'>How It Results</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4">
                        <FeatureCard icon={<Sparkles className="h-6 w-6" />} title="Instant Profile Badge" />
                        <FeatureCard icon={<Award className="h-6 w-6" />} title="Certified Badge" />
                        <FeatureCard icon={<Rocket className="h-6 w-6" />} title="Targeted Skill Improvement" />
                    </CardContent>
                </Card>
             </div>

             <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                    <CardTitle className='text-center'>Technical Integrity & Trust</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-8 items-center">
                   <div className='flex items-center gap-4 p-4 rounded-lg bg-muted'>
                       <Eye className="h-8 w-8 text-primary"/>
                       <div>
                           <p className='font-semibold'>Secure & Fair Testing</p>
                           <p className='text-sm text-muted-foreground'>Advanced Anti-Cheating</p>
                       </div>
                   </div>
                   <div className='flex items-center gap-4 p-4 rounded-lg bg-muted'>
                       <Lock className="h-8 w-8 text-primary"/>
                       <div>
                           <p className='font-semibold'>Data Privacy</p>
                       </div>
                   </div>
                    <div className='flex items-center gap-4 p-4 rounded-lg bg-muted'>
                       <div className='flex items-center gap-2'>
                         <Code className="h-5 w-5 text-primary"/>
                         <Paintbrush className="h-5 w-5 text-primary"/>
                         <Briefcase className="h-5 w-5 text-primary"/>
                       </div>
                       <div>
                           <p className='font-semibold'>Supported Skills</p>
                           <p className='text-sm text-muted-foreground'>Software, Design, Marketing...</p>
                       </div>
                   </div>
                </CardContent>
             </Card>

             <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold font-headline">Ready to Turn Your Skills into Your Next Internship?</h2>
                <div className='flex justify-center gap-4'>
                    <Button variant="outline">View Sample Skill Report</Button>
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white" onClick={() => setCurrentStep(0)}>Start the SkillBridge Assessment</Button>
                </div>
             </div>

          </div>
        ) : currentStep < steps.length ? (
        <div className="max-w-2xl mx-auto">
             <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline">Your Assessment</h1>
                <p className="text-muted-foreground">Complete the following steps to get your recommendations.</p>
              </div>
          <Card className="w-full shadow-2xl">
             <CardHeader>
                <Progress value={progressValue} className="mb-4" />
                <CardTitle className="text-2xl font-headline pt-2">
                  {steps[currentStep].label}
                </CardTitle>
                <CardDescription>
                  Step {currentStep + 1} of {steps.length + 1}
                </CardDescription>
              </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Label htmlFor={steps[currentStep].id} className="sr-only">
                  {steps[currentStep].label}
                </Label>
                <Input
                  id={steps[currentStep].id}
                  name={steps[currentStep].id}
                  placeholder={steps[currentStep].placeholder}
                  value={answers[steps[currentStep].id as keyof typeof answers]}
                  onChange={handleInputChange}
                  autoComplete='off'
                  className='text-base py-6'
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext}>
                {currentStep === steps.length - 1 ? 'Start Test' : 'Next'}{' '}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          </div>
        ) : (
          // Test Step
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline">Skill Assessment Test</h1>
                <p className="text-muted-foreground">Complete the test below. Your camera will be monitored during the session.</p>
            </div>
            <Card className="w-full shadow-2xl">
                <CardHeader>
                    <Progress value={progressValue} className="mb-4" />
                     <CardTitle className="text-2xl font-headline pt-2 flex items-center gap-3">
                      <Video className="w-6 h-6 text-primary"/>
                      Proctored Test Environment
                    </CardTitle>
                    <CardDescription>
                      Step {currentStep + 1} of {steps.length + 1}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <Label className="font-semibold">Question</Label>
                            <Card className="mt-2">
                                <CardContent className="p-4">
                                    <p className="font-mono text-sm">
                                        Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
                                        <br/><br/>
                                        You may assume that each input would have exactly one solution, and you may not use the same element twice.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Label className="font-semibold">Your Answer</Label>
                            <Textarea
                                placeholder="Write your code or explanation here..."
                                className="mt-2 min-h-[250px] font-mono"
                                value={testAnswer}
                                onChange={(e) => setTestAnswer(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label className="font-semibold">Camera Feed</Label>
                        <div className="aspect-video bg-slate-900 rounded-md flex items-center justify-center text-muted-foreground overflow-hidden">
                            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                        </div>
                        { !hasCameraPermission && (
                             <Alert variant="destructive">
                                <AlertTitle>Camera Access Required</AlertTitle>
                                <AlertDescription>
                                    Please allow camera access to continue.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button onClick={handleNext} disabled={!hasCameraPermission || !testAnswer.trim()}>
                        Submit & Get Recommendations
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
