import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/lib/utils';

interface TouchOptimizedChartProps {
  data: any[];
  dataKey: string;
  color?: string;
  className?: string;
  onPointTap?: (data: any) => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-primary">
          {`Value: ${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export const TouchOptimizedChart: React.FC<TouchOptimizedChartProps> = ({
  data,
  dataKey,
  color = "#00796B",
  className,
  onPointTap
}) => {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  const handleChartClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0]) {
      const pointData = data.activePayload[0].payload;
      setActivePoint(data.activeLabel);
      onPointTap?.(pointData);
      
      // Haptic feedback simulation
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }
  };

  return (
    <div className={cn("touch-pan-x", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          onClick={handleChartClick}
        >
          <XAxis 
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            stroke="#64748b"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            stroke="#64748b"
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{ stroke: color, strokeWidth: 2, strokeDasharray: '5 5' }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={3}
            dot={{ 
              fill: color, 
              strokeWidth: 3, 
              r: 6,
              stroke: '#fff'
            }}
            activeDot={{ 
              r: 8, 
              fill: color, 
              stroke: '#fff', 
              strokeWidth: 3,
              style: { cursor: 'pointer' }
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};