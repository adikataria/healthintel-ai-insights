import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useNavigate } from 'react-router-dom';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { 
  Upload as UploadIcon, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Crown,
  Search,
  Settings,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  Bell
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useMedicalAnalysis } from '@/hooks/useMedicalAnalysis';
import { toast } from '@/hooks/use-toast';

const Upload = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { currentSubscription } = useSubscription();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Upload logic and state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [reportTitle, setReportTitle] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState<'pending' | 'analyzing' | 'completed' | 'error'>('pending');
  
  const { uploadReport, isAnalyzing } = useMedicalAnalysis();

  const hasActiveSubscription = currentSubscription?.status === 'active' && currentSubscription?.subscription_plans?.name !== 'Free';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // File upload handlers
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      setReportTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpg', '.jpeg', '.png']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!uploadedFile) return;

    setIsUploading(true);
    setUploadProgress(0);
    setAnalysisStatus('analyzing');

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      await uploadReport.mutateAsync({
        file: uploadedFile,
        title: reportTitle,
        description: reportDescription
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      setAnalysisStatus('completed');
      
      toast({
        title: "Report uploaded successfully!",
        description: "Your medical report has been analyzed and insights are ready.",
      });

      setTimeout(() => {
        navigate('/insights');
      }, 2000);

    } catch (error) {
      setAnalysisStatus('error');
      toast({
        title: "Upload failed",
        description: "There was an error uploading your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setReportTitle('');
    setReportDescription('');
    setUploadProgress(0);
    setAnalysisStatus('pending');
  };

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
              <NotificationCenter />
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
                <div className="sm:hidden">
                  <DropdownMenuItem asChild>
                    <div className="flex items-center p-2">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </div>
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

      <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Upload Medical Report
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your lab reports for AI-powered analysis and insights
          </p>
        </div>

        {/* Upload form and content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadIcon className="h-5 w-5 text-medical-primary" />
                Upload Report
              </CardTitle>
              <CardDescription>
                Upload your medical reports in PDF or image format for instant AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!uploadedFile ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-medical-primary bg-medical-light/10' 
                      : 'border-gray-300 hover:border-medical-primary hover:bg-medical-light/5'
                  }`}
                >
                  <input {...getInputProps()} />
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-medical-primary font-medium">Drop your report here...</p>
                  ) : (
                    <div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Drag & drop your report here
                      </p>
                      <p className="text-gray-500 mb-4">or click to browse files</p>
                      <Button variant="outline" className="border-medical-primary text-medical-primary hover:bg-medical-light/10">
                        Choose File
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-4">
                    Supported formats: PDF, JPG, PNG (Max 10MB)
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-medical-light/10 rounded-lg border border-medical-light">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-medical-primary" />
                      <div>
                        <p className="font-medium text-accent">{uploadedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveFile}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Report Title</Label>
                      <Input
                        id="title"
                        value={reportTitle}
                        onChange={(e) => setReportTitle(e.target.value)}
                        placeholder="Enter a title for your report"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={reportDescription}
                        onChange={(e) => setReportDescription(e.target.value)}
                        placeholder="Add any additional notes about this report"
                        className="mt-1"
                      />
                    </div>

                    <Button
                      onClick={handleUpload}
                      disabled={isUploading || !reportTitle.trim()}
                      className="w-full bg-medical-primary hover:bg-medical-dark text-white"
                    >
                      {isUploading ? 'Uploading...' : 'Upload & Analyze'}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="health-card">
            <CardHeader>
              <CardTitle>Analysis Status</CardTitle>
              <CardDescription>
                Track the progress of your report analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analysisStatus === 'pending' && (
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Upload a report to begin analysis</p>
                  </div>
                )}

                {analysisStatus === 'analyzing' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-medical-primary"></div>
                      <span className="text-medical-primary font-medium">Analyzing report...</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      Our AI is analyzing your medical report. This may take a few moments.
                    </p>
                  </div>
                )}

                {analysisStatus === 'completed' && (
                  <div className="text-center py-4">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Analysis Complete!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your report has been successfully analyzed. Redirecting to insights...
                    </p>
                    <Badge className="bg-green-100 text-green-800">Ready to View</Badge>
                  </div>
                )}

                {analysisStatus === 'error' && (
                  <div className="text-center py-4">
                    <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-red-700 mb-2">Analysis Failed</h3>
                    <p className="text-muted-foreground mb-4">
                      There was an error analyzing your report. Please try uploading again.
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleRemoveFile}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      Try Again
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;
