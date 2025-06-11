
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          <h1 className="text-4xl font-bold text-gray-900">Medical Disclaimer</h1>
        </div>
        <p className="text-gray-600 text-lg">
          Important information about the use of DocLumen
        </p>
      </div>

      <div className="space-y-8">
        <Card className="border-l-4 border-l-red-500 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Important Warning</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 font-medium">
              DocLumen is NOT a medical device and should NEVER be used as a substitute 
              for professional medical advice, diagnosis, or treatment. Always seek the 
              advice of your physician or other qualified health provider with any questions 
              you may have regarding a medical condition.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>No Medical Advice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              The information provided by DocLumen, including AI-generated insights and 
              analysis, is for informational and educational purposes only and should not 
              be construed as medical advice.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>We do not diagnose, treat, cure, or prevent any disease</li>
              <li>Our AI analysis does not replace laboratory interpretation</li>
              <li>Results should always be reviewed with a healthcare professional</li>
              <li>Individual results may vary significantly</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Situations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              <strong>If you are experiencing a medical emergency, do not use DocLumen.</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Call emergency services (911) immediately</li>
              <li>Go to the nearest emergency room</li>
              <li>Contact your healthcare provider directly</li>
              <li>Do not delay seeking emergency care</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accuracy and Reliability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              While we strive for accuracy, DocLumen cannot guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>100% accuracy of AI-generated insights</li>
              <li>Real-time processing of critical values</li>
              <li>Detection of all potential health issues</li>
              <li>Compatibility with all laboratory formats</li>
              <li>Interpretation of complex or rare conditions</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Consultation Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              You should consult with a healthcare professional before:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Making any health-related decisions</li>
              <li>Starting or stopping medications</li>
              <li>Changing your diet or exercise routine</li>
              <li>Interpreting laboratory results</li>
              <li>Addressing health concerns or symptoms</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regulatory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              DocLumen has not been evaluated by the Food and Drug Administration (FDA) 
              and is not intended to diagnose, treat, cure, or prevent any disease. This 
              service is not regulated as a medical device under FDA guidelines.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Healthcare Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              For medical questions or concerns, please contact your healthcare provider 
              directly. For technical support with DocLumen, contact our support team 
              at support@doclumen.com.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Disclaimer;
