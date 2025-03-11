
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Globe, Star } from 'lucide-react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  matchScore: number;
  skills: string[];
}

const JobCard = ({ title, company, location, matchScore, skills }: JobCardProps) => {
  return (
    <Card className="w-full p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in backdrop-blur-sm bg-card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge variant="secondary" className="mb-2">
            Remote
          </Badge>
          <h3 className="text-xl font-semibold mb-1">{title}</h3>
          <div className="flex items-center text-muted-foreground">
            <Briefcase className="w-4 h-4 mr-2" />
            <span>{company}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-accent mr-1" />
          <span className="font-medium">{matchScore}% Match</span>
        </div>
      </div>
      
      <div className="flex items-center mb-4 text-muted-foreground">
        <Globe className="w-4 h-4 mr-2" />
        <span>{location}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="outline" className="bg-secondary/30">
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default JobCard;
