
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, Star, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analysisType: 'lab-analyzer' | 'ai-doctor' | 'general';
}

export const FeedbackDialog = ({ open, onOpenChange, analysisType }: FeedbackDialogProps) => {
  const [step, setStep] = useState<'rating' | 'details' | 'submitted'>('rating');
  const [overallRating, setOverallRating] = useState<string>('');
  const [accuracy, setAccuracy] = useState<string>('');
  const [usefulness, setUsefulness] = useState<string>('');
  const [easeOfUse, setEaseOfUse] = useState<string>('');
  const [comments, setComments] = useState('');
  const [improvements, setImprovements] = useState('');
  const { toast } = useToast();

  const handleRatingSubmit = () => {
    if (overallRating && accuracy && usefulness && easeOfUse) {
      setStep('details');
    } else {
      toast({
        title: "Please complete all ratings",
        description: "We need your feedback on all aspects to improve our service.",
        variant: "destructive"
      });
    }
  };

  const handleFinalSubmit = () => {
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', {
      analysisType,
      overallRating,
      accuracy,
      usefulness,
      easeOfUse,
      comments,
      improvements,
      timestamp: new Date().toISOString()
    });

    setStep('submitted');
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve our AI analysis capabilities.",
    });

    // Auto-close after showing success message
    setTimeout(() => {
      onOpenChange(false);
      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setStep('rating');
    setOverallRating('');
    setAccuracy('');
    setUsefulness('');
    setEaseOfUse('');
    setComments('');
    setImprovements('');
  };

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  const RatingOptions = ({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) => (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-accent">{label}</Label>
      <RadioGroup value={value} onValueChange={onChange} className="flex flex-wrap gap-2">
        <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
          <RadioGroupItem value="excellent" id={`${label}-excellent`} />
          <Label htmlFor={`${label}-excellent`} className="text-sm text-green-800 cursor-pointer">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              Excellent
            </div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
          <RadioGroupItem value="good" id={`${label}-good`} />
          <Label htmlFor={`${label}-good`} className="text-sm text-blue-800 cursor-pointer">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-3 w-3" />
              Good
            </div>
          </Label>
        </div>
        <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-lg border border-yellow-200">
          <RadioGroupItem value="average" id={`${label}-average`} />
          <Label htmlFor={`${label}-average`} className="text-sm text-yellow-800 cursor-pointer">Average</Label>
        </div>
        <div className="flex items-center space-x-2 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
          <RadioGroupItem value="poor" id={`${label}-poor`} />
          <Label htmlFor={`${label}-poor`} className="text-sm text-red-800 cursor-pointer">
            <div className="flex items-center gap-1">
              <ThumbsDown className="h-3 w-3" />
              Poor
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            {step === 'submitted' ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Thank You!
              </>
            ) : (
              <>
                <Star className="h-5 w-5 text-medical-primary" />
                Help Us Improve
              </>
            )}
          </DialogTitle>
          <DialogDescription>
            {step === 'rating' && "Rate your experience with our AI Lab Report Analyzer"}
            {step === 'details' && "Share additional details about your experience"}
            {step === 'submitted' && "Your feedback has been submitted successfully"}
          </DialogDescription>
        </DialogHeader>

        {step === 'rating' && (
          <div className="space-y-6 py-4">
            <RatingOptions
              value={overallRating}
              onChange={setOverallRating}
              label="Overall Experience"
            />
            
            <RatingOptions
              value={accuracy}
              onChange={setAccuracy}
              label="Analysis Accuracy"
            />
            
            <RatingOptions
              value={usefulness}
              onChange={setUsefulness}
              label="Insights Usefulness"
            />
            
            <RatingOptions
              value={easeOfUse}
              onChange={setEaseOfUse}
              label="Ease of Use"
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleRatingSubmit} className="bg-medical-primary hover:bg-medical-dark">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="comments" className="text-sm font-medium text-accent">
                Additional Comments (Optional)
              </Label>
              <Textarea
                id="comments"
                placeholder="Share what you liked most about the analysis, or any specific insights that were particularly helpful..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="improvements" className="text-sm font-medium text-accent">
                Suggestions for Improvement (Optional)
              </Label>
              <Textarea
                id="improvements"
                placeholder="How can we make the analyzer better? Any features you'd like to see added or improved..."
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            <Card className="bg-medical-light/10 border-medical-primary/20">
              <CardContent className="p-4">
                <h4 className="font-medium text-accent mb-2">Your Ratings Summary:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span>Overall: <span className="font-medium capitalize">{overallRating}</span></span>
                  <span>Accuracy: <span className="font-medium capitalize">{accuracy}</span></span>
                  <span>Usefulness: <span className="font-medium capitalize">{usefulness}</span></span>
                  <span>Ease of Use: <span className="font-medium capitalize">{easeOfUse}</span></span>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep('rating')}>
                Back
              </Button>
              <Button onClick={handleFinalSubmit} className="bg-medical-primary hover:bg-medical-dark">
                <Send className="h-4 w-4 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </div>
        )}

        {step === 'submitted' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg text-accent mb-2">Feedback Submitted!</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Thank you for helping us improve our AI analysis capabilities. Your feedback is valuable to us.
            </p>
            <p className="text-xs text-muted-foreground">
              This dialog will close automatically...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
