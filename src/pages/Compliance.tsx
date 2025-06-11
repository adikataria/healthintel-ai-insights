
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, FileCheck, Users, Heart, AlertTriangle, CheckCircle, Globe } from "lucide-react";

const Compliance = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Compliance & Certifications
          </h1>
          <p className="text-xl text-muted-foreground">
            Our commitment to security, privacy, and ethical AI use in healthcare
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="health-card border-medical-primary/30">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-medical-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-medical-primary">Security First</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Enterprise-grade security with end-to-end encryption and compliance with healthcare standards
              </p>
            </CardContent>
          </Card>

          <Card className="health-card border-medical-primary/30">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-medical-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-medical-primary">Ethical AI</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Responsible AI development with transparency, fairness, and human-centered design principles
              </p>
            </CardContent>
          </Card>

          <Card className="health-card border-medical-primary/30">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-medical-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-medical-primary">Global Standards</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Compliance with international healthcare data protection and AI governance frameworks
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Certifications Section */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-medical-primary" />
              Security & Privacy Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">HIPAA Compliant</h4>
                      <p className="text-sm text-green-700">Health Insurance Portability and Accountability Act</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Certified</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">GDPR Compliant</h4>
                      <p className="text-sm text-green-700">General Data Protection Regulation</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Certified</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-800">SOC 2 Type II</h4>
                      <p className="text-sm text-blue-700">Security, Availability & Confidentiality</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">ISO 27001</h4>
                      <p className="text-sm text-green-700">Information Security Management</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Certified</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-800">FDA 21 CFR Part 11</h4>
                      <p className="text-sm text-blue-700">Electronic Records and Signatures</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">NIST Framework</h4>
                      <p className="text-sm text-green-700">Cybersecurity Framework</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Aligned</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ethical AI Principles */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-medical-primary" />
              Ethical AI Principles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Transparency</h4>
                  <p className="text-sm text-accent">
                    We provide clear explanations of how our AI systems work and make decisions about your health data.
                  </p>
                </div>

                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Fairness</h4>
                  <p className="text-sm text-accent">
                    Our AI models are designed to provide equitable healthcare insights across all demographics and populations.
                  </p>
                </div>

                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Privacy by Design</h4>
                  <p className="text-sm text-accent">
                    Data protection and user privacy are built into every aspect of our system architecture and AI models.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Human Oversight</h4>
                  <p className="text-sm text-accent">
                    AI-generated insights are tools to support, not replace, professional medical judgment and human decision-making.
                  </p>
                </div>

                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Accountability</h4>
                  <p className="text-sm text-accent">
                    We maintain clear lines of responsibility and regularly audit our AI systems for bias and accuracy.
                  </p>
                </div>

                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Continuous Improvement</h4>
                  <p className="text-sm text-accent">
                    We continuously monitor and improve our AI systems based on feedback and emerging ethical standards.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection Measures */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-medical-primary" />
              Data Protection Measures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Lock className="h-8 w-8 text-medical-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">End-to-End Encryption</h4>
                  <p className="text-sm text-muted-foreground">AES-256 encryption for data at rest and TLS 1.3 for data in transit</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-8 w-8 text-medical-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Access Controls</h4>
                  <p className="text-sm text-muted-foreground">Role-based access with multi-factor authentication and audit logging</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-8 w-8 text-medical-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Data Minimization</h4>
                  <p className="text-sm text-muted-foreground">We collect only necessary data and implement automatic data retention policies</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Your Data Rights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to access your personal data
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to rectify inaccurate data
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to delete your data
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to data portability
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to object to processing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to lodge a complaint
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="health-card border-orange-200 bg-orange-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-orange-100">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 mb-3">Continuous Compliance</h4>
                <p className="text-sm text-orange-700 leading-relaxed">
                  Our compliance program is continuously evolving to meet emerging regulations and industry best practices. 
                  We conduct regular security audits, penetration testing, and compliance assessments to ensure we maintain 
                  the highest standards of data protection and ethical AI use. For specific compliance questions or to 
                  request our latest audit reports, please contact our compliance team.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Compliance;
