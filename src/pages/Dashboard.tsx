
import { EnhancedHealthInsightsDashboard } from "@/components/dashboard/EnhancedHealthInsightsDashboard";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";

/**
 * Enhanced Dashboard page for signed-in users.
 * Features modern UI, customizable widgets, gamification, and personalized experience.
 */
const Dashboard = () => {
  return (
    <div className="pb-20 md:pb-0">
      <EnhancedHealthInsightsDashboard />
    </div>
  );
};

export default Dashboard;
