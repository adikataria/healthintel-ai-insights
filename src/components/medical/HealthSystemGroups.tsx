import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Activity, 
  Droplets, 
  Brain, 
  Zap, 
  Shield, 
  Apple,
  Thermometer,
  ChevronDown,
  ChevronUp,
  Info,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { MetricInfoDialog } from './MetricInfoDialog';

interface HealthSystemGroupsProps {
  healthSystemGroups: any;
  healthIndicators: any[];
}

const systemIcons = {
  bloodHealth: Heart,
  metabolicHealth: Zap,
  kidneyFunction: Droplets,
  liverFunction: Activity,
  heartHealth: Heart,
  brainHealth: Brain,
  immuneSystem: Shield,
  nutritionStatus: Apple,
  hormoneBalance: Thermometer
};

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'excellent':
    case 'optimal':
    case 'normal':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'good':
    case 'fair':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'attention':
    case 'borderline':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'concern':
    case 'abnormal':
      return 'text-red-600 bg-red-50 border-red-200';
    default:
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getHealthScore = (tests: string[], healthIndicators: any[]) => {
  if (!tests || tests.length === 0) return 85;
  
  const relatedTests = healthIndicators.filter(indicator => 
    tests.some(test => 
      indicator.parameter.toLowerCase().includes(test.toLowerCase()) ||
      test.toLowerCase().includes(indicator.parameter.toLowerCase())
    )
  );
  
  if (relatedTests.length === 0) return 85;
  
  const normalCount = relatedTests.filter(test => test.status === 'normal').length;
  return Math.round((normalCount / relatedTests.length) * 100);
};

const getTrendIcon = (score: number) => {
  if (score >= 90) return <TrendingUp className="h-4 w-4 text-green-600" />;
  if (score >= 70) return <Minus className="h-4 w-4 text-yellow-600" />;
  return <TrendingDown className="h-4 w-4 text-red-600" />;
};

export const HealthSystemGroups: React.FC<HealthSystemGroupsProps> = ({
  healthSystemGroups,
  healthIndicators
}) => {
  const [expandedSystems, setExpandedSystems] = useState<Set<string>>(new Set());

  const toggleSystem = (systemKey: string) => {
    const newExpanded = new Set(expandedSystems);
    if (newExpanded.has(systemKey)) {
      newExpanded.delete(systemKey);
    } else {
      newExpanded.add(systemKey);
    }
    setExpandedSystems(newExpanded);
  };

  if (!healthSystemGroups || Object.keys(healthSystemGroups).length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-medical-dark mb-2">Health Systems Overview</h3>
        <p className="text-sm text-gray-600">
          Your lab results organized by body systems for better understanding
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(healthSystemGroups).map(([systemKey, system]: [string, any]) => {
          const IconComponent = systemIcons[systemKey as keyof typeof systemIcons] || Activity;
          const isExpanded = expandedSystems.has(systemKey);
          const healthScore = getHealthScore(system.tests || [], healthIndicators);
          const relatedTests = healthIndicators.filter(indicator => 
            system.tests?.some((test: string) => 
              indicator.parameter.toLowerCase().includes(test.toLowerCase()) ||
              test.toLowerCase().includes(indicator.parameter.toLowerCase())
            )
          );

          return (
            <Card key={systemKey} className="border-medical-primary/20 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-medical-primary/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-medical-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{system.title}</CardTitle>
                      <Badge className={`${getStatusColor(system.status)} border text-xs mt-1`}>
                        {system.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(healthScore)}
                    <span className="text-lg font-bold text-medical-primary">{healthScore}%</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Health Score Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Health Score</span>
                    <span className="text-sm text-gray-600">{healthScore}/100</span>
                  </div>
                  <Progress 
                    value={healthScore} 
                    className={`h-2 ${
                      healthScore >= 90 ? 'progress-green' : 
                      healthScore >= 70 ? 'progress-yellow' : 'progress-red'
                    }`}
                  />
                </div>

                {/* System Summary */}
                <p className="text-sm text-gray-700 mb-3">{system.summary}</p>

                {/* Tests Count */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">
                    {relatedTests.length} tests analyzed
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSystem(systemKey)}
                    className="text-medical-primary hover:bg-medical-primary/10"
                  >
                    {isExpanded ? (
                      <>Hide Details <ChevronUp className="h-4 w-4 ml-1" /></>
                    ) : (
                      <>View Details <ChevronDown className="h-4 w-4 ml-1" /></>
                    )}
                  </Button>
                </div>

                {/* Expanded Details */}
                {isExpanded && relatedTests.length > 0 && (
                  <div className="space-y-3 border-t pt-3">
                    {relatedTests.map((test, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{test.parameter}</span>
                            <MetricInfoDialog
                              trigger={<Info className="h-3 w-3 text-gray-400 hover:text-medical-primary cursor-pointer" />}
                              title={test.parameter}
                              description={test.explanation}
                            />
                          </div>
                          <div className="text-xs text-gray-600">
                            {test.value} (Normal: {test.normalRange})
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(test.status)} border text-xs`}>
                          {test.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};