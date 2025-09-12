import React, { useMemo } from "react";
import { MobileTrendsView } from "@/components/mobile/MobileTrendsView";
import { useMedicalReports } from "@/hooks/useMedicalReports";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Heart, Droplets, Zap, Target } from "lucide-react";

const MobileTrends = () => {
  const { reports, isLoading } = useMedicalReports();

  // Generate health metrics from reports
  const healthMetrics = useMemo(() => {
    if (!reports.length) return [];

    const metrics: any[] = [];
    const parameterTypes = [
      { 
        key: 'cholesterol', 
        name: 'Total Cholesterol', 
        unit: 'mg/dL', 
        target: 200, 
        icon: <Heart className="h-5 w-5 text-red-500" />,
        color: '#ef4444'
      },
      { 
        key: 'glucose', 
        name: 'Blood Glucose', 
        unit: 'mg/dL', 
        target: 100, 
        icon: <Droplets className="h-5 w-5 text-blue-500" />,
        color: '#3b82f6'
      },
      { 
        key: 'hemoglobin', 
        name: 'Hemoglobin', 
        unit: 'g/dL', 
        target: 13, 
        icon: <Zap className="h-5 w-5 text-orange-500" />,
        color: '#f59e0b'
      },
      { 
        key: 'creatinine', 
        name: 'Creatinine', 
        unit: 'mg/dL', 
        target: 1.0, 
        icon: <Target className="h-5 w-5 text-green-500" />,
        color: '#10b981'
      }
    ];

    parameterTypes.forEach(type => {
      const data: any[] = [];
      let current = 0;

      // Get data from reports
      reports.slice(0, 6).reverse().forEach((report, index) => {
        const indicator = report.ai_insights?.healthIndicators?.find((h: any) => 
          h.parameter.toLowerCase().includes(type.key)
        );

        if (indicator) {
          const value = parseFloat(indicator.value.match(/\d+\.?\d*/)?.[0] || '0');
          data.push({
            name: `R${index + 1}`,
            value: value
          });
          
          if (index === reports.length - 1) {
            current = value;
          }
        }
      });

      if (data.length > 0) {
        // Calculate progress (how close to target)
        const progress = Math.min(100, Math.max(0, 100 - Math.abs(current - type.target) / type.target * 100));
        
        // Determine trend
        let trend = 'stable';
        if (data.length > 1) {
          const lastValue = data[data.length - 1].value;
          const prevValue = data[data.length - 2].value;
          
          if (type.key === 'cholesterol' || type.key === 'glucose' || type.key === 'creatinine') {
            trend = lastValue < prevValue ? 'improving' : lastValue > prevValue ? 'needs_attention' : 'stable';
          } else {
            trend = lastValue > prevValue ? 'improving' : lastValue < prevValue ? 'needs_attention' : 'stable';
          }
        }

        metrics.push({
          id: type.key,
          name: type.name,
          current,
          target: type.target,
          unit: type.unit,
          progress,
          trend,
          icon: type.icon,
          color: type.color,
          data
        });
      }
    });

    return metrics;
  }, [reports]);

  // Generate recent activities
  const recentActivities = useMemo(() => {
    return reports.slice(0, 10).map((report) => ({
      id: report.id,
      title: "Lab Report Analyzed",
      date: new Date(report.created_at).toLocaleDateString(),
      type: report.file_name || "Medical Report"
    }));
  }, [reports]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your health trends...</p>
        </div>
      </div>
    );
  }

  if (!reports.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-4">
              No Health Data Yet
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Upload lab reports to start tracking your health trends and see personalized insights.
            </p>
            <Button 
              size="lg" 
              className="w-full bg-medical-primary hover:bg-medical-dark"
              asChild
            >
              <Link to="/upload">
                <FileText className="mr-2 h-5 w-5" />
                Upload First Report
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MobileTrendsView
        healthMetrics={healthMetrics}
        recentActivities={recentActivities}
      />
    </div>
  );
};

export default MobileTrends;