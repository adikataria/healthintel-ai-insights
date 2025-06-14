
import React from "react";
import { Upload, Brain, ArrowRight, Stethoscope } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Step 1: Upload",
    desc: "Upload your health reports with one click."
  },
  {
    icon: Brain,
    title: "Step 2: Get Insights",
    desc: "Our AI analyzes your reports and explains the results in simple language."
  },
  {
    icon: Stethoscope,
    title: "Step 3: Take Action",
    desc: "Get practical, personalized advice to improve your health."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center px-4">
              <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-medical-primary/10">
                <s.icon className="w-8 h-8 text-medical-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-600 text-center">{s.desc}</p>
              {i < steps.length - 1 && (
                <ArrowRight className="mt-4 w-6 h-6 text-gray-300 md:block hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
