
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ChevronRight, BookOpen, Video } from 'lucide-react';

export const EducationalWidget: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(0);
  
  const tips = [
    {
      title: "Did You Know?",
      content: "Drinking water first thing in the morning can boost your metabolism by up to 30% for about an hour!",
      type: "fact",
      action: "Learn More"
    },
    {
      title: "Health Tip",
      content: "Taking a 10-minute walk after meals can significantly help lower blood sugar levels.",
      type: "tip",
      action: "Watch Video"
    },
    {
      title: "Understanding Your Results",
      content: "Your cholesterol levels are categorized as Total, LDL (bad), and HDL (good). Focus on the ratio!",
      type: "education",
      action: "Read Article"
    }
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  const tip = tips[currentTip];

  return (
    <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          {tip.type === 'fact' ? <Lightbulb className="h-5 w-5 text-blue-600" /> :
           tip.type === 'tip' ? <Video className="h-5 w-5 text-blue-600" /> :
           <BookOpen className="h-5 w-5 text-blue-600" />}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-blue-900 text-sm mb-1">{tip.title}</h4>
          <p className="text-sm text-blue-800 leading-relaxed mb-3">{tip.content}</p>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" className="text-xs border-blue-300 text-blue-700 hover:bg-blue-100">
              {tip.action}
            </Button>
            <Button variant="ghost" size="sm" onClick={nextTip} className="text-xs text-blue-600 p-1">
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-3 gap-1">
        {tips.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentTip ? 'bg-blue-500' : 'bg-blue-200'
            }`}
          />
        ))}
      </div>
    </Card>
  );
};
