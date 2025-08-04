
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
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1",
                active 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 mb-1", 
                active ? "text-blue-600" : "text-slate-600"
              )} />
              <span className={cn(
                "text-xs font-medium truncate",
                active ? "text-blue-600" : "text-slate-600"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
