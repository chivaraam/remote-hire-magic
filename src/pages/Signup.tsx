
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, User, Building2, Mail, Lock, Briefcase, Globe } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('jobseeker');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !password) {
      setValidationError('Please fill in all required fields');
      return false;
    }
    
    if (userType === 'company' && !companyName) {
      setValidationError('Please enter your company name');
      return false;
    }
    
    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address');
      return false;
    }
    
    setValidationError('');
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userData = userType === 'company' 
        ? { 
            name,
            email, 
            password,
            companyName,
            industry,
            userType,
            skills: [] 
          }
        : { 
            name,
            email, 
            password,
            userType,
            skills: [] 
          };
      
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store auth token and user data
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userType', userType);
        
        toast({
          title: "Account created",
          description: `Welcome to JobMatch AI${userType === 'company' ? ' for Companies' : ''}!`,
        });
        
        navigate('/');
      } else {
        setValidationError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setValidationError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">JobMatch AI</h1>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 p-6 text-white">
              <h2 className="text-2xl font-semibold">
                {userType === 'company' ? 'Register as an Employer' : 'Create Your JobMatch AI Account'}
              </h2>
              <p className="mt-2 text-blue-100">
                {userType === 'company' 
                  ? 'Find the perfect candidates for your company' 
                  : 'Get started on your job search journey today'}
              </p>
            </div>
            
            <div className="p-6">
              <RadioGroup 
                defaultValue="jobseeker" 
                value={userType}
                onValueChange={setUserType}
                className="flex justify-center mb-6 gap-8"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-blue-50">
                  <RadioGroupItem value="jobseeker" id="jobseeker" />
                  <Label htmlFor="jobseeker" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-5 w-5 text-blue-600" />
                    <span>I'm a Job Seeker</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-blue-50">
                  <RadioGroupItem value="company" id="company" />
                  <Label htmlFor="company" className="flex items-center cursor-pointer">
                    <Building2 className="mr-2 h-5 w-5 text-blue-600" />
                    <span>I'm an Employer</span>
                  </Label>
                </div>
              </RadioGroup>
              
              {validationError && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{validationError}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium flex items-center">
                      <User className="mr-2 h-4 w-4 text-blue-600" />
                      {userType === 'company' ? 'Contact Person Name' : 'Full Name'}
                    </Label>
                    <Input
                      id="name"
                      placeholder={userType === 'company' ? "Jane Smith (HR Manager)" : "John Smith"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      className="mt-1 h-12"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-blue-600" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className="mt-1 h-12"
                    />
                  </div>
                  
                  {userType === 'company' && (
                    <>
                      <div>
                        <Label htmlFor="companyName" className="text-gray-700 font-medium flex items-center">
                          <Building2 className="mr-2 h-4 w-4 text-blue-600" />
                          Company Name
                        </Label>
                        <Input
                          id="companyName"
                          placeholder="Acme Corporation"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          disabled={isLoading}
                          className="mt-1 h-12"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="industry" className="text-gray-700 font-medium flex items-center">
                          <Briefcase className="mr-2 h-4 w-4 text-blue-600" />
                          Industry
                        </Label>
                        <Input
                          id="industry"
                          placeholder="Technology, Healthcare, Finance, etc."
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          disabled={isLoading}
                          className="mt-1 h-12"
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <Label htmlFor="password" className="text-gray-700 font-medium flex items-center">
                      <Lock className="mr-2 h-4 w-4 text-blue-600" />
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="mt-1 h-12"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Must be at least 8 characters
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    className="w-full max-w-md h-12 bg-blue-600 hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : `Create ${userType === 'company' ? 'Employer' : 'Jobseeker'} Account`}
                  </Button>
                </div>
                
                <div className="text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-medium hover:underline">
                      Log in
                    </Link>
                  </p>
                </div>
                
                <div className="text-center text-xs text-gray-500 mt-8">
                  By registering, you agree to our Terms and Conditions and Privacy Policy
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
