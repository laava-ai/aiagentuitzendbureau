/**
 * Visitor Tracking System
 * 
 * This module handles tracking website visitors by:
 * 1. Getting the visitor's IP address via ipify.org
 * 2. Sending IP and current page to the tracking API
 */

import axios from 'axios';

interface TrackingOptions {
  ipifyUrl?: string;
  trackingEndpoint?: string;
  useCookies?: boolean;
  cookieName?: string;
  cookieMaxAge?: number;
}

// Helper function to get visitor's IP address
const getIpAddress = async (ipifyUrl: string = 'https://api.ipify.org?format=json'): Promise<string> => {
  try {
    const response = await axios.get(ipifyUrl);
    return response.data.ip;
  } catch (error) {
    console.error('Error getting IP address:', error);
    return '';
  }
};

// Check if tracking is allowed based on cookie consent
const trackingAllowed = (): boolean => {
  // Always check for cookie consent if available
  if (typeof window !== 'undefined') {
    try {
      const cookieConsent = localStorage.getItem('cookie-consent');
      if (cookieConsent) {
        const consent = JSON.parse(cookieConsent);
        // Only track if analytics consent is given
        return consent.analytics === true;
      }
    } catch (error) {
      console.error('Error parsing cookie consent:', error);
    }
  }
  
  // Default to false if consent can't be determined
  return false;
};

// Create a visited page cookie to prevent duplicate tracking
const setVisitedCookie = (page: string, options: TrackingOptions): void => {
  if (!options.useCookies || typeof document === 'undefined') return;
  
  const cookieName = options.cookieName || 'visited_pages';
  const maxAge = options.cookieMaxAge || 30 * 60; // 30 minutes default
  
  try {
    // Get existing cookie
    let visited = sessionStorage.getItem(cookieName) || '';
    const visitedPages = visited ? JSON.parse(visited) : [];
    
    // Add current page if not already tracked
    if (!visitedPages.includes(page)) {
      visitedPages.push(page);
      sessionStorage.setItem(cookieName, JSON.stringify(visitedPages));
    }
  } catch (error) {
    console.error('Error setting visited cookie:', error);
  }
};

// Check if a page has already been tracked
const hasPageBeenTracked = (page: string, options: TrackingOptions): boolean => {
  if (!options.useCookies || typeof document === 'undefined') return false;
  
  const cookieName = options.cookieName || 'visited_pages';
  
  try {
    const visited = sessionStorage.getItem(cookieName);
    if (!visited) return false;
    
    const visitedPages = JSON.parse(visited);
    return visitedPages.includes(page);
  } catch (error) {
    console.error('Error checking visited cookie:', error);
    return false;
  }
};

// Main tracking function
export const trackVisitor = async (page: string, options: TrackingOptions = {}): Promise<void> => {
  // Don't track if consent not given
  if (!trackingAllowed()) {
    console.log('Visitor tracking disabled due to cookie preferences');
    return;
  }
  
  // Configure options
  const trackingEndpoint = options.trackingEndpoint || '/api/track';
  const ipifyUrl = options.ipifyUrl || 'https://api.ipify.org?format=json';
  const useCookies = options.useCookies !== undefined ? options.useCookies : true;
  
  // Check if this page was already tracked in this session
  if (useCookies && hasPageBeenTracked(page, options)) {
    return; // Skip tracking for already tracked pages
  }
  
  try {
    // Get visitor IP
    const ip = await getIpAddress(ipifyUrl);
    if (!ip) return;
    
    // Get additional info
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;
    const referrer = typeof document !== 'undefined' ? document.referrer : undefined;
    
    // Send tracking data
    await axios.post(trackingEndpoint, {
      ip,
      page,
      userAgent,
      referrer
    });
    
    // Mark this page as tracked
    if (useCookies) {
      setVisitedCookie(page, options);
    }
  } catch (error) {
    console.error('Error tracking visitor:', error);
  }
};

export default trackVisitor; 