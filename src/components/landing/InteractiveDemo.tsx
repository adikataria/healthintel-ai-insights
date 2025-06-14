
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, User } from "lucide-react";
import { Link } from "react-router-dom";

const demos = [
  {
    icon: Brain,
    title: "AI Lab Report Analyzer",
    preview: "Upload your lab report and watch AI highlight the key wellness insights in seconds.",
    cta: "Try Analyzer",
    to: "/upload"
  },
  {
    icon: User,
    title: "AI Doctor Assistant",
    preview: "Describe your symptoms or ask questions—get safe, instant, and expert-backed answers.",
    cta: "Try Doctor Assistant",
    to: "/chat"
  }
];

export default function InteractiveDemo() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Explore the DocLumen AI Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {demos.map((demo, idx) => (
            <Card key={demo.title} className="p-8 flex flex-col gap-4 items-start border border-medical-light">
              <div className="mb-2">
                <demo.icon className="w-10 h-10 text-medical-primary" />
              </div>
              <h3 className="font-semibold text-lg">{demo.title}</h3>
              <p className="text-gray-600 mb-4">{demo.preview}</p>
              <Link to={demo.to}>
                <span className="inline-flex items-center text-medical-primary font-bold hover:underline">
                  {demo.cta}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
