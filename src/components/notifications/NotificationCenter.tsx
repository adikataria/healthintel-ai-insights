
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Bell, X, Check, AlertTriangle, Info, Award } from 'lucide-react';
import { useHealthAlerts } from '@/hooks/useHealthAlerts';

export const NotificationCenter = () => {
  const { alerts, markAsRead, dismissAlert, unreadCount } = useHealthAlerts();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return AlertTriangle;
      case 'milestone':
        return Award;
      default:
        return Info;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-l-red-500 bg-red-50';
      case 'high':
        return 'border-l-orange-500 bg-orange-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      default:
        return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative p-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-96 overflow-y-auto" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                {unreadCount} unread
              </Badge>
            )}
          </div>

          {alerts.length === 0 ? (
            <div className="text-center py-6">
              <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.slice(0, 5).map((alert) => {
                const Icon = getAlertIcon(alert.alert_type);
                
                return (
                  <Card
                    key={alert.id}
                    className={`border-l-4 ${getAlertColor(alert.severity)} ${
                      !alert.is_read ? 'ring-1 ring-blue-200' : ''
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          <Icon className="h-4 w-4 text-gray-600 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-sm leading-tight">{alert.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}
                                className="text-xs"
                              >
                                {alert.severity}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(alert.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                          {!alert.is_read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead.mutate(alert.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => dismissAlert.mutate(alert.id)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <CardDescription className="text-xs leading-relaxed">
                        {alert.message}
                      </CardDescription>
                      
                      {alert.metric_name && alert.metric_value && (
                        <div className="mt-2 p-2 bg-white rounded border text-xs">
                          <span className="font-medium">{alert.metric_name}: </span>
                          <span>{alert.metric_value}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
              
              {alerts.length > 5 && (
                <div className="text-center pt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View all notifications
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
