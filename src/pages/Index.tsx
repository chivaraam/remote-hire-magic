
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import JobCard from '@/components/JobCard';
import Header from '@/components/Header';
import { useToast } from "@/hooks/use-toast";
import { Building, Users, Briefcase, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Worldwide",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLabs",
    location: "Americas",
    matchScore: 88,
    skills: ["Product Strategy", "Agile", "User Research"],
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignWave",
    location: "Europe",
    matchScore: 92,
    skills: ["Figma", "User Testing", "Design Systems"],
  },
];

const topCompanies = [
  { name: "Microsoft", jobs: 45, logo: "M" },
  { name: "Google", jobs: 37, logo: "G" },
  { name: "Amazon", jobs: 52, logo: "A" },
  { name: "Facebook", jobs: 23, logo: "F" },
  { name: "Apple", jobs: 19, logo: "A" },
  { name: "Netflix", jobs: 12, logo: "N" },
];

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleApply = (jobId: number, jobTitle: string) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to apply for jobs",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Jobs Section */}
      <section className="naukri-section bg-white">
        <div className="naukri-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="naukri-heading">Featured Jobs</h2>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              View All Jobs
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                matchScore={job.matchScore}
                skills={job.skills}
                onApply={handleApply}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Top Companies Section */}
      <section className="naukri-section bg-secondary/30">
        <div className="naukri-container">
          <h2 className="naukri-heading text-center">Top Companies Hiring</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
            {topCompanies.map((company, index) => (
              <div key={index} className="bg-white rounded-md shadow-sm p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl mx-auto mb-3">
                  {company.logo}
                </div>
                <h3 className="font-medium text-gray-800">{company.name}</h3>
                <p className="text-sm text-gray-500">{company.jobs} jobs</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => navigate('/companies')}>
              View All Companies
            </Button>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="naukri-section bg-white">
        <div className="naukri-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">10,000+</h3>
              <p className="text-gray-600">Jobs Available</p>
            </div>
            
            <div className="p-6">
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">1,200+</h3>
              <p className="text-gray-600">Companies</p>
            </div>
            
            <div className="p-6">
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">50,000+</h3>
              <p className="text-gray-600">Candidates</p>
            </div>
            
            <div className="p-6">
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* App Banner Section */}
      <section className="py-16 bg-primary">
        <div className="naukri-container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-8 md:mb-0 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Download Our Mobile App</h2>
              <p className="text-white/80 mb-6 max-w-md">
                Job search on the go. Apply to jobs, track your applications, and get updates right from your phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Download for iOS
                </Button>
                <Button className="bg-white text-primary hover:bg-white/90">
                  Download for Android
                </Button>
              </div>
            </div>
            
            <div className="w-full max-w-xs md:max-w-sm">
              <div className="bg-white rounded-lg p-4 shadow-lg transform rotate-3">
                <div className="bg-gray-100 h-48 rounded-md flex items-center justify-center">
                  <Briefcase className="w-12 h-12 text-primary/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
