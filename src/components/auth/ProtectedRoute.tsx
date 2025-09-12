
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AuthForm } from './AuthForm';
import { Loader2 } from 'lucide-react';
import ProtectedPageLayout from '@/components/layout/ProtectedPageLayout';
import FloatingActionButton from '@/components/mobile/FloatingActionButton';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
        <div className="flex flex-col items-center gap-4 animate-fade-in">
          <Loader2 className="h-8 w-8 animate-spin text-medical-primary" />
          <p className="text-sm text-muted-foreground">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return (
    <ProtectedPageLayout>
      {children}
      <FloatingActionButton />
    </ProtectedPageLayout>
  );
};
