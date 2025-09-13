
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Upload, 
  BarChart3, 
  MessageSquare, 
  User,
  Target,
  FileText,
  History
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Upload, label: 'Upload', path: '/upload' },
    { icon: BarChart3, label: 'Trends', path: '/trends' },
    { icon: MessageSquare, label: 'AI Chat', path: '/chat' },
    { icon: User, label: 'Profile', path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/20 z-50 shadow-2xl">
      <div className="flex justify-around items-center py-1 px-1 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "mobile-nav-item flex-1 haptic-feedback touch-manipulation",
                active 
                  ? "text-medical-primary bg-medical-primary/10 border border-medical-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 mb-1 transition-all duration-200", 
                active ? "text-medical-primary scale-110" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-xs font-medium truncate transition-all duration-200",
                active ? "text-medical-primary font-semibold" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
              {active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-medical-primary rounded-full animate-bounce-in"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
