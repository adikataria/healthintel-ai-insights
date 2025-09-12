import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; 
import { useAuth } from '@/contexts/AuthContext';

const SimpleDashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Hello {user?.email}! Your health dashboard is ready.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Health Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Upload and analyze your medical reports with AI.</p>
              <Button className="mt-4" size="sm">
                Upload Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Doctor Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Chat with our AI medical assistant for health advice.</p>
              <Button className="mt-4" size="sm">
                Start Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;