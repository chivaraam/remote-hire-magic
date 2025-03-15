
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            {validationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}
            
            <RadioGroup 
              defaultValue="jobseeker" 
              value={userType}
              onValueChange={setUserType}
              className="flex justify-center gap-4 pt-2 pb-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="jobseeker" id="jobseeker" />
                <Label htmlFor="jobseeker">Job Seeker</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="company" id="company" />
                <Label htmlFor="company">Company</Label>
              </div>
            </RadioGroup>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {userType === 'company' ? 'Contact Person Name' : 'Full Name'}
              </label>
              <Input
                id="name"
                placeholder={userType === 'company' ? "Jane Smith (HR Manager)" : "John Smith"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            {userType === 'company' && (
              <>
                <div className="space-y-2">
                  <label htmlFor="companyName" className="text-sm font-medium">
                    Company Name
                  </label>
                  <Input
                    id="companyName"
                    placeholder="Acme Corporation"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium">
                    Industry
                  </label>
                  <Input
                    id="industry"
                    placeholder="Technology, Healthcare, Finance, etc."
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : `Create ${userType === 'company' ? 'company' : 'user'} account`}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Signup;
