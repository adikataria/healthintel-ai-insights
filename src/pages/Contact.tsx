import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to your backend
    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We'll get back to you soon!"
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
  };
  return <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          Get in touch with our team for support, feedback, or general inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={formData.name} onChange={e => setFormData({
                  ...formData,
                  name: e.target.value
                })} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={e => setFormData({
                  ...formData,
                  email: e.target.value
                })} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={value => setFormData({
                ...formData,
                category: value
              })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing & Account</SelectItem>
                    <SelectItem value="privacy">Privacy & Security</SelectItem>
                    <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                    <SelectItem value="partnership">Partnership Inquiries</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={formData.subject} onChange={e => setFormData({
                ...formData,
                subject: e.target.value
              })} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={6} value={formData.message} onChange={e => setFormData({
                ...formData,
                message: e.target.value
              })} placeholder="Please describe your inquiry in detail..." required />
              </div>

              <Button type="submit" className="w-full bg-medical-primary hover:bg-medical-dark text-white">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
              <CardDescription>
                Multiple ways to reach our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-medical-primary" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-gray-600">support@doclumen.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-medical-primary" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-500">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-medical-primary" />
                <div>
                  <p className="font-medium">Office Address</p>
                  <p className="text-gray-600">
                    123 Health Tech Avenue<br />
                    Suite 456<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">How secure is my health data?</h3>
                <p className="text-gray-600 text-sm">
                  We use enterprise-grade encryption and HIPAA-compliant practices to protect your data.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Can I export my data?</h3>
                <p className="text-gray-600 text-sm">
                  Yes, you can export your health reports and data in multiple formats anytime.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Is DocLumen a medical device?</h3>
                <p className="text-gray-600 text-sm">
                  No, DocLumen is for informational purposes only and should not replace professional medical advice.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Notice</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-600 font-medium">For medical emergencies, do not use this contact form. Call 112 or go to your nearest emergency room immediately.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default Contact;