import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface MobileBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  height?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const MobileBottomSheet: React.FC<MobileBottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children,
  height = 'md',
  className
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timeout = setTimeout(() => setIsAnimating(false), 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const heightClasses = {
    sm: 'h-1/3',
    md: 'h-1/2', 
    lg: 'h-2/3',
    xl: 'h-5/6'
  };

  if (!isAnimating && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-background rounded-t-[20px] shadow-2xl transition-transform duration-300 ease-out",
          heightClasses[height],
          isOpen ? "translate-y-0" : "translate-y-full",
          className
        )}
      >
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="w-12 h-1.5 bg-muted-foreground/40 rounded-full" />
        </div>
        
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 pb-4 border-b">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};