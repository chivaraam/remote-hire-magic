
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, LogOut, Settings, User, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NotificationsPanel from './NotificationsPanel';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number>(1);
  const [userType, setUserType] = useState<'EMPLOYER' | 'APPLICANT'>('APPLICANT');
  
  useEffect(() => {
    // In a real app, this would be handled by an auth context
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    // In a real app, these would come from the user profile
    // For demo, we'll set a default
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
    
    // For demo purposes, let's say the user is an applicant by default
    // In a real app, this would come from the user profile
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType as 'EMPLOYER' | 'APPLICANT');
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };
  
  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-primary mr-8">JobMatch</Link>
          
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-6">
              <Link to="/dashboard" className={`text-sm font-medium ${location.pathname === '/dashboard' ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}>
                Jobs
              </Link>
              <Link to="/applications" className={`text-sm font-medium ${location.pathname === '/applications' ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}>
                Applications
              </Link>
              <Link to="/resume-parser" className={`text-sm font-medium ${location.pathname === '/resume-parser' ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}>
                Resume Parser
              </Link>
              <Link to="/interview-scheduler" className={`text-sm font-medium ${location.pathname === '/interview-scheduler' ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}>
                Interviews
              </Link>
            </nav>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <NotificationsPanel userId={userId} userType={userType} />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/applications')}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Applications</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button onClick={() => navigate('/signup')}>Sign up</Button>
            </>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                Jobs
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/applications')}>
                Applications
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/resume-parser')}>
                Resume Parser
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/interview-scheduler')}>
                Interviews
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
