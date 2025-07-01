
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Calendar, 
  FileText, 
  MessageCircle, 
  TrendingUp,
  Download,
  Eye,
  Clock,
  Tag,
  BarChart3,
  Heart,
  Activity,
  Sparkles
} from "lucide-react";
import { useMedicalReports } from "@/hooks/useMedicalReports";
import { useHealthMilestones } from "@/hooks/useHealthMilestones";
import { format } from "date-fns";

const HealthHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const { reports, isLoading: reportsLoading } = useMedicalReports();
  const { milestones, isLoading: milestonesLoading } = useHealthMilestones();

  // Mock chat history - in a real app, this would come from a hook
  const chatHistory = [
    {
      id: "1",
      query: "What does my cholesterol level mean?",
      response: "Your cholesterol level of 185 mg/dL is within the normal range...",
      timestamp: "2024-01-15T10:30:00Z",
      relatedReport: "Blood Panel - January 2024"
    },
    {
      id: "2",
      query: "How can I improve my blood pressure?",
      response: "Based on your recent readings, here are some lifestyle changes...",
      timestamp: "2024-01-10T14:15:00Z",
      relatedReport: "Physical Exam - January 2024"
    },
  ];

  // Combine all timeline items
  const timelineItems = [
    ...reports.map(report => ({
      id: report.id,
      type: 'report' as const,
      title: report.title,
      description: `Lab report - ${report.file_name}`,
      timestamp: report.created_at,
      status: report.analysis_status,
      icon: FileText,
      data: report
    })),
    ...milestones.map(milestone => ({
      id: milestone.id,
      type: 'milestone' as const,
      title: milestone.title,
      description: milestone.description || 'Health milestone achieved',
      timestamp: milestone.achieved_at,
      status: 'completed',
      icon: TrendingUp,
      data: milestone
    })),
    ...chatHistory.map(chat => ({
      id: chat.id,
      type: 'chat' as const,
      title: chat.query,
      description: chat.response.substring(0, 100) + '...',
      timestamp: chat.timestamp,
      status: 'completed',
      icon: MessageCircle,
      data: chat
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Filter items based on search and filter
  const filteredItems = timelineItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'report':
        return 'bg-blue-100 text-blue-800';
      case 'milestone':
        return 'bg-green-100 text-green-800';
      case 'chat':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'report':
        return FileText;
      case 'milestone':
        return TrendingUp;
      case 'chat':
        return MessageCircle;
      default:
        return Activity;
    }
  };

  if (reportsLoading || milestonesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/30">
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 py-6 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your health history...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/30">
      {/* Dashboard Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 py-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  Health History Repository
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </h1>
                <p className="text-gray-600 mt-1">Your comprehensive health timeline - reports, insights, and interactions in one place</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-medical-primary border-medical-primary">
                {timelineItems.length} Total Items
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold text-medical-primary">{reports.length}</p>
                </div>
                <FileText className="h-8 w-8 text-medical-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Milestones</p>
                  <p className="text-2xl font-bold text-green-600">{milestones.length}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">AI Interactions</p>
                  <p className="text-2xl font-bold text-purple-600">{chatHistory.length}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{timelineItems.length}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-gray-900" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search reports, milestones, or chat history..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('all')}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={selectedFilter === 'report' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('report')}
                  size="sm"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Reports
                </Button>
                <Button
                  variant={selectedFilter === 'milestone' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('milestone')}
                  size="sm"
                >
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Milestones
                </Button>
                <Button
                  variant={selectedFilter === 'chat' ? 'default' : 'outline'}
                  onClick={() => setSelectedFilter('chat')}
                  size="sm"
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  AI Chat
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-medical-primary" />
              Health Timeline ({filteredItems.length} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No items found matching your search criteria.</p>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your search term or filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item, index) => {
                  const Icon = getTypeIcon(item.type);
                  return (
                    <div key={item.id} className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col items-center">
                        <div className={`p-2 rounded-full ${
                          item.type === 'report' ? 'bg-blue-100' :
                          item.type === 'milestone' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          <Icon className={`h-4 w-4 ${
                            item.type === 'report' ? 'text-blue-600' :
                            item.type === 'milestone' ? 'text-green-600' : 'text-purple-600'
                          }`} />
                        </div>
                        {index < filteredItems.length - 1 && (
                          <div className="w-px h-12 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 truncate">{item.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <Badge className={getTypeColor(item.type)}>
                              {item.type}
                            </Badge>
                            <p className="text-xs text-muted-foreground whitespace-nowrap">
                              {format(new Date(item.timestamp), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-muted-foreground">
                              {format(new Date(item.timestamp), 'MMM dd, yyyy • HH:mm')}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {item.type === 'report' && (
                              <>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  View
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Export
                                </Button>
                              </>
                            )}
                            {item.type === 'milestone' && (
                              <Button variant="ghost" size="sm">
                                <Heart className="h-4 w-4 mr-1" />
                                Celebrate
                              </Button>
                            )}
                            {item.type === 'chat' && (
                              <Button variant="ghost" size="sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Continue
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthHistory;
