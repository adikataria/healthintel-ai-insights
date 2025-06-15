
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, User, FileText, TrendingUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SmartMemoryPanelProps {
  userProfile?: any;
  recentInteractions?: string[];
  healthTrends?: string[];
  onRecallInteraction?: (interaction: string) => void;
  onViewHistory?: () => void;
}

export const SmartMemoryPanel: React.FC<SmartMemoryPanelProps> = ({
  userProfile,
  recentInteractions = [],
  healthTrends = [],
  onRecallInteraction,
  onViewHistory
}) => {
  if (!userProfile && recentInteractions.length === 0 && healthTrends.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 space-y-3 animate-fade-in">
      {userProfile && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Your Health Profile</h3>
                <p className="text-sm text-blue-700">Personalized insights ready</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/60 rounded-lg p-2">
                <span className="text-blue-600 font-medium">Age:</span>
                <span className="ml-2 text-blue-800">{userProfile.age || 'Not set'}</span>
              </div>
              <div className="bg-white/60 rounded-lg p-2">
                <span className="text-blue-600 font-medium">Gender:</span>
                <span className="ml-2 text-blue-800">{userProfile.gender || 'Not set'}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {recentInteractions.length > 0 && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-900">Recent Conversations</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={onViewHistory} className="text-green-700 hover:text-green-900">
                <MessageCircle className="h-4 w-4 mr-1" />
                View All
              </Button>
            </div>
            <div className="space-y-2">
              {recentInteractions.slice(0, 2).map((interaction, index) => (
                <button
                  key={index}
                  onClick={() => onRecallInteraction?.(interaction)}
                  className="w-full text-left p-3 bg-white/60 hover:bg-white/80 rounded-lg transition-all duration-200 hover:shadow-sm"
                >
                  <p className="text-sm text-green-800 line-clamp-2">
                    💬 {interaction}
                  </p>
                  <p className="text-xs text-green-600 mt-1">Click to continue this topic</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {healthTrends.length > 0 && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-purple-900">Health Insights</h3>
            </div>
            <div className="space-y-2">
              {healthTrends.slice(0, 2).map((trend, index) => (
                <div key={index} className="p-3 bg-white/60 rounded-lg">
                  <p className="text-sm text-purple-800">📊 {trend}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
