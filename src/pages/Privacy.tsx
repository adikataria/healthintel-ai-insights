
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Privacy = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-600 text-lg">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Personal Information</h3>
              <p className="text-gray-600">
                We collect information you provide directly, including your name, email address, 
                health profile data, and medical reports you upload.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Health Data</h3>
              <p className="text-gray-600">
                Medical reports, lab results, health metrics, and AI-generated insights are 
                stored securely and encrypted.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Usage Data</h3>
              <p className="text-gray-600">
                We collect information about how you use our service, including features 
                accessed and interaction patterns.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Provide and improve our health analytics services</li>
              <li>Generate AI-powered health insights and recommendations</li>
              <li>Communicate with you about your account and services</li>
              <li>Ensure the security and integrity of our platform</li>
              <li>Comply with legal obligations and protect user safety</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your health data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>End-to-end encryption for all health data</li>
              <li>Secure cloud storage with regular backups</li>
              <li>Multi-factor authentication options</li>
              <li>Regular security audits and compliance monitoring</li>
              <li>HIPAA-compliant data handling procedures</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate data</li>
              <li>Delete your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>Opt out of certain data processing activities</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              If you have questions about this Privacy Policy or our data practices, 
              please contact us at:
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-medium">DocLumen Privacy Team</p>
              <p className="text-gray-600">Email: privacy@doclumen.com</p>
              <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
