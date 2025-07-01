
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload as UploadIcon, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  X,
  Plus,
  History,
  Sparkles
} from 'lucide-react';
import { useMedicalAnalysis } from '@/hooks/useMedicalAnalysis';
import { ReportAnalysis } from '@/components/medical/ReportAnalysis';
import { toast } from 'sonner';

const Upload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [analysisResults, setAnalysisResults] = useState<any[]>([]);
  
  const { analyzeReport, isLoading } = useMedicalAnalysis();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter(file => {
      const isValidType = file.type === 'application/pdf' || file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        toast.error(`${file.name} is not a supported file type. Please upload PDF or image files.`);
        return false;
      }
      
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Please upload files smaller than 10MB.`);
        return false;
      }
      
      return true;
    });

    setSelectedFiles(prev => [...prev, ...validFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    multiple: true,
    disabled: isLoading
  });

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleAnalysis = async () => {
    if (selectedFiles.length === 0) return;

    const results = [];
    
    for (const file of selectedFiles) {
      try {
        const result = await analyzeReport(file);
        results.push({ file: file.name, result, success: true });
      } catch (error) {
        results.push({ 
          file: file.name, 
          error: error instanceof Error ? error.message : 'Analysis failed', 
          success: false 
        });
      }
    }
    
    setAnalysisResults(results);
    setSelectedFiles([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-teal-50/30">
      {/* Dashboard Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-4 py-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-medical-primary to-medical-secondary rounded-xl flex items-center justify-center shadow-lg">
                <UploadIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  Lab Report Upload
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                </h1>
                <p className="text-gray-600 mt-1">Upload and analyze your medical reports with AI-powered insights</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-medical-primary border-medical-primary">
                AI-Powered Analysis
              </Badge>
              <Button variant="outline" size="sm" className="gap-2">
                <History className="h-4 w-4" />
                View History
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Upload Section */}
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Plus className="h-5 w-5 text-medical-primary" />
              Upload Medical Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
                ${isDragActive 
                  ? 'border-medical-primary bg-medical-light/20 scale-[1.02]' 
                  : 'border-gray-300 hover:border-medical-primary hover:bg-gray-50'
                }
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                  isDragActive ? 'bg-medical-primary' : 'bg-gray-100'
                }`}>
                  <UploadIcon className={`h-8 w-8 ${
                    isDragActive ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {isDragActive ? 'Drop files here!' : 'Drag & drop your lab reports'}
                  </p>
                  <p className="text-gray-600 mb-4">
                    or <span className="text-medical-primary font-medium">browse files</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF and image files (PNG, JPG, JPEG) up to 10MB each
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Selected Files ({selectedFiles.length})
                </h3>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        disabled={isLoading}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Button */}
            {selectedFiles.length > 0 && (
              <div className="pt-4 border-t border-gray-100">
                <Button 
                  onClick={handleAnalysis}
                  disabled={isLoading}
                  className="w-full h-12 bg-medical-primary hover:bg-medical-dark text-white font-semibold"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing Reports...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Analyze {selectedFiles.length} Report{selectedFiles.length > 1 ? 's' : ''}
                    </div>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysisResults.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              Analysis Results
            </h2>
            
            {analysisResults.map((result, index) => (
              <Card key={index} className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      {result.file}
                    </CardTitle>
                    <Badge className={result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {result.success ? 'Analysis Complete' : 'Analysis Failed'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {result.success ? (
                    <ReportAnalysis report={result.result} />
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                      <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-red-900">Analysis Failed</p>
                        <p className="text-sm text-red-700 mt-1">{result.error}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
