import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Target, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataPoint {
  month: string;
  value: number;
  date?: string;
  target?: number;
}

interface InteractiveTrendChartProps {
  title: string;
  data: DataPoint[];
  color: string;
  icon: React.ComponentType<any>;
  current: number;
  target: number;
  progress: number;
  trend: 'improving' | 'needs_attention' | 'stable';
  unit?: string;
  showTarget?: boolean;
  className?: string;
}

const InteractiveTrendChart: React.FC<InteractiveTrendChartProps> = ({
  title,
  data,
  color,
  icon: Icon,
  current,
  target,
  progress,
  trend,
  unit = '',
  showTarget = true,
  className
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [isPinching, setIsPinching] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    } else if (e.touches.length === 2) {
      setIsPinching(true);
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isPinching && e.touches.length === 2) {
      // Handle pinch-to-zoom
      e.preventDefault();
    }
  }, [isPinching]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (isPinching) {
      setIsPinching(false);
      setIsZoomed(!isZoomed);
    } else if (touchStart && e.changedTouches.length === 1) {
      const touchEnd = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };

      const deltaX = Math.abs(touchEnd.x - touchStart.x);
      const deltaY = Math.abs(touchEnd.y - touchStart.y);

      // If it's a tap (minimal movement)
      if (deltaX < 10 && deltaY < 10) {
        // Find closest data point
        const rect = chartRef.current?.getBoundingClientRect();
        if (rect) {
          const relativeX = (touchEnd.x - rect.left) / rect.width;
          const pointIndex = Math.round(relativeX * (data.length - 1));
          setSelectedPoint(data[pointIndex] || null);
        }
      }
    }
    setTouchStart(null);
  }, [touchStart, isZoomed, data, isPinching]);

  const getTrendIcon = () => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'needs_attention':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Target className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'improving':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'needs_attention':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const extendedData = showTarget ? data.map(point => ({ ...point, target })) : data;

  return (
    <Card className={cn("mobile-trend-card", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${color}20`, color: color }}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                {getTrendIcon()}
                <span className="text-sm text-muted-foreground capitalize">{trend.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2"
            >
              {isZoomed ? (
                <ZoomOut className="h-4 w-4" />
              ) : (
                <ZoomIn className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedPoint(null)}
              className="p-2"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Current Value & Progress */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Current</p>
            <p className="text-2xl font-bold" style={{ color: color }}>
              {current}{unit}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Target</p>
            <p className="text-lg font-semibold text-foreground">
              {target}{unit}
            </p>
          </div>
        </div>

        {/* Progress Badge */}
        <Badge className={cn("w-full justify-center py-2", getTrendColor())}>
          {Math.round(progress)}% to target
        </Badge>

        {/* Selected Point Info */}
        {selectedPoint && (
          <div className="p-3 bg-muted/50 rounded-lg mobile-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{selectedPoint.month}</span>
              <span className="text-lg font-bold" style={{ color: color }}>
                {selectedPoint.value}{unit}
              </span>
            </div>
            {selectedPoint.date && (
              <p className="text-xs text-muted-foreground mt-1">{selectedPoint.date}</p>
            )}
          </div>
        )}

        {/* Interactive Chart */}
        <div 
          ref={chartRef}
          className={cn(
            "h-48 w-full transition-all duration-300 mobile-touch-target",
            isZoomed && "h-64"
          )}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <ChartContainer
            config={{
              value: {
                label: title,
                color: color,
              },
              target: {
                label: "Target",
                color: "#94A3B8",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={extendedData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <defs>
                  <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={3}
                  fill={`url(#gradient-${title})`}
                  dot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: color, strokeWidth: 3, stroke: '#fff' }}
                />
                {showTarget && (
                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="#94A3B8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Chart Instructions */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Tap chart to see values • Pinch to zoom • Drag to pan
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractiveTrendChart;