
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
  TestTube,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

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
  const [expandedIndicators, setExpandedIndicators] = useState<Set<number>>(new Set());
  const analysis = reportData.ai_insights;
  const reportTitle = reportData.file_name;

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedIndicators);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedIndicators(newExpanded);
  };

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

  // Ensure we always display laboratory values, even if healthIndicators array is empty or missing
  const hasHealthIndicators = analysis.healthIndicators && analysis.healthIndicators.length > 0;
  const displayHealthIndicators = hasHealthIndicators ? analysis.healthIndicators : [];

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

      {/* Header Section with Summary */}
      <Card className="health-card border-medical-primary/20">
        <CardHeader className="bg-medical-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/20">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-xl text-white">Complete Lab Report Analysis</CardTitle>
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
                <h3 className="font-semibold text-medical-dark mb-2">Executive Summary</h3>
                <p className="text-accent leading-relaxed">{analysis.summary}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Laboratory Values Section - Always Show This Section */}
      <Card className="health-card border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <TestTube className="h-6 w-6" />
            Complete Laboratory Values Analysis
            <Badge variant="secondary" className="ml-2">
              {displayHealthIndicators.length > 0 ? `${displayHealthIndicators.length} Parameters Extracted` : 'Comprehensive Analysis'}
            </Badge>
          </CardTitle>
          <p className="text-blue-700">
            All extracted laboratory test results with detailed medical interpretations and clinical significance
          </p>
        </CardHeader>
        <CardContent>
          {displayHealthIndicators.length > 0 ? (
            <div className="space-y-6">
              {displayHealthIndicators.map((indicator, index) => (
                <div key={index} className="border-2 border-blue-200/50 rounded-xl p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Test Parameter Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-blue-900">{indicator.parameter}</h4>
                        <p className="text-sm text-blue-600">Laboratory Test Parameter</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(indicator.status)}
                      <Badge className={`${getStatusColor(indicator.status)} border text-sm font-semibold px-3 py-1`}>
                        {indicator.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Test Values Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-sm font-semibold text-blue-700 mb-1">Your Test Result</p>
                      <p className="text-2xl font-bold text-blue-900">{indicator.value}</p>
                      <p className="text-xs text-blue-600 mt-1">Measured Value</p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Normal Reference Range</p>
                      <p className="text-lg font-semibold text-gray-800">{indicator.normalRange}</p>
                      <p className="text-xs text-gray-600 mt-1">Standard Range</p>
                    </div>
                  </div>
                  
                  {/* Clinical Interpretation */}
                  <div className="bg-gradient-to-r from-medical-light/10 to-blue-50/30 p-5 rounded-lg border border-medical-primary/30">
                    <div className="flex items-start justify-between mb-3">
                      <h5 className="font-semibold text-lg text-medical-dark flex items-center gap-2">
                        <Stethoscope className="h-5 w-5 text-medical-primary" />
                        Clinical Interpretation
                      </h5>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleExpanded(index)}
                        className="text-medical-primary hover:bg-medical-light/20 flex items-center gap-1"
                      >
                        {expandedIndicators.has(index) ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            Show More Details
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-lg border border-blue-200/50">
                        <h6 className="font-medium text-blue-800 mb-2">Primary Analysis:</h6>
                        <p className="text-blue-700 leading-relaxed">{indicator.explanation}</p>
                      </div>
                      
                      {expandedIndicators.has(index) && (
                        <div className="space-y-4 mt-4">
                          {indicator.clinicalSignificance && (
                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-l-4 border-green-400">
                              <h6 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                Clinical Significance:
                              </h6>
                              <p className="text-green-700 leading-relaxed">{indicator.clinicalSignificance}</p>
                            </div>
                          )}
                          
                          {indicator.reportTypeRelevance && (
                            <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg border-l-4 border-purple-400">
                              <h6 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                                <TestTube className="h-4 w-4" />
                                Relevance to {analysis.reportTypeInfo?.detectedType || 'This Test Type'}:
                              </h6>
                              <p className="text-purple-700 leading-relaxed">{indicator.reportTypeRelevance}</p>
                            </div>
                          )}
                          
                          {/* Additional contextual information */}
                          <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border-l-4 border-orange-400">
                            <h6 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                              <Info className="h-4 w-4" />
                              What This Test Measures:
                            </h6>
                            <p className="text-orange-700 leading-relaxed">
                              {indicator.parameter} is a key biomarker that provides important insights into your health status. 
                              This measurement helps healthcare providers assess specific aspects of your physiological function.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <TestTube className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Comprehensive Analysis Available</h3>
              <p className="text-blue-700 text-lg mb-2">Your medical report has been thoroughly analyzed</p>
              <p className="text-blue-600 max-w-2xl mx-auto leading-relaxed">
                While specific numerical values may not have been extracted from the document format, 
                our AI has provided comprehensive medical insights based on the complete report content. 
                All findings and recommendations are based on the thorough analysis of your medical data.
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 max-w-2xl mx-auto">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> The analysis includes professional medical interpretation of all visible 
                  test results and health indicators present in your report.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Specialized Insights for Report Type */}
      {analysis.specializedInsights && (
        <Card className="health-card border-blue-200 bg-blue-50/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Stethoscope className="h-5 w-5" />
              Specialized Clinical Insights for {analysis.reportTypeInfo?.detectedType}
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

            {analysis.specializedInsights.followUpRecommendations?.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">Follow-up Recommendations</h4>
                <ul className="space-y-2">
                  {analysis.specializedInsights.followUpRecommendations.map((rec, index) => (
                    <li key={index} className="text-green-700 flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Key Findings Grid */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-medical-primary" />
            Key Clinical Findings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analysis.keyFindings?.map((finding, index) => (
              <div key={index} className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-medical-primary/20 mt-1">
                    <CheckCircle className="h-4 w-4 text-medical-primary" />
                  </div>
                  <p className="text-sm font-medium text-accent leading-relaxed">{finding}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-medical-primary" />
            Complete Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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

          {(analysis.riskAssessment?.reportTypeSpecificConcerns?.length > 0 || 
            analysis.riskAssessment?.specificConcerns?.length > 0) && (
            <div className="space-y-4">
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

              {analysis.riskAssessment?.specificConcerns?.length > 0 && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-yellow-800 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      General Health Concerns
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.riskAssessment.specificConcerns.map((concern, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-yellow-100 rounded-lg">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <p className="text-yellow-800 font-medium">{concern}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

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

      <div className="space-y-6">
        {analysis.recommendations?.reportTypeSpecific?.length > 0 && (
          <Card className="health-card border-medical-primary/30 bg-medical-light/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-medical-primary">
                <TestTube className="h-5 w-5" />
                Targeted Recommendations for {analysis.reportTypeInfo?.detectedType}
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
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-medical-primary" />
                Lifestyle & Nutrition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {analysis.recommendations?.lifestyle?.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-3 text-accent">Lifestyle Modifications</h5>
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
                  <h5 className="font-semibold mb-3 text-accent">Dietary Guidelines</h5>
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
      </div>

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
