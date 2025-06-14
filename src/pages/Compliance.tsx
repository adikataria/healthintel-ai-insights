
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, FileCheck, Users, Heart, AlertTriangle, CheckCircle, Globe, Scale, Building2, Gavel } from "lucide-react";

const Compliance = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Compliance & Certifications
          </h1>
          <p className="text-xl text-muted-foreground">
            Our commitment to security, privacy, and ethical AI use in Indian healthcare
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
                Enterprise-grade security complying with Indian data protection laws and healthcare standards
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
                Responsible AI development following NITI Aayog guidelines and Indian healthcare ethics
              </p>
            </CardContent>
          </Card>

          <Card className="health-card border-medical-primary/30">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-medical-primary rounded-lg flex items-center justify-center mx-auto mb-3">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-medical-primary">Indian Standards</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Full compliance with Indian regulations including DPDP Act 2023 and MCI guidelines
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Indian Regulatory Compliance */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gavel className="h-5 w-5 text-medical-primary" />
              Indian Regulatory Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">DPDP Act 2023</h4>
                      <p className="text-sm text-green-700">Digital Personal Data Protection Act compliance</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">IT Act 2000</h4>
                      <p className="text-sm text-green-700">Information Technology Act provisions</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">MCI Guidelines</h4>
                      <p className="text-sm text-green-700">Medical Council of India telemedicine regulations</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Aligned</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-800">NABH Standards</h4>
                      <p className="text-sm text-blue-700">National Accreditation Board for Hospitals</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">MEITY Guidelines</h4>
                      <p className="text-sm text-green-700">Ministry of Electronics & IT frameworks</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">RBI Guidelines</h4>
                      <p className="text-sm text-green-700">Payment security and data storage norms</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Compliant</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* International Certifications */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-medical-primary" />
              International Security Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">ISO 27001:2022</h4>
                      <p className="text-sm text-green-700">Information Security Management Systems</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Certified</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">ISO 27799</h4>
                      <p className="text-sm text-green-700">Health informatics security management</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Certified</Badge>
                </div>
              </div>

              <div className="space-y-4">
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

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">GDPR Alignment</h4>
                      <p className="text-sm text-green-700">European data protection standards</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Aligned</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Ethics & NITI Aayog Guidelines */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-medical-primary" />
              AI Ethics & NITI Aayog Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Responsible AI Framework</h4>
                  <p className="text-sm text-accent">
                    Following NITI Aayog's Responsible AI principles for ethical healthcare AI development and deployment.
                  </p>
                </div>

                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Transparency & Explainability</h4>
                  <p className="text-sm text-accent">
                    Our AI models provide clear explanations for health insights, ensuring medical professionals can validate recommendations.
                  </p>
                </div>

                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Data Localization</h4>
                  <p className="text-sm text-accent">
                    All patient data is stored within Indian borders in compliance with data localization requirements.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Bias Mitigation</h4>
                  <p className="text-sm text-accent">
                    Regular audits ensure our AI models are fair across different demographics prevalent in Indian population.
                  </p>
                </div>

                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Human-in-the-Loop</h4>
                  <p className="text-sm text-accent">
                    AI recommendations always require human medical professional oversight, never replacing clinical judgment.
                  </p>
                </div>

                <div className="p-4 bg-medical-light/10 rounded-lg border border-medical-primary/20">
                  <h4 className="font-semibold text-medical-dark mb-2">Privacy by Design</h4>
                  <p className="text-sm text-accent">
                    DPDP Act compliance built into every system component with consent-based data processing.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Protection for Indian Users */}
        <Card className="health-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-medical-primary" />
              Data Protection for Indian Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Shield className="h-8 w-8 text-medical-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Data Localization</h4>
                  <p className="text-sm text-muted-foreground">All data stored in Indian data centers with AES-256 encryption</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Scale className="h-8 w-8 text-medical-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Consent Management</h4>
                  <p className="text-sm text-muted-foreground">Granular consent controls as per DPDP Act requirements</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-8 w-8 text-medical-primary mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Data Governance</h4>
                  <p className="text-sm text-muted-foreground">Appointed Data Protection Officer and compliance team</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Your Rights Under DPDP Act 2023</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to access your personal data
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to correction and completion
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to data portability
                    </li>
                  </ul>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to erasure (right to be forgotten)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to grievance redressal
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Right to nominate a data guardian
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Contact */}
        <Card className="health-card border-orange-200 bg-orange-50/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-orange-100">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 mb-3">Continuous Compliance & Support</h4>
                <p className="text-sm text-orange-700 leading-relaxed mb-4">
                  Our compliance program continuously evolves to meet emerging Indian regulations and healthcare standards. 
                  We conduct regular security audits, penetration testing, and compliance assessments with Indian standards.
                </p>
                <div className="space-y-2 text-sm text-orange-700">
                  <p><strong>Data Protection Officer:</strong> dpo@doclumen.in</p>
                  <p><strong>Compliance Team:</strong> compliance@doclumen.in</p>
                  <p><strong>Grievance Officer:</strong> grievance@doclumen.in</p>
                  <p><strong>Office Address:</strong> Bangalore, Karnataka, India</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Compliance;
