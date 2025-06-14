
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const testimonials = [
  {
    name: "Dr. Ankita Sharma",
    role: "Software Engineer & Health Enthusiast",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    quote: "DocLumen transformed how I understand my health reports. The AI explanations are so clear, it's like having a doctor explain everything in simple terms. Absolutely stunning platform!",
    progress: "Improved cholesterol levels in 2 months",
    rating: 5,
    location: "Mumbai, India",
    verified: true,
    date: "Dec 15, 2024"
  },
  {
    name: "Dr. Raj Verma",
    role: "General Practitioner",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    quote: "I recommend DocLumen to my patients for seamless health tracking. The insights help them understand their reports between appointments. It's a game-changer for patient engagement.",
    progress: "Helping 100+ patients track health",
    rating: 5,
    location: "Delhi, India",
    verified: true,
    date: "Dec 12, 2024"
  },
  {
    name: "Priya Nair",
    role: "Marketing Manager", 
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
    quote: "The AI doctor feature is incredible! I get instant answers to my health questions, and the advice is always practical and easy to follow. Best health app I've ever used.",
    progress: "Better sleep and energy levels",
    rating: 5,
    location: "Bangalore, India",
    verified: true,
    date: "Dec 10, 2024"
  },
  {
    name: "Amit Patel",
    role: "Business Owner",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    quote: "Managing my family's health records has never been easier. DocLumen keeps everything organized and provides insights I can actually understand. Worth every penny!",
    progress: "Organized health records for family of 4",
    rating: 5,
    location: "Ahmedabad, India",
    verified: true,
    date: "Dec 8, 2024"
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(1);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(current => (current === testimonials.length - 1 ? 0 : current + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Responsive visible cards
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < visibleCards; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-medical-primary/10 text-medical-primary">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Healthcare professionals talking about DocLumen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Hear from healthcare professionals and users on their experience with our AI-powered health platform.
          </p>
          <p className="text-sm text-muted-foreground italic">
            Gathering feedback all the time ✓
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <Card key={`${testimonial.name}-${index}`} className="p-6 bg-white border border-gray-200 hover:border-medical-primary/30 transition-all duration-300 hover:shadow-lg">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-medical-primary/20">
                      <AvatarImage src={testimonial.photo} alt={testimonial.name} className="object-cover" />
                      <AvatarFallback className="bg-medical-primary/10 text-medical-primary text-sm font-semibold">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                        {testimonial.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  
                  <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                </div>

                {/* Quote */}
                <div className="mb-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Progress Badge */}
                <div className="mb-4">
                  <Badge variant="outline" className="text-xs bg-medical-secondary/10 text-medical-secondary border-medical-secondary/20">
                    {testimonial.progress}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button className="text-xs text-medical-primary hover:underline">
                    SEE ON X →
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-4">
            <button
              aria-label="Previous testimonial"
              className="p-3 rounded-full border-2 border-medical-primary/20 hover:border-medical-primary hover:bg-medical-primary/10 transition-all disabled:opacity-50"
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? "bg-medical-primary scale-125" 
                      : "bg-gray-300 hover:bg-medical-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              aria-label="Next testimonial"
              className="p-3 rounded-full border-2 border-medical-primary/20 hover:border-medical-primary hover:bg-medical-primary/10 transition-all disabled:opacity-50"
              onClick={next}
            >
              <ChevronRight className="w-5 h-5 text-medical-primary" />
            </button>
          </div>

          {/* Auto-play indicator */}
          <div className="text-center mt-4 text-xs text-muted-foreground">
            {isAutoPlaying ? "Auto-playing" : "Auto-play paused"} • {testimonials.length} testimonials
          </div>
        </div>
      </div>
    </section>
  );
}
