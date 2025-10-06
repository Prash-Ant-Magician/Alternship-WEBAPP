import type { InternshipRecommendation } from '@/lib/definitions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Building2, MapPin } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { useLocale } from '@/context/locale-context';

interface RecommendationListProps {
  recommendations: InternshipRecommendation[];
  isLoading: boolean;
}

function RecommendationCard({ recommendation }: { recommendation: InternshipRecommendation }) {
  const { t } = useLocale();
  return (
    <Card className="flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-in fade-in-50 zoom-in-95">
      <CardHeader>
        <CardTitle className="text-xl font-headline">{recommendation.title}</CardTitle>
        <div className="flex items-center gap-2 pt-1">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <CardDescription>{recommendation.company}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">{recommendation.description}</p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground"/>
            <Badge variant="secondary">{recommendation.location}</Badge>
        </div>
        <Button asChild className="w-full">
          <a href={recommendation.url} target="_blank" rel="noopener noreferrer">
            Apply Now <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="flex flex-col h-full">
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2 mt-2" />
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                    </CardContent>
                    <CardFooter className="flex-col items-start gap-4">
                       <Skeleton className="h-6 w-1/4" />
                       <Skeleton className="h-10 w-full" />
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export function RecommendationList({ recommendations, isLoading }: RecommendationListProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recommendations.map((rec, index) => (
        <RecommendationCard key={index} recommendation={rec} />
      ))}
    </div>
  );
}
