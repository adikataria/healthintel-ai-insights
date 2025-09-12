import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, X, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      toast({
        title: "App Installed! 🎉",
        description: "DocLumen has been added to your home screen.",
      });
    };

    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [toast]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        toast({
          title: "Installing App...",
          description: "DocLumen is being added to your home screen.",
        });
      }
      
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error('Error installing PWA:', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showPrompt || isInstalled) {
    return null;
  }

  return (
    <Card className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:bottom-4 md:w-80 z-50 p-4 bg-white shadow-2xl border-medical-primary/20 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-medical-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
          <Smartphone className="h-5 w-5 text-medical-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground text-sm">Install DocLumen App</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Get faster access with our mobile app. Install now for the best experience!
          </p>
          <div className="flex gap-2 mt-3">
            <Button 
              onClick={handleInstallClick}
              size="sm"
              className="bg-medical-primary hover:bg-medical-dark text-white text-xs px-3 py-1 h-auto"
            >
              <Download className="h-3 w-3 mr-1" />
              Install
            </Button>
            <Button 
              onClick={handleDismiss}
              variant="ghost" 
              size="sm"
              className="text-xs px-2 py-1 h-auto"
            >
              Later
            </Button>
          </div>
        </div>
        <Button
          onClick={handleDismiss}
          variant="ghost"
          size="sm"
          className="w-6 h-6 p-0 text-muted-foreground hover:text-foreground flex-shrink-0"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </Card>
  );
};

export default PWAInstallPrompt;