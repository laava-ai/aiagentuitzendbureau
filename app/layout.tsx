import './globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@/components/analytics';
import { CookieConsent } from '@/components/cookie-consent';
import Script from 'next/script';
import { Suspense } from 'react';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: 'Laava | AI Agency Solutions',
  description: 'Revolutioneer uw bedrijf met AI-oplossingen op maat voor uw branche. Laava helpt bedrijven taken te automatiseren en productiviteit te verhogen.',
  keywords: 'AI agency, kunstmatige intelligentie, automatisering, productiviteit, bedrijfsoplossingen',
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
    <html lang="nl" suppressHydrationWarning>
      <head>
        <Script id="gtag-init" strategy="beforeInteractive">
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
          {children}
          <Toaster />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
