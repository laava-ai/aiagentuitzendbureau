'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisitor } from '@/lib/tracker';

interface VisitorTrackerProps {
  /**
   * Enable or disable tracking
   */
  enabled?: boolean;
  
  /**
   * Custom API endpoint for tracking
   */
  trackingEndpoint?: string;
  
  /**
   * Custom API endpoint for getting IP address
   */
  ipifyUrl?: string;
  
  /**
   * Whether to use cookies to prevent duplicate tracking within a session
   */
  useCookies?: boolean;
}

/**
 * VisitorTracker component that handles visitor tracking on route changes
 * Integrates with the cookie consent component to respect user preferences
 */
export function VisitorTracker({ 
  enabled = true,
  trackingEndpoint,
  ipifyUrl,
  useCookies = true
}: VisitorTrackerProps) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Don't track if disabled
    if (!enabled) return;

    // Track the visitor with the current pathname
    trackVisitor(pathname, {
      trackingEndpoint,
      ipifyUrl,
      useCookies
    });
  }, [pathname, enabled, trackingEndpoint, ipifyUrl, useCookies]);
  
  // This component doesn't render anything
  return null;
}

export default VisitorTracker; 