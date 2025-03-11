
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
      <Badge variant="secondary" className="mb-4">
        AI-Powered Hiring
      </Badge>
      <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Find Your Perfect Remote Job Match
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Leveraging AI to connect talented professionals with remote opportunities worldwide
      </p>
      <Button className="bg-primary hover:bg-primary/90">
        Get Started <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
};

export default Hero;
