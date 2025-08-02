import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Download, 
  FileText, 
  Share2, 
  Mail, 
  MessageSquare,
  Copy,
  Calendar,
  User,
  Phone
} from 'lucide-react';
import { toast } from 'sonner';

interface ExportOptionsProps {
  analysisData: any;
  reportTitle: string;
}

export const ExportOptions: React.FC<ExportOptionsProps> = ({
  analysisData,
  reportTitle
}) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const generateCSV = () => {
    if (!analysisData?.healthIndicators) {
      toast.error('No health indicators available for export');
      return;
    }

    const headers = ['Parameter', 'Value', 'Normal Range', 'Status', 'Category'];
    const rows = analysisData.healthIndicators.map((indicator: any) => [
      indicator.parameter,
      indicator.value,
      indicator.normalRange,
      indicator.status,
      indicator.category || 'General'
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${reportTitle}-lab-results.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('CSV file downloaded successfully');
  };

  const generatePDF = async () => {
    try {
      // Create a comprehensive PDF report
      const reportContent = `
        DocLumen AI Lab Report Analysis
        Report: ${reportTitle}
        Generated: ${new Date().toLocaleDateString()}
        
        SUMMARY:
        ${analysisData.summary}
        
        KEY FINDINGS:
        ${analysisData.keyFindings?.join('\n') || 'No key findings available'}
        
        DETAILED RESULTS:
        ${analysisData.healthIndicators?.map((indicator: any) => 
          `${indicator.parameter}: ${indicator.value} (Normal: ${indicator.normalRange}) - ${indicator.status}`
        ).join('\n') || 'No detailed results available'}
        
        RECOMMENDATIONS:
        Lifestyle: ${analysisData.recommendations?.lifestyle?.join(', ') || 'None'}
        Dietary: ${analysisData.recommendations?.dietary?.join(', ') || 'None'}
        Exercise: ${analysisData.recommendations?.exercise?.join(', ') || 'None'}
        
        RISK ASSESSMENT:
        Overall Risk: ${analysisData.riskAssessment?.overallRisk || 'Not assessed'}
        Concerns: ${analysisData.riskAssessment?.specificConcerns?.join(', ') || 'None'}
        
        DISCLAIMER:
        This AI analysis is for informational purposes only. Always consult healthcare professionals for medical advice.
      `;

      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportTitle}-comprehensive-report.txt`;
      link.click();
      window.URL.revokeObjectURL(url);
      
      toast.success('Report downloaded successfully');
    } catch (error) {
      toast.error('Failed to generate PDF report');
    }
  };

  const generateShareableLink = () => {
    // Generate a shareable link (in a real app, this would create a secure sharing link)
    const shareData = {
      reportTitle,
      summary: analysisData.summary,
      keyFindings: analysisData.keyFindings?.slice(0, 3),
      riskLevel: analysisData.riskAssessment?.overallRisk,
      timestamp: new Date().toISOString()
    };

    const encodedData = btoa(JSON.stringify(shareData));
    const shareUrl = `${window.location.origin}/shared-report/${encodedData}`;
    
    navigator.clipboard.writeText(shareUrl);
    toast.success('Shareable link copied to clipboard');
  };

  const shareViaEmail = () => {
    const subject = `Lab Report Analysis: ${reportTitle}`;
    const body = `
Hi,

I'm sharing my lab report analysis from DocLumen AI:

Summary: ${analysisData.summary}

Key Findings:
${analysisData.keyFindings?.slice(0, 3).join('\n') || 'See attached report'}

Overall Risk Level: ${analysisData.riskAssessment?.overallRisk || 'Not assessed'}

Please find the detailed analysis in the attached files.

Best regards
    `;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const shareWithDoctor = () => {
    setShowShareDialog(true);
  };

  const sendToDoctor = () => {
    // In a real app, this would send via SMS/Email/WhatsApp
    const message = `
Doctor ${doctorInfo.name},

I have new lab results analyzed by DocLumen AI:

Report: ${reportTitle}
Overall Status: ${analysisData.riskAssessment?.overallRisk || 'Normal'}
Key Points: ${analysisData.conversationalInsights?.areasToWatch?.join(', ') || 'All values normal'}

Additional Message: ${doctorInfo.message}

Link to detailed report: [Secure Link]
    `;

    // Simulate sending
    toast.success(`Report details prepared for Dr. ${doctorInfo.name}`);
    setShowShareDialog(false);
    setDoctorInfo({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export & Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={generateCSV} className="cursor-pointer">
            <FileText className="h-4 w-4 mr-2" />
            Download CSV Data
          </DropdownMenuItem>
          <DropdownMenuItem onClick={generatePDF} className="cursor-pointer">
            <FileText className="h-4 w-4 mr-2" />
            Download PDF Report
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={generateShareableLink} className="cursor-pointer">
            <Share2 className="h-4 w-4 mr-2" />
            Copy Shareable Link
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareViaEmail} className="cursor-pointer">
            <Mail className="h-4 w-4 mr-2" />
            Share via Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareWithDoctor} className="cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            Send to Doctor
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Share with Doctor Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Share with Your Doctor
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="doctor-name">Doctor's Name</Label>
              <Input
                id="doctor-name"
                value={doctorInfo.name}
                onChange={(e) => setDoctorInfo(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Dr. Smith"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor-email">Email Address</Label>
              <Input
                id="doctor-email"
                type="email"
                value={doctorInfo.email}
                onChange={(e) => setDoctorInfo(prev => ({ ...prev, email: e.target.value }))}
                placeholder="doctor@clinic.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor-phone">Phone Number (Optional)</Label>
              <Input
                id="doctor-phone"
                value={doctorInfo.phone}
                onChange={(e) => setDoctorInfo(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                value={doctorInfo.message}
                onChange={(e) => setDoctorInfo(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Any specific questions or concerns you'd like to mention..."
                className="min-h-[80px]"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={sendToDoctor} className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Report
              </Button>
              <Button variant="outline" onClick={() => setShowShareDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};