
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Share2, FileText, Brain, Activity } from "lucide-react";
import { ComprehensiveReportAnalysis } from './ComprehensiveReportAnalysis';

interface ReportAnalysisProps {
  reportData: {
    id: string;
    file_name: string;
    created_at: string;
    ai_insights: any;
    analysis_status: string;
  };
}

export const ReportAnalysis: React.FC<ReportAnalysisProps> = ({ reportData }) => {
  console.log('ReportAnalysis received data:', reportData);
  console.log('AI insights:', reportData.ai_insights);

  if (!reportData.ai_insights) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-medical-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-medical-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Analysis in Progress</h3>
          <p className="text-muted-foreground">
            Your lab report is being analyzed. This may take a few moments...
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleDownloadReport = () => {
    console.log('Download report:', reportData.id);
  };

  const handleShareReport = () => {
    console.log('Share report:', reportData.id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Report Header */}
      <Card className="border-l-4 border-medical-primary">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-medical-primary" />
                <CardTitle className="text-xl">
                  {reportData.file_name}
                </CardTitle>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Analyzed on {new Date(reportData.created_at).toLocaleDateString()}</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Activity className="h-3 w-3 mr-1" />
                  Analysis Complete
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShareReport}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Comprehensive Analysis Display */}
      <ComprehensiveReportAnalysis analysisData={reportData.ai_insights} />

      {/* Analysis Metadata */}
      {reportData.ai_insights.processingInfo && (
        <Card className="bg-gray-50">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">Analysis Details</CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="font-medium">Model:</span>
                <span className="ml-2">{reportData.ai_insights.processingInfo.geminiModel || 'AI Analysis'}</span>
              </div>
              <div>
                <span className="font-medium">Parameters:</span>
                <span className="ml-2">{reportData.ai_insights.healthIndicators?.length || 0}</span>
              </div>
              <div>
                <span className="font-medium">Processing:</span>
                <span className="ml-2">{reportData.ai_insights.processingInfo.processingVersion || 'Latest'}</span>
              </div>
              <div>
                <span className="font-medium">Quality:</span>
                <span className="ml-2 text-green-600">Complete Analysis</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
