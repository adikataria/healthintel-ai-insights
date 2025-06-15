
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, User, FileText, TrendingUp } from 'lucide-react';

interface UserMemoryProps {
  userProfile?: any;
  recentInteractions?: string[];
  healthTrends?: string[];
  onRecallInteraction?: (interaction: string) => void;
}

export const UserMemoryContext: React.FC<UserMemoryProps> = ({
  userProfile,
  recentInteractions = [],
  healthTrends = [],
  onRecallInteraction
}) => {
  if (!userProfile && recentInteractions.length === 0 && healthTrends.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 space-y-3 animate-fade-in">
      {userProfile && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Your Profile</span>
            </div>
            <p className="text-xs text-blue-700">
              Age: {userProfile.age || 'Not specified'} • 
              Gender: {userProfile.gender || 'Not specified'}
              {userProfile.conditions?.length > 0 && (
                <> • Conditions: {userProfile.conditions.join(', ')}</>
              )}
            </p>
          </CardContent>
        </Card>
      )}

      {recentInteractions.length > 0 && (
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Recent Discussions</span>
            </div>
            <div className="space-y-1">
              {recentInteractions.slice(0, 2).map((interaction, index) => (
                <button
                  key={index}
                  onClick={() => onRecallInteraction?.(interaction)}
                  className="block text-xs text-green-700 hover:text-green-900 hover:underline text-left"
                >
                  "Last time: {interaction}"
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {healthTrends.length > 0 && (
        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Health Trends</span>
            </div>
            <div className="space-y-1">
              {healthTrends.slice(0, 2).map((trend, index) => (
                <p key={index} className="text-xs text-purple-700">
                  {trend}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
