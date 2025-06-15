
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Sun, Moon, Coffee, Sunset } from 'lucide-react';

export const PersonalizedGreeting: React.FC = () => {
  const { user } = useAuth();
  
  const currentHour = new Date().getHours();
  
  const getGreetingData = () => {
    if (currentHour < 6) return { greeting: 'Good night', icon: Moon, color: 'from-indigo-500 to-purple-600' };
    if (currentHour < 12) return { greeting: 'Good morning', icon: Sun, color: 'from-yellow-400 to-orange-500' };
    if (currentHour < 17) return { greeting: 'Good afternoon', icon: Coffee, color: 'from-blue-400 to-cyan-500' };
    if (currentHour < 21) return { greeting: 'Good evening', icon: Sunset, color: 'from-orange-400 to-red-500' };
    return { greeting: 'Good night', icon: Moon, color: 'from-indigo-500 to-purple-600' };
  };

  const getFirstName = () => {
    if (user?.email) {
      const meta = (user as any).user_metadata;
      if (meta && meta.full_name) {
        return meta.full_name.split(' ')[0];
      }
      return user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1);
    }
    return 'User';
  };

  const getPersonalizedMessage = () => {
    const messages = [
      "Your hydration levels are looking great! Let's focus on improving your vitamin D today.",
      "Great progress on your health goals! Your cholesterol trend is moving in the right direction.",
      "You've been consistent with your health tracking. Keep up the excellent work!",
      "Your recent lab results show improvement. Ready to tackle today's health objectives?",
      "15-day streak! Your dedication to health monitoring is impressive."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const { greeting, icon: GreetingIcon, color } = getGreetingData();

  return (
    <Card className={`col-span-2 p-6 bg-gradient-to-r ${color} text-white relative overflow-hidden`}>
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <Sparkles className="w-full h-full" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <GreetingIcon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              {greeting}, {getFirstName()}!
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Health Champion
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Day 15 Streak
              </Badge>
            </div>
          </div>
        </div>
        
        <p className="text-white/90 mb-4 text-sm leading-relaxed">
          {getPersonalizedMessage()}
        </p>
        
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
            View Progress
          </Button>
          <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
            Quick Health Check
          </Button>
        </div>
      </div>
    </Card>
  );
};
