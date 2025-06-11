
import { Cross } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-accent text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 medical-gradient rounded-lg flex items-center justify-center">
                <Cross className="h-5 w-5 text-white" />
              </div>
              <span className="font-montserrat font-bold text-xl">
                DocLumen
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering individuals with AI-powered health insights through 
              intelligent lab report analysis and personalized preventative care recommendations.
            </p>
            <p className="text-sm text-gray-400">
              © 2024 DocLumen. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/upload" className="hover:text-white transition-colors">Upload Reports</Link></li>
              <li><Link to="/chat" className="hover:text-white transition-colors">AI Assistant</Link></li>
              <li><Link to="/insights" className="hover:text-white transition-colors">Health Insights</Link></li>
              <li><Link to="/goals" className="hover:text-white transition-colors">Health Goals</Link></li>
              <li><Link to="/health-history" className="hover:text-white transition-colors">Health History</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-montserrat font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white transition-colors">Medical Disclaimer</Link></li>
              <li><Link to="/compliance" className="hover:text-white transition-colors">Compliance</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p className="text-sm">
            This platform is for informational purposes only and should not replace professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};
