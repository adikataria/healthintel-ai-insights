
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Example data/faces for illustration purposes
const testimonials = [
  {
    name: "Ankita Sharma",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "With DocLumen, I finally understand my lab reports — it's like having a doctor in my pocket.",
    progress: "Improved cholesterol in 2 months"
  },
  {
    name: "Dr. Raj Verma",
    photo: "https://randomuser.me/api/portraits/men/36.jpg",
    quote: "I recommend DocLumen to my patients for seamless health tracking and actionable insights.",
    progress: "Blood sugar stable 6+ months"
  },
  {
    name: "Priya Nair",
    photo: "https://randomuser.me/api/portraits/women/27.jpg",
    quote: "The AI doctor assistant is so accessible and always gives clear, helpful advice.",
    progress: "Better energy, sleeping well now!"
  }
];

export default function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  const t = testimonials[idx];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">What users are saying</h2>
        <div className="flex flex-col items-center max-w-xl mx-auto relative">
          <Card className="w-full p-6 flex flex-col items-center text-center">
            <img src={t.photo} alt={t.name} className="w-20 h-20 rounded-full border-4 border-medical-primary object-cover mb-4" />
            <blockquote className="italic text-lg mb-3">&quot;{t.quote}&quot;</blockquote>
            <div className="text-medical-primary font-semibold mb-2">{t.name}</div>
            <div className="text-sm text-gray-500">{t.progress}</div>
          </Card>
          <div className="flex gap-6 mt-6 items-center">
            <button
              aria-label="Previous"
              className="p-2 rounded-full border border-gray-300 hover:bg-medical-light"
              onClick={prev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next"
              className="p-2 rounded-full border border-gray-300 hover:bg-medical-light"
              onClick={next}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === idx ? "bg-medical-primary" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
