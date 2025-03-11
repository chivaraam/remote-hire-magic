import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import Header from '@/components/Header';
import { useToast } from "@/hooks/use-toast";

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

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/dashboard?search=${encodeURIComponent(term)}`);
    }
  };

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
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-16 mx-auto">
        <Hero />
        
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} />
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
    </div>
  );
};

export default Index;
