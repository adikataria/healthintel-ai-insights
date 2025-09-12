import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Upload, MessageSquare, Camera, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    {
      icon: Upload,
      label: 'Upload Report',
      href: '/upload',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: MessageSquare,
      label: 'AI Chat',
      href: '/chat',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: Camera,
      label: 'Scan Document',
      href: '/upload?mode=camera',
      color: 'bg-purple-500 hover:bg-purple-600'
    }
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="md:hidden fixed bottom-20 right-4 z-50">
      {/* Action Buttons */}
      <div className={cn(
        "flex flex-col-reverse gap-3 mb-3 transition-all duration-300",
        isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {actions.map((action, index) => (
          <Link key={action.href} to={action.href}>
            <Button
              size="lg"
              className={cn(
                "w-14 h-14 rounded-full shadow-lg text-white border-2 border-white/20 haptic-feedback transition-all duration-300",
                action.color,
                `animate-bounce-in`,
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setIsExpanded(false)}
            >
              <action.icon className="h-6 w-6" />
            </Button>
          </Link>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="lg"
        onClick={toggleExpanded}
        className={cn(
          "w-16 h-16 rounded-full bg-medical-primary hover:bg-medical-dark text-white shadow-2xl border-4 border-white/20 haptic-feedback transition-all duration-300 animate-pulse-glow",
          isExpanded && "rotate-45"
        )}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </Button>

      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default FloatingActionButton;