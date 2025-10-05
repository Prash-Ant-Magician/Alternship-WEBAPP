'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { UserProfile } from '@/lib/definitions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';


export default function UsersPage() {
    const firestore = useFirestore();

    // Correctly query all users for the admin dashboard.
    // The parent layout now protects this route from non-admin access.
    const usersCollection = useMemoFirebase(
        () => (firestore ? query(collection(firestore, 'users')) : null),
        [firestore]
    );
    const { data: users, isLoading } = useCollection<UserProfile>(usersCollection);

    return (
        <>
            <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
            <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage all registered users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                             {isLoading && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">Loading...</TableCell>
                                </TableRow>
                            )}
                            {!isLoading && users && users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">No users found.</TableCell>
                                </TableRow>
                            )}
                            {users?.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.photoURL} alt={user.displayName} />
                                                <AvatarFallback>{user.displayName?.charAt(0) ?? user.email?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="font-medium">{user.displayName || 'N/A'}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}
