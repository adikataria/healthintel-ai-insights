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
  Info
} from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import { MetricInfoDialog } from './MetricInfoDialog';

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

  // Helper to segment metrics (for "What's Normal", "Needs Attention" etc.)
  const partitionIndicators = () => {
    const whatsNormal = [];
    const needsAttention = [];
    (analysis.healthIndicators || []).forEach(h => {
      if (h.status === "normal") whatsNormal.push(h);
      else needsAttention.push(h);
    });
    return { whatsNormal, needsAttention };
  };
  const { whatsNormal, needsAttention } = partitionIndicators();

  // Personalized greeting logic (example: age/gender/history could be used if available)
  const personalizedGreeting = "Here's a plain language summary of your lab report. We translate the results into easy steps you can use—no medical jargon!";

  // Example actionable next steps
  const nextSteps = (analysis.recommendations?.lifestyle || [])
    .slice(0, 2)
    .concat((analysis.recommendations?.consultation || []).slice(0, 1));

  // Find key metric explanations for popup
  const infoForMetric = (metric: string) =>
    analysis.healthIndicators?.find(h => h.parameter === metric)?.explanation ||
    "No further details available.";

  // Visual indicator slider/graph for up to 3 key metrics (for demo: display if ranges are present)
  const KeyRangeVisuals = () => (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      {analysis.healthIndicators?.slice(0, 3).map((ind, idx) => {
        const value = parseFloat(ind.value.match(/[\d.]+/)?.[0] || "0");
        // crude parsing: normalRange like "12-16 g/dL"
        let min = 0, max = 100;
        const match = ind.normalRange?.match(/(\d+\.?\d*)\s*-\s*(\d+\.?\d*)/);
        if (match) {
          min = parseFloat(match[1]);
          max = parseFloat(match[2]);
        }
        const range = max - min;
        const percent = range > 0 ? Math.min(100, Math.max(0, ((value - min) / range) * 100)) : 0;
        return (
          <div key={idx} className="w-full max-w-xs px-2">
            <div className="text-sm font-semibold mb-1 flex items-center gap-1">
              <MetricInfoDialog
                trigger={ind.parameter}
                title={ind.parameter}
                description={ind.explanation}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs">{min}</span>
              <div className={`relative w-full h-3 rounded-full ${ind.status==="normal"?"bg-green-100":"bg-yellow-100"}`}>
                <div
                  style={{ left: `${percent}%` }}
                  className={
                    `absolute top-0 h-3 w-0.5 bg-blue-600 rounded`
                  }
                />
                <div
                  style={{ width: `${percent}%` }}
                  className={
                    ind.status === 'normal'
                      ? 'bg-green-500 h-3 rounded-l-full absolute left-0 top-0'
                      : 'bg-yellow-400 h-3 rounded-l-full absolute left-0 top-0'
                  }
                />
              </div>
              <span className="text-xs">{max}</span>
            </div>
            <div className="text-xs mt-1">
              <span className={`font-bold ${ind.status==='normal'?'text-green-600':'text-yellow-700'}`}>{ind.value}</span>
              <span className="ml-1 text-gray-500">({ind.status})</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Summary Section */}
      <Card className="mb-10 border-2 border-medical-primary/40 animate-fade-in">
        <CardHeader className="bg-medical-primary text-white rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg md:text-2xl flex gap-2 items-center">
                🩺 Report Summary
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
          <div className="mb-2">
            {/* Critical findings highlight */}
            <SummaryCard
              title="Highlights"
              iconType={(analysis.riskAssessment?.urgentFlags?.length || 0) > 0 ? "alert" : "check"}
              color={(analysis.riskAssessment?.urgentFlags?.length || 0) > 0 ? "red" : "green"}
              description={
                analysis.riskAssessment?.urgentFlags?.length
                  ? analysis.riskAssessment.urgentFlags[0]
                  : analysis.keyFindings?.[0] ||
                    "Your results are within optimal ranges. Keep up the good work!"
              }
            />
          </div>
          <div className="md:flex gap-4 mb-3">
            <div className="flex-1">
              <SummaryCard
                title="What's Normal"
                iconType="check"
                color="green"
                description={
                  whatsNormal.length
                    ? (
                        <>
                          The following results are in the healthy range:&nbsp;
                          {whatsNormal.slice(0, 3).map((n, i) => (
                            <React.Fragment key={n.parameter}>
                              <MetricInfoDialog
                                trigger={n.parameter}
                                title={n.parameter}
                                description={n.explanation}
                              />
                              {i < whatsNormal.slice(0, 3).length - 1 && <span>, </span>}
                            </React.Fragment>
                          ))}
                        </>
                      )
                    : "No results are in the normal range."
                }
              />
            </div>
            <div className="flex-1">
              <SummaryCard
                title="Needs Attention"
                iconType="alert"
                color={needsAttention.length ? "yellow" : "green"}
                description={
                  needsAttention.length
                    ? (
                        <>
                          Monitor these metrics carefully:&nbsp;
                          {needsAttention.slice(0, 3).map((n, i) => (
                            <React.Fragment key={n.parameter}>
                              <MetricInfoDialog
                                trigger={n.parameter}
                                title={n.parameter}
                                description={n.explanation}
                              />
                              {i < needsAttention.slice(0, 3).length - 1 && <span>, </span>}
                            </React.Fragment>
                          ))}
                        </>
                      )
                    : "Great job! No flagged results."
                }
              />
            </div>
          </div>

          {/* Key Metric Sliders / Visuals */}
          <KeyRangeVisuals />

          {/* Next Steps */}
          <div className="mt-4">
            <SummaryCard
              title="Next Steps"
              iconType="info"
              color="blue"
              description={
                nextSteps.length > 0
                  ? nextSteps.map((step, idx) => <div key={idx}>• {step}</div>)
                  : "No immediate actions required. Maintain your healthy habits!"
              }
            />
            <div className="text-xs text-gray-600 mt-2">
              Not sure what to do next?{" "}
              <span
                className="underline text-blue-600 cursor-pointer"
                onClick={() => window.location.assign('/chat')}
              >
                Ask our AI Doctor
              </span>{" "}
              for personalized advice.
            </div>
          </div>
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
      <Card className="health-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-medical-primary" />
            Key Findings at a Glance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {analysis.keyFindings?.slice(0, 3).map((finding, index) => (
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
                Complete Laboratory Results Analysis
                <Badge className="ml-2 bg-medical-primary/10 text-medical-primary">
                  {analysis.healthIndicators?.length || 0} Parameters
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Comprehensive analysis of all extracted laboratory values with detailed clinical interpretations
              </p>
            </CardHeader>
            <CardContent>
              {analysis.healthIndicators?.length > 0 ? (
                <div className="space-y-6">
                  {analysis.healthIndicators.map((indicator, index) => (
                    <div key={index} className="border-2 rounded-xl p-6 space-y-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                      {/* Header Section */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-medical-light/20">
                            <BarChart3 className="h-5 w-5 text-medical-primary" />
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
                                  {/* Additional Clinical Context */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white p-3 rounded border">
                                      <h6 className="font-medium text-sm text-medical-primary mb-2">Test Purpose</h6>
                                      <p className="text-xs text-gray-600">
                                        This test measures {indicator.parameter.toLowerCase()} levels to assess {
                                          indicator.parameter.toLowerCase().includes('cholesterol') ? 'cardiovascular health and lipid metabolism' :
                                          indicator.parameter.toLowerCase().includes('glucose') ? 'blood sugar control and diabetes risk' :
                                          indicator.parameter.toLowerCase().includes('hemoglobin') ? 'oxygen-carrying capacity and anemia status' :
                                          indicator.parameter.toLowerCase().includes('creatinine') ? 'kidney function and waste filtration' :
                                          indicator.parameter.toLowerCase().includes('liver') || indicator.parameter.toLowerCase().includes('alt') || indicator.parameter.toLowerCase().includes('ast') ? 'liver function and hepatic health' :
                                          'overall health status and organ function'
                                        }.
                                      </p>
                                    </div>
                                    <div className="bg-white p-3 rounded border">
                                      <h6 className="font-medium text-sm text-medical-primary mb-2">Clinical Relevance</h6>
                                      <p className="text-xs text-gray-600">
                                        {indicator.status === 'normal' ? 
                                          'This result indicates optimal function and suggests good health in this parameter.' :
                                          indicator.status === 'borderline' ?
                                          'This result warrants monitoring and may benefit from lifestyle modifications or further evaluation.' :
                                          'This result requires attention and may indicate a need for medical intervention or further testing.'
                                        }
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {/* Measurement Details */}
                                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                    <h6 className="font-medium text-sm text-blue-800 mb-2">Measurement Details</h6>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div>
                                        <span className="font-medium text-blue-700">Result:</span>
                                        <span className="ml-1 text-blue-600">{indicator.value}</span>
                                      </div>
                                      <div>
                                        <span className="font-medium text-blue-700">Units:</span>
                                        <span className="ml-1 text-blue-600">
                                          {indicator.normalRange.match(/[a-zA-Z\/μ%³⁶]+$/)?.[0] || 'Standard units'}
                                        </span>
                                      </div>
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
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No Laboratory Values Extracted</h3>
                  <p className="text-gray-500 mb-4">The AI analysis could not extract specific test values from this report.</p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 max-w-md mx-auto">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> This may occur with image-based reports or complex PDF formats. 
                      The AI focused on overall health insights instead of individual parameter extraction.
                    </p>
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
                      {analysis.riskAssessment?.overallRisk || 'Not assessed'}
                    </p>
                  </div>
                </div>
              </div>

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
