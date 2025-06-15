
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Stethoscope, Heart, Brain, Activity, Clock } from 'lucide-react';

interface ConversationalSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  userContext?: {
    hasSymptoms?: boolean;
    hasPreviousVisit?: boolean;
    hasLabReports?: boolean;
  };
}

export const ConversationalSuggestions: React.FC<ConversationalSuggestionsProps> = ({
  onSuggestionClick,
  userContext = {}
}) => {
  const getContextualSuggestions = () => {
    if (userContext.hasSymptoms) {
      return [
        { icon: Stethoscope, text: "How long have you been experiencing these symptoms?", category: "follow-up" },
        { icon: Activity, text: "Rate your symptoms on a scale of 1-10", category: "assessment" },
        { icon: Clock, text: "What makes your symptoms better or worse?", category: "details" }
      ];
    }

    if (userContext.hasPreviousVisit) {
      return [
        { icon: Heart, text: "How are you feeling since our last conversation?", category: "follow-up" },
        { icon: Activity, text: "Any changes in your condition?", category: "update" },
        { icon: Brain, text: "Are you following the recommendations we discussed?", category: "adherence" }
      ];
    }

    return [
      { icon: MessageSquare, text: "I'm experiencing some symptoms and need guidance", category: "symptoms" },
      { icon: Heart, text: "I'd like a general health check-up discussion", category: "checkup" },
      { icon: Brain, text: "Help me understand my recent lab results", category: "labs" },
      { icon: Activity, text: "I need advice on preventive care", category: "prevention" }
    ];
  };

  const suggestions = getContextualSuggestions();

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="text-center mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">How can I help you today?</h3>
        <p className="text-xs sm:text-sm text-gray-600">Choose a topic or ask me anything about your health</p>
      </div>
      
      <div className="grid gap-2 sm:gap-3">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={() => onSuggestionClick(suggestion.text)}
            className="h-auto p-3 sm:p-4 text-left justify-start bg-gradient-to-r from-white to-gray-50 hover:from-medical-light hover:to-medical-light/50 border border-gray-200 hover:border-medical-primary/30 transition-all duration-300 hover:shadow-md group"
          >
            <div className="flex items-start gap-2 sm:gap-3 w-full">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-medical-primary/10 flex items-center justify-center group-hover:bg-medical-primary/20 transition-colors flex-shrink-0">
                <suggestion.icon className="h-4 w-4 sm:h-5 sm:w-5 text-medical-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1 leading-tight">{suggestion.text}</p>
                <p className="text-xs text-gray-500 capitalize">{suggestion.category}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
