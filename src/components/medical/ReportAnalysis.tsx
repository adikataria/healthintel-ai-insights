
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Heart, 
  Activity,
  Lightbulb,
  Shield,
  Clock
} from 'lucide-react';

interface HealthIndicator {
  parameter: string;
  value: string;
  normalRange: string;
  status: 'normal' | 'borderline' | 'abnormal';
  explanation: string;
}

interface RiskAssessment {
  overallRisk: 'low' | 'moderate' | 'high';
  specificConcerns: string[];
  urgentFlags: string[];
}

interface Recommendations {
  lifestyle: string[];
  dietary: string[];
  exercise: string[];
  monitoring: string[];
  consultation: string[];
}

interface AnalysisData {
  summary: string;
  keyFindings: string[];
  healthIndicators: HealthIndicator[];
  riskAssessment: RiskAssessment;
  recommendations: Recommendations;
  disclaimer: string;
  analyzedAt?: string;
  rawResponse?: string;
}

interface ReportAnalysisProps {
  analysis: AnalysisData;
  reportTitle: string;
}

export const ReportAnalysis: React.FC<ReportAnalysisProps> = ({
  analysis,
  reportTitle
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'borderline':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'abnormal':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'borderline':
        return 'bg-yellow-100 text-yellow-800';
      case 'abnormal':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600';
      case 'moderate':
        return 'text-yellow-600';
      case 'high':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-medical-primary" />
            AI Analysis: {reportTitle}
          </CardTitle>
          {analysis.analyzedAt && (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Analyzed on {new Date(analysis.analyzedAt).toLocaleString()}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="bg-medical-light/20 p-4 rounded-lg border border-medical-primary/20">
            <p className="text-accent font-medium">{analysis.summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="indicators" className="text-xs sm:text-sm">Indicators</TabsTrigger>
          <TabsTrigger value="risks" className="text-xs sm:text-sm">Risk Analysis</TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs sm:text-sm">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-medical-primary" />
                Key Findings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.keyFindings?.map((finding, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-medical-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm">{finding}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="indicators" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-medical-primary" />
                Health Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.healthIndicators?.map((indicator, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{indicator.parameter}</h4>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(indicator.status)}
                        <Badge className={getStatusColor(indicator.status)}>
                          {indicator.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Your Value: </span>
                        <span className="text-medical-primary">{indicator.value}</span>
                      </div>
                      <div>
                        <span className="font-medium">Normal Range: </span>
                        <span>{indicator.normalRange}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
                      {indicator.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-medical-primary" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="h-6 w-6 text-medical-primary" />
                <div>
                  <p className="font-medium">Overall Risk Level</p>
                  <p className={`text-lg font-bold ${getRiskColor(analysis.riskAssessment?.overallRisk)}`}>
                    {analysis.riskAssessment?.overallRisk?.toUpperCase()}
                  </p>
                </div>
              </div>

              {analysis.riskAssessment?.urgentFlags?.length > 0 && (
                <div className="border-l-4 border-red-500 bg-red-50 p-4">
                  <h4 className="font-semibold text-red-800 mb-2">Urgent Attention Required</h4>
                  <ul className="space-y-1">
                    {analysis.riskAssessment.urgentFlags.map((flag, index) => (
                      <li key={index} className="text-sm text-red-700">• {flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.riskAssessment?.specificConcerns?.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Specific Health Concerns</h4>
                  <div className="space-y-2">
                    {analysis.riskAssessment.specificConcerns.map((concern, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{concern}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Lifestyle & Dietary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.recommendations?.lifestyle?.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2">Lifestyle Changes</h5>
                    <ul className="space-y-1">
                      {analysis.recommendations.lifestyle.map((item, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.recommendations?.dietary?.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2">Dietary Recommendations</h5>
                    <ul className="space-y-1">
                      {analysis.recommendations.dietary.map((item, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Exercise & Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.recommendations?.exercise?.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2">Exercise Guidelines</h5>
                    <ul className="space-y-1">
                      {analysis.recommendations.exercise.map((item, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {analysis.recommendations?.monitoring?.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2">Health Monitoring</h5>
                    <ul className="space-y-1">
                      {analysis.recommendations.monitoring.map((item, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {analysis.recommendations?.consultation?.length > 0 && (
            <Card className="health-card border-medical-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-primary">
                  <Shield className="h-5 w-5" />
                  Professional Consultation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.recommendations.consultation.map((item, index) => (
                    <li key={index} className="text-sm flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-medical-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Disclaimer */}
      <Card className="health-card border-orange-200 bg-orange-50/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">Important Medical Disclaimer</h4>
              <p className="text-sm text-orange-700">
                {analysis.disclaimer || 
                "This AI analysis is for informational purposes only and does not constitute medical advice. Always consult with qualified healthcare professionals for medical decisions and treatment plans."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
