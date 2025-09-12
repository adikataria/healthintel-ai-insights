import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            DocLumen
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            AI-Powered Health Analytics & Medical Report Analysis Platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 max-w-md mx-auto">
            <Input type="email" placeholder="Your Email" className="flex-1" />
            <Link to="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Try for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">AI Health Reports</h3>
              <p className="text-gray-600">Get instant analysis of your medical reports</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">24/7 AI Doctor</h3>
              <p className="text-gray-600">Chat with our AI medical assistant anytime</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Health Insights</h3>
              <p className="text-gray-600">Track your health trends and progress</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;