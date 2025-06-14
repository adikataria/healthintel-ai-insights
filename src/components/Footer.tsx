import { Cross } from "lucide-react";
import { Link } from "react-router-dom";
import { Shield, CheckCircle, FileText, Users } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        {/* Security Certifications Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="w-6 h-6 bg-medical-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm font-semibold text-white">HIPAA</div>
                <div className="text-xs text-gray-400">Compliant</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="w-6 h-6 bg-medical-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm font-semibold text-white">ISO</div>
                <div className="text-xs text-gray-400">27001</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="w-6 h-6 bg-medical-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm font-semibold text-white">GDPR</div>
                <div className="text-xs text-gray-400">Ready</div>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 text-center">
                <div className="w-6 h-6 bg-medical-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="text-sm font-semibold text-white">SOC 2</div>
                <div className="text-xs text-gray-400">Type 2</div>
              </div>
            </div>
            
            <div className="text-center lg:text-right">
              <h3 className="text-lg font-semibold text-white mb-2">
                We take security and privacy seriously!
              </h3>
              <Link to="/compliance" className="text-medical-secondary hover:text-medical-light underline">
                View our certifications
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/9dd0010a-1b64-47ed-908f-6e86510d2209.png" 
                alt="DocLumen Logo"
                className="h-8 w-auto"
              />
              <span className="font-montserrat font-bold text-xl text-white">
                DocLumen
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              The intuitive platform and the perfect home for your health management needs. 
              Analyze reports, get AI insights, and track your wellness effortlessly.
            </p>
            <p className="text-sm text-gray-400">
              DocLumen is a <Link to="/" className="text-medical-secondary hover:text-medical-light">health intelligence</Link> product.
            </p>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="font-montserrat font-semibold mb-4 text-white">Products</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/upload" className="hover:text-medical-secondary transition-colors">Report Analysis</Link></li>
              <li><Link to="/chat" className="hover:text-medical-secondary transition-colors">AI Doctor Assistant</Link></li>
              <li><Link to="/insights" className="hover:text-medical-secondary transition-colors">Health Insights</Link></li>
              <li><Link to="/goals" className="hover:text-medical-secondary transition-colors">Health Goals</Link></li>
              <li><Link to="/pricing" className="hover:text-medical-secondary transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-montserrat font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/health-history" className="hover:text-medical-secondary transition-colors">Health History</Link></li>
              <li><Link to="/trends" className="hover:text-medical-secondary transition-colors">Health Trends</Link></li>
              <li><Link to="/insights" className="hover:text-medical-secondary transition-colors">Health Reports</Link></li>
              <li><Link to="/compliance" className="hover:text-medical-secondary transition-colors">Compliance</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-montserrat font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/contact" className="hover:text-medical-secondary transition-colors">About us</Link></li>
              <li><Link to="/contact" className="hover:text-medical-secondary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-medical-secondary transition-colors">Privacy policy</Link></li>
              <li><Link to="/terms" className="hover:text-medical-secondary transition-colors">Terms of service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-medical-secondary transition-colors">Medical Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2024 DocLumen, Inc. All rights reserved. DocLumen® is a registered trademark.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-medical-secondary rounded-full"></div>
                <span className="text-sm text-medical-secondary">All Systems Operational</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              This platform is for informational purposes only and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
