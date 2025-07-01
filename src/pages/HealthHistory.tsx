
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar,
  Search,
  Filter,
  Download,
  FileText,
  Activity,
  Heart,
  Pill,
  Stethoscope,
  Clock,
  User,
  MapPin
} from 'lucide-react';
import { useMedicalReports } from '@/hooks/useMedicalReports';

const HealthHistory = () => {
  const { reports, isLoading } = useMedicalReports();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredReports = reports?.filter(report => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const matchesSearch = searchRegex.test(report.title) || searchRegex.test(report.file_name);

    if (selectedFilter === 'all') {
      return matchesSearch;
    } else {
      // Since file_type doesn't exist on MedicalReport, we'll check file_name extension
      const fileExtension = report.file_name.split('.').pop()?.toLowerCase() || '';
      return matchesSearch && fileExtension.includes(selectedFilter);
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    if (extension === 'pdf') return <FileText className="h-4 w-4 mr-2 text-red-500" />;
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return <FileText className="h-4 w-4 mr-2 text-blue-500" />;
    return <FileText className="h-4 w-4 mr-2 text-gray-500" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gray-50">
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
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Dashboard Style Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-accent mb-2">
                Health History
              </h1>
              <p className="text-lg text-muted-foreground">
                Complete timeline of your medical records and reports
              </p>
            </div>
            <div className="flex items-center gap-3">
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
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <Select onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF Reports</SelectItem>
                <SelectItem value="jpg">Images</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Health History Timeline */}
        {filteredReports && filteredReports.length > 0 ? (
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <Card key={report.id} className="health-card">
                <CardHeader className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold">{report.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {formatDate(report.created_at)}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="opacity-75">
                    {getFileIcon(report.file_name)}
                    {report.file_name.split('.').pop()?.toUpperCase()}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Clock className="h-4 w-4" />
                        Uploaded On: {formatDate(report.created_at)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <User className="h-4 w-4" />
                        Report ID: {report.id.slice(0, 8)}...
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        Status: {report.analysis_status}
                      </div>
                    </div>
                    <div>
                      <p>
                        {/* Add any additional report details or analysis summary here */}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="health-card">
            <CardContent className="text-center py-8">
              <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
              <p className="text-gray-600">
                Upload your medical reports to start building your health history
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HealthHistory;
