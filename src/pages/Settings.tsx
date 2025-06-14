
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlanManagement } from "@/components/subscription/PlanManagement";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { User, Bell, Shield, CreditCard, Palette, Globe, Users, Download, Trash2, Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    bio: ""
  });

  const [healthProfile, setHealthProfile] = useState({
    weight: "",
    height: "",
    bmi: "",
    bloodPressure: "",
    allergies: ""
  });

  const [notifications, setNotifications] = useState({
    email: true,
    healthAlerts: true,
    goalReminders: false
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    twoFactor: false
  });

  const [display, setDisplay] = useState({
    darkMode: false,
    language: "english",
    timezone: "ist"
  });

  const handleProfileSave = () => {
    // TODO: Implement profile update logic
    toast.success("Profile updated successfully!");
  };

  const handleHealthProfileSave = () => {
    // TODO: Implement health profile update logic
    toast.success("Health profile updated successfully!");
  };

  const handleChangePassword = () => {
    // TODO: Implement password change logic
    toast.info("Password change functionality coming soon!");
  };

  const handleEnableTwoFactor = () => {
    setPrivacy(prev => ({ ...prev, twoFactor: !prev.twoFactor }));
    toast.success(privacy.twoFactor ? "Two-factor authentication disabled" : "Two-factor authentication enabled");
  };

  const handleExportData = () => {
    // TODO: Implement data export logic
    toast.info("Data export functionality coming soon!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // TODO: Implement account deletion logic
      toast.error("Account deletion functionality requires additional confirmation steps.");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold mb-4 text-accent">
            Settings
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your account, preferences, and family profiles
          </p>
        </div>

        <div className="space-y-6">
          {/* Family Management */}
          <Card className="health-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Family Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Add and manage health profiles for your family members in one secure platform.
              </p>
              <Button asChild className="bg-medical-primary hover:bg-medical-dark">
                <Link to="/family">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Family Profiles
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Subscription Management */}
          <PlanManagement />

          {/* Billing Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Billing & Payments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="p-3 border rounded-md bg-gray-50">
                    <p className="text-sm text-muted-foreground">
                      No payment method on file
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Billing Address</Label>
                  <div className="p-3 border rounded-md bg-gray-50">
                    <p className="text-sm text-muted-foreground">
                      Not configured
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Update Payment Method
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoices
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Enter your first name"
                    value={profile.firstName}
                    onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Enter your last name"
                    value={profile.lastName}
                    onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="Enter your email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="Enter your phone number"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>
              <Button onClick={handleProfileSave}>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Health Profile */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Health Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    placeholder="Enter your weight"
                    value={healthProfile.weight}
                    onChange={(e) => setHealthProfile(prev => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    placeholder="Enter your height"
                    value={healthProfile.height}
                    onChange={(e) => setHealthProfile(prev => ({ ...prev, height: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bmi">BMI</Label>
                <Input 
                  id="bmi" 
                  type="number" 
                  placeholder="Enter your BMI"
                  value={healthProfile.bmi}
                  onChange={(e) => setHealthProfile(prev => ({ ...prev, bmi: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodPressure">Blood Pressure</Label>
                <Input 
                  id="bloodPressure" 
                  type="text" 
                  placeholder="e.g., 120/80"
                  value={healthProfile.bloodPressure}
                  onChange={(e) => setHealthProfile(prev => ({ ...prev, bloodPressure: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea 
                  id="allergies" 
                  placeholder="List any allergies or medical conditions"
                  value={healthProfile.allergies}
                  onChange={(e) => setHealthProfile(prev => ({ ...prev, allergies: e.target.value }))}
                />
              </div>
              <Button onClick={handleHealthProfileSave}>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your health reports
                  </p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Health Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about important health insights
                  </p>
                </div>
                <Switch 
                  checked={notifications.healthAlerts}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, healthAlerts: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Goal Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders about your health goals
                  </p>
                </div>
                <Switch 
                  checked={notifications.goalReminders}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, goalReminders: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymized data for research purposes
                  </p>
                </div>
                <Switch 
                  checked={privacy.dataSharing}
                  onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, dataSharing: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleEnableTwoFactor}
                  className={privacy.twoFactor ? "bg-green-50 border-green-200" : ""}
                >
                  {privacy.twoFactor ? "Enabled" : "Enable"}
                </Button>
              </div>
              <Separator />
              <Button variant="outline" onClick={handleChangePassword}>
                Change Password
              </Button>
            </CardContent>
          </Card>

          {/* Display Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                Display Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch to dark theme
                  </p>
                </div>
                <Switch 
                  checked={display.darkMode}
                  onCheckedChange={(checked) => setDisplay(prev => ({ ...prev, darkMode: checked }))}
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={display.language} onValueChange={(value) => setDisplay(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select value={display.timezone} onValueChange={(value) => setDisplay(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Export Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Download all your health data
                  </p>
                </div>
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-red-600">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
