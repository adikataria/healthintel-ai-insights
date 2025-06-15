
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GripVertical, X, Maximize2, Minimize2 } from 'lucide-react';

interface DashboardWidgetProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  onRemove?: (id: string) => void;
  onResize?: (id: string) => void;
  size?: 'small' | 'medium' | 'large';
  isDraggable?: boolean;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  id,
  title,
  description,
  children,
  onRemove,
  onResize,
  size = 'medium',
  isDraggable = true,
  badge,
  badgeVariant = 'default'
}) => {
  const sizeClasses = {
    small: 'col-span-1 row-span-1',
    medium: 'col-span-1 lg:col-span-1 row-span-1',
    large: 'col-span-1 lg:col-span-2 row-span-2'
  };

  return (
    <Card className={`${sizeClasses[size]} group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 bg-gradient-to-br from-white to-blue-50/30 h-fit`}>
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
            {isDraggable && (
              <GripVertical className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
            )}
            <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
              <CardTitle className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{title}</CardTitle>
              {badge && <Badge variant={badgeVariant} className="text-xs px-1 sm:px-2 py-0 sm:py-1">{badge}</Badge>}
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onResize && (
              <Button variant="ghost" size="sm" onClick={() => onResize(id)} className="h-5 w-5 sm:h-6 sm:w-6 p-0 hidden lg:flex">
                {size === 'large' ? <Minimize2 className="h-2 w-2 sm:h-3 sm:w-3" /> : <Maximize2 className="h-2 w-2 sm:h-3 sm:w-3" />}
              </Button>
            )}
            {onRemove && (
              <Button variant="ghost" size="sm" onClick={() => onRemove(id)} className="h-5 w-5 sm:h-6 sm:w-6 p-0 text-red-500 hover:text-red-700">
                <X className="h-2 w-2 sm:h-3 sm:w-3" />
              </Button>
            )}
          </div>
        </div>
        {description && <CardDescription className="text-xs text-gray-600 mt-1">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-0 p-3 sm:p-6">
        {children}
      </CardContent>
    </Card>
  );
};
