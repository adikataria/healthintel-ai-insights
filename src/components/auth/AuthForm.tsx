
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
import { supabase } from '@/integrations/supabase/client';

export const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
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

    console.log('Attempting sign in...');
    const { error } = await signIn(signInData.email, signInData.password);

    if (error) {
      console.error('Sign in error:', error);
      toast.error(error.message);
    } else {
      console.log('Sign in successful, redirecting to dashboard...');
      toast.success('Welcome back!');
      // Force redirect to dashboard
      window.location.href = '/dashboard';
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

  const handleForgotPassword = async () => {
    if (!signInData.email) {
      toast.error('Please enter your email address first');
      return;
    }

    setIsForgotPasswordLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(signInData.email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password reset email sent! Check your inbox.');
    }

    setIsForgotPasswordLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) {
      toast.error(error.message);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section: Illustration, tagline - Hidden on mobile, visible on large screens */}
      <div className="hidden lg:flex relative flex-1 flex-col justify-center items-center p-8 bg-medical-primary rounded-l-3xl overflow-hidden z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <img 
            src="/lovable-uploads/99ed6175-9efc-4e0c-a85f-bf132d0f0142.png" 
            alt="DocLumen Logo" 
            className="w-14 h-14 object-contain"
          />
          <span className="text-3xl xl:text-4xl font-montserrat font-bold text-white">DocLumen</span>
        </div>
        {/* Tagline and Illustration */}
        <h2 className="text-xl xl:text-2xl font-bold text-white/90 mb-4 text-center">
          Your Intelligent Health Companion
        </h2>
        <p className="mb-9 max-w-xs text-white/80 text-center xl:text-lg">
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

      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden bg-medical-primary text-white p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img 
            src="/lovable-uploads/99ed6175-9efc-4e0c-a85f-bf132d0f0142.png" 
            alt="DocLumen Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="text-2xl font-montserrat font-bold">DocLumen</span>
        </div>
        <h2 className="text-lg font-bold text-white/90 mb-2">
          Your Intelligent Health Companion
        </h2>
        <p className="text-white/80 text-sm">
          AI-driven health insights and care
        </p>
      </div>

      {/* Right Section: Auth Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-white z-20 min-h-[calc(100vh-200px)] lg:min-h-screen">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="space-y-1 px-4 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl font-bold text-center font-montserrat text-medical-primary tracking-tight">
              Welcome!
            </CardTitle>
            <CardDescription className="text-center font-roboto text-sm">
              Sign in to your DocLumen account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
                <TabsTrigger value="signin" className="text-sm">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm">Sign Up</TabsTrigger>
              </TabsList>

              {/* SIGN IN */}
              <TabsContent value="signin" className="space-y-3 sm:space-y-4">
                {/* Google Sign In Button */}
                <Button 
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  variant="outline"
                  className="w-full h-10 sm:h-11 border-2 hover:bg-gray-50 text-sm"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="signin-email" className="text-sm">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      autoComplete="username"
                      required
                      className="h-10 sm:h-11 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="signin-password" className="text-sm">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      autoComplete="current-password"
                      required
                      className="h-10 sm:h-11 text-sm"
                    />
                  </div>
                  
                  {/* Forgot Password Link */}
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="link"
                      onClick={handleForgotPassword}
                      disabled={isForgotPasswordLoading}
                      className="p-0 h-auto text-xs text-medical-secondary hover:text-medical-dark"
                    >
                      {isForgotPasswordLoading ? (
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      ) : null}
                      Forgot password?
                    </Button>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-10 sm:h-11 bg-medical-primary hover:bg-medical-dark duration-150 ease-in text-sm"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                  </Button>
                </form>
                <div className="w-full flex items-center justify-center mt-2">
                  <span className="text-xs text-muted-foreground text-center">
                    Don&apos;t have an account? <a className="text-medical-secondary font-semibold hover:underline" href="#" onClick={e => { e.preventDefault(); document.querySelector('[data-state="signup"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))}}>Sign up free</a>
                  </span>
                </div>
              </TabsContent>

              {/* SIGN UP */}
              <TabsContent value="signup" className="space-y-3 sm:space-y-4">
                {/* Google Sign Up Button */}
                <Button 
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  variant="outline"
                  className="w-full h-10 sm:h-11 border-2 hover:bg-gray-50 text-sm"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <form onSubmit={handleSignUp} className="space-y-3 sm:space-y-4">
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="signup-name" className="text-sm">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signUpData.fullName}
                      onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                      className="h-10 sm:h-11 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="signup-email" className="text-sm">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      autoComplete="email"
                      required
                      className="h-10 sm:h-11 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="signup-password" className="text-sm">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Enter your password"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      autoComplete="new-password"
                      required
                      className="h-10 sm:h-11 text-sm"
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <Label htmlFor="signup-confirm" className="text-sm">Confirm Password</Label>
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                      required
                      className="h-10 sm:h-11 text-sm"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-10 sm:h-11 bg-medical-primary hover:bg-medical-dark duration-150 ease-in text-sm"
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
