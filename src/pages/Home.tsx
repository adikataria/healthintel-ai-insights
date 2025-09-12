
import { EnhancedHealthInsightsDashboard } from "@/components/dashboard/EnhancedHealthInsightsDashboard";

/**
 * Enhanced Dashboard page for signed-in users.
 * Features modern UI, customizable widgets, gamification, and personalized experience.
 */
const Dashboard = () => {
  console.log('Dashboard component rendering...');
  return (
    <div className="min-h-screen bg-background">
      <EnhancedHealthInsightsDashboard />
    </div>
  );
};

export default Dashboard;
