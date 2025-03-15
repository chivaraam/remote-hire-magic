
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Brain, FileText, Video, Users } from 'lucide-react';

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
  const [searchLocation, setSearchLocation] = useState('');
  const [searchSkills, setSearchSkills] = useState<string[]>([]);
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  const handleSearch = (term: string, location: string, skills: string[]) => {
    setSearchTerm(term);
    setSearchLocation(location);
    setSearchSkills(skills);
    
    let results = allJobs;
    
    // Filter by search term
    if (term.trim()) {
      const lowerCaseTerm = term.toLowerCase();
      results = results.filter(job => 
        job.title.toLowerCase().includes(lowerCaseTerm) ||
        job.company.toLowerCase().includes(lowerCaseTerm) ||
        job.description.toLowerCase().includes(lowerCaseTerm)
      );
    }
    
    // Filter by location
    if (location) {
      results = results.filter(job => job.location === location);
    }
    
    // Filter by skills
    if (skills.length > 0) {
      results = results.filter(job => 
        skills.some(skill => job.skills.includes(skill))
      );
    }
    
    setFilteredJobs(results);
  };

  const handleApply = (jobId: number, jobTitle: string) => {
    console.log(`Applied for job ${jobId}: ${jobTitle}`);
    
    // In a real application, this would send an API request
    toast({
      title: "Application Submitted",
      description: `You've successfully applied for ${jobTitle}`,
    });
  };

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      title: "AI-Based Candidate-Job Matching Algorithm",
      description: "Our advanced algorithm matches your skills and preferences to the perfect remote job opportunities.",
      path: "/matching-algorithm"
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Automated Resume Parsing & Skills Extraction",
      description: "Upload your resume once and let our system extract your skills and experiences automatically.",
      path: "/resume-parser"
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Remote Readiness Assessment for Candidates",
      description: "Take our assessment to showcase your remote work capabilities and boost your profile.",
      path: "/remote-assessment"
    },
    {
      icon: <Video className="h-6 w-6 text-primary" />,
      title: "Integrated Video Interview Scheduling System",
      description: "Schedule and manage your remote interviews with ease through our integrated platform.",
      path: "/interview-scheduler"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-16 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Find Your Perfect Remote Job</h1>
        
        <div className="mb-12">
          <SearchBar 
            onSearch={handleSearch} 
            initialValue={searchTerm} 
            initialLocation={searchLocation}
            initialSkills={searchSkills}
          />
          <p className="mt-4 text-muted-foreground">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Premium Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border border-border/50">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                <Link 
                  to={feature.path}
                  className="text-sm text-primary hover:underline inline-flex items-center"
                >
                  Try Now <Badge variant="outline" className="ml-2">Premium</Badge>
                </Link>
              </Card>
            ))}
          </div>
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
