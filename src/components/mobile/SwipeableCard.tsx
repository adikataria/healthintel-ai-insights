import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: {
    icon: React.ReactNode;
    color: string;
    label: string;
  };
  rightAction?: {
    icon: React.ReactNode;
    color: string;
    label: string;
  };
  className?: string;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  className
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    currentX.current = e.touches[0].clientX;
    const diffX = currentX.current - startX.current;
    
    // Limit swipe distance
    const maxSwipe = 120;
    const clampedDiff = Math.max(-maxSwipe, Math.min(maxSwipe, diffX));
    setTranslateX(clampedDiff);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    const threshold = 60;
    
    if (translateX > threshold && onSwipeRight) {
      // Trigger right action
      onSwipeRight();
    } else if (translateX < -threshold && onSwipeLeft) {
      // Trigger left action  
      onSwipeLeft();
    }
    
    // Reset position
    setTranslateX(0);
  };

  const showLeftAction = translateX > 30;
  const showRightAction = translateX < -30;

  return (
    <div className="relative overflow-hidden rounded-lg bg-background">
      {/* Left Action Background */}
      {leftAction && showLeftAction && (
        <div 
          className={cn(
            "absolute inset-y-0 left-0 flex items-center justify-center px-6 transition-all duration-200",
            leftAction.color
          )}
          style={{ width: Math.max(0, translateX) }}
        >
          <div className="flex flex-col items-center gap-1 text-white">
            {leftAction.icon}
            <span className="text-xs font-medium">{leftAction.label}</span>
          </div>
        </div>
      )}

      {/* Right Action Background */}
      {rightAction && showRightAction && (
        <div 
          className={cn(
            "absolute inset-y-0 right-0 flex items-center justify-center px-6 transition-all duration-200",
            rightAction.color
          )}
          style={{ width: Math.max(0, -translateX) }}
        >
          <div className="flex flex-col items-center gap-1 text-white">
            {rightAction.icon}
            <span className="text-xs font-medium">{rightAction.label}</span>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div
        ref={cardRef}
        className={cn(
          "relative bg-background transition-transform duration-200 ease-out touch-pan-y",
          className
        )}
        style={{ 
          transform: `translateX(${translateX}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease-out'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};