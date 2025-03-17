
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import JobApplicationsList from '@/components/JobApplicationsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet';

const Applications = () => {
  const [isEmployer, setIsEmployer] = useState(false);
  const [userId, setUserId] = useState<number>(1);
  
  useEffect(() => {
    // In a real app, this would come from auth context or state management
    const userType = localStorage.getItem('userType');
    if (userType === 'EMPLOYER') {
      setIsEmployer(true);
    }
    
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
      setUserId(parseInt(userIdFromStorage));
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Helmet>
        <title>Applications | JobMatch</title>
      </Helmet>
      <Header />
      <div className="container px-4 py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Applications</h1>
        
        {isEmployer ? (
          <Tabs defaultValue="pending">
            <TabsList className="mb-6">
              <TabsTrigger value="pending">Pending Applications</TabsTrigger>
              <TabsTrigger value="processed">Processed Applications</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <JobApplicationsList isEmployer={true} userId={userId} />
            </TabsContent>
            <TabsContent value="processed">
              <JobApplicationsList isEmployer={true} userId={userId} />
            </TabsContent>
          </Tabs>
        ) : (
          <JobApplicationsList isEmployer={false} userId={userId} />
        )}
      </div>
    </div>
  );
};

export default Applications;
