
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { 
  Briefcase, 
  Bell, 
  MessageSquare, 
  User, 
  ChevronDown,
  Search
} from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userType = localStorage.getItem('userType') || 'jobseeker';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <header className="w-full py-3 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="naukri-container">
        <div className="flex items-center justify-between">
          {/* Logo and Nav */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-primary">
              JobMatch
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="text-sm font-medium text-gray-600 hover:text-primary flex items-center">
                <Briefcase className="w-4 h-4 mr-1" />
                Jobs
              </Link>
              
              {userType === 'company' && (
                <Link to="/post-job" className="text-sm font-medium text-gray-600 hover:text-primary">
                  Post a Job
                </Link>
              )}
              
              <Link to="/matching-algorithm" className="text-sm font-medium text-gray-600 hover:text-primary">
                Matching
              </Link>
              
              <Link to="/resume-parser" className="text-sm font-medium text-gray-600 hover:text-primary">
                Resume
              </Link>
            </nav>
          </div>
          
          {/* Auth Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden md:flex items-center space-x-4">
                  <button className="text-gray-600 hover:text-primary">
                    <Bell className="w-5 h-5" />
                  </button>
                  <button className="text-gray-600 hover:text-primary">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-1 cursor-pointer group relative">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium hidden md:inline-block">My Profile</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                  
                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md py-2 hidden group-hover:block">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      View Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                  className="text-gray-600 hover:text-primary hover:bg-transparent"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/signup')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
