
import React, { useState } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SearchBarProps {
  onSearch?: (term: string, location: string, skills: string[]) => void;
  initialValue?: string;
  initialLocation?: string;
  initialSkills?: string[];
}

const SearchBar = ({ 
  onSearch, 
  initialValue = '', 
  initialLocation = '', 
  initialSkills = [] 
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [location, setLocation] = useState(initialLocation);
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [currentSkill, setCurrentSkill] = useState('');
  
  const locations = ["Worldwide", "Americas", "Europe", "Asia", "Remote"];
  const popularSkills = ["React", "TypeScript", "Java", "Python", "AWS", "Product Management", "UI/UX", "DevOps"];

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm, location, skills);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      const newSkills = [...skills, skill];
      setSkills(newSkills);
      setCurrentSkill('');
      if (onSearch) {
        onSearch(searchTerm, location, newSkills);
      }
    }
  };

  const removeSkill = (skill: string) => {
    const newSkills = skills.filter(s => s !== skill);
    setSkills(newSkills);
    if (onSearch) {
      onSearch(searchTerm, location, newSkills);
    }
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    if (onSearch) {
      onSearch(searchTerm, value, skills);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Search for job title, keyword, company..."
            className="w-full pl-12 pr-4 h-12 bg-white/80 backdrop-blur-sm border-muted"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        
        <div className="flex-initial w-full md:w-40">
          <Select value={location} onValueChange={handleLocationChange}>
            <SelectTrigger className="h-12 bg-white/80">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any-location">Any Location</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button className="h-12 px-6" onClick={handleSearch}>
          Search
        </Button>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Briefcase className="w-4 h-4 mr-2" />
              Add Skills
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Add Skills</div>
              <div className="flex gap-2">
                <Input 
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addSkill(currentSkill);
                    }
                  }}
                  placeholder="Enter a skill"
                  className="flex-1"
                />
                <Button size="sm" onClick={() => addSkill(currentSkill)}>Add</Button>
              </div>
              <div className="mt-2">
                <div className="text-sm text-muted-foreground mb-2">Popular Skills</div>
                <div className="flex flex-wrap gap-1">
                  {popularSkills.map(skill => (
                    <Badge 
                      key={skill} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary/10"
                      onClick={() => addSkill(skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-sm text-muted-foreground">Skills:</span>
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                {skill}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => removeSkill(skill)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
