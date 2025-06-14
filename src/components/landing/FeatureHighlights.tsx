
import React from "react";
import { Brain, User, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI Lab Report Analyzer",
    description:
      "Simplify health data and uncover actionable insights."
  },
  {
    icon: User,
    title: "AI Doctor Assistant",
    description:
      "Get instant answers and personalized health guidance."
  },
  {
    icon: Target,
    title: "Health Goals & Tracking",
    description:
      "Set, track, and achieve your wellness objectives."
  }
];

export default function FeatureHighlights() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Card
              key={f.title}
              className="flex flex-col items-center p-8 border border-medical-light shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">
                <f.icon className="w-12 h-12 text-medical-primary" />
              </div>
              <h3 className="font-bold text-xl text-center mb-2">{f.title}</h3>
              <p className="text-center text-gray-600">{f.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
