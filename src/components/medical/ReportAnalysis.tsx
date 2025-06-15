
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
  Clock,
  FileText,
  BarChart3,
  Target,
  Stethoscope,
  TestTube
} from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import { MetricInfoDialog } from './MetricInfoDialog';

interface HealthIndicator {
  parameter: string;
  value: string;
  normalRange: string;
  status: 'normal' | 'borderline' | 'abnormal' | 'critical';
  explanation: string;
  clinicalSignificance?: string;
  reportTypeRelevance?: string;
}

interface ReportTypeInfo {
  detectedType: string;
  category: string;
  specializedFocus: string;
  commonParameters: string[];
}

interface SpecializedInsights {
  reportTypeSpecificAnalysis: string;
  categoricalAssessment: string;
  typeSpecificRisks: string[];
  followUpRecommendations: string[];
}

interface RiskAssessment {
  overallRisk: 'low' | 'moderate' | 'high';
  specificConcerns?: string[];
  reportTypeSpecificConcerns?: string[];
  urgentFlags: string[];
}

interface Recommendations {
  reportTypeSpecific?: string[];
  lifestyle: string[];
  dietary: string[];
  exercise?: string[];
  monitoring: string[];
  consultation: string[];
}

interface AnalysisData {
  reportTypeInfo?: ReportTypeInfo;
  summary: string;
  keyFindings: string[];
  healthIndicators: HealthIndicator[];
  specializedInsights?: SpecializedInsights;
  riskAssessment: RiskAssessment;
  recommendations: Recommendations;
  disclaimer: string;
  analyzedAt?: string;
  processingNote?: string;
}

interface ReportAnalysisProps {
  reportData: {
    ai_insights: AnalysisData;
    file_name: string;
  };
}

export const ReportAnalysis: React.FC<ReportAnalysisProps> = ({
  reportData
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const analysis = reportData.ai_insights;
  const reportTitle = reportData.file_name;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'borderline':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'abnormal':
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Activity className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'borderline':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'abnormal':
      case 'critical':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'moderate':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Report Type Detection Header */}
      {analysis.reportTypeInfo && (
        <Card className="border-2 border-medical-primary/40 bg-gradient-to-r from-medical-light/20 to-medical-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-medical-primary/20">
                  <TestTube className="h-8 w-8 text-medical-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-medical-primary">
                    {analysis.reportTypeInfo.detectedType}
                  </CardTitle>
                  <p className="text-lg text-medical-dark font-medium">
                    {analysis.reportTypeInfo.category}
                  </p>
                  <p className="text-sm text-accent mt-1">
                    {analysis.reportTypeInfo.specializedFocus}
                  </p>
                </div>
              </div>
              <Badge className="bg-medical-primary text-white px-4 py-2 text-sm">
                Specialized Analysis
              </Badge>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Header Section */}
      <Card className="health-card border-medical-primary/20">
        <CardHeader className="bg-medical-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-white">DocLumen AI Lab Report Analysis</CardTitle>
                <p className="text-sm text-white/90">{reportTitle}</p>
              </div>
            </div>
            {analysis.analyzedAt && (
              <div className="text-right">
                <p className="text-sm text-white/90 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {new Date(analysis.analyzedAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-white/80">
                  {new Date(analysis.analyzedAt).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="bg-medical-light/10 p-6 rounded-xl border border-medical-primary/20">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-medical-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-medical-dark mb-2">Report Summary</h3>
                <p className="text-accent leading-relaxed">{analysis.summary}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Specialized Insights Section */}
      {analysis.specializedInsights && (
        <Card className="health-card border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Stethoscope className="h-5 w-5" />
              Specialized Analysis for {analysis.reportTypeInfo?.detectedType}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Report-Specific Analysis</h4>
              <p className="text-blue-700">{analysis.specializedInsights.reportTypeSpecificAnalysis}</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Category Assessment</h4>
              <p className="text-blue-700">{analysis.specializedInsights.categoricalAssessment}</p>
            </div>

            {analysis.specializedInsights.typeSpecificRisks?.length > 0 && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">Type-Specific Risk Factors</h4>
                <ul className="space-y-1">
                  {analysis.specializedInsights.typeSpecificRisks.map((risk, index) => (
                    <li key={index} className="text-yellow-700 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Key Findings Overview */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-medical-primary" />
            Key Findings for {analysis.reportTypeInfo?.detectedType || 'Laboratory Report'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.keyFindings?.slice(0, 6).map((finding, index) => (
              <div key={index} className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-medical-primary/20">
                    <CheckCircle className="h-4 w-4 text-medical-primary" />
                  </div>
                  <p className="text-sm font-medium text-accent">{finding}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            <BarChart3 className="h-4 w-4 mr-1" />
            Test Results
          </TabsTrigger>
          <TabsTrigger value="risks" className="text-xs sm:text-sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            Health Risks
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs sm:text-sm">
            <Target className="h-4 w-4 mr-1" />
            Action Plan
          </TabsTrigger>
          <TabsTrigger value="specialized" className="text-xs sm:text-sm">
            <TestTube className="h-4 w-4 mr-1" />
            Specialized
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-medical-primary" />
                Your {analysis.reportTypeInfo?.detectedType || 'Test'} Results Explained
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysis.healthIndicators?.length > 0 ? (
                <div className="space-y-4">
                  {analysis.healthIndicators.map((indicator, index) => (
                    <div key={index} className="border rounded-xl p-5 space-y-4 bg-white shadow-sm">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">{indicator.parameter}</h4>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(indicator.status)}
                          <Badge className={`${getStatusColor(indicator.status)} border`}>
                            {indicator.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-600">Your Result</p>
                          <p className="text-xl font-bold text-medical-primary">{indicator.value}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-600">Normal Range</p>
                          <p className="text-lg text-gray-700">{indicator.normalRange}</p>
                        </div>
                      </div>
                      
                      <div className="bg-medical-light/10 p-4 rounded-lg border border-medical-primary/20">
                        <h5 className="font-medium text-medical-dark mb-2">What this means:</h5>
                        <p className="text-sm text-accent leading-relaxed mb-2">{indicator.explanation}</p>
                        
                        {indicator.clinicalSignificance && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                            <h6 className="font-medium text-blue-800 mb-1">Clinical Significance:</h6>
                            <p className="text-sm text-blue-700">{indicator.clinicalSignificance}</p>
                          </div>
                        )}
                        
                        {indicator.reportTypeRelevance && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                            <h6 className="font-medium text-green-800 mb-1">Relevance to {analysis.reportTypeInfo?.detectedType}:</h6>
                            <p className="text-sm text-green-700">{indicator.reportTypeRelevance}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No specific test values were identified in this report.</p>
                  <p className="text-sm text-gray-500 mt-2">The AI analysis focused on overall health insights.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-medical-primary" />
                Health Risk Assessment for {analysis.reportTypeInfo?.detectedType || 'Your Report'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Overall Risk Level */}
              <div className={`p-6 rounded-xl border-2 ${getRiskColor(analysis.riskAssessment?.overallRisk)}`}>
                <div className="flex items-center gap-4">
                  {getRiskIcon(analysis.riskAssessment?.overallRisk)}
                  <div>
                    <h3 className="text-lg font-semibold">Overall Health Risk Level</h3>
                    <p className="text-2xl font-bold capitalize mt-1">
                      {analysis.riskAssessment?.overallRisk || 'Not assessed'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Report Type Specific Concerns */}
              {analysis.riskAssessment?.reportTypeSpecificConcerns?.length > 0 && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-orange-800 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      {analysis.reportTypeInfo?.detectedType} Specific Concerns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.riskAssessment.reportTypeSpecificConcerns.map((concern, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-orange-100 rounded-lg">
                          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <p className="text-orange-800 font-medium">{concern}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Urgent Flags */}
              {analysis.riskAssessment?.urgentFlags?.length > 0 && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-800 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Requires Immediate Attention
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.riskAssessment.urgentFlags.map((flag, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-red-100 rounded-lg">
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <p className="text-red-800 font-medium">{flag}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {/* Report Type Specific Recommendations */}
          {analysis.recommendations?.reportTypeSpecific?.length > 0 && (
            <Card className="health-card border-medical-primary/30 bg-medical-light/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-primary">
                  <TestTube className="h-5 w-5" />
                  Recommendations for {analysis.reportTypeInfo?.detectedType}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.recommendations.reportTypeSpecific.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                      <CheckCircle className="h-5 w-5 text-medical-primary mt-0.5 flex-shrink-0" />
                      <p className="text-medical-dark font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lifestyle & Diet */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-medical-primary" />
                  Lifestyle & Diet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {analysis.recommendations?.lifestyle?.length > 0 && (
                  <div>
                    <h5 className="font-semibold mb-3 text-accent">Lifestyle Changes</h5>
                    <div className="space-y-2">
                      {analysis.recommendations.lifestyle.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-green-800">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.recommendations?.dietary?.length > 0 && (
                  <div>
                    <h5 className="font-semibold mb-3 text-accent">Dietary Recommendations</h5>
                    <div className="space-y-2">
                      {analysis.recommendations.dietary.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-blue-800">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Monitoring & Consultation */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-medical-primary" />
                  Monitoring & Follow-up
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {analysis.recommendations?.monitoring?.length > 0 && (
                  <div>
                    <h5 className="font-semibold mb-3 text-accent">Health Monitoring</h5>
                    <div className="space-y-2">
                      {analysis.recommendations.monitoring.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-indigo-50 rounded-lg">
                          <BarChart3 className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-indigo-800">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {analysis.recommendations?.consultation?.length > 0 && (
                  <div>
                    <h5 className="font-semibold mb-3 text-accent">Professional Consultation</h5>
                    <div className="space-y-2">
                      {analysis.recommendations.consultation.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                          <Shield className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-purple-800">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="specialized" className="space-y-4">
          {analysis.specializedInsights && (
            <div className="space-y-6">
              {/* Follow-up Recommendations */}
              {analysis.specializedInsights.followUpRecommendations?.length > 0 && (
                <Card className="health-card border-green-200 bg-green-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Target className="h-5 w-5" />
                      Follow-up Recommendations for {analysis.reportTypeInfo?.detectedType}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.specializedInsights.followUpRecommendations.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-green-800 font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Common Parameters for this Report Type */}
              {analysis.reportTypeInfo?.commonParameters?.length > 0 && (
                <Card className="health-card">
                  <CardHeader>
                    <CardTitle className="text-medical-primary">
                      Common Parameters in {analysis.reportTypeInfo.detectedType}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {analysis.reportTypeInfo.commonParameters.map((param, index) => (
                        <div key={index} className="p-3 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                          <p className="text-sm text-accent">{param}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Medical Disclaimer */}
      <Card className="health-card border-orange-200 bg-orange-50/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-full bg-orange-100">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-orange-800 mb-3">Important Medical Disclaimer</h4>
              <p className="text-sm text-orange-700 leading-relaxed">
                {analysis.disclaimer || 
                "This AI analysis is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. The interpretations provided are based on general medical knowledge and may not account for your complete medical history. Always consult with qualified healthcare professionals for medical decisions, treatment plans, and before making any changes to your health routine. In case of medical emergencies, contact your local emergency services immediately."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportAnalysis;
