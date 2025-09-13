import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SwipeAction {
  key: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
}

interface SwipeableCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  enablePullToRefresh?: boolean;
  onPullToRefresh?: () => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  title,
  className,
  leftActions = [],
  rightActions = [],
  onSwipeLeft,
  onSwipeRight,
  enablePullToRefresh = false,
  onPullToRefresh
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const startX = useRef<number>(0);
  const startY = useRef<number>(0);
  const currentX = useRef<number>(0);
  const currentY = useRef<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;
    currentX.current = touch.clientX;
    currentY.current = touch.clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - startX.current;
    const deltaY = touch.clientY - startY.current;

    // Determine if it's a horizontal or vertical swipe
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      setTranslateX(deltaX);
      e.preventDefault();
    } else if (enablePullToRefresh && deltaY > 0 && window.scrollY === 0) {
      // Vertical pull (pull-to-refresh)
      setTranslateY(Math.min(deltaY * 0.5, 100));
      setIsPulling(deltaY > 60);
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Handle horizontal swipe actions
    if (Math.abs(translateX) > 100) {
      if (translateX > 0 && rightActions.length > 0) {
        rightActions[0]?.action();
        onSwipeRight?.();
      } else if (translateX < 0 && leftActions.length > 0) {
        leftActions[0]?.action();
        onSwipeLeft?.();
      }
    }

    // Handle pull-to-refresh
    if (isPulling && translateY > 60) {
      onPullToRefresh?.();
    }

    // Reset positions
    setTranslateX(0);
    setTranslateY(0);
    setIsPulling(false);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Actions */}
      {(leftActions.length > 0 || rightActions.length > 0) && (
        <div className="absolute inset-0 flex">
          {/* Right actions (shown when swiping left) */}
          {rightActions.length > 0 && (
            <div className="flex items-center justify-start w-1/2 px-4">
              {rightActions.map((action, index) => (
                <div
                  key={action.key}
                  className={cn(
                    "flex items-center justify-center w-16 h-16 rounded-full transition-all duration-200",
                    action.color,
                    translateX < -50 ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {action.icon}
                </div>
              ))}
            </div>
          )}
          
          {/* Left actions (shown when swiping right) */}
          {leftActions.length > 0 && (
            <div className="flex items-center justify-end w-1/2 px-4 ml-auto">
              {leftActions.map((action, index) => (
                <div
                  key={action.key}
                  className={cn(
                    "flex items-center justify-center w-16 h-16 rounded-full transition-all duration-200",
                    action.color,
                    translateX > 50 ? "scale-100 opacity-100" : "scale-75 opacity-0"
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {action.icon}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pull to refresh indicator */}
      {enablePullToRefresh && (
        <div 
          className={cn(
            "absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-200",
            "flex items-center justify-center w-8 h-8 rounded-full bg-primary/10",
            translateY > 20 ? "opacity-100 scale-100" : "opacity-0 scale-75"
          )}
          style={{ top: `${Math.max(0, translateY - 40)}px` }}
        >
          <div className={cn(
            "w-4 h-4 border-2 border-primary border-t-transparent rounded-full",
            isPulling ? "animate-spin" : ""
          )} />
        </div>
      )}

      {/* Main Card */}
      <Card
        ref={cardRef}
        className={cn(
          "mobile-touch-target transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing",
          "backdrop-blur-sm bg-card/95 border border-border/20 shadow-lg hover:shadow-xl",
          className
        )}
        style={{
          transform: `translateX(${translateX}px) translateY(${translateY}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {title && (
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-foreground">
              {title}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className={title ? "pt-0" : ""}>
          {children}
        </CardContent>
      </Card>
    </div>
  );
};

export default SwipeableCard;