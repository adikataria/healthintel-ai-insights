
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 text-lg">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              By accessing and using DocLumen, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, 
              please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use License</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Permission is granted to temporarily use DocLumen for personal, non-commercial 
              health tracking and analysis purposes. This license shall automatically terminate 
              if you violate any of these restrictions.
            </p>
            <div>
              <h3 className="font-semibold mb-2">You may not:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Modify or copy the service materials</li>
                <li>Use the service for commercial purposes</li>
                <li>Attempt to reverse engineer any software</li>
                <li>Share your account credentials with others</li>
                <li>Upload false or misleading health information</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              <strong>IMPORTANT:</strong> DocLumen is not a medical device and should not be used 
              as a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Always consult your physician for medical advice</li>
              <li>Do not ignore professional medical advice based on our insights</li>
              <li>Seek immediate medical attention for urgent health concerns</li>
              <li>Our AI analysis is for informational purposes only</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Provide accurate and truthful health information</li>
              <li>Maintain the confidentiality of your account</li>
              <li>Report any security vulnerabilities or misuse</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Respect the intellectual property rights of DocLumen</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              DocLumen shall not be liable for any damages arising from the use or inability 
              to use this service, including but not limited to direct, indirect, incidental, 
              punitive, and consequential damages.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              For questions about these Terms of Service, please contact:
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-medium">DocLumen Legal Team</p>
              <p className="text-gray-600">Email: legal@doclumen.com</p>
              <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
