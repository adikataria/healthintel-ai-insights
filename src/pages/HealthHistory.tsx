
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Calendar, Download, Search, Filter, Clock, Activity, User, LogOut, Settings, Moon, Bell, Menu, Crown, X } from 'lucide-react';
import { useMedicalReports } from '@/hooks/useMedicalReports';
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const HealthHistory = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { currentSubscription } = useSubscription();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { reports, isLoading } = useMedicalReports();

  const hasActiveSubscription = currentSubscription?.status === 'active' && currentSubscription?.subscription_plans?.name !== 'Free';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container max-w-6xl">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your health history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      {/* Dashboard Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 px-2 sm:px-4 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 sm:p-2"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
            
            <div className="relative flex-1 max-w-xs sm:max-w-sm lg:max-w-md">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-7 sm:pl-10 w-full h-8 sm:h-9 bg-slate-100 border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1 sm:p-2"
            >
              <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            
            <div className="hidden sm:block">
              <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                <Bell className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
            
            {!hasActiveSubscription && (
              <Button 
                onClick={() => navigate('/pricing')}
                className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-semibold px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
              >
                <Crown className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">UPGRADE</span>
                <span className="sm:hidden">UP</span>
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 sm:gap-2 p-1 sm:p-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-slate-200 rounded-full flex items-center justify-center">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-slate-700 max-w-20 truncate">
                    {user?.email?.split('@')[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 z-50 bg-white">
                <DropdownMenuItem asChild>
                  <button onClick={() => navigate('/settings')} className="flex items-center w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-2 sm:p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Health History
          </h1>
          <p className="text-xl text-muted-foreground">
            Track and manage your complete health journey
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-accent">{reports.length}</p>
                </div>
                <FileText className="h-8 w-8 text-medical-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Upload</p>
                  <p className="text-2xl font-bold text-accent">
                    {reports.length > 0 ? 
                      new Date(reports[0].created_at).toLocaleDateString() : 
                      'No uploads'
                    }
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-medical-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="health-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Analysis Status</p>
                  <p className="text-2xl font-bold text-green-600">
                    {reports.filter(r => r.analysis_status === 'completed').length} Complete
                  </p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="reports" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Lab Reports
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reports">
            <Card className="health-card">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle>Lab Reports ({reports.length})</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {reports.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reports uploaded yet</h3>
                    <p className="text-gray-600 mb-4">Start by uploading your first lab report</p>
                    <Button onClick={() => navigate('/upload')} className="bg-medical-primary hover:bg-medical-dark text-white">
                      Upload Report
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-accent">{report.title}</h3>
                              <Badge className={getStatusColor(report.analysis_status || 'pending')}>
                                {report.analysis_status || 'pending'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">
                              File: {report.file_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Uploaded: {new Date(report.created_at).toLocaleDateString()}
                            </p>
                            {report.ai_insights?.healthIndicators && (
                              <p className="text-sm text-medical-primary mt-2">
                                {report.ai_insights.healthIndicators.length} health parameters analyzed
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card className="health-card">
              <CardHeader>
                <CardTitle>Health Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                {reports.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No timeline data</h3>
                    <p className="text-gray-600">Upload reports to see your health timeline</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {reports.map((report, index) => (
                      <div key={report.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-medical-primary rounded-full"></div>
                          {index < reports.length - 1 && (
                            <div className="w-px h-16 bg-gray-300 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-accent">Lab Report Analyzed</h3>
                              <span className="text-sm text-muted-foreground">
                                {new Date(report.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {report.title} - {report.file_name}
                            </p>
                            {report.ai_insights?.healthIndicators && (
                              <div className="mt-3">
                                <h4 className="text-sm font-medium mb-2">Key Findings:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {report.ai_insights.healthIndicators.slice(0, 3).map((indicator: any, idx: number) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {indicator.parameter}: {indicator.status}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HealthHistory;
