
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Ankita Sharma",
    role: "Software Engineer",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    quote: "DocLumen transformed how I understand my health reports. The AI explanations are so clear, it's like having a doctor explain everything in simple terms.",
    progress: "Improved cholesterol levels in 2 months",
    rating: 5,
    location: "Mumbai, India"
  },
  {
    name: "Dr. Raj Verma",
    role: "General Practitioner",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    quote: "I recommend DocLumen to my patients for seamless health tracking. The insights help them understand their reports between appointments.",
    progress: "Helping 100+ patients track health",
    rating: 5,
    location: "Delhi, India"
  },
  {
    name: "Priya Nair",
    role: "Marketing Manager", 
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    quote: "The AI doctor feature is incredible! I get instant answers to my health questions, and the advice is always practical and easy to follow.",
    progress: "Better sleep and energy levels",
    rating: 5,
    location: "Bangalore, India"
  },
  {
    name: "Amit Patel",
    role: "Business Owner",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "Managing my family's health records has never been easier. DocLumen keeps everything organized and provides insights I can actually understand.",
    progress: "Organized health records for family of 4",
    rating: 5,
    location: "Ahmedabad, India"
  }
];

export default function TestimonialsCarousel() {
  const [idx, setIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setIdx(current => (current === testimonials.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const prev = () => {
    setIsAutoPlaying(false);
    setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const next = () => {
    setIsAutoPlaying(false);
    setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setIdx(index);
  };

  const t = testimonials[idx];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their health journey with DocLumen
          </p>
        </div>

        <div className="flex flex-col items-center max-w-4xl mx-auto relative">
          <Card className="w-full p-8 bg-gradient-to-br from-medical-light/10 to-medical-secondary/5 border-2 hover:border-medical-primary/30 transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Section */}
              <div className="flex flex-col items-center md:items-start min-w-fit">
                <Avatar className="w-24 h-24 border-4 border-medical-primary/20 mb-4">
                  <AvatarImage src={t.photo} alt={t.name} className="object-cover" />
                  <AvatarFallback className="bg-medical-primary/10 text-medical-primary text-lg font-semibold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="text-center md:text-left">
                  <h4 className="font-bold text-lg text-foreground">{t.name}</h4>
                  <p className="text-medical-primary font-medium">{t.role}</p>
                  <p className="text-sm text-muted-foreground">{t.location}</p>
                  
                  {/* Star Rating */}
                  <div className="flex justify-center md:justify-start gap-1 mt-2">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="flex-1 text-center md:text-left">
                <Quote className="w-8 h-8 text-medical-primary/30 mb-4 mx-auto md:mx-0" />
                <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-4 italic">
                  "{t.quote}"
                </blockquote>
                <div className="inline-flex items-center gap-2 bg-medical-secondary/10 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-medical-secondary rounded-full"></div>
                  <span className="text-sm font-medium text-medical-secondary">{t.progress}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Navigation Controls */}
          <div className="flex gap-4 mt-8 items-center">
            <button
              aria-label="Previous testimonial"
              className="p-3 rounded-full border-2 border-medical-primary/20 hover:border-medical-primary hover:bg-medical-primary/10 transition-all"
              onClick={prev}
            >
              <ChevronLeft className="w-5 h-5 text-medical-primary" />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i === idx 
                      ? "bg-medical-primary scale-125" 
                      : "bg-gray-200 hover:bg-medical-primary/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              aria-label="Next testimonial"
              className="p-3 rounded-full border-2 border-medical-primary/20 hover:border-medical-primary hover:bg-medical-primary/10 transition-all"
              onClick={next}
            >
              <ChevronRight className="w-5 h-5 text-medical-primary" />
            </button>
          </div>

          {/* Auto-play indicator */}
          <div className="mt-4 text-xs text-muted-foreground">
            {isAutoPlaying ? "Auto-playing" : "Auto-play paused"} • {testimonials.length} testimonials
          </div>
        </div>
      </div>
    </section>
  );
}
