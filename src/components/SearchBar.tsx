
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
        <Search className="w-5 h-5" />
      </div>
      <Input
        type="text"
        placeholder="Search for remote jobs..."
        className="w-full pl-12 pr-4 h-12 bg-white/80 backdrop-blur-sm border-muted"
      />
    </div>
  );
};

export default SearchBar;
