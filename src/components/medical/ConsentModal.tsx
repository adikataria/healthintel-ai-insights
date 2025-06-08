
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  type: 'analysis' | 'chat';
}

export const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onAccept,
  onDecline,
  type
}) => {
  if (!isOpen) return null;

  const isAnalysis = type === 'analysis';

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-medical-primary">
            <Shield className="h-6 w-6" />
            Data Processing Consent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-sm text-muted-foreground">
            <p className="mb-4">
              {isAnalysis 
                ? "Before we analyze your medical report with AI, please review and consent to our data processing practices."
                : "Before using our AI Doctor chat service, please review and consent to our data processing practices."
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
              <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900">Data Security</h4>
                <p className="text-sm text-blue-700">
                  Your data is encrypted using AES-256 encryption during transmission and storage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <Eye className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-900">Privacy Control</h4>
                <p className="text-sm text-green-700">
                  You can view, update, or delete your data at any time through your account settings.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-purple-900">DPDP Compliance</h4>
                <p className="text-sm text-purple-700">
                  We comply with India's Digital Personal Data Protection Act, 2023.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
              <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-orange-900">Data Usage</h4>
                <p className="text-sm text-orange-700">
                  {isAnalysis 
                    ? "Your report will be processed by AI for analysis only. No data is stored permanently."
                    : "Your chat messages are processed for AI responses and stored for service improvement."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="border-l-4 border-medical-primary bg-medical-light/10 p-4">
            <h4 className="font-semibold text-medical-primary mb-2">Important Medical Disclaimer</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• This AI analysis is for informational purposes only</li>
              <li>• It does not constitute medical advice or diagnosis</li>
              <li>• Always consult qualified healthcare professionals for medical decisions</li>
              <li>• For emergencies, contact your local emergency services immediately</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Your Rights Under DPDP Act</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Right to access your personal data</li>
              <li>• Right to correction and erasure</li>
              <li>• Right to data portability</li>
              <li>• Right to withdraw consent</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onAccept}
              className="flex-1 bg-medical-primary hover:bg-medical-dark"
            >
              I Accept & Consent to Processing
            </Button>
            <Button 
              variant="outline" 
              onClick={onDecline}
              className="flex-1"
            >
              Decline
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            By clicking "I Accept", you agree to our Privacy Policy and Terms of Service. 
            You can withdraw your consent at any time through your account settings.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
