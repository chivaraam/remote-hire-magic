
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import { useToast } from "@/hooks/use-toast";

// Mock jobs data (in a real app, this would come from an API)
const allJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Worldwide",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js"],
    description: "Join our team to build cutting-edge web applications using React and TypeScript."
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLabs",
    location: "Americas",
    matchScore: 88,
    skills: ["Product Strategy", "Agile", "User Research"],
    description: "Lead product development for our SaaS platform, working closely with engineering and design teams."
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignWave",
    location: "Europe",
    matchScore: 92,
    skills: ["Figma", "User Testing", "Design Systems"],
    description: "Create beautiful and intuitive interfaces for our web and mobile applications."
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "ServerTech",
    location: "Asia",
    matchScore: 85,
    skills: ["Java", "Spring Boot", "AWS"],
    description: "Build robust and scalable backend services using Java and Spring Boot."
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudSys",
    location: "Worldwide",
    matchScore: 90,
    skills: ["Kubernetes", "Docker", "CI/CD"],
    description: "Implement and maintain our cloud infrastructure and deployment pipelines."
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataInsight",
    location: "Americas",
    matchScore: 87,
    skills: ["Python", "Machine Learning", "SQL"],
    description: "Analyze large datasets and build predictive models to drive business decisions."
  },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredJobs(allJobs);
      return;
    }
    
    const lowerCaseTerm = term.toLowerCase();
    const results = allJobs.filter(job => 
      job.title.toLowerCase().includes(lowerCaseTerm) ||
      job.company.toLowerCase().includes(lowerCaseTerm) ||
      job.location.toLowerCase().includes(lowerCaseTerm) ||
      job.skills.some(skill => skill.toLowerCase().includes(lowerCaseTerm))
    );
    
    setFilteredJobs(results);
  };

  const handleApply = (jobId: number, jobTitle: string) => {
    // In a real app, this would send a request to an API
    console.log(`Applied for job ${jobId}: ${jobTitle}`);
    
    toast({
      title: "Application Submitted",
      description: `You've successfully applied for ${jobTitle}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-16 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Find Your Perfect Remote Job</h1>
        
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} initialValue={searchTerm} />
          <p className="mt-4 text-muted-foreground">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              matchScore={job.matchScore}
              skills={job.skills}
              description={job.description}
              onApply={handleApply}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
