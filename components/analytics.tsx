'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

// Define types for browser APIs that might not be in TypeScript's default types
interface ExtendedNavigator extends Navigator {
  userLanguage?: string;
  deviceMemory?: number;
  connection?: {
    effectiveType?: string;
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };
  getBattery?: () => Promise<{
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
  }>;
}

type GeolocationResult = 
  | { latitude: number; longitude: number; accuracy: number; timestamp: number }
  | { error: string };

type BatteryInfo = 
  | { level: number; charging: boolean; chargingTime: number; dischargingTime: number }
  | { error: string };

type ConnectionInfo = 
  | { effectiveType: string; downlink: number; rtt: number; saveData: boolean }
  | 'unknown';

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loggedPageview = useRef(false);
  
  // Track only pageviews for better performance
  useEffect(() => {
    // Only log once per page visit
    if (!loggedPageview.current) {
      // Send pageview to Google Analytics
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_path: pathname,
          page_title: document.title,
          page_location: window.location.href
        });
      }
      
      loggedPageview.current = true;
    }
  }, [pathname, searchParams]);
  
  return (
    <>
      {/* Google Analytics */}
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=G-VYV53RZ0B0`} 
        strategy="afterInteractive" 
      />
    </>
  );
}

// Helper functions for browser and OS detection
function detectBrowser(userAgent: string) {
  // Chrome
  if (/Chrome/.test(userAgent) && !/Chromium|Edge|Edg|OPR|Opera/.test(userAgent)) {
    return { name: 'Chrome', version: userAgent.match(/Chrome\/(\d+\.\d+)/)![1] };
  }
  // Firefox
  if (/Firefox/.test(userAgent)) {
    return { name: 'Firefox', version: userAgent.match(/Firefox\/(\d+\.\d+)/)![1] };
  }
  // Safari
  if (/Safari/.test(userAgent) && !/Chrome|Chromium|Edge|Edg|OPR|Opera/.test(userAgent)) {
    return { name: 'Safari', version: userAgent.match(/Version\/(\d+\.\d+)/)![1] };
  }
  // Default
  return { name: 'Unknown', version: 'Unknown' };
}

function detectOS(userAgent: string) {
  // Windows
  if (/Windows/.test(userAgent)) {
    return { name: 'Windows', version: userAgent.match(/Windows NT (\d+\.\d+)/)![1] };
  }
  // MacOS
  if (/Macintosh|Mac OS X/.test(userAgent)) {
    return { name: 'MacOS', version: userAgent.match(/Mac OS X (\d+[._]\d+[._]?\d*)/)![1].replace(/_/g, '.') };
  }
  // Default
  return { name: 'Unknown', version: 'Unknown' };
}

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: any) => void;
    dataLayer: any[];
  }
} 