import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Loader2, Heart, Stethoscope, User, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(signInData.email, signInData.password);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Welcome back!');
      navigate('/dashboard');
    }

    setIsLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created! Please check your email to verify your account.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section: Illustration, tagline */}
      <div className="relative flex-1 flex flex-col justify-center items-center p-8 bg-medical-primary rounded-b-3xl md:rounded-b-none md:rounded-l-3xl overflow-hidden z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-14 h-14 flex items-center justify-center rounded-2xl bg-medical-secondary shadow-lg">
            <Heart className="h-8 w-8 text-white" />
          </span>
          <span className="text-3xl md:text-4xl font-montserrat font-bold text-white">DocLumen</span>
        </div>
        {/* Tagline and Illustration */}
        <h2 className="text-xl md:text-2xl font-bold text-white/90 mb-4 text-center">
          Your Intelligent Health Companion
        </h2>
        <p className="mb-9 max-w-xs text-white/80 text-center md:text-lg">
          Empowering you and your family with AI-driven health insights and care, anytime, anywhere.
        </p>
        <div className="flex flex-col gap-9 w-full max-w-xs">
          {/* 1. AI Analyzes Health Reports */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-4">
              <Stethoscope className="text-medical-primary w-7 h-7" />
            </div>
            <span className="text-white/90 font-semibold text-sm text-center">
              AI analyzes your health reports
            </span>
          </div>
          {/* 2. Virtual Doctor Assists */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-4">
              <User className="text-medical-secondary w-7 h-7" />
            </div>
            <span className="text-white/90 font-semibold text-sm text-center">
              Consult with our virtual doctor
            </span>
          </div>
          {/* 3. Inclusive Family Insights */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-4">
              <Users className="text-medical-dark w-7 h-7" />
            </div>
            <span className="text-white/90 font-semibold text-sm text-center">
              Family-wide health insights for all
            </span>
          </div>
        </div>
      </div>
      {/* Right Section: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-12 bg-white z-20">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center font-montserrat text-medical-primary tracking-tight">
              Welcome!
            </CardTitle>
            <CardDescription className="text-center font-roboto">
              Sign in to your DocLumen account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* SIGN IN */}
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      autoComplete="username"
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      autoComplete="current-password"
                      required
                      className="h-11"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-medical-primary hover:bg-medical-dark duration-150 ease-in"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
                <div className="w-full flex items-center justify-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    Don&apos;t have an account? <a className="text-medical-secondary font-semibold hover:underline" href="#" onClick={e => { e.preventDefault(); document.querySelector('[data-state="signup"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}}>Sign up free</a>
                  </span>
                </div>
              </TabsContent>

              {/* SIGN UP */}
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      autoComplete="email"
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      autoComplete="new-password"
                      required
                      className="h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      required
                      className="h-11"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-medical-primary hover:bg-medical-dark duration-150 ease-in"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
