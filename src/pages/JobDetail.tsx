
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Briefcase, Globe, Star, ArrowLeft, Building, Calendar, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
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
    description: "Join our team to build cutting-edge web applications using React and TypeScript.",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    postedDate: "2 weeks ago"
  },
  {
    id: 2,
    title: "Product Manager",
    company: "InnovateLabs",
    location: "Americas",
    matchScore: 88,
    skills: ["Product Strategy", "Agile", "User Research"],
    description: "Lead product development for our SaaS platform, working closely with engineering and design teams.",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    postedDate: "1 week ago"
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignWave",
    location: "Europe",
    matchScore: 92,
    skills: ["Figma", "User Testing", "Design Systems"],
    description: "Create beautiful and intuitive interfaces for our web and mobile applications.",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    postedDate: "3 days ago"
  },
  {
    id: 4,
    title: "Backend Developer",
    company: "ServerTech",
    location: "Asia",
    matchScore: 85,
    skills: ["Java", "Spring Boot", "AWS"],
    description: "Build robust and scalable backend services using Java and Spring Boot.",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    postedDate: "1 month ago"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "CloudSys",
    location: "Worldwide",
    matchScore: 90,
    skills: ["Kubernetes", "Docker", "CI/CD"],
    description: "Implement and maintain our cloud infrastructure and deployment pipelines.",
    salary: "$110,000 - $140,000",
    type: "Contract",
    postedDate: "5 days ago"
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataInsight",
    location: "Americas",
    matchScore: 87,
    skills: ["Python", "Machine Learning", "SQL"],
    description: "Analyze large datasets and build predictive models to drive business decisions.",
    salary: "$115,000 - $145,000",
    type: "Full-time",
    postedDate: "2 weeks ago"
  },
];

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const jobId = parseInt(id || '0');
  const job = allJobs.find(job => job.id === jobId);
  
  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <Header />
        <div className="container px-4 py-16 mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Job Not Found</h1>
          <p className="mb-8">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Button>
        </div>
      </div>
    );
  }
  
  const handleApply = () => {
    toast({
      title: "Application Submitted",
      description: `You've successfully applied for ${job.title}`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-8 mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Jobs
        </Button>
        
        <Card className="w-full p-8 animate-fade-in backdrop-blur-sm bg-card">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                Remote
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <div className="flex items-center text-muted-foreground">
                <Building className="w-4 h-4 mr-2" />
                <span className="mr-4">{job.company}</span>
                <Globe className="w-4 h-4 mr-2" />
                <span>{job.location}</span>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-accent mr-1" />
              <span className="font-medium text-lg">{job.matchScore}% Match</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Salary</p>
                <p className="font-medium">{job.salary}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Job Type</p>
                <p className="font-medium">{job.type}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Posted</p>
                <p className="font-medium">{job.postedDate}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <p className="text-muted-foreground">{job.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-secondary/30 text-foreground">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleApply} 
            className="w-full md:w-auto px-8"
            size="lg"
          >
            Apply Now
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default JobDetail;
