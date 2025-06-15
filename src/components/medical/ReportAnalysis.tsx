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
  ChevronDown,
  ChevronUp,
  Info,
  AlertTriangle,
  Microscope,
  Users,
  Calendar,
  TrendingDown,
  Upload,
  Search
} from 'lucide-react';
import { SummaryCard } from './SummaryCard';

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
  processingNote?: string;
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
  const [expandedIndicators, setExpandedIndicators] = useState<Set<number>>(new Set());

  const toggleIndicatorExpansion = (index: number) => {
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
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
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
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  // Check if we have valid health indicators
  const hasLabValues = analysis.healthIndicators && analysis.healthIndicators.length > 0;
  const validIndicators = hasLabValues ? analysis.healthIndicators.filter(indicator => 
    indicator.parameter && indicator.value && indicator.value !== 'N/A' && 
    !indicator.value.includes('Clinical assessment completed') &&
    !indicator.value.includes('Laboratory assessed')
  ) : [];

  // Helper to segment metrics
  const partitionIndicators = () => {
    const whatsNormal = [];
    const needsAttention = [];
    validIndicators.forEach(h => {
      if (h.status === "normal") whatsNormal.push(h);
      else needsAttention.push(h);
    });
    return { whatsNormal, needsAttention };
  };
  const { whatsNormal, needsAttention } = partitionIndicators();

  // Generate personalized greeting based on extraction success
  const personalizedGreeting = hasLabValues && validIndicators.length > 0
    ? `Analysis complete! We successfully extracted ${validIndicators.length} laboratory parameters from your report.`
    : "Report processed but specific laboratory values could not be automatically extracted.";

  // Generate type-specific risk factors based on abnormal values
  const getTypeSpecificRiskFactors = () => {
    const riskFactors = [];
    
    needsAttention.forEach(indicator => {
      const param = indicator.parameter.toLowerCase();
      if (param.includes('cholesterol') || param.includes('ldl')) {
        riskFactors.push('Cardiovascular disease risk due to elevated cholesterol levels');
      }
      if (param.includes('glucose') || param.includes('hba1c')) {
        riskFactors.push('Diabetes risk due to elevated blood sugar levels');
      }
      if (param.includes('blood pressure') || param.includes('bp')) {
        riskFactors.push('Hypertension and related cardiovascular complications');
      }
      if (param.includes('liver') || param.includes('alt') || param.includes('ast')) {
        riskFactors.push('Liver function concerns requiring monitoring');
      }
      if (param.includes('kidney') || param.includes('creatinine') || param.includes('urea')) {
        riskFactors.push('Kidney function concerns requiring evaluation');
      }
    });

    if (needsAttention.length > 0) {
      riskFactors.push('Multiple parameter deviations requiring medical evaluation');
    }

    return [...new Set(riskFactors)];
  };

  // Generate follow-up recommendations based on analysis
  const getFollowUpRecommendations = () => {
    const recommendations = [];
    
    if (needsAttention.length > 0) {
      recommendations.push('Follow up with healthcare provider within 2-4 weeks to discuss abnormal results');
      recommendations.push('Repeat laboratory tests in 3-6 months to monitor progress');
      recommendations.push('Consider consultation with specialist if multiple parameters remain abnormal');
    }

    if (needsAttention.length >= 3) {
      recommendations.push('Comprehensive metabolic panel review with endocrinologist');
      recommendations.push('Cardiovascular risk assessment with cardiologist');
    }

    if (validIndicators.length > 0) {
      recommendations.push('Annual health screening to track parameter trends');
      recommendations.push('Maintain current healthy lifestyle practices for normal parameters');
    } else {
      recommendations.push('Manual review of original report for specific numerical values');
      recommendations.push('Consult healthcare provider for detailed interpretation of results');
    }

    return recommendations;
  };

  const typeSpecificRiskFactors = getTypeSpecificRiskFactors();
  const followUpRecommendations = getFollowUpRecommendations();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Summary Section */}
      <Card className="mb-10 border-2 border-medical-primary/40 animate-fade-in">
        <CardHeader className="bg-medical-primary text-white rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg md:text-2xl flex gap-2 items-center">
                🩺 Report Analysis Summary
              </CardTitle>
              <p className="text-white/90 text-base md:text-lg mt-2">
                {personalizedGreeting}
              </p>
            </div>
            <Button
              variant="secondary"
              className="bg-white text-medical-primary shadow-sm border font-semibold px-3"
              onClick={() => window.location.assign('/chat')}
              size="sm"
            >
              Ask AI Doctor
            </Button>
          </div>
        </CardHeader>
        <CardContent className="py-5">
          {hasLabValues && validIndicators.length > 0 ? (
            <>
              <div className="mb-2">
                <SummaryCard
                  title="Analysis Complete"
                  iconType="check"
                  color="green"
                  description={`Successfully extracted ${validIndicators.length} laboratory parameters from your report.`}
                />
              </div>
              <div className="md:flex gap-4 mb-4">
                <div className="flex-1">
                  <SummaryCard
                    title="Normal Results"
                    iconType="check"
                    color="green"
                    description={
                      whatsNormal.length > 0
                        ? `${whatsNormal.length} parameters are in healthy ranges: ${whatsNormal.slice(0, 3).map(n => n.parameter).join(', ')}${whatsNormal.length > 3 ? '...' : ''}`
                        : "No parameters are currently in normal range."
                    }
                  />
                </div>
                <div className="flex-1">
                  <SummaryCard
                    title="Requires Attention"
                    iconType={needsAttention.length > 0 ? "alert" : "check"}
                    color={needsAttention.length > 0 ? "yellow" : "green"}
                    description={
                      needsAttention.length > 0
                        ? `${needsAttention.length} parameters need monitoring: ${needsAttention.slice(0, 3).map(n => n.parameter).join(', ')}${needsAttention.length > 3 ? '...' : ''}`
                        : "All parameters are within acceptable ranges!"
                    }
                  />
                </div>
              </div>

              {/* Type-Specific Risk Factors Section */}
              {typeSpecificRiskFactors.length > 0 && (
                <Card className="mb-4 border-orange-200 bg-orange-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-orange-800 flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5" />
                      Type-Specific Risk Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {typeSpecificRiskFactors.map((factor, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-orange-100 rounded-lg border border-orange-200">
                          <TrendingDown className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <p className="text-orange-800 text-sm font-medium">{factor}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Follow-up Recommendations Section */}
              {followUpRecommendations.length > 0 && (
                <Card className="mb-4 border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-blue-800 flex items-center gap-2 text-lg">
                      <Calendar className="h-5 w-5" />
                      Follow-up Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {followUpRecommendations.map((recommendation, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-blue-100 rounded-lg border border-blue-200">
                          <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-blue-800 text-sm font-medium">{recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Values Not Automatically Extracted</h3>
              <p className="text-gray-500 mb-4">
                The AI couldn't automatically extract specific numerical lab values from this report. This can happen with certain file formats or image quality.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-w-md mx-auto mb-4">
                <p className="text-sm text-blue-800">
                  <strong>What you can do:</strong>
                  <br />• Ask our AI Doctor about your report
                  <br />• Try uploading a clearer scan/photo
                  <br />• Upload the report in PDF format if possible
                  <br />• Manually review the original document
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => window.location.assign('/chat')}
                  className="bg-medical-primary hover:bg-medical-dark text-white"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Ask AI Doctor About Your Report
                </Button>
                <Button 
                  onClick={() => window.location.assign('/upload')}
                  variant="outline"
                  className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Try Uploading Again
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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

      {/* Key Findings Overview */}
      {analysis.keyFindings?.length > 0 && (
        <Card className="health-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-medical-primary" />
              Key Findings at a Glance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {analysis.keyFindings.slice(0, 3).map((finding, index) => (
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
      )}

      {/* Main Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">
            <BarChart3 className="h-4 w-4 mr-1" />
            Lab Results
          </TabsTrigger>
          <TabsTrigger value="risks" className="text-xs sm:text-sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            Health Risks
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="text-xs sm:text-sm">
            <Target className="h-4 w-4 mr-1" />
            Action Plan
          </TabsTrigger>
          <TabsTrigger value="details" className="text-xs sm:text-sm hidden lg:flex">
            <FileText className="h-4 w-4 mr-1" />
            Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-medical-primary" />
                Laboratory Results Analysis
                <Badge className="ml-2 bg-medical-primary/10 text-medical-primary">
                  {validIndicators.length} Parameters
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {hasLabValues && validIndicators.length > 0
                  ? `Comprehensive analysis of ${validIndicators.length} extracted laboratory values with detailed clinical interpretations`
                  : "Analysis of available health information from your report"
                }
              </p>
            </CardHeader>
            <CardContent>
              {hasLabValues && validIndicators.length > 0 ? (
                <div className="space-y-6">
                  {validIndicators.map((indicator, index) => (
                    <div key={index} className="border-2 rounded-xl p-6 space-y-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                      {/* Header Section */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-medical-light/20">
                            <Microscope className="h-5 w-5 text-medical-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold text-xl text-medical-dark">{indicator.parameter}</h4>
                            <p className="text-sm text-muted-foreground">Laboratory Parameter #{index + 1}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(indicator.status)}
                          <Badge className={`${getStatusColor(indicator.status)} border font-medium`}>
                            {indicator.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      {/* Results Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-4 rounded-lg">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-600 mb-1">Your Result</p>
                          <p className="text-2xl font-bold text-medical-primary">{indicator.value}</p>
                          <p className="text-xs text-gray-500 mt-1">Measured Value</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-600 mb-1">Normal Range</p>
                          <p className="text-lg font-semibold text-gray-700">{indicator.normalRange}</p>
                          <p className="text-xs text-gray-500 mt-1">Reference Values</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-600 mb-1">Clinical Status</p>
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(indicator.status)}`}>
                            {getStatusIcon(indicator.status)}
                            {indicator.status.charAt(0).toUpperCase() + indicator.status.slice(1)}
                          </div>
                        </div>
                      </div>
                      
                      {/* Clinical Interpretation */}
                      <div className="bg-medical-light/10 p-5 rounded-lg border-l-4 border-medical-primary">
                        <div className="flex items-start gap-3">
                          <Info className="h-5 w-5 text-medical-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h5 className="font-semibold text-medical-dark mb-2 flex items-center gap-2">
                              Clinical Interpretation & Significance
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleIndicatorExpansion(index)}
                                className="h-6 w-6 p-0"
                              >
                                {expandedIndicators.has(index) ? 
                                  <ChevronUp className="h-4 w-4" /> : 
                                  <ChevronDown className="h-4 w-4" />
                                }
                              </Button>
                            </h5>
                            <div className="space-y-3">
                              <p className="text-sm text-accent leading-relaxed font-medium">
                                {indicator.explanation}
                              </p>
                              
                              {expandedIndicators.has(index) && (
                                <div className="space-y-4 pt-3 border-t border-medical-primary/20">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded border">
                                      <h6 className="font-medium text-sm text-medical-primary mb-2">Clinical Significance</h6>
                                      <p className="text-xs text-gray-600">
                                        {indicator.status === 'normal' ? 
                                          'This result indicates optimal function and suggests good health in this parameter.' :
                                          indicator.status === 'borderline' ?
                                          'This result warrants monitoring and may benefit from lifestyle modifications or further evaluation.' :
                                          'This result requires attention and may indicate a need for medical intervention or further testing.'
                                        }
                                      </p>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                      <h6 className="font-medium text-sm text-medical-primary mb-2">Next Steps</h6>
                                      <p className="text-xs text-gray-600">
                                        {indicator.status === 'normal' ? 
                                          'Continue current health practices and monitor during routine check-ups.' :
                                          indicator.status === 'borderline' ?
                                          'Consider lifestyle changes and retest in 3-6 months, or as recommended by your doctor.' :
                                          'Consult with your healthcare provider promptly to discuss treatment options and follow-up care.'
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Specific Lab Values Extracted</h3>
                  <p className="text-gray-500 mb-4">The AI couldn't extract specific numerical test values from this report format.</p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-w-md mx-auto mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>This can happen when:</strong>
                      <br />• Report is image-based with unclear text
                      <br />• PDF format is complex or scanned
                      <br />• Report contains primarily narrative text
                      <br />• Values are embedded in paragraphs
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button 
                      onClick={() => window.location.assign('/chat')}
                      className="bg-medical-primary hover:bg-medical-dark text-white"
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      Ask AI Doctor About Your Report
                    </Button>
                    <Button 
                      onClick={() => window.location.assign('/upload')}
                      variant="outline"
                      className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Try Uploading Again
                    </Button>
                  </div>
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
                Health Risk Assessment
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
                      {analysis.riskAssessment?.overallRisk || 'Assessment pending'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Urgent Flags */}
              {analysis.riskAssessment?.urgentFlags?.length > 0 && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-800 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Requires Immediate Attention
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.riskAssessment.urgentFlags.map((flag, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-red-100 rounded-lg">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <p className="text-red-800 font-medium">{flag}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Specific Concerns */}
              {analysis.riskAssessment?.specificConcerns?.length > 0 && (
                <Card className="health-card">
                  <CardHeader>
                    <CardTitle className="text-yellow-700">Areas to Monitor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysis.riskAssessment.specificConcerns.map((concern, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <p className="text-yellow-800">{concern}</p>
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

            {/* Exercise & Monitoring */}
            <Card className="health-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-medical-primary" />
                  Exercise & Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {analysis.recommendations?.exercise?.length > 0 && (
                  <div>
                    <h5 className="font-semibold mb-3 text-accent">Exercise Guidelines</h5>
                    <div className="space-y-2">
                      {analysis.recommendations.exercise.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                          <Activity className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-purple-800">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
              </CardContent>
            </Card>
          </div>

          {/* Consultation Recommendations */}
          {analysis.recommendations?.consultation?.length > 0 && (
            <Card className="health-card border-medical-primary/30 bg-medical-light/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-primary">
                  <Shield className="h-5 w-5" />
                  When to See a Healthcare Provider
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analysis.recommendations.consultation.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                      <AlertCircle className="h-5 w-5 text-medical-primary mt-0.5 flex-shrink-0" />
                      <p className="text-medical-dark font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="details" className="space-y-4">
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Complete Analysis Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analysis.keyFindings?.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">All Key Findings</h4>
                  <div className="space-y-2">
                    {analysis.keyFindings.map((finding, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-medical-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{finding}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analysis.processingNote && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Processing Note:</strong> {analysis.processingNote}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
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
