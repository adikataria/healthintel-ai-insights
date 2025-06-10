
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useHealthProfile } from '@/hooks/useHealthProfile';
import { Progress } from '@/components/ui/progress';
import { Heart, User, Activity, FileText, Shield } from 'lucide-react';

interface OnboardingData {
  height?: number;
  weight?: number;
  date_of_birth?: string;
  gender?: string;
  blood_type?: string;
  allergies?: string[];
  medications?: string[];
  medical_history?: any;
  lifestyle_data?: any;
  emergency_contact?: any;
}

const OnboardingFlow = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({});
  const { createProfile } = useHealthProfile();
  
  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      await createProfile.mutateAsync(formData);
      onComplete();
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

  const updateFormData = (data: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <User className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
              <p className="text-gray-600">Let's start with some basic details about you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height || ''}
                  onChange={(e) => updateFormData({ height: parseFloat(e.target.value) || undefined })}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={formData.weight || ''}
                  onChange={(e) => updateFormData({ weight: parseFloat(e.target.value) || undefined })}
                />
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.date_of_birth || ''}
                  onChange={(e) => updateFormData({ date_of_birth: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(value) => updateFormData({ gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Heart className="mx-auto h-12 w-12 text-red-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Medical Information</h2>
              <p className="text-gray-600">Help us understand your medical background</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="bloodType">Blood Type (Optional)</Label>
                <Select onValueChange={(value) => updateFormData({ blood_type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="allergies">Known Allergies (Optional)</Label>
                <Textarea
                  id="allergies"
                  placeholder="List any known allergies, separated by commas"
                  value={formData.allergies?.join(', ') || ''}
                  onChange={(e) => {
                    const allergies = e.target.value.split(',').map(a => a.trim()).filter(Boolean);
                    updateFormData({ allergies });
                  }}
                />
              </div>

              <div>
                <Label htmlFor="medications">Current Medications (Optional)</Label>
                <Textarea
                  id="medications"
                  placeholder="List current medications, separated by commas"
                  value={formData.medications?.join(', ') || ''}
                  onChange={(e) => {
                    const medications = e.target.value.split(',').map(m => m.trim()).filter(Boolean);
                    updateFormData({ medications });
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Activity className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Lifestyle Information</h2>
              <p className="text-gray-600">Tell us about your daily habits and activities</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Exercise Frequency</Label>
                <Select onValueChange={(value) => updateFormData({ 
                  lifestyle_data: { ...formData.lifestyle_data, exercise_frequency: value }
                })}>
                  <SelectTrigger>
                    <SelectValue placeholder="How often do you exercise?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="rarely">Rarely (1-2 times per month)</SelectItem>
                    <SelectItem value="sometimes">Sometimes (1-2 times per week)</SelectItem>
                    <SelectItem value="regularly">Regularly (3-4 times per week)</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Sleep Hours</Label>
                <Select onValueChange={(value) => updateFormData({ 
                  lifestyle_data: { ...formData.lifestyle_data, sleep_hours: value }
                })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Average hours of sleep per night" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<5">Less than 5 hours</SelectItem>
                    <SelectItem value="5-6">5-6 hours</SelectItem>
                    <SelectItem value="7-8">7-8 hours</SelectItem>
                    <SelectItem value="9+">9+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Smoking Status</Label>
                <Select onValueChange={(value) => updateFormData({ 
                  lifestyle_data: { ...formData.lifestyle_data, smoking: value }
                })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select smoking status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never smoked</SelectItem>
                    <SelectItem value="former">Former smoker</SelectItem>
                    <SelectItem value="occasional">Occasional smoker</SelectItem>
                    <SelectItem value="regular">Regular smoker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <FileText className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Medical History</h2>
              <p className="text-gray-600">Share any relevant medical history (Optional)</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="medical-conditions">Chronic Conditions or Past Diagnoses</Label>
                <Textarea
                  id="medical-conditions"
                  placeholder="Describe any chronic conditions, past surgeries, or significant medical events"
                  value={formData.medical_history?.conditions || ''}
                  onChange={(e) => updateFormData({ 
                    medical_history: { 
                      ...formData.medical_history, 
                      conditions: e.target.value 
                    }
                  })}
                />
              </div>

              <div>
                <Label htmlFor="family-history">Family Medical History</Label>
                <Textarea
                  id="family-history"
                  placeholder="Notable family medical history (diabetes, heart disease, cancer, etc.)"
                  value={formData.medical_history?.family_history || ''}
                  onChange={(e) => updateFormData({ 
                    medical_history: { 
                      ...formData.medical_history, 
                      family_history: e.target.value 
                    }
                  })}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="mx-auto h-12 w-12 text-orange-600 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Emergency Contact</h2>
              <p className="text-gray-600">Add an emergency contact for safety (Optional)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="emergency-name">Contact Name</Label>
                <Input
                  id="emergency-name"
                  placeholder="Full name"
                  value={formData.emergency_contact?.name || ''}
                  onChange={(e) => updateFormData({ 
                    emergency_contact: { 
                      ...formData.emergency_contact, 
                      name: e.target.value 
                    }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="emergency-relationship">Relationship</Label>
                <Input
                  id="emergency-relationship"
                  placeholder="e.g., Spouse, Parent, Sibling"
                  value={formData.emergency_contact?.relationship || ''}
                  onChange={(e) => updateFormData({ 
                    emergency_contact: { 
                      ...formData.emergency_contact, 
                      relationship: e.target.value 
                    }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="emergency-phone">Phone Number</Label>
                <Input
                  id="emergency-phone"
                  placeholder="Phone number"
                  value={formData.emergency_contact?.phone || ''}
                  onChange={(e) => updateFormData({ 
                    emergency_contact: { 
                      ...formData.emergency_contact, 
                      phone: e.target.value 
                    }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="emergency-email">Email Address</Label>
                <Input
                  id="emergency-email"
                  type="email"
                  placeholder="Email address"
                  value={formData.emergency_contact?.email || ''}
                  onChange={(e) => updateFormData({ 
                    emergency_contact: { 
                      ...formData.emergency_contact, 
                      email: e.target.value 
                    }
                  })}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold text-gray-900">Welcome to DocLumen AI</CardTitle>
              <CardDescription>Let's set up your health profile to provide personalized insights</CardDescription>
            </div>
            <div className="text-sm text-gray-500">
              Step {step} of {totalSteps}
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        
        <CardContent>
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={createProfile.isPending}
            >
              {step === totalSteps ? 'Complete Setup' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
