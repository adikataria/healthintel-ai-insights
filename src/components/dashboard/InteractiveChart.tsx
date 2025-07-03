
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calendar, TrendingUp, Filter } from 'lucide-react';
import { useMedicalReports } from '@/hooks/useMedicalReports';

export const InteractiveChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('cholesterol');
  const { reports } = useMedicalReports();

  // Generate data from actual reports
  const getDataFromReports = () => {
    if (!reports.length) {
      return {
        cholesterol: [
          { date: '2024-05-01', value: 220, normal: 200 },
          { date: '2024-05-08', value: 215, normal: 200 },
          { date: '2024-05-15', value: 210, normal: 200 },
          { date: '2024-05-22', value: 205, normal: 200 },
          { date: '2024-05-29', value: 198, normal: 200 },
          { date: '2024-06-05', value: 195, normal: 200 },
        ],
        glucose: [
          { date: '2024-05-01', value: 110, normal: 100 },
          { date: '2024-05-08', value: 105, normal: 100 },
          { date: '2024-05-15', value: 108, normal: 100 },
          { date: '2024-05-22', value: 102, normal: 100 },
          { date: '2024-05-29', value: 98, normal: 100 },
          { date: '2024-06-05', value: 95, normal: 100 },
        ]
      };
    }

    const cholesterolData: any[] = [];
    const glucoseData: any[] = [];

    reports.slice(0, 6).reverse().forEach((report) => {
      if (report.ai_insights?.healthIndicators) {
        const date = new Date(report.created_at).toISOString().split('T')[0];
        
        report.ai_insights.healthIndicators.forEach((indicator: any) => {
          const param = indicator.parameter.toLowerCase();
          const value = parseFloat(indicator.value.match(/\d+\.?\d*/)?.[0] || '0');
          
          if (param.includes('cholesterol') && value > 0) {
            cholesterolData.push({ date, value, normal: 200 });
          }
          
          if ((param.includes('glucose') || param.includes('sugar')) && value > 0) {
            glucoseData.push({ date, value, normal: 100 });
          }
        });
      }
    });

    return {
      cholesterol: cholesterolData.length > 0 ? cholesterolData : [
        { date: '2024-05-01', value: 220, normal: 200 },
        { date: '2024-05-08', value: 215, normal: 200 },
        { date: '2024-05-15', value: 210, normal: 200 },
        { date: '2024-05-22', value: 205, normal: 200 },
        { date: '2024-05-29', value: 198, normal: 200 },
        { date: '2024-06-05', value: 195, normal: 200 },
      ],
      glucose: glucoseData.length > 0 ? glucoseData : [
        { date: '2024-05-01', value: 110, normal: 100 },
        { date: '2024-05-08', value: 105, normal: 100 },
        { date: '2024-05-15', value: 108, normal: 100 },
        { date: '2024-05-22', value: 102, normal: 100 },
        { date: '2024-05-29', value: 98, normal: 100 },
        { date: '2024-06-05', value: 95, normal: 100 },
      ]
    };
  };

  const data = getDataFromReports();

  const metrics = [
    { key: 'cholesterol', label: 'Cholesterol', unit: 'mg/dL', color: '#3b82f6' },
    { key: 'glucose', label: 'Blood Glucose', unit: 'mg/dL', color: '#10b981' }
  ];

  const timeRanges = [
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' },
    { key: '1y', label: '1 Year' }
  ];

  const currentMetric = metrics.find(m => m.key === selectedMetric);
  const chartData = data[selectedMetric as keyof typeof data];
  const latestValue = chartData[chartData.length - 1].value;
  const previousValue = chartData[chartData.length - 2].value;
  const trend = latestValue > previousValue ? 'up' : 'down';
  const trendPercent = Math.abs(((latestValue - previousValue) / previousValue) * 100).toFixed(1);

  return (
    <Card className="col-span-2 row-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Health Trends</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <TrendingUp className={`h-3 w-3 mr-1 ${trend === 'up' ? 'text-red-500' : 'text-green-500'}`} />
              {trendPercent}%
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {metrics.map((metric) => (
            <Button
              key={metric.key}
              variant={selectedMetric === metric.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedMetric(metric.key)}
              className="text-xs"
            >
              {metric.label}
            </Button>
          ))}
        </div>

        <div className="flex gap-2 mt-2">
          {timeRanges.map((range) => (
            <Button
              key={range.key}
              variant={timeRange === range.key ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setTimeRange(range.key)}
              className="text-xs"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={currentMetric?.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={currentMetric?.color} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
                formatter={(value: any) => [`${value} ${currentMetric?.unit}`, currentMetric?.label]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={currentMetric?.color}
                fillOpacity={1}
                fill="url(#colorValue)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="normal"
                stroke="#94a3b8"
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Latest Reading:</span>
            <span className="font-semibold">{latestValue} {currentMetric?.unit}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Normal Range:</span>
            <span className="text-gray-500">≤ {chartData[0].normal} {currentMetric?.unit}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
