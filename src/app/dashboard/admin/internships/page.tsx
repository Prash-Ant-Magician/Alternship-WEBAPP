'use client';

import * as React from 'react';
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  useCollection,
  useFirestore,
  useMemoFirebase,
  deleteDocumentNonBlocking,
} from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { InternshipForm } from './internship-form';
import type { Internship } from '@/lib/definitions';

export default function InternshipsPage() {
  const firestore = useFirestore();
  const internshipsCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'internships') : null),
    [firestore]
  );
  const { data: internships, isLoading } = useCollection<Internship>(internshipsCollection);
  
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedInternship, setSelectedInternship] = React.useState<Internship | undefined>(undefined);

  const handleAddNew = () => {
    setSelectedInternship(undefined);
    setIsFormOpen(true);
  };
  
  const handleEdit = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsFormOpen(true);
  };

  const handleDelete = (internshipId: string) => {
    if (!firestore) return;
    if (confirm('Are you sure you want to delete this internship?')) {
        const docRef = doc(firestore, 'internships', internshipId);
        deleteDocumentNonBlocking(docRef);
    }
  }


  return (
    <>
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Active
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Archived
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Internship
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Internships</CardTitle>
            <CardDescription>
              Manage your internship listings and view their performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Sector</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Location
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Capacity
                  </TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">Loading...</TableCell>
                    </TableRow>
                )}
                {internships?.map((internship) => (
                  <TableRow key={internship.id}>
                    <TableCell className="font-medium">
                      {internship.title}
                    </TableCell>
                    <TableCell>
                      {internship.company}
                    </TableCell>
                     <TableCell>
                      <Badge variant="outline">{internship.sector}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {internship.location}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {internship.capacity}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEdit(internship)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(internship.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div className="text-xs text-muted-foreground">
              Showing <strong>1-{internships?.length ?? 0}</strong> of <strong>{internships?.length ?? 0}</strong>{' '}
              internships
            </div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    <InternshipForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} internship={selectedInternship} />
    </>
  );
}
