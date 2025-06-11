
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, FileText, Share } from 'lucide-react';
import { useMedicalReports } from '@/hooks/useMedicalReports';
import { useCreateReportExport } from '@/hooks/useReportExports';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  open,
  onOpenChange,
  onClose
}) => {
  const { reports } = useMedicalReports();
  const { createExport } = useCreateReportExport();
  const [exportType, setExportType] = useState('pdf');
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });

  const handleReportToggle = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, reportId]);
    } else {
      setSelectedReports(selectedReports.filter(id => id !== reportId));
    }
  };

  const handleExport = async () => {
    try {
      await createExport.mutateAsync({
        export_type: exportType,
        report_ids: selectedReports,
        date_range_start: dateRange.start || undefined,
        date_range_end: dateRange.end || undefined,
        file_name: `health_report_${new Date().toISOString().split('T')[0]}`
      });
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Health Reports
          </DialogTitle>
          <DialogDescription>
            Create a comprehensive report of your health data to download or share.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Type */}
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Select value={exportType} onValueChange={setExportType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    PDF Report
                  </div>
                </SelectItem>
                <SelectItem value="csv">CSV Data</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label>Date Range (Optional)</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="start-date" className="text-sm">From</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="end-date" className="text-sm">To</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Report Selection */}
          <div className="space-y-2">
            <Label>Select Reports to Include</Label>
            <div className="max-h-48 overflow-y-auto space-y-2 border rounded p-3">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div key={report.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={report.id}
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={(checked) => 
                        handleReportToggle(report.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={report.id} className="text-sm font-normal">
                      {report.title || report.file_name}
                      <span className="text-gray-500 ml-2">
                        {new Date(report.created_at).toLocaleDateString()}
                      </span>
                    </Label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No reports available</p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              disabled={selectedReports.length === 0 || createExport.isPending}
              className="bg-medical-primary hover:bg-medical-dark text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              {createExport.isPending ? 'Creating...' : 'Create Export'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
