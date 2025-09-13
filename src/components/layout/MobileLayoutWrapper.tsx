import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileBottomNav from '@/components/navigation/MobileBottomNav';
import FloatingActionButton from '@/components/mobile/FloatingActionButton';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { cn } from '@/lib/utils';

interface MobileLayoutWrapperProps {
  children: React.ReactNode;
  showFloatingAction?: boolean;
  backgroundColor?: string;
  className?: string;
}

const MobileLayoutWrapper: React.FC<MobileLayoutWrapperProps> = ({ 
  children, 
  showFloatingAction = true,
  backgroundColor = 'bg-gradient-to-br from-background to-muted/10',
  className
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={cn(
      "min-h-screen w-full transition-all duration-300",
      backgroundColor,
      // Safe area support for iOS
      "safe-area-inset-top safe-area-inset-bottom",
      // Mobile-specific styles
      isMobile ? "pb-20" : "pb-0",
      className
    )}>
      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
      
      {/* Main Content */}
      <main className="relative z-0 w-full">
        {children}
      </main>
      
      {/* Mobile Navigation & Actions */}
      {isMobile && (
        <>
          <MobileBottomNav />
          {showFloatingAction && <FloatingActionButton />}
        </>
      )}
    </div>
  );
};

export default MobileLayoutWrapper;