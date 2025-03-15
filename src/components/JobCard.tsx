
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, MapPin, Clock, Star, Building } from 'lucide-react';
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
    <Card className="w-full hover:shadow-md transition-shadow duration-300 bg-white overflow-hidden border border-gray-200">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium mb-1 text-gray-800 hover:text-primary transition-colors">
              <Link to={`/job/${id}`}>
                {title}
              </Link>
            </h3>
            <div className="flex items-center text-gray-500 text-sm">
              <Building className="w-4 h-4 mr-1" />
              <span className="mr-3">{company}</span>
              <MapPin className="w-4 h-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          
          <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {matchScore}% Match
          </div>
        </div>
        
        {description && (
          <p className="mb-3 text-sm text-gray-600 line-clamp-2">{description}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200">
              {skill}
            </Badge>
          ))}
          {skills.length > 3 && (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200">
              +{skills.length - 3} more
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-gray-500 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            <span>Posted 2 days ago</span>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-gray-500 hover:text-primary"
              asChild
            >
              <Link to={`/job/${id}`}>View Details</Link>
            </Button>
            <Button 
              size="sm" 
              onClick={handleApply}
              className="bg-primary hover:bg-primary/90"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
