
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Landing from "@/pages/Landing";
import Upload from "@/pages/Upload";
import Insights from "@/pages/Insights";
import Goals from "@/pages/Goals";
import HealthHistory from "@/pages/HealthHistory";
import Compliance from "@/pages/Compliance";
import Chat from "@/pages/Chat";
import Trends from "@/pages/Trends";
import Settings from "@/pages/Settings";
import FamilyManagement from "@/pages/FamilyManagement";
import Auth from "@/pages/Auth";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Disclaimer from "@/pages/Disclaimer";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import AILabAnalyzer from "@/pages/AILabAnalyzer";
import AIDoctor from "@/pages/AIDoctor";
import Pricing from "@/pages/Pricing";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  
  // Routes where footer should be hidden (protected/dashboard routes)
  const hideFooterRoutes = [
    '/dashboard',
    '/upload',
    '/insights',
    '/goals',
    '/health-history',
    '/chat',
    '/trends',
    '/settings',
    '/family'
  ];
  
  const shouldHideFooter = hideFooterRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/ai-lab-analyzer" element={<AILabAnalyzer />} />
          <Route path="/ai-doctor" element={<AIDoctor />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* Main dashboard route for signed-in users */}
          <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><Insights /></ProtectedRoute>} />
          <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
          <Route path="/health-history" element={<ProtectedRoute><HealthHistory /></ProtectedRoute>} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="/trends" element={<ProtectedRoute><Trends /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/family" element={<ProtectedRoute><FamilyManagement /></ProtectedRoute>} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <AppContent />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
