import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: 'Laava | AI Agency Solutions',
  description: 'Revolutionize your business with AI-powered solutions tailored for your industry. Laava helps companies automate tasks and enhance productivity.',
  keywords: 'AI agency, artificial intelligence, automation, productivity, business solutions',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
