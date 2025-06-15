
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, AlertCircle, CheckCircle, Eye } from 'lucide-react';

export const RecentReportsWidget: React.FC = () => {
  const reports = [
    { id: 1, name: 'Blood Work Panel', date: '2024-06-10', status: 'analyzed', alerts: 2, type: 'lab' },
    { id: 2, name: 'Cholesterol Test', date: '2024-06-08', status: 'reviewed', alerts: 1, type: 'lab' },
    { id: 3, name: 'Vitamin D Level', date: '2024-06-05', status: 'normal', alerts: 0, type: 'lab' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'analyzed': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-3">
      {reports.map((report) => (
        <div key={report.id} className="p-3 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow group">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-sm text-gray-800">{report.name}</span>
            </div>
            <Badge className={`text-xs ${getStatusColor(report.status)}`}>
              {report.status}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(report.date).toLocaleDateString()}</span>
              </div>
              {report.alerts > 0 && (
                <div className="flex items-center gap-1 text-orange-600">
                  <AlertCircle className="h-3 w-3" />
                  <span>{report.alerts} alerts</span>
                </div>
              )}
              {report.alerts === 0 && (
                <div className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  <span>All normal</span>
                </div>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 h-6"
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
