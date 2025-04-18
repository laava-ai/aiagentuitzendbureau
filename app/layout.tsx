import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@/components/analytics';
import { CookieConsent } from '@/components/cookie-consent';
import { MobileOptimizerProvider } from '@/components/ui/mobile-optimizer';
import { VisitorTracker } from '@/components/visitor-tracker';
import Script from 'next/script';
import { Suspense } from 'react';
import { DashboardAnalytics } from '@/components/dashbaord_analytics';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: 'AI Agent Uitzendbureau | Laava | AI Agents & Digitale Collega\'s',
  description: 'Verbeter uw organisatie met intelligente AI-agents en digitale collega\'s op maat. Laava helpt u AI-agents te huren en in te zetten die naadloos integreren met uw team, complexe taken automatiseren en productiviteit verhogen.',
  keywords: 'AI agent, digitale collega, computer collega, kunstmatige intelligentie, AI-agent, AI oplossingen, automatisering, productiviteit, bedrijfsautomatisering, intelligente assistenten, AI assistenten, digitale werknemers, AI agent huren, AI agent in mijn bedrijf, AI agent inzetten, AI uitzendbureau, virtuele medewerker',
  authors: [{ name: 'Laava', url: 'https://laava.nl' }],
  creator: 'Laava',
  publisher: 'Laava',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: 'https://laava.nl',
    title: 'Laava | AI Agents & Digitale Collega\'s',
    description: 'Verbeter uw organisatie met intelligente AI-agents en digitale collega\'s. Ontdek hoe u AI-agents kunt huren en inzetten voor uw bedrijf om efficiënter te werken en kosten te besparen.',
    siteName: 'Laava',
    images: [
      {
        url: '/images/logo.png    ',
        width: 1200,
        height: 630,
        alt: 'Laava AI Agents',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Laava | AI Agents & Digitale Collega\'s',
    description: 'Verbeter uw organisatie met intelligente AI-agents en digitale collega\'s op maat. Ontdek hoe het huren van AI-agents uw team kan versterken en processen kan optimaliseren.',
    images: ['/images/twitter-image.jpg'],
    creator: '@LaavaAI',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://laava.nl',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <Script src="https://dashboard.laava.nl/laava.js" data-website-id="67bc60e5-c6cc-48fb-8de9-fceeafc2a826"></Script>
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Default to denied consent
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied'
            });
            
            gtag('config', 'G-VYV53RZ0B0', {
              page_path: window.location.pathname,
            });
            
            // Set first visit timestamp if not already set
            if (!localStorage.getItem('first_visit')) {
              localStorage.setItem('first_visit', new Date().toISOString());
            }
            
            // Track user session information
            const sessionId = Math.random().toString(36).substring(2, 15);
            const sessionStart = new Date().toISOString();
            localStorage.setItem('session_id', sessionId);
            localStorage.setItem('session_start', sessionStart);
            
            // Capture referrer information
            const referrer = document.referrer;
            if (referrer) {
              localStorage.setItem('referrer', referrer);
              gtag('event', 'referrer_capture', {
                'referrer_url': referrer
              });
            }
            
            // Capture screen dimensions
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const colorDepth = window.screen.colorDepth;
            gtag('event', 'device_metrics', {
              'screen_width': screenWidth,
              'screen_height': screenHeight,
              'color_depth': colorDepth,
              'pixel_ratio': window.devicePixelRatio || 1
            });
            
            // Check existing consent
            const consentGiven = localStorage.getItem('cookie-consent');
            if (consentGiven) {
              try {
                const savedPreferences = JSON.parse(consentGiven);
                gtag('consent', 'update', {
                  'analytics_storage': savedPreferences.analytics ? 'granted' : 'denied',
                  'ad_storage': savedPreferences.marketing ? 'granted' : 'denied',
                  'functionality_storage': savedPreferences.preferences ? 'granted' : 'denied',
                  'personalization_storage': savedPreferences.preferences ? 'granted' : 'denied'
                });
              } catch (e) {
                console.error('Error parsing saved cookie preferences', e);
              }
            }
          `}
        </Script>
      </head>
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider>
          <MobileOptimizerProvider>
            {children}
            <Toaster />
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
            <Suspense fallback={null}>
              <VisitorTracker />
            </Suspense>
            <CookieConsent />
          </MobileOptimizerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
