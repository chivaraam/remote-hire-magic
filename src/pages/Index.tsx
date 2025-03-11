
import React from 'react';
import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import JobCard from '@/components/JobCard';

const mockJobs = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Worldwide",
    matchScore: 95,
    skills: ["React", "TypeScript", "Node.js"],
  },
  {
    title: "Product Manager",
    company: "InnovateLabs",
    location: "Americas",
    matchScore: 88,
    skills: ["Product Strategy", "Agile", "User Research"],
  },
  {
    title: "UX/UI Designer",
    company: "DesignWave",
    location: "Europe",
    matchScore: 92,
    skills: ["Figma", "User Testing", "Design Systems"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <div className="container px-4 py-16 mx-auto">
        <Hero />
        
        <div className="mb-12">
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job, index) => (
            <JobCard
              key={index}
              title={job.title}
              company={job.company}
              location={job.location}
              matchScore={job.matchScore}
              skills={job.skills}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
