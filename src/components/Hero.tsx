
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Search, MapPin, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  
  return (
    <div className="bg-gradient-to-r from-primary/5 to-secondary py-14 md:py-20">
      <div className="naukri-container">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Find Your Dream <span className="text-primary">Job</span> Today
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Millions of jobs available. Find the perfect one for your skills and experience.
          </p>
          
          <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="Job title, keywords, or company" 
                className="pl-10 h-12 bg-white border-gray-300"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                type="text" 
                placeholder="City, state, or remote"
                className="pl-10 h-12 bg-white border-gray-300"
              />
            </div>
            <Button type="submit" className="h-12 px-6">
              Search Jobs
            </Button>
          </form>
        </div>
        
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="bg-white p-4 rounded-md shadow-sm text-center hover:shadow-md transition-shadow">
            <Briefcase className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Remote Jobs</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm text-center hover:shadow-md transition-shadow">
            <Briefcase className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Tech Jobs</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm text-center hover:shadow-md transition-shadow">
            <Briefcase className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Marketing</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm text-center hover:shadow-md transition-shadow">
            <Briefcase className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Finance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
