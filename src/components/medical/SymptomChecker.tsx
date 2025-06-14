
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Plus, X, AlertTriangle, Clock, ThermometerSun } from "lucide-react";

interface Symptom {
  id: string;
  description: string;
  duration?: string;
  intensity?: number;
  context?: string;
}

interface SymptomCheckerProps {
  onAnalyze: (symptoms: Symptom[], additionalContext?: string) => void;
  isLoading?: boolean;
}

export const SymptomChecker = ({ onAnalyze, isLoading }: SymptomCheckerProps) => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [currentDuration, setCurrentDuration] = useState('');
  const [currentIntensity, setCurrentIntensity] = useState([5]);
  const [currentContext, setCurrentContext] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');

  const durationOptions = [
    { value: 'minutes', label: 'Few minutes' },
    { value: 'hours', label: 'Few hours' },
    { value: 'days', label: 'Few days' },
    { value: 'weeks', label: 'Few weeks' },
    { value: 'months', label: 'Few months' },
    { value: 'chronic', label: 'Chronic/Long-term' }
  ];

  const commonSymptoms = [
    'Headache', 'Fever', 'Fatigue', 'Nausea', 'Cough', 'Chest pain',
    'Difficulty breathing', 'Dizziness', 'Joint pain', 'Muscle aches',
    'Abdominal pain', 'Loss of appetite', 'Sleep problems'
  ];

  const addSymptom = () => {
    if (!currentSymptom.trim()) return;

    const newSymptom: Symptom = {
      id: Date.now().toString(),
      description: currentSymptom,
      duration: currentDuration,
      intensity: currentIntensity[0],
      context: currentContext
    };

    setSymptoms(prev => [...prev, newSymptom]);
    
    // Reset form
    setCurrentSymptom('');
    setCurrentDuration('');
    setCurrentIntensity([5]);
    setCurrentContext('');
  };

  const removeSymptom = (id: string) => {
    setSymptoms(prev => prev.filter(s => s.id !== id));
  };

  const addCommonSymptom = (symptom: string) => {
    setCurrentSymptom(symptom);
  };

  const handleAnalyze = () => {
    if (symptoms.length === 0) return;
    onAnalyze(symptoms, additionalContext);
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity <= 3) return 'text-green-600';
    if (intensity <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIntensityLabel = (intensity: number) => {
    if (intensity <= 3) return 'Mild';
    if (intensity <= 6) return 'Moderate';
    return 'Severe';
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ThermometerSun className="h-5 w-5 text-medical-primary" />
          Advanced Symptom Checker
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Describe your symptoms in detail for personalized health insights
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Add Common Symptoms */}
        <div>
          <Label className="text-sm font-medium mb-2 block">Common Symptoms</Label>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom) => (
              <Button
                key={symptom}
                variant="outline"
                size="sm"
                onClick={() => addCommonSymptom(symptom)}
                className="h-8 text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                {symptom}
              </Button>
            ))}
          </div>
        </div>

        {/* Add New Symptom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="md:col-span-2">
            <Label htmlFor="symptom">Symptom Description</Label>
            <Input
              id="symptom"
              value={currentSymptom}
              onChange={(e) => setCurrentSymptom(e.target.value)}
              placeholder="e.g., Sharp pain in lower back"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Select value={currentDuration} onValueChange={setCurrentDuration}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="How long?" />
              </SelectTrigger>
              <SelectContent>
                {durationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="intensity">
              Intensity: {currentIntensity[0]}/10 - {' '}
              <span className={getIntensityColor(currentIntensity[0])}>
                {getIntensityLabel(currentIntensity[0])}
              </span>
            </Label>
            <Slider
              value={currentIntensity}
              onValueChange={setCurrentIntensity}
              max={10}
              min={1}
              step={1}
              className="mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="context">Additional Context (Optional)</Label>
            <Textarea
              id="context"
              value={currentContext}
              onChange={(e) => setCurrentContext(e.target.value)}
              placeholder="e.g., Worsens when sitting, started after exercise"
              className="mt-1"
              rows={2}
            />
          </div>

          <div className="md:col-span-2">
            <Button onClick={addSymptom} disabled={!currentSymptom.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Symptom
            </Button>
          </div>
        </div>

        {/* Added Symptoms */}
        {symptoms.length > 0 && (
          <div>
            <Label className="text-sm font-medium mb-3 block">Your Symptoms</Label>
            <div className="space-y-3">
              {symptoms.map((symptom) => (
                <Card key={symptom.id} className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{symptom.description}</h4>
                        {symptom.intensity && (
                          <Badge variant="outline" className={getIntensityColor(symptom.intensity)}>
                            {symptom.intensity}/10
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {symptom.duration && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {durationOptions.find(d => d.value === symptom.duration)?.label}
                          </div>
                        )}
                        {symptom.intensity && symptom.intensity >= 7 && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="h-3 w-3" />
                            High intensity
                          </div>
                        )}
                      </div>
                      {symptom.context && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Context: {symptom.context}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSymptom(symptom.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Additional Context */}
        <div>
          <Label htmlFor="additional">Additional Information (Optional)</Label>
          <Textarea
            id="additional"
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="Any other relevant information about your health or circumstances..."
            className="mt-1"
            rows={3}
          />
        </div>

        {/* Analyze Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleAnalyze}
            disabled={symptoms.length === 0 || isLoading}
            size="lg"
            className="bg-medical-primary hover:bg-medical-dark"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Symptoms...
              </>
            ) : (
              <>
                <ThermometerSun className="h-4 w-4 mr-2" />
                Analyze My Symptoms ({symptoms.length})
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
