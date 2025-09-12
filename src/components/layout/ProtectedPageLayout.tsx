
import React from 'react';
import MobileBottomNav from '@/components/navigation/MobileBottomNav';

interface ProtectedPageLayoutProps {
  children: React.ReactNode;
}

const ProtectedPageLayout: React.FC<ProtectedPageLayoutProps> = ({ children }) => {
  return (
    <div className="pb-20 md:pb-0 min-h-screen bg-gradient-to-br from-background to-muted/10">
      {children}
      <MobileBottomNav />
    </div>
  );
};

export default ProtectedPageLayout;
