
import { EnhancedHealthInsightsDashboard } from "@/components/dashboard/EnhancedHealthInsightsDashboard";
import MobileBottomNav from "@/components/navigation/MobileBottomNav";
import DashboardMobile from "./Dashboard.mobile";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Enhanced Dashboard page for signed-in users.
 * Features modern UI, customizable widgets, gamification, and personalized experience.
 */
const Dashboard = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <DashboardMobile />;
  }

  return (
    <div className="pb-20 md:pb-0">
      <EnhancedHealthInsightsDashboard />
    </div>
  );
};

export default Dashboard;
