import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot } from '@/components/chatbot';
import { LocaleProvider } from '@/context/locale-context';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'Alternship',
  description: 'Find your next internship with AI-powered recommendations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <LocaleProvider>
            <div className="relative flex min-h-screen flex-col bg-background">
              <Header />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
            <Chatbot />
          </LocaleProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
