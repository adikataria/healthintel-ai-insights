import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { PlanManagement } from "@/components/subscription/PlanManagement";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import MobileLayoutWrapper from "@/components/layout/MobileLayoutWrapper";
import SwipeableCard from "@/components/mobile/SwipeableCard";
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Palette, 
  Globe, 
  Users, 
  Download, 
  Trash2, 
  Settings as SettingsIcon,
  ArrowLeft,
  ChevronRight,
  Heart,
  Lock,
  Eye,
  Moon,
  Sun,
  Languages,
  Clock,
  Share,
  HelpCircle,
  Mail,
  Phone,
  Camera,
  Edit3,
  Save,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

const SettingsMobile = () => {
  const navigate = useNavigate();
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
    goalReminders: false,
    pushNotifications: true,
    weeklyReports: true
  });

  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    twoFactor: false,
    profileVisibility: "private"
  });

  const [display, setDisplay] = useState({
    darkMode: false,
    language: "english",
    timezone: "ist",
    compactMode: false
  });

  const handleProfileSave = () => {
    toast.success("Profile updated successfully!");
  };

  const handleHealthProfileSave = () => {
    toast.success("Health profile updated successfully!");
  };

  const handleChangePassword = () => {
    toast.info("Password change functionality coming soon!");
  };

  const handleEnableTwoFactor = () => {
    setPrivacy(prev => ({ ...prev, twoFactor: !prev.twoFactor }));
    toast.success(privacy.twoFactor ? "Two-factor authentication disabled" : "Two-factor authentication enabled");
  };

  const handleExportData = () => {
    toast.info("Data export functionality coming soon!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.error("Account deletion functionality requires additional confirmation steps.");
    }
  };

  const settingSections = [
    {
      id: 'profile',
      title: 'Profile Information',
      icon: User,
      description: 'Manage your personal details',
      color: 'bg-blue-500'
    },
    {
      id: 'health',
      title: 'Health Profile',
      icon: Heart,
      description: 'Your health metrics and medical info',
      color: 'bg-red-500'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Customize your alerts',
      color: 'bg-green-500'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Control your data and security',
      color: 'bg-purple-500'
    },
    {
      id: 'display',
      title: 'Display & Language',
      icon: Palette,
      description: 'Customize app appearance',
      color: 'bg-orange-500'
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      icon: CreditCard,
      description: 'Manage your subscription',
      color: 'bg-yellow-500'
    }
  ];

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="relative w-24 h-24 mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <Button 
                  size="icon" 
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Profile Photo</h3>
                <p className="text-sm text-muted-foreground">Update your profile picture</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    placeholder="Enter your first name"
                    value={profile.firstName}
                    onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                    className="mobile-touch-target"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    placeholder="Enter your last name"
                    value={profile.lastName}
                    onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                    className="mobile-touch-target"
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
                  className="mobile-touch-target"
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
                  className="mobile-touch-target"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Tell us about yourself"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="mobile-touch-target min-h-[100px]"
                />
              </div>
              <Button onClick={handleProfileSave} className="w-full mobile-touch-target">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        );

      case 'health':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Health Profile</h3>
              <p className="text-sm text-muted-foreground">
                Keep your health information up to date for better insights
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    placeholder="Enter your weight"
                    value={healthProfile.weight}
                    onChange={(e) => setHealthProfile(prev => ({ ...prev, weight: e.target.value }))}
                    className="mobile-touch-target"
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
                    className="mobile-touch-target"
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
                  className="mobile-touch-target"
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
                  className="mobile-touch-target"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies & Medical Conditions</Label>
                <Textarea 
                  id="allergies" 
                  placeholder="List any allergies or medical conditions"
                  value={healthProfile.allergies}
                  onChange={(e) => setHealthProfile(prev => ({ ...prev, allergies: e.target.value }))}
                  className="mobile-touch-target min-h-[100px]"
                />
              </div>
              <Button onClick={handleHealthProfileSave} className="w-full mobile-touch-target">
                <Save className="h-4 w-4 mr-2" />
                Save Health Profile
              </Button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center">
                <Bell className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Choose how you want to be notified about your health
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  key: 'email',
                  title: 'Email Notifications',
                  description: 'Receive email updates about your health reports',
                  icon: Mail
                },
                {
                  key: 'pushNotifications',
                  title: 'Push Notifications',
                  description: 'Get instant notifications on your device',
                  icon: Bell
                },
                {
                  key: 'healthAlerts',
                  title: 'Health Alerts',
                  description: 'Important health insights and warnings',
                  icon: AlertTriangle
                },
                {
                  key: 'goalReminders',
                  title: 'Goal Reminders',
                  description: 'Reminders about your health goals',
                  icon: Heart
                },
                {
                  key: 'weeklyReports',
                  title: 'Weekly Reports',
                  description: 'Summary of your weekly health progress',
                  icon: Download
                }
              ].map((item) => (
                <SwipeableCard key={item.key} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium">{item.title}</Label>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => setNotifications(prev => ({ 
                        ...prev, 
                        [item.key]: checked 
                      }))}
                    />
                  </div>
                </SwipeableCard>
              ))}
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Privacy & Security</h3>
              <p className="text-sm text-muted-foreground">
                Control your data privacy and account security
              </p>
            </div>

            <div className="space-y-4">
              <SwipeableCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center">
                      <Share className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-medium">Data Sharing</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow anonymized data for research purposes
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={privacy.dataSharing}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ 
                      ...prev, 
                      dataSharing: checked 
                    }))}
                  />
                </div>
              </SwipeableCard>

              <SwipeableCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                      <p className="text-xs text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleEnableTwoFactor}
                    className={cn(
                      "mobile-touch-target",
                      privacy.twoFactor && "bg-green-50 border-green-200 text-green-700"
                    )}
                  >
                    {privacy.twoFactor ? "Enabled" : "Enable"}
                  </Button>
                </div>
              </SwipeableCard>

              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select 
                  value={privacy.profileVisibility} 
                  onValueChange={(value) => setPrivacy(prev => ({ 
                    ...prev, 
                    profileVisibility: value 
                  }))}
                >
                  <SelectTrigger className="mobile-touch-target">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="family">Family Only</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="outline" 
                onClick={handleChangePassword}
                className="w-full mobile-touch-target"
              >
                <Lock className="mr-2 h-4 w-4" />
                Change Password
              </Button>
            </div>
          </div>
        );

      case 'display':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-orange-500/10 rounded-full flex items-center justify-center">
                <Palette className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Display & Language</h3>
              <p className="text-sm text-muted-foreground">
                Customize how the app looks and feels
              </p>
            </div>

            <div className="space-y-4">
              <SwipeableCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center">
                      {display.darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-medium">Dark Mode</Label>
                      <p className="text-xs text-muted-foreground">
                        Switch to dark theme
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={display.darkMode}
                    onCheckedChange={(checked) => setDisplay(prev => ({ 
                      ...prev, 
                      darkMode: checked 
                    }))}
                  />
                </div>
              </SwipeableCard>

              <SwipeableCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-10 h-10 bg-muted/50 rounded-full flex items-center justify-center">
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <Label className="text-sm font-medium">Compact Mode</Label>
                      <p className="text-xs text-muted-foreground">
                        Show more content in less space
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={display.compactMode}
                    onCheckedChange={(checked) => setDisplay(prev => ({ 
                      ...prev, 
                      compactMode: checked 
                    }))}
                  />
                </div>
              </SwipeableCard>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select 
                    value={display.language} 
                    onValueChange={(value) => setDisplay(prev => ({ 
                      ...prev, 
                      language: value 
                    }))}
                  >
                    <SelectTrigger className="mobile-touch-target">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select 
                    value={display.timezone} 
                    onValueChange={(value) => setDisplay(prev => ({ 
                      ...prev, 
                      timezone: value 
                    }))}
                  >
                    <SelectTrigger className="mobile-touch-target">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                      <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                      <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                      <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Billing & Subscription</h3>
              <p className="text-sm text-muted-foreground">
                Manage your subscription and payment methods
              </p>
            </div>

            {/* Family Management Card */}
            <SwipeableCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">Family Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Add and manage family health profiles
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/family')}
                  className="mobile-touch-target"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Manage
                </Button>
              </div>
            </SwipeableCard>

            {/* Subscription Management */}
            <div className="space-y-4">
              <PlanManagement />
            </div>

            {/* Payment & Billing Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full mobile-touch-target">
                <CreditCard className="mr-2 h-4 w-4" />
                Update Payment Method
              </Button>
              <Button variant="outline" className="w-full mobile-touch-target">
                <Download className="mr-2 h-4 w-4" />
                Download Invoices
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MobileLayoutWrapper showFloatingAction={false}>
      <div className="flex flex-col min-h-screen bg-background">
        {/* Mobile Header */}
        <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="flex items-center justify-between px-4 py-3 min-h-[56px]">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => activeSection ? setActiveSection(null) : navigate('/dashboard')}
                className="shrink-0 h-9 w-9"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {activeSection ? 
                    settingSections.find(s => s.id === activeSection)?.title || 'Settings' : 
                    'Settings'
                  }
                </h1>
                <p className="text-sm text-muted-foreground">
                  {activeSection ? 
                    settingSections.find(s => s.id === activeSection)?.description || 'Manage your preferences' :
                    'Manage your account and preferences'
                  }
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-6 pb-24">
              {!activeSection ? (
                /* Settings Menu */
                <div className="space-y-4">
                  {/* User Profile Summary */}
                  <SwipeableCard className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/30 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground">
                          {user?.email?.split('@')[0] || 'User'}
                        </h3>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                        <Badge variant="secondary" className="mt-1">
                          Free Plan
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveSection('profile')}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </SwipeableCard>

                  {/* Settings Sections */}
                  <div className="grid grid-cols-1 gap-3">
                  {settingSections.map((section) => (
                    <div key={section.id} onClick={() => setActiveSection(section.id)} className="cursor-pointer">
                      <SwipeableCard 
                        className="hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between p-4">
                          <div className="flex items-center space-x-3">
                            <div className={cn(
                              "w-10 h-10 rounded-2xl flex items-center justify-center",
                              section.color
                            )}>
                              <section.icon className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{section.title}</h4>
                              <p className="text-sm text-muted-foreground">{section.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </SwipeableCard>
                    </div>
                  ))}
                  </div>

                  {/* Danger Zone */}
                  <SwipeableCard className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
                    <div className="p-4 space-y-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <h4 className="font-medium text-red-600">Danger Zone</h4>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          variant="outline" 
                          onClick={handleExportData}
                          className="flex-1 mobile-touch-target"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Export Data
                        </Button>
                        <Button 
                          variant="destructive" 
                          onClick={handleDeleteAccount}
                          className="flex-1 mobile-touch-target"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </SwipeableCard>
                </div>
              ) : (
                /* Section Content */
                renderSectionContent()
              )}
            </div>
          </ScrollArea>
        </main>
      </div>
    </MobileLayoutWrapper>
  );
};

export default SettingsMobile;