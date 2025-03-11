
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Globe, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  location: string;
  matchScore: number;
  skills: string[];
  description?: string;
  onApply?: (id: number, title: string) => void;
}

const JobCard = ({ 
  id, 
  title, 
  company, 
  location, 
  matchScore, 
  skills, 
  description,
  onApply 
}: JobCardProps) => {
  const handleApply = () => {
    if (onApply) {
      onApply(id, title);
    }
  };

  return (
    <Card className="w-full p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in backdrop-blur-sm bg-card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Badge variant="secondary" className="mb-2">
            Remote
          </Badge>
          <h3 className="text-xl font-semibold mb-1">
            <Link to={`/job/${id}`} className="hover:text-primary">
              {title}
            </Link>
          </h3>
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

      {description && (
        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{description}</p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <Badge key={skill} variant="outline" className="bg-secondary/30">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          onClick={handleApply} 
          className="flex-1"
        >
          Apply Now
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          asChild
        >
          <Link to={`/job/${id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  );
};

export default JobCard;
