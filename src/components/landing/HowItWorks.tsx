
import React from "react";
import { Upload, Brain, ArrowRight, Stethoscope, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: Upload,
    title: "Upload Reports",
    subtitle: "Step 1",
    desc: "Simply upload your health reports with one click - we support all major lab formats.",
    features: ["PDF & Image support", "Secure encryption", "Instant processing"]
  },
  {
    icon: Brain,
    title: "Get AI Insights",
    subtitle: "Step 2", 
    desc: "Our advanced AI analyzes your reports and explains the results in simple, easy-to-understand language.",
    features: ["Plain English explanations", "Risk assessments", "Trend analysis"]
  },
  {
    icon: Stethoscope,
    title: "Take Action",
    subtitle: "Step 3",
    desc: "Receive personalized, actionable recommendations to improve your health and track your progress.",
    features: ["Personalized advice", "Action plans", "Progress tracking"]
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-medical-light/20 via-background to-medical-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            How DocLumen Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your health management in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <Card className="h-full border-2 hover:border-medical-primary/50 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-8 text-center">
                  {/* Step Badge */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-medical-primary/10 mb-6 relative">
                    <step.icon className="w-8 h-8 text-medical-primary" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-medical-primary text-white text-sm font-bold rounded-full flex items-center justify-center">
                      {i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-medical-primary mb-2">{step.subtitle}</p>
                    <h3 className="font-bold text-xl mb-4 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground mb-6">{step.desc}</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-medical-secondary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Arrow between steps (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-medical-primary/20">
                    <ArrowRight className="w-4 h-4 text-medical-primary" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Ready to get started?</p>
          <button className="bg-medical-primary hover:bg-medical-dark text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Try DocLumen Free
          </button>
        </div>
      </div>
    </section>
  );
}
