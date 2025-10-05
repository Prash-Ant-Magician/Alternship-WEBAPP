'use client';

import Link from 'next/link';
import { Briefcase, Languages, ChevronDown, User, LogOut, Search, LayoutDashboard, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useLocale } from '@/context/locale-context';
import { languages } from '@/lib/i18n';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser, useAuth, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import Image from 'next/image';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { doc } from 'firebase/firestore';

type UserProfile = {
  role: 'user' | 'admin' | 'company';
};


export function Header() {
  const { locale, setLocale, t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userProfile } = useDoc<UserProfile>(userDocRef);


  const handleLanguageChange = (langCode: string) => {
    setLocale(langCode);
  };

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
      router.push('/');
    }
  };
  
  const getDashboardUrl = () => {
    if (!userProfile) return '/';
    switch (userProfile.role) {
      case 'admin':
        return '/dashboard/admin';
      case 'company':
        return '/dashboard/company';
      default:
        return '/dashboard/user';
    }
  };

  const navLinks = [
    { href: '/', label: t.header.home },
    { href: '/search', label: 'Search'},
    { href: '/for-interns', label: t.header.interns },
    { href: '/for-companies', label: t.header.companies },
    { href: '/about', label: t.header.about },
    { href: '/faq', label: t.header.faq },
    { href: '/contact', label: t.header.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link
            href="/"
            className="mr-6 flex items-center gap-2 font-semibold"
          >
            <Image src="/logo.svg" alt="Alternship Logo" width={28} height={28} />
            <span className="text-lg font-headline text-primary">Alternship</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Button asChild variant="ghost" key={link.href}
                className={cn(
                  "transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-foreground/60 hover:text-foreground/80"
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
           <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className='sr-only'>Main Menu</SheetTitle>
                    <Link
                        href="/"
                        className="flex items-center gap-2 font-semibold mb-4"
                    >
                        <Image src="/logo.svg" alt="Alternship Logo" width={102} height={102} />
                        <span className="text-lg font-headline text-primary">Alternship</span>
                    </Link>
                </SheetHeader>
              <nav className="grid gap-4 text-base font-medium">
                 {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'text-muted-foreground transition-colors hover:text-foreground',
                         pathname === link.href && 'text-foreground'
                      )}
                    >
                      {link.label}
                    </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <Languages className="h-4 w-4" />
                <span className='hidden md:inline'>{languages.find(l => l.code === locale)?.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map(lang => (
                <DropdownMenuItem key={lang.code} onSelect={() => handleLanguageChange(lang.code)}>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center gap-2">
            {isUserLoading ? (
              <div className="h-8 w-24 bg-muted rounded-md animate-pulse" />
            ) : user ? (
             <>
                <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                        <AvatarFallback>
                            {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                        </Avatar>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Welcome, {user.displayName ?? user.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href={getDashboardUrl()}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                </Button>
                <Button className="bg-teal-600 hover:bg-teal-700 hidden sm:inline-flex" asChild>
                  <Link href="/signup">Sign Up</Link>
              </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
