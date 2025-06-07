
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, FileText, Image, AlertCircle, CheckCircle, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

const Upload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'processing' | 'complete'>('idle');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const isValidType = file.type.includes('pdf') || file.type.includes('image') || file.type.includes('text');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isValidType) {
        toast.error(`${file.name} is not a supported file type`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) added successfully`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'text/*': ['.txt']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    toast.success("File removed");
  };

  const simulateUpload = async () => {
    setIsUploading(true);
    setAnalysisStatus('processing');
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setAnalysisStatus('complete');
          toast.success("Files uploaded and analyzed successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return <FileText className="h-5 w-5 text-red-500" />;
    if (file.type.includes('image')) return <Image className="h-5 w-5 text-blue-500" />;
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Upload Your Lab Reports
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your medical reports and let our AI provide instant health insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadIcon className="h-5 w-5 text-medical-primary" />
                Upload Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive 
                    ? 'border-medical-primary bg-medical-light/10' 
                    : 'border-gray-300 hover:border-medical-primary hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <UploadIcon className="h-12 w-12 text-medical-primary mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-medical-primary font-medium">Drop the files here...</p>
                ) : (
                  <div>
                    <p className="text-accent font-medium mb-2">
                      Drag & drop your files here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, JPG, PNG, TXT files up to 10MB
                    </p>
                  </div>
                )}
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Uploaded Files ({uploadedFiles.length})</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file)}
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <Button 
                  onClick={simulateUpload}
                  disabled={isUploading}
                  className="w-full mt-4 bg-medical-primary hover:bg-medical-dark"
                >
                  {isUploading ? "Processing..." : "Analyze Reports"}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Analysis Status */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {analysisStatus === 'idle' && <AlertCircle className="h-5 w-5 text-gray-400" />}
                {analysisStatus === 'processing' && <UploadIcon className="h-5 w-5 text-medical-primary animate-spin" />}
                {analysisStatus === 'complete' && <CheckCircle className="h-5 w-5 text-green-500" />}
                Analysis Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysisStatus === 'idle' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-muted-foreground">
                    Upload your lab reports to begin AI analysis
                  </p>
                </div>
              )}

              {analysisStatus === 'processing' && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                      <UploadIcon className="h-8 w-8 text-white animate-spin" />
                    </div>
                    <p className="font-medium text-accent">Analyzing your reports...</p>
                    <p className="text-sm text-muted-foreground">
                      Our AI is extracting and interpreting your health data
                    </p>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-center text-muted-foreground">
                    {uploadProgress}% complete
                  </p>
                </div>
              )}

              {analysisStatus === 'complete' && (
                <div className="space-y-4">
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="font-medium text-accent">Analysis Complete!</p>
                    <p className="text-sm text-muted-foreground">
                      Your health insights are ready to view
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm font-medium text-green-800">✓ Data extracted successfully</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-800">✓ Medical terms decoded</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <p className="text-sm font-medium text-purple-800">✓ Personalized insights generated</p>
                    </div>
                  </div>

                  <Button className="w-full bg-medical-primary hover:bg-medical-dark" asChild>
                    <a href="/insights">View Your Health Insights</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="health-card mt-8">
          <CardContent className="p-6">
            <h3 className="font-montserrat font-semibold text-lg mb-4 text-accent">
              What happens after upload?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-medical-primary" />
                </div>
                <h4 className="font-medium mb-2">Data Extraction</h4>
                <p className="text-sm text-muted-foreground">
                  AI reads and extracts key health metrics from your reports
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <AlertCircle className="h-6 w-6 text-medical-primary" />
                </div>
                <h4 className="font-medium mb-2">Medical Translation</h4>
                <p className="text-sm text-muted-foreground">
                  Complex medical terms are simplified into understandable insights
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-medical-primary" />
                </div>
                <h4 className="font-medium mb-2">Personalized Recommendations</h4>
                <p className="text-sm text-muted-foreground">
                  Get tailored health advice based on your specific results
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
