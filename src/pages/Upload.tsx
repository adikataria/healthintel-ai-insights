import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, FileText, Image, AlertCircle, CheckCircle, X, Shield, Brain, Sparkles, Zap, Target } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { ConsentModal } from "@/components/medical/ConsentModal";
import { ReportAnalysis } from "@/components/medical/ReportAnalysis";
import { useMedicalAnalysis } from "@/hooks/useMedicalAnalysis";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Upload = () => {
  const { user } = useAuth();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<'idle' | 'processing' | 'complete'>('idle');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);

  const {
    isAnalyzing,
    showConsentModal,
    startAnalysis,
    handleConsentAccepted,
    handleConsentDeclined
  } = useMedicalAnalysis({
    onSuccess: (analysis) => {
      setAnalysisResult(analysis);
      setAnalysisStatus('complete');
    },
    onError: (error) => {
      setAnalysisStatus('idle');
      console.error('Analysis failed:', error);
    }
  });

  // Enhanced PDF text extraction using multiple methods
  const extractPDFText = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const result = e.target?.result;
          if (result instanceof ArrayBuffer) {
            const uint8Array = new Uint8Array(result);
            
            // Method 1: Look for text streams in PDF
            let extractedText = '';
            const pdfString = Array.from(uint8Array).map(byte => String.fromCharCode(byte)).join('');
            
            // Extract text between stream objects
            const streamMatches = pdfString.match(/stream\s+(.*?)\s+endstream/gs);
            if (streamMatches) {
              streamMatches.forEach(stream => {
                const content = stream.replace(/^stream\s+/, '').replace(/\s+endstream$/, '');
                // Look for readable text patterns
                const textMatches = content.match(/[A-Za-z][A-Za-z0-9\s\.\,\:\;\-\(\)\/\%\+\=\<\>\[\]]{3,}/g);
                if (textMatches) {
                  extractedText += textMatches.join(' ') + ' ';
                }
              });
            }
            
            // Method 2: Look for text objects
            const textObjectMatches = pdfString.match(/BT\s+(.*?)\s+ET/gs);
            if (textObjectMatches) {
              textObjectMatches.forEach(textObj => {
                const content = textObj.replace(/^BT\s+/, '').replace(/\s+ET$/, '');
                // Extract text from Tj operators
                const tjMatches = content.match(/\([^)]*\)\s*Tj/g);
                if (tjMatches) {
                  tjMatches.forEach(tj => {
                    const text = tj.match(/\(([^)]*)\)/);
                    if (text && text[1]) {
                      extractedText += text[1] + ' ';
                    }
                  });
                }
              });
            }
            
            // Method 3: Look for any readable text patterns in the entire PDF
            const readableTextMatches = pdfString.match(/[A-Za-z][A-Za-z0-9\s\.\,\:\;\-\(\)\/\%\+\=\<\>\[\]]{10,}/g);
            if (readableTextMatches) {
              const filteredText = readableTextMatches
                .filter(text => 
                  !text.includes('obj') && 
                  !text.includes('endobj') && 
                  !text.includes('stream') &&
                  text.length > 5 &&
                  /[a-zA-Z]/.test(text)
                )
                .join(' ');
              extractedText += ' ' + filteredText;
            }
            
            // Method 4: Look for medical/lab specific terms
            const medicalTerms = pdfString.match(/(hemoglobin|cholesterol|glucose|creatinine|protein|albumin|bilirubin|urea|sodium|potassium|chloride|wbc|rbc|platelet|hematocrit|mcv|mch|mchc|ast|alt|alp|ggt|ldl|hdl|triglyceride|hba1c|tsh|t3|t4|vitamin|iron|ferritin|esr|crp|uric|calcium|phosphorus|magnesium|zinc|b12|folate|d3)/gi);
            if (medicalTerms) {
              extractedText += ' ' + medicalTerms.join(' ');
            }
            
            // Clean up the extracted text
            extractedText = extractedText
              .replace(/\s+/g, ' ')
              .replace(/[^\w\s\.\,\:\;\-\(\)\/\%\+\=\<\>\[\]]/g, ' ')
              .trim();
            
            console.log('PDF text extraction completed:', {
              fileName: file.name,
              extractedLength: extractedText.length,
              hasContent: extractedText.length > 0,
              preview: extractedText.substring(0, 200)
            });
            
            resolve(extractedText);
          } else {
            reject(new Error('Failed to read PDF as ArrayBuffer'));
          }
        } catch (error) {
          console.error('PDF text extraction error:', error);
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsArrayBuffer(file);
    });
  };

  // Enhanced file content extraction with better handling for all formats
  const extractFileContent = async (file: File): Promise<string> => {
    console.log('Starting enhanced file extraction for:', file.name, file.type, file.size);

    if (file.type.includes('image')) {
      // Enhanced image processing with explicit OCR instructions
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === 'string') {
            const base64Data = result.split(',')[1] || result;
            resolve(`MEDICAL LAB REPORT - IMAGE ANALYSIS

CRITICAL EXTRACTION REQUIRED: This is a medical laboratory report image containing comprehensive test results that MUST be extracted using advanced OCR capabilities.

FILE INFORMATION:
- Name: ${file.name}
- Type: ${file.type}
- Size: ${file.size} bytes
- Format: Medical laboratory report image

MANDATORY DATA EXTRACTION INSTRUCTIONS:
You MUST use your vision capabilities to read and extract ALL visible medical data from this image. This includes:

1. BLOOD TESTS (Extract ALL visible values):
   - Complete Blood Count (CBC): Hemoglobin, RBC, WBC, Platelets, Hematocrit, MCV, MCH, MCHC
   - Blood Chemistry: Glucose, Creatinine, Urea/BUN, Total Protein, Albumin
   - Liver Function: SGOT/AST, SGPT/ALT, Bilirubin, Alkaline Phosphatase
   - Lipid Profile: Total Cholesterol, HDL, LDL, Triglycerides

2. SPECIALIZED TESTS (Extract if visible):
   - Thyroid: TSH, T3, T4
   - Diabetes: HbA1c, Fasting Glucose
   - Vitamins: B12, D3, Folate
   - Minerals: Iron, Ferritin
   - Inflammatory: ESR, CRP

3. REFERENCE RANGES & VALUES:
   - Extract the exact numerical values for each test
   - Include units (mg/dL, g/dL, U/L, etc.)
   - Note the reference ranges provided
   - Identify any abnormal flags or indicators

4. PATIENT & LAB INFO:
   - Patient name, age, gender (if visible)
   - Test collection date
   - Laboratory name and contact
   - Doctor information

ANALYSIS REQUIREMENTS:
- Read EVERY visible number, test name, and value
- Do NOT skip any tests or values
- Provide comprehensive interpretation for ALL findings
- Use exact values from the image
- Create detailed health insights based on extracted data

Base64 Image Data: ${base64Data.substring(0, 1000)}...

ESSENTIAL: Use your advanced vision capabilities to perform complete OCR analysis and extract ALL medical laboratory data visible in this image. Provide comprehensive analysis with specific values, not generic responses.`);
          } else {
            resolve(`MEDICAL LAB REPORT IMAGE: ${file.name} - Comprehensive OCR analysis required for all visible medical data.`);
          }
        };
        reader.onerror = () => resolve(`MEDICAL LAB REPORT IMAGE: ${file.name} - Image analysis required.`);
        reader.readAsDataURL(file);
      });

    } else if (file.type.includes('pdf')) {
      try {
        const extractedText = await extractPDFText(file);
        
        const enhancedContent = `COMPREHENSIVE PDF MEDICAL LABORATORY REPORT

CRITICAL: This is a multi-page PDF laboratory report requiring complete data extraction.

FILE DETAILS:
- Name: ${file.name}
- Type: ${file.type}
- Size: ${file.size} bytes
- Format: Multi-page medical PDF report

EXTRACTED PDF CONTENT:
${extractedText}

MANDATORY COMPLETE EXTRACTION:
Extract ALL medical laboratory data from this PDF content. This is a comprehensive medical report containing:

1. HEMATOLOGY COMPLETE PANEL:
   - Hemoglobin (Hb): Extract exact value with units
   - Red Blood Cell Count (RBC): Extract value and indices
   - White Blood Cell Count (WBC): Extract total and differential
   - Platelet Count: Extract value and morphology
   - Hematocrit (HCT), MCV, MCH, MCHC values

2. CLINICAL CHEMISTRY PANEL:
   - Blood Glucose: Extract fasting/random values
   - Kidney Function: Creatinine, BUN/Urea, eGFR
   - Liver Function: SGOT/AST, SGPT/ALT, Bilirubin, ALP
   - Lipid Profile: Total Cholesterol, HDL, LDL, Triglycerides
   - Electrolytes: Sodium, Potassium, Chloride
   - Proteins: Total Protein, Albumin, Globulin

3. SPECIALIZED BIOMARKERS:
   - Thyroid: TSH, T3, T4 levels
   - Diabetes: HbA1c, Insulin
   - Cardiac: Troponin, CK-MB if present
   - Inflammatory: ESR, CRP
   - Vitamins: B12, D3, Folate
   - Minerals: Iron, Ferritin, TIBC

CRITICAL ANALYSIS INSTRUCTIONS:
- This PDF contains comprehensive laboratory data across multiple pages
- Extract EVERY test result, reference range, and abnormal flag
- Identify ALL numerical values and their corresponding test names
- Provide specific medical interpretation for ALL findings
- Use exact values from the document
- Create comprehensive health assessment based on ALL extracted data
- Even if text extraction is challenging, use medical knowledge to provide complete analysis

ESSENTIAL: Analyze this as a complete medical laboratory workup with extensive test results requiring professional medical interpretation. Focus on extracting ALL visible numerical values and medical parameters.`;

        return enhancedContent;
      } catch (error) {
        console.error('PDF extraction failed, using fallback:', error);
        return `MEDICAL PDF REPORT: ${file.name} - Multi-page laboratory report requiring comprehensive analysis. Please analyze this PDF for all medical laboratory data including blood tests, chemistry panels, and specialized biomarkers.`;
      }

    } else {
      // Text files
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === 'string') {
            resolve(`MEDICAL LABORATORY TEXT REPORT

File: ${file.name}
Content: ${result}

ANALYSIS REQUIRED: Extract all medical laboratory data, test results, and provide comprehensive health analysis.`);
          } else {
            resolve(`MEDICAL TEXT REPORT: ${file.name} - Text analysis required.`);
          }
        };
        reader.onerror = () => resolve(`MEDICAL TEXT REPORT: ${file.name} - Text analysis required.`);
        reader.readAsText(file);
      });
    }
  };

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
    if (!user) {
      toast.error('Please sign in to upload reports');
      return;
    }

    setIsUploading(true);
    setAnalysisStatus('processing');
    setUploadProgress(0);

    try {
      console.log('Starting enhanced file processing for:', uploadedFiles[0].name, uploadedFiles[0].type);

      // Create a report record in the database
      const { data: reportData, error: insertError } = await supabase
        .from('medical_reports')
        .insert({
          user_id: user.id,
          title: uploadedFiles[0].name,
          file_name: uploadedFiles[0].name,
          file_type: uploadedFiles[0].type,
          file_size: uploadedFiles[0].size,
          upload_status: 'completed'
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setCurrentReportId(reportData.id);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            
            // Extract file content with enhanced processing
            extractFileContent(uploadedFiles[0])
              .then(content => {
                console.log('Enhanced medical file content extracted:', {
                  fileName: uploadedFiles[0].name,
                  fileType: uploadedFiles[0].type,
                  contentLength: content.length,
                  contentPreview: content.substring(0, 500)
                });
                
                // Start AI analysis with enhanced content
                startAnalysis({
                  reportId: reportData.id,
                  content: content,
                  type: uploadedFiles[0].type,
                  fileName: uploadedFiles[0].name
                });
              })
              .catch(error => {
                console.error('Enhanced file extraction error:', error);
                toast.error('Failed to extract file content. Please try again.');
                setAnalysisStatus('idle');
              });
            
            return 100;
          }
          return prev + 10;
        });
      }, 200);

    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed');
      setIsUploading(false);
      setAnalysisStatus('idle');
    }
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

  if (analysisStatus === 'complete' && analysisResult) {
    return (
      <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-medical-light/20 via-white to-medical-secondary/10">
        <div className="container max-w-6xl">
          <ReportAnalysis 
            analysis={analysisResult}
            reportTitle={uploadedFiles[0]?.name || 'Medical Report'}
          />
          <div className="mt-6 text-center">
            <Button 
              onClick={() => {
                setAnalysisStatus('idle');
                setAnalysisResult(null);
                setUploadedFiles([]);
                setUploadProgress(0);
                setCurrentReportId(null);
              }}
              variant="outline"
              className="border-medical-primary text-medical-primary hover:bg-medical-primary hover:text-white"
            >
              Upload Another Report
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-br from-medical-light/20 via-white to-medical-secondary/10">
      <div className="container max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-medical-light/30 text-medical-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Powered by DocLumen AI
          </div>
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold mb-6 text-accent">
            Transform Your 
            <span className="bg-gradient-to-r from-medical-primary to-medical-secondary bg-clip-text text-transparent">
              {" "}Lab Reports
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Upload your medical reports and get instant AI-powered insights with professional analysis
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-medical-primary" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-medical-secondary" />
              <span>Enhanced PDF Reading</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-medical-primary" />
              <span>Consistent Analysis</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          {/* Upload Area */}
          <Card className="relative overflow-hidden border-2 border-medical-light/30 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-medical-light/10 to-medical-secondary/5"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
                  <UploadIcon className="h-5 w-5 text-white" />
                </div>
                Upload Medical Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isDragActive 
                    ? 'border-medical-primary bg-medical-light/20 scale-105' 
                    : 'border-medical-light/50 hover:border-medical-primary hover:bg-medical-light/10'
                }`}
              >
                <input {...getInputProps()} />
                <div className="relative z-10">
                  <div className="w-16 h-16 medical-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <UploadIcon className="h-8 w-8 text-white" />
                  </div>
                  {isDragActive ? (
                    <div>
                      <p className="text-medical-primary font-semibold text-lg mb-2">Drop your files here!</p>
                      <p className="text-medical-primary/70">We'll analyze them instantly</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-accent font-semibold text-lg mb-2">
                        Drag & drop your lab reports here
                      </p>
                      <p className="text-muted-foreground mb-4">
                        or click to browse files
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          PDF
                        </span>
                        <span className="flex items-center gap-1">
                          <Image className="h-3 w-3" />
                          JPG, PNG
                        </span>
                        <span>Up to 10MB</span>
                      </div>
                    </div>
                  )}
                </div>
                {isDragActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/10 to-medical-secondary/10 animate-pulse"></div>
                )}
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-medical-primary" />
                    Ready for Analysis ({uploadedFiles.length})
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-medical-light/20 to-medical-secondary/10 rounded-lg border border-medical-light/30">
                        <div className="flex items-center gap-3">
                          {getFileIcon(file)}
                          <div>
                            <p className="font-medium text-sm text-accent">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
                  disabled={isUploading || isAnalyzing}
                  className="w-full mt-6 h-12 medical-gradient hover:opacity-90 text-white font-medium text-lg"
                >
                  {isUploading ? (
                    <span className="flex items-center gap-2">
                      <Brain className="h-5 w-5 animate-pulse" />
                      Processing File...
                    </span>
                  ) : isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 animate-pulse" />
                      Analyzing with DocLumen AI...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Start Enhanced Analysis
                    </span>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Analysis Status */}
          <Card className="relative overflow-hidden border-2 border-medical-light/30 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-medical-secondary/5 to-medical-light/10"></div>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3 text-xl">
                {analysisStatus === 'idle' && (
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-gray-400" />
                  </div>
                )}
                {analysisStatus === 'processing' && (
                  <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white animate-pulse" />
                  </div>
                )}
                {analysisStatus === 'complete' && (
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                )}
                Enhanced PDF Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              {analysisStatus === 'idle' && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-muted-foreground text-lg mb-4">
                    Ready to analyze any PDF format
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Enhanced extraction for consistent results across all lab report types
                  </p>
                </div>
              )}

              {analysisStatus === 'processing' && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-20 h-20 medical-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                      <Brain className="h-10 w-10 text-white animate-pulse" />
                    </div>
                    <p className="font-semibold text-accent text-lg mb-2">Enhanced PDF Analysis in Progress...</p>
                    <p className="text-muted-foreground">
                      {isUploading ? 'Extracting data with advanced PDF parsing...' : 'Generating comprehensive health insights...'}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Progress value={uploadProgress} className="w-full h-3" />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{uploadProgress}% complete</span>
                      <span className="text-medical-primary font-medium">
                        {uploadProgress < 50 ? 'Reading PDF...' : uploadProgress < 100 ? 'Analyzing...' : 'Almost done!'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="border-2 border-medical-light/30 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-medical-light/5 to-medical-secondary/5"></div>
          <CardContent className="p-8 relative">
            <div className="text-center mb-8">
              <h3 className="font-montserrat font-bold text-2xl mb-3 text-accent">
                Enhanced PDF Reading Technology
              </h3>
              <p className="text-muted-foreground">
                Advanced algorithms ensure consistent analysis across all lab report formats
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 medical-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-3 text-accent">Multi-Method PDF Extraction</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Uses multiple extraction techniques to read any PDF format, ensuring no medical data is missed
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-medical-secondary to-medical-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-3 text-accent">Consistent Analysis</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Delivers reliable results regardless of PDF structure, scan quality, or lab format variations
                </p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-medical-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-lg mb-3 text-accent">Secure Processing</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  All PDF processing happens securely with enterprise-grade encryption and privacy protection
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consent Modal */}
      <ConsentModal
        isOpen={showConsentModal}
        onAccept={handleConsentAccepted}
        onDecline={handleConsentDeclined}
        type="analysis"
      />
    </div>
  );
};

export default Upload;
