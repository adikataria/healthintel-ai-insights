
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface FollowUpQuestion {
  id: string;
  question: string;
  options?: string[];
  type: 'multiple-choice' | 'text' | 'yes-no';
}

interface ConversationalFlowProps {
  questions: FollowUpQuestion[];
  onAnswerSubmit: (questionId: string, answer: string) => void;
  onFlowComplete: (answers: Record<string, string>) => void;
  isActive: boolean;
}

export const ConversationalFlow: React.FC<ConversationalFlowProps> = ({
  questions,
  onAnswerSubmit,
  onFlowComplete,
  isActive
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  if (!isActive || questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer.trim()) return;

    const newAnswers = { ...answers, [currentQuestion.id]: selectedAnswer };
    setAnswers(newAnswers);
    onAnswerSubmit(currentQuestion.id, selectedAnswer);

    if (isLastQuestion) {
      onFlowComplete(newAnswers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
    }
  };

  return (
    <Card className="mb-4 animate-fade-in border-medical-primary/20">
      <CardContent className="p-4">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-medical-primary rounded-full animate-pulse"></div>
            <span className="text-sm text-medical-primary font-medium">
              Follow-up Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-3">
            {currentQuestion.question}
          </h3>
        </div>

        {currentQuestion.type === 'multiple-choice' && (
          <div className="space-y-2 mb-4">
            {currentQuestion.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                  selectedAnswer === option
                    ? 'border-medical-primary bg-medical-light text-medical-primary'
                    : 'border-gray-200 hover:border-medical-primary/50 hover:bg-gray-50'
                }`}
              >
                {selectedAnswer === option ? (
                  <CheckCircle className="h-5 w-5 text-medical-primary" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm">{option}</span>
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'yes-no' && (
          <div className="flex gap-2 mb-4">
            {['Yes', 'No'].map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(option)}
                className={`flex-1 p-3 rounded-lg border transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'border-medical-primary bg-medical-primary text-white'
                    : 'border-gray-200 hover:border-medical-primary text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQuestion.type === 'text' && (
          <div className="mb-4">
            <textarea
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              placeholder="Please describe in detail..."
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-medical-primary focus:outline-none resize-none"
              rows={3}
            />
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index < currentQuestionIndex
                    ? 'bg-medical-primary'
                    : index === currentQuestionIndex
                    ? 'bg-medical-primary animate-pulse'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer.trim()}
            className="bg-medical-primary hover:bg-medical-dark text-white"
          >
            {isLastQuestion ? 'Complete' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
