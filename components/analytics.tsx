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
  const mouseMovements = useRef<{ x: number; y: number; timestamp: number }[]>([]);
  
  // Log detailed user information on first load
  useEffect(() => {
    if (loggedPageview.current) return;
    
    const collectUserData = async () => {
      try {
        const extendedNavigator = navigator as ExtendedNavigator;
        
        // Browser and OS detection
        const userAgent = navigator.userAgent;
        const browserInfo = detectBrowser(userAgent);
        const osInfo = detectOS(userAgent);
        
        // Language preferences
        const languages = navigator.languages ? 
          Array.from(navigator.languages) : 
          [navigator.language || extendedNavigator.userLanguage || 'unknown'];
        
        // Timezone and location info approximation
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const dateLocale = Intl.DateTimeFormat().resolvedOptions().locale;
        
        // Connection information
        let connectionInfo: ConnectionInfo = 'unknown';
        if (extendedNavigator.connection) {
          const conn = extendedNavigator.connection;
          connectionInfo = conn ? {
            effectiveType: conn.effectiveType || 'unknown',
            downlink: conn.downlink || 0,
            rtt: conn.rtt || 0,
            saveData: conn.saveData || false
          } : 'unknown';
        }
        
        // Geolocation - explicitly not requested for privacy
        let geolocation: GeolocationResult | 'unavailable' = 'unavailable';
        
        // Get battery status if available
        let batteryInfo: BatteryInfo | 'unavailable' = 'unavailable';
        if (extendedNavigator.getBattery) {
          try {
            const battery = await extendedNavigator.getBattery();
            batteryInfo = {
              level: battery.level,
              charging: battery.charging,
              chargingTime: battery.chargingTime,
              dischargingTime: battery.dischargingTime
            };
          } catch (error) {
            batteryInfo = { error: 'Battery API unavailable' };
          }
        }
        
        // Device memory if available
        const deviceMemory = extendedNavigator.deviceMemory || 'unknown';
        
        // Hardware concurrency (CPU cores)
        const hardwareConcurrency = navigator.hardwareConcurrency || 'unknown';
        
        // Collect all the data
        const userData = {
          timestamp: new Date().toISOString(),
          page: {
            url: window.location.href,
            path: pathname,
            query: Object.fromEntries(searchParams.entries()),
            referrer: document.referrer || 'direct',
            title: document.title
          },
          browser: browserInfo,
          os: osInfo,
          screen: {
            width: window.screen.width,
            height: window.screen.height,
            orientation: window.screen.orientation ? window.screen.orientation.type : 'unknown',
            colorDepth: window.screen.colorDepth,
            pixelRatio: window.devicePixelRatio
          },
          language: {
            preferred: languages[0],
            all: languages,
            locale: dateLocale
          },
          timezone,
          connection: connectionInfo,
          geolocation,
          device: {
            memory: deviceMemory,
            cores: hardwareConcurrency,
            battery: batteryInfo,
            touchpoints: navigator.maxTouchPoints || 0,
            mobile: /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent)
          },
          sessionData: {
            id: localStorage.getItem('session_id') || 'unknown',
            start: localStorage.getItem('session_start') || 'unknown',
            visitCount: (parseInt(localStorage.getItem('visit_count') || '0', 10) + 1),
            firstVisit: localStorage.getItem('first_visit') || 'unknown'
          }
        };
        
        // Update visit counter
        localStorage.setItem('visit_count', userData.sessionData.visitCount.toString());
        
        // Send to Google Analytics as a custom event
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'user_data_collection', {
            non_interaction: true,
            user_data: JSON.stringify(userData)
          });
        }
        
        // Also send to your backend for more detailed analysis
        try {
          await fetch('/api/analytics/log', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
        } catch (error) {
          console.error('Error sending analytics data to server:', error);
        }
        
        loggedPageview.current = true;
      } catch (error) {
        console.error('Error collecting user data:', error);
      }
    };
    
    collectUserData();
  }, [pathname, searchParams]);
  
  // Track page views
  useEffect(() => {
    const url = `${pathname}${searchParams ? `?${searchParams}` : ''}`;
    
    // Send pageview to Google Analytics
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }, [pathname, searchParams]);
  
  // Track user engagement metrics
  useEffect(() => {
    let scrollDepth = 0;
    let lastScrollDepth = 0;
    let scrollTimer: NodeJS.Timeout;
    
    const trackScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentPosition = window.scrollY;
      const currentScrollDepth = scrollHeight > 0 ? Math.floor((currentPosition / scrollHeight) * 100) : 0;
      
      // Only log if scroll depth increases by 10%
      if (currentScrollDepth >= scrollDepth + 10) {
        scrollDepth = currentScrollDepth;
        
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'scroll_depth', {
            depth: scrollDepth,
            page_path: pathname
          });
        }
      }
      
      // Clear and reset the timer
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        if (currentScrollDepth > lastScrollDepth) {
          lastScrollDepth = currentScrollDepth;
          
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'max_scroll_depth', {
              depth: lastScrollDepth,
              page_path: pathname
            });
          }
        }
      }, 500);
    };
    
    const trackMouseMovement = (e: MouseEvent) => {
      mouseMovements.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });
      
      // Only keep last 100 movements to avoid memory issues
      if (mouseMovements.current.length > 100) {
        mouseMovements.current.shift();
      }
    };
    
    // Track time spent on page
    const startTime = Date.now();
    let timeOnPageInterval = setInterval(() => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      
      // Log every 30 seconds
      if (timeSpent % 30 === 0) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'time_on_page', {
            time_seconds: timeSpent,
            page_path: pathname
          });
        }
      }
    }, 1000);
    
    // Track clicks
    const trackClicks = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      const clickData = {
        target_tag: target.tagName.toLowerCase(),
        target_id: target.id || 'none',
        target_class: target.className || 'none',
        target_text: target.textContent?.substring(0, 100) || 'none',
        x_position: e.clientX,
        y_position: e.clientY,
        page_path: pathname
      };
      
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'user_click', clickData);
      }
    };
    
    // Track copy events
    const trackCopy = () => {
      const selectedText = window.getSelection()?.toString() || '';
      
      if (selectedText.length > 0) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'content_copy', {
            text_length: selectedText.length,
            text_sample: selectedText.substring(0, 100),
            page_path: pathname
          });
        }
      }
    };
    
    // Capture form interactions
    const trackFormInteractions = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        const formElement = target.closest('form');
        const formId = formElement?.id || 'unknown_form';
        const inputType = (target as HTMLInputElement).type || 'unknown';
        const inputName = (target as HTMLInputElement).name || 'unnamed';
        
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'form_interaction', {
            form_id: formId,
            input_type: inputType,
            input_name: inputName,
            action: e.type, // focus, blur, change, etc.
            page_path: pathname
          });
        }
      }
    };
    
    // Add event listeners
    window.addEventListener('scroll', trackScroll);
    window.addEventListener('mousemove', trackMouseMovement);
    window.addEventListener('click', trackClicks);
    document.addEventListener('copy', trackCopy);
    document.addEventListener('focus', trackFormInteractions, true);
    document.addEventListener('blur', trackFormInteractions, true);
    document.addEventListener('change', trackFormInteractions, true);
    
    // Track page exit and send final user behavior summary
    const trackPageExit = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      const maxScrollDepth = lastScrollDepth;
      const clickCount = document.querySelectorAll('[data-click-tracked="true"]').length;
      
      // Calculate mouse movement patterns
      let mouseMovementPatterns = 'minimal';
      if (mouseMovements.current.length > 50) {
        mouseMovementPatterns = 'extensive';
      } else if (mouseMovements.current.length > 20) {
        mouseMovementPatterns = 'moderate';
      }
      
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_exit', {
          time_on_page_seconds: timeSpent,
          max_scroll_depth: maxScrollDepth,
          click_count: clickCount,
          mouse_movement_pattern: mouseMovementPatterns,
          mouse_movement_data: JSON.stringify(mouseMovements.current.slice(-20)), // Last 20 movements
          page_path: pathname
        });
      }
    };
    
    window.addEventListener('beforeunload', trackPageExit);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('mousemove', trackMouseMovement);
      window.removeEventListener('click', trackClicks);
      document.removeEventListener('copy', trackCopy);
      document.removeEventListener('focus', trackFormInteractions, true);
      document.removeEventListener('blur', trackFormInteractions, true);
      document.removeEventListener('change', trackFormInteractions, true);
      window.removeEventListener('beforeunload', trackPageExit);
      clearInterval(timeOnPageInterval);
      clearTimeout(scrollTimer);
      
      // Send exit data on component unmount as well
      trackPageExit();
    };
  }, [pathname]);
  
  return (
    <>
      {/* Google Analytics */}
      <Script 
        src={`https://www.googletagmanager.com/gtag/js?id=G-VYV53RZ0B0`} 
        strategy="afterInteractive" 
      />
      
      {/* Fingerprinting script */}
      <Script
        id="fingerprint-js"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Basic fingerprinting techniques
              const fingerprint = {
                screen: {
                  width: window.screen.width,
                  height: window.screen.height,
                  availWidth: window.screen.availWidth,
                  availHeight: window.screen.availHeight,
                  colorDepth: window.screen.colorDepth,
                  pixelRatio: window.devicePixelRatio || 1
                },
                browser: {
                  userAgent: navigator.userAgent,
                  language: navigator.language,
                  languages: navigator.languages ? Array.from(navigator.languages) : [],
                  platform: navigator.platform,
                  doNotTrack: navigator.doNotTrack,
                  cookiesEnabled: navigator.cookieEnabled,
                  localStorage: typeof localStorage !== 'undefined',
                  sessionStorage: typeof sessionStorage !== 'undefined',
                  indexedDB: typeof indexedDB !== 'undefined',
                  addBehavior: document.body ? typeof document.body.addBehavior !== 'undefined' : false,
                  openDatabase: typeof window.openDatabase !== 'undefined',
                  cpuClass: navigator.cpuClass,
                  oscpu: navigator.oscpu,
                  hardwareConcurrency: navigator.hardwareConcurrency,
                  deviceMemory: navigator.deviceMemory,
                  plugins: Array.from(navigator.plugins || []).map(p => p.name)
                },
                canvas: getCanvasFingerprint(),
                webGL: getWebGLFingerprint(),
                fonts: detectFonts(),
                audio: getAudioFingerprint(),
                timezone: {
                  offset: new Date().getTimezoneOffset(),
                  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
                }
              };
              
              // Generate a unique hash from the fingerprint
              const fingerprintHash = hashCode(JSON.stringify(fingerprint));
              localStorage.setItem('device_fingerprint', fingerprintHash);
              
              // Send fingerprint data to Google Analytics
              if (typeof gtag === 'function') {
                gtag('event', 'fingerprint_capture', {
                  fingerprint_hash: fingerprintHash,
                  fingerprint_detail: JSON.stringify(fingerprint)
                });
              }
              
              // Helper functions
              function getCanvasFingerprint() {
                try {
                  const canvas = document.createElement('canvas');
                  const ctx = canvas.getContext('2d');
                  if (!ctx) return 'canvas-not-supported';
                  
                  canvas.width = 200;
                  canvas.height = 50;
                  
                  ctx.textBaseline = 'top';
                  ctx.font = '14px Arial';
                  ctx.fillStyle = '#f60';
                  ctx.fillRect(125, 1, 62, 20);
                  ctx.fillStyle = '#069';
                  ctx.fillText('Fingerprint', 2, 15);
                  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
                  ctx.fillText('Fingerprint', 4, 17);
                  
                  return canvas.toDataURL().substring(0, 100);
                } catch (e) {
                  return 'canvas-error';
                }
              }
              
              function getWebGLFingerprint() {
                try {
                  const canvas = document.createElement('canvas');
                  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                  if (!gl) return 'webgl-not-supported';
                  
                  const info = {
                    vendor: gl.getParameter(gl.VENDOR),
                    renderer: gl.getParameter(gl.RENDERER),
                    unmaskedVendor: getUnmaskedInfo(gl, 'VENDOR'),
                    unmaskedRenderer: getUnmaskedInfo(gl, 'RENDERER'),
                    extensions: gl.getSupportedExtensions()
                  };
                  
                  return hashCode(JSON.stringify(info));
                } catch (e) {
                  return 'webgl-error';
                }
                
                function getUnmaskedInfo(gl, name) {
                  const ext = gl.getExtension('WEBGL_debug_renderer_info');
                  if (!ext) return 'extension-not-supported';
                  return gl.getParameter(ext['UNMASKED_' + name + '_WEBGL']);
                }
              }
              
              function detectFonts() {
                const baseFonts = ['monospace', 'sans-serif', 'serif'];
                const fontList = [
                  'Arial', 'Courier New', 'Georgia', 'Tahoma', 
                  'Times New Roman', 'Verdana', 'Helvetica'
                ];
                const testString = 'mmmmmmmmmmlli';
                
                function getTextWidth(fontName, fontSize, fontStyle) {
                  const span = document.createElement('span');
                  span.style.position = 'absolute';
                  span.style.left = '-9999px';
                  span.style.fontSize = fontSize;
                  span.style.fontStyle = fontStyle;
                  span.style.fontWeight = 'normal';
                  span.style.letterSpacing = 'normal';
                  span.style.lineBreak = 'auto';
                  span.style.lineHeight = 'normal';
                  span.style.textTransform = 'none';
                  span.style.textAlign = 'left';
                  span.style.textDecoration = 'none';
                  span.style.textShadow = 'none';
                  span.style.whiteSpace = 'normal';
                  span.style.wordBreak = 'normal';
                  span.style.wordSpacing = 'normal';
                  span.style.fontFamily = fontName + ', ' + fontStyle;
                  span.textContent = testString;
                  document.body.appendChild(span);
                  const width = span.getBoundingClientRect().width;
                  document.body.removeChild(span);
                  return width;
                }
                
                const result = [];
                const baseWidths = {};
                
                for (let i = 0; i < baseFonts.length; i++) {
                  baseWidths[baseFonts[i]] = getTextWidth(baseFonts[i], '72px', baseFonts[i]);
                }
                
                for (let i = 0; i < fontList.length; i++) {
                  let detected = false;
                  for (let j = 0; j < baseFonts.length; j++) {
                    const width = getTextWidth(fontList[i] + ',' + baseFonts[j], '72px', baseFonts[j]);
                    if (width !== baseWidths[baseFonts[j]]) {
                      detected = true;
                      break;
                    }
                  }
                  if (detected) {
                    result.push(fontList[i]);
                  }
                }
                
                return result;
              }
              
              function getAudioFingerprint() {
                try {
                  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                  const oscillator = audioContext.createOscillator();
                  const analyser = audioContext.createAnalyser();
                  const gainNode = audioContext.createGain();
                  const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
                  
                  gainNode.gain.value = 0; // Mute output
                  oscillator.connect(analyser);
                  analyser.connect(scriptProcessor);
                  scriptProcessor.connect(gainNode);
                  gainNode.connect(audioContext.destination);
                  
                  oscillator.start(0);
                  
                  const audioData = new Float32Array(analyser.frequencyBinCount);
                  analyser.getFloatFrequencyData(audioData);
                  oscillator.stop();
                  audioContext.close();
                  
                  return hashCode(audioData.slice(0, 5).join('_'));
                } catch (e) {
                  return 'audio-error';
                }
              }
              
              function hashCode(str) {
                let hash = 0;
                if (str.length === 0) return hash;
                for (let i = 0; i < str.length; i++) {
                  const char = str.charCodeAt(i);
                  hash = ((hash << 5) - hash) + char;
                  hash = hash & hash; // Convert to 32bit integer
                }
                return hash.toString(36);
              }
            })();
          `
        }}
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
  // Edge
  if (/Edge|Edg/.test(userAgent)) {
    return { name: 'Edge', version: userAgent.match(/Edge\/(\d+\.\d+)|Edg\/(\d+\.\d+)/)![1] || userAgent.match(/Edge\/(\d+\.\d+)|Edg\/(\d+\.\d+)/)![2] };
  }
  // Opera
  if (/OPR|Opera/.test(userAgent)) {
    return { name: 'Opera', version: userAgent.match(/OPR\/(\d+\.\d+)|Opera\/(\d+\.\d+)/)![1] || userAgent.match(/OPR\/(\d+\.\d+)|Opera\/(\d+\.\d+)/)![2] };
  }
  // Internet Explorer
  if (/MSIE|Trident/.test(userAgent)) {
    return { name: 'Internet Explorer', version: userAgent.match(/MSIE (\d+\.\d+)/) ? userAgent.match(/MSIE (\d+\.\d+)/)![1] : userAgent.match(/rv:(\d+\.\d+)/)![1] };
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
  // iOS
  if (/iPhone|iPad|iPod/.test(userAgent)) {
    return { name: 'iOS', version: userAgent.match(/OS (\d+[._]\d+[._]?\d*)/)![1].replace(/_/g, '.') };
  }
  // Android
  if (/Android/.test(userAgent)) {
    return { name: 'Android', version: userAgent.match(/Android (\d+\.\d+)/)![1] };
  }
  // Linux
  if (/Linux/.test(userAgent)) {
    return { name: 'Linux', version: userAgent.match(/Linux.*?(\d+\.\d+\.\d+)/)?.length ? userAgent.match(/Linux.*?(\d+\.\d+\.\d+)/)![1] : 'Unknown' };
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