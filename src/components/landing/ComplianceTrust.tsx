
import React from "react";
import { Shield, CheckCircle, FileText } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Data Security",
    desc: "Your information is encrypted and stored safely."
  },
  {
    icon: CheckCircle,
    title: "Regulatory Compliance",
    desc: "Follows Indian health data privacy norms, HIPAA-equivalent."
  },
  {
    icon: FileText,
    title: "Certified & Trusted",
    desc: "Verified by healthcare professionals & certified for safety."
  }
];

export default function ComplianceTrust() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Compliance &amp; Trust</h2>
        <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center px-6 max-w-xs">
              <div className="mb-4">
                <item.icon className="w-12 h-12 text-medical-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-center text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
