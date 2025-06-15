
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Heart, 
  Activity, 
  Droplets, 
  Sun, 
  Pill, 
  Brain, 
  Shield,
  Target,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react";

interface HealthIndicator {
  parameter: string;
  value: string;
  normalRange: string;
  status: 'normal' | 'borderline' | 'abnormal' | 'critical';
  explanation: string;
  category?: string;
  recommendation?: string;
}

interface AnalysisData {
  summary: string;
  keyFindings: string[];
  healthIndicators: HealthIndicator[];
  riskAssessment: {
    overallRisk: string;
    specificConcerns: string[];
    urgentFlags: string[];
  };
  recommendations: {
    lifestyle: string[];
    dietary: string[];
    exercise: string[];
    monitoring: string[];
    consultation: string[];
  };
}

interface ComprehensiveReportAnalysisProps {
  analysisData: AnalysisData;
}

export const ComprehensiveReportAnalysis: React.FC<ComprehensiveReportAnalysisProps> = ({ analysisData }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'abnormal':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      case 'borderline':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'normal':
        return 'bg-green-50 text-green-800 border-green-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'abnormal':
        return <TrendingDown className="h-4 w-4 text-orange-600" />;
      case 'borderline':
        return <Info className="h-4 w-4 text-yellow-600" />;
      case 'normal':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    const lowerCategory = category?.toLowerCase() || '';
    
    if (lowerCategory.includes('hematology') || lowerCategory.includes('blood')) {
      return <Droplets className="h-4 w-4" />;
    }
    if (lowerCategory.includes('metabolic') || lowerCategory.includes('glucose')) {
      return <Activity className="h-4 w-4" />;
    }
    if (lowerCategory.includes('lipid') || lowerCategory.includes('cholesterol')) {
      return <Heart className="h-4 w-4" />;
    }
    if (lowerCategory.includes('vitamin')) {
      return <Sun className="h-4 w-4" />;
    }
    if (lowerCategory.includes('hormone') || lowerCategory.includes('thyroid')) {
      return <Brain className="h-4 w-4" />;
    }
    if (lowerCategory.includes('liver') || lowerCategory.includes('hepatic')) {
      return <Shield className="h-4 w-4" />;
    }
    if (lowerCategory.includes('kidney') || lowerCategory.includes('renal')) {
      return <Target className="h-4 w-4" />;
    }
    return <Pill className="h-4 w-4" />;
  };

  // Group indicators by status for overview
  const groupedByStatus = {
    critical: analysisData.healthIndicators.filter(indicator => indicator.status === 'critical'),
    abnormal: analysisData.healthIndicators.filter(indicator => indicator.status === 'abnormal'),
    borderline: analysisData.healthIndicators.filter(indicator => indicator.status === 'borderline'),
    normal: analysisData.healthIndicators.filter(indicator => indicator.status === 'normal')
  };

  // Group indicators by category
  const groupedByCategory = analysisData.healthIndicators.reduce((acc, indicator) => {
    const category = indicator.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(indicator);
    return acc;
  }, {} as Record<string, HealthIndicator[]>);

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <Card className="border-l-4 border-medical-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-medical-primary" />
            Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{analysisData.summary}</p>
        </CardContent>
      </Card>

      {/* Key Findings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-medical-primary" />
            Key Findings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysisData.keyFindings.map((finding, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-medical-light/20 rounded-lg">
                <div className="w-6 h-6 bg-medical-primary rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm">{finding}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="all-tests" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-tests">All Tests</TabsTrigger>
          <TabsTrigger value="by-status">By Status</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
          <TabsTrigger value="recommendations">Actions</TabsTrigger>
        </TabsList>

        {/* All Tests View */}
        <TabsContent value="all-tests" className="space-y-4">
          <div className="space-y-4">
            {analysisData.healthIndicators.map((indicator, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(indicator.category || '')}
                        <div>
                          <h3 className="font-semibold text-lg">{indicator.parameter}</h3>
                          {indicator.category && (
                            <Badge variant="outline" className="text-xs">
                              {indicator.category}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(indicator.status)}
                        <Badge className={getStatusColor(indicator.status)}>
                          {indicator.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-accent">{indicator.value}</p>
                        <p className="text-sm text-muted-foreground">
                          Normal: {indicator.normalRange}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {indicator.explanation}
                    </p>
                    
                    {indicator.recommendation && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Recommendation:</strong> {indicator.recommendation}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* By Status View */}
        <TabsContent value="by-status" className="space-y-6">
          {Object.entries(groupedByStatus).map(([status, indicators]) => (
            indicators.length > 0 && (
              <Card key={status} className={`border-l-4 ${
                status === 'critical' ? 'border-red-400 bg-red-50' :
                status === 'abnormal' ? 'border-orange-400 bg-orange-50' :
                status === 'borderline' ? 'border-yellow-400 bg-yellow-50' :
                'border-green-400 bg-green-50'
              }`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 capitalize">
                    {getStatusIcon(status)}
                    {status} ({indicators.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {indicators.map((indicator, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(indicator.category || '')}
                          <div>
                            <h4 className="font-medium">{indicator.parameter}</h4>
                            <p className="text-sm text-muted-foreground">{indicator.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{indicator.value}</p>
                          <p className="text-xs text-muted-foreground">{indicator.normalRange}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </TabsContent>

        {/* By Category View */}
        <TabsContent value="by-category" className="space-y-4">
          {Object.entries(groupedByCategory).map(([category, indicators]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getCategoryIcon(category)}
                  {category} ({indicators.length} tests)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {indicators.map((indicator, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(indicator.status)}
                        <div>
                          <h4 className="font-medium">{indicator.parameter}</h4>
                          <Badge className={getStatusColor(indicator.status)} size="sm">
                            {indicator.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{indicator.value}</p>
                        <p className="text-xs text-muted-foreground">{indicator.normalRange}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Recommendations View */}
        <TabsContent value="recommendations" className="space-y-4">
          {Object.entries(analysisData.recommendations).map(([category, recommendations]) => (
            recommendations.length > 0 && (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize flex items-center gap-2">
                    <Target className="h-4 w-4 text-medical-primary" />
                    {category} Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-medical-light/10 rounded-lg">
                        <div className="w-6 h-6 bg-medical-primary/20 rounded-full flex items-center justify-center text-medical-primary text-sm font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          ))}
        </TabsContent>
      </Tabs>

      {/* Risk Assessment */}
      {analysisData.riskAssessment && (
        <Card className="border-l-4 border-orange-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Overall Risk Level:</span>
                <Badge className={
                  analysisData.riskAssessment.overallRisk === 'high' ? 'bg-red-100 text-red-800' :
                  analysisData.riskAssessment.overallRisk === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }>
                  {analysisData.riskAssessment.overallRisk.toUpperCase()}
                </Badge>
              </div>

              {analysisData.riskAssessment.urgentFlags?.length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Urgent Attention Required:</h4>
                  <ul className="space-y-1">
                    {analysisData.riskAssessment.urgentFlags.map((flag, index) => (
                      <li key={index} className="text-sm text-red-700">• {flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisData.riskAssessment.specificConcerns?.length > 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Areas of Concern:</h4>
                  <ul className="space-y-1">
                    {analysisData.riskAssessment.specificConcerns.map((concern, index) => (
                      <li key={index} className="text-sm text-yellow-700">• {concern}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
