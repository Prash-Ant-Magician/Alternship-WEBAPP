'use client';

import * as React from 'react';
import {
  MoreHorizontal,
  File,
  Trophy,
  User as UserIcon,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useCollection,
  useFirestore,
  useMemoFirebase,
  deleteDocumentNonBlocking,
  useUser,
} from '@/firebase';
import { collection, doc, query, orderBy } from 'firebase/firestore';
import type { PortfolioItem } from '@/lib/definitions';
import { format } from 'date-fns';

export default function PortfolioPage() {
  const firestore = useFirestore();
  const { user } = useUser();

  // FIX: This query is now scoped to the logged-in user's portfolio ONLY.
  // This prevents the cross-user security rule violation that was causing the crash.
  const portfolioCollectionRef = useMemoFirebase(
    () => (user ? query(collection(firestore, 'users', user.uid, 'portfolio'), orderBy('createdAt', 'desc')) : null),
    [firestore, user]
  );
  const { data: portfolioItems, isLoading } = useCollection<PortfolioItem>(portfolioCollectionRef);


  const handleDelete = (item: PortfolioItem) => {
    if (!firestore || !user) return;
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      const docRef = doc(firestore, 'users', user.uid, 'portfolio', item.id);
      deleteDocumentNonBlocking(docRef);
      // The UI will update automatically due to the real-time listener
    }
  };

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">User Portfolio</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Items</CardTitle>
          <CardDescription>
            Browse achievements uploaded by users. Currently showing items for the logged-in user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                 <TableHead className="hidden md:table-cell">Created</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                 <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    Loading...
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && portfolioItems && portfolioItems.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No portfolio items found.
                  </TableCell>
                </TableRow>
              )}
              {portfolioItems?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                   <TableCell>
                    <div className="font-medium">{user?.displayName}</div>
                    <div className="text-sm text-muted-foreground">
                      {user?.email}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{item.type}</Badge>
                  </TableCell>
                   <TableCell className="hidden md:table-cell">
                    {item.createdAt?.toDate && format(item.createdAt.toDate(), 'PPP')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                           <Link href={item.contentUrl} target="_blank">View Content</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(item)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
