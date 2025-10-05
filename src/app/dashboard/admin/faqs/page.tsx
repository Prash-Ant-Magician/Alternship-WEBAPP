'use client';

import * as React from 'react';
import {
  File,
  MoreHorizontal,
  PlusCircle,
} from 'lucide-react';

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
} from '@/firebase';
import { collection, doc } from 'firebase/firestore';
import { FaqForm } from './faq-form';
import type { FAQ } from '@/lib/definitions';

export default function FaqsPage() {
  const firestore = useFirestore();
  const faqsCollection = useMemoFirebase(
    () => (firestore ? collection(firestore, 'faqs') : null),
    [firestore]
  );
  const { data: faqs, isLoading } = useCollection<FAQ>(faqsCollection);
  
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedFaq, setSelectedFaq] = React.useState<FAQ | undefined>(undefined);

  const handleAddNew = () => {
    setSelectedFaq(undefined);
    setIsFormOpen(true);
  };
  
  const handleEdit = (faq: FAQ) => {
    setSelectedFaq(faq);
    setIsFormOpen(true);
  };

  const handleDelete = (faqId: string) => {
    if (!firestore) return;
    if (confirm('Are you sure you want to delete this FAQ?')) {
        const docRef = doc(firestore, 'faqs', faqId);
        deleteDocumentNonBlocking(docRef);
    }
  }


  return (
    <>
    <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">FAQs</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" className="h-8 gap-1" onClick={handleAddNew}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add FAQ
            </span>
          </Button>
        </div>
    </div>
    <Card>
        <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>
            Manage the FAQs displayed on the public-facing site.
        </CardDescription>
        </CardHeader>
        <CardContent>
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Question</TableHead>
                <TableHead className="hidden md:table-cell">Answer</TableHead>
                <TableHead>
                <span className="sr-only">Actions</span>
                </TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
             {isLoading && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center">Loading...</TableCell>
                </TableRow>
            )}
            {faqs?.map((faq) => (
                <TableRow key={faq.id}>
                <TableCell className="font-medium">{faq.question}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground truncate max-w-sm">{faq.answer}</TableCell>
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
                        <DropdownMenuItem onClick={() => handleEdit(faq)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(faq.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </CardContent>
    </Card>
    <FaqForm isOpen={isFormOpen} setIsOpen={setIsFormOpen} faq={selectedFaq} />
    </>
  );
}
