'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface AnalyticsProps {
  websiteId: string;
}

export function DashboardAnalytics({ websiteId }: AnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const { ip } = await response.json();

        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ip,
            websiteId,
            page: pathname,
            userAgent: navigator.userAgent,
            referrer: document.referrer,
            websiteDomain: window.location.hostname
          }),
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, [pathname, websiteId]);

  return null;
}