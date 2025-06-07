
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Download, Trash2, Moon, Sun } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    checkupReminders: true,
    medicationAlerts: false,
    healthTips: true,
    weeklyReports: true
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast.success("Notification settings updated");
  };

  const handleExportData = () => {
    toast.success("Your health data export will be emailed to you within 24 hours");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion requires email confirmation. Check your inbox for instructions.");
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Settings & Privacy
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your account, notifications, and data privacy preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-medical-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Adi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Patel" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="adi.patel@email.com" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" type="number" defaultValue="32" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select className="w-full p-2 border border-gray-300 rounded-md">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" defaultValue="175" />
                </div>
              </div>
              <Button className="bg-medical-primary hover:bg-medical-dark">
                Update Profile
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-medical-primary" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Check-up Reminders</h3>
                  <p className="text-sm text-muted-foreground">Get reminded about upcoming health check-ups</p>
                </div>
                <Switch 
                  checked={notifications.checkupReminders}
                  onCheckedChange={(value) => handleNotificationChange('checkupReminders', value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Medication Alerts</h3>
                  <p className="text-sm text-muted-foreground">Reminders for medication schedules</p>
                </div>
                <Switch 
                  checked={notifications.medicationAlerts}
                  onCheckedChange={(value) => handleNotificationChange('medicationAlerts', value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Health Tips</h3>
                  <p className="text-sm text-muted-foreground">Receive personalized health recommendations</p>
                </div>
                <Switch 
                  checked={notifications.healthTips}
                  onCheckedChange={(value) => handleNotificationChange('healthTips', value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Weekly Reports</h3>
                  <p className="text-sm text-muted-foreground">Summary of your health trends and insights</p>
                </div>
                <Switch 
                  checked={notifications.weeklyReports}
                  onCheckedChange={(value) => handleNotificationChange('weeklyReports', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {darkMode ? <Moon className="h-5 w-5 text-medical-primary" /> : <Sun className="h-5 w-5 text-medical-primary" />}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">Switch to dark theme for better viewing in low light</p>
                </div>
                <Switch 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Privacy */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-medical-primary" />
                Data Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">🔒 Your Data is Secure</h3>
                <p className="text-sm text-green-700">
                  All your health information is encrypted and stored securely. We follow HIPAA compliance standards 
                  to protect your medical privacy.
                </p>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-medium">Data Management</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    variant="outline" 
                    onClick={handleExportData}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export My Data
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Export includes all your lab reports, health insights, and chat history. 
                  Account deletion is permanent and cannot be undone.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Health Data Integrations */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle>Health Data Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Apple Health</h3>
                    <p className="text-sm text-muted-foreground">Sync your activity and health data</p>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Google Fit</h3>
                    <p className="text-sm text-muted-foreground">Import fitness and wellness data</p>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Fitbit</h3>
                    <p className="text-sm text-muted-foreground">Track activity, sleep, and heart rate</p>
                  </div>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
