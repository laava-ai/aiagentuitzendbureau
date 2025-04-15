import { Metadata } from 'next';
import { headers } from 'next/headers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Visitor Dashboard | Laava',
  description: 'Track and monitor website visitors from companies',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-white dark:bg-gray-950">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-lg">Laava</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link 
                href="/dashboard" 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Visitors
              </Link>
              <Link 
                href="/dashboard?tab=stats" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Statistics
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Back to Website
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} Laava. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link 
              href="/privacy-policy"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy
            </Link>
            <Link 
              href="/terms-of-service"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 