'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
};

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true,
  });

  useEffect(() => {
    // Check if user has already made cookie choices
    const consentGiven = localStorage.getItem('cookie-consent');
    if (!consentGiven) {
      setShowBanner(true);
    } else {
      // Parse stored preferences
      try {
        const savedPreferences = JSON.parse(consentGiven);
        setPreferences(savedPreferences);
        
        // Initialize Google Analytics only if analytics consent is given
        if (savedPreferences.analytics && typeof window !== 'undefined' && window.gtag) {
          window.gtag('consent', 'update', {
            'analytics_storage': 'granted'
          });
        }
      } catch (e) {
        console.error('Error parsing saved cookie preferences', e);
        setShowBanner(true);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    setPreferences(allAccepted);
    savePreferences(allAccepted);
    setShowBanner(false);
    setOpen(false);
    
    // Enable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'functionality_storage': 'granted',
        'personalization_storage': 'granted'
      });
    }
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    setShowBanner(false);
    setOpen(false);
    
    // Update Google Analytics consent state
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': prefs.analytics ? 'granted' : 'denied',
        'ad_storage': prefs.marketing ? 'granted' : 'denied',
        'functionality_storage': prefs.preferences ? 'granted' : 'denied',
        'personalization_storage': prefs.preferences ? 'granted' : 'denied'
      });
    }
  };

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    setPreferences(necessaryOnly);
    savePreferences(necessaryOnly);
    
    // Disable Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'functionality_storage': 'denied',
        'personalization_storage': 'denied'
      });
    }
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Necessary cookies can't be disabled
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t border-gray-200 p-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1">Deze website gebruikt cookies</h3>
            <p className="text-gray-600 text-sm">
              Wij gebruiken cookies om uw ervaring te verbeteren, statistieken bij te houden en gepersonaliseerde content te bieden. 
              Bekijk ons <Link href="/cookie-policy" className="text-indigo-600 underline">cookiebeleid</Link> voor meer informatie.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setOpen(true)}
              className="whitespace-nowrap"
            >
              <Settings className="h-4 w-4 mr-2" />
              Aanpassen
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={acceptNecessaryOnly}
              className="whitespace-nowrap"
            >
              Alleen noodzakelijk
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={acceptAll}
              className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Alles accepteren
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cookie instellingen</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="necessary" className="font-medium">Noodzakelijke cookies</Label>
                  <p className="text-sm text-gray-500">Deze cookies zijn nodig om de website goed te laten werken. Deze kunnen niet worden uitgeschakeld.</p>
                </div>
                <Switch id="necessary" checked={true} disabled />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analytics" className="font-medium">Analytische cookies</Label>
                  <p className="text-sm text-gray-500">Helpen ons te begrijpen hoe bezoekers onze website gebruiken.</p>
                </div>
                <Switch 
                  id="analytics" 
                  checked={preferences.analytics} 
                  onCheckedChange={() => handlePreferenceChange('analytics')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing" className="font-medium">Marketing cookies</Label>
                  <p className="text-sm text-gray-500">Worden gebruikt voor gepersonaliseerde advertenties.</p>
                </div>
                <Switch 
                  id="marketing" 
                  checked={preferences.marketing} 
                  onCheckedChange={() => handlePreferenceChange('marketing')} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="preferences" className="font-medium">Voorkeurscookies</Label>
                  <p className="text-sm text-gray-500">Onthouden uw voorkeuren en instellingen op onze website.</p>
                </div>
                <Switch 
                  id="preferences" 
                  checked={preferences.preferences} 
                  onCheckedChange={() => handlePreferenceChange('preferences')} 
                />
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={acceptNecessaryOnly}>
              Alleen noodzakelijk
            </Button>
            <Button 
              variant="outline" 
              onClick={() => savePreferences(preferences)}
            >
              Voorkeuren opslaan
            </Button>
            <Button onClick={acceptAll} className="bg-indigo-600 hover:bg-indigo-700">
              Alles accepteren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 