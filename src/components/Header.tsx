
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-muted sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        JobMatch AI
      </Link>
      
      <nav className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Log in
            </Link>
            <Button onClick={() => navigate('/signup')}>Sign up</Button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
