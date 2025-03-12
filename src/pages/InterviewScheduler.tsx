
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Video, Calendar as CalendarIcon, Clock, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ScheduledInterview {
  id: number;
  company: string;
  jobTitle: string;
  date: Date;
  time: string;
  interviewer: string;
  platform: string;
}

// Mock data for companies and job titles
const mockCompanies = [
  { id: 1, name: "TechCorp", jobs: ["Senior Frontend Developer", "UI/UX Designer"] },
  { id: 2, name: "InnovateLabs", jobs: ["Product Manager", "Software Engineer"] },
  { id: 3, name: "DesignWave", jobs: ["UX/UI Designer", "Creative Director"] },
];

// Mock available time slots
const availableTimeSlots = [
  "9:00 AM - 10:00 AM",
  "10:30 AM - 11:30 AM",
  "1:00 PM - 2:00 PM",
  "2:30 PM - 3:30 PM",
  "4:00 PM - 5:00 PM",
];

// Mock platforms
const platforms = ["Zoom", "Google Meet", "Microsoft Teams", "Skype"];

// Mock scheduled interviews
const mockScheduledInterviews: ScheduledInterview[] = [
  {
    id: 1,
    company: "TechCorp",
    jobTitle: "Senior Frontend Developer",
    date: new Date(2023, 5, 15),
    time: "2:30 PM - 3:30 PM",
    interviewer: "John Smith",
    platform: "Zoom",
  },
  {
    id: 2,
    company: "DesignWave",
    jobTitle: "UX/UI Designer",
    date: new Date(2023, 5, 17),
    time: "10:30 AM - 11:30 AM",
    interviewer: "Emily Johnson",
    platform: "Google Meet",
  },
];

const InterviewScheduler = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>();
  const [selectedJob, setSelectedJob] = useState<string | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>();
  const [scheduledInterviews, setScheduledInterviews] = useState<ScheduledInterview[]>(mockScheduledInterviews);
  const [activeTab, setActiveTab] = useState<'schedule' | 'upcoming'>('schedule');
  const { toast } = useToast();

  const handleScheduleInterview = () => {
    if (!selectedCompany || !selectedJob || !selectedDate || !selectedTime || !selectedPlatform) {
      toast({
        title: "Missing Information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }

    // Add the new interview to the scheduled interviews list
    const newInterview: ScheduledInterview = {
      id: scheduledInterviews.length + 1,
      company: selectedCompany,
      jobTitle: selectedJob,
      date: selectedDate,
      time: selectedTime,
      interviewer: "Sarah Parker", // Mock interviewer
      platform: selectedPlatform,
    };

    setScheduledInterviews([...scheduledInterviews, newInterview]);
    
    // Reset the form
    setSelectedCompany(undefined);
    setSelectedJob(undefined);
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setSelectedPlatform(undefined);
    
    // Show success message
    toast({
      title: "Interview Scheduled",
      description: `Your interview for ${selectedJob} at ${selectedCompany} has been scheduled`,
    });
    
    // Switch to the upcoming interviews tab
    setActiveTab('upcoming');
  };

  const companiesJobs = mockCompanies.find(c => c.name === selectedCompany)?.jobs || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-16 mx-auto">
        <div className="flex items-center mb-8 gap-3">
          <Video className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Interview Scheduler</h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Button
            variant={activeTab === 'schedule' ? 'default' : 'outline'}
            onClick={() => setActiveTab('schedule')}
          >
            Schedule Interview
          </Button>
          <Button
            variant={activeTab === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Interviews
            <Badge className="ml-2 bg-primary/20 text-primary" variant="outline">
              {scheduledInterviews.length}
            </Badge>
          </Button>
        </div>

        {activeTab === 'schedule' ? (
          <Card>
            <CardHeader>
              <CardTitle>Schedule a Video Interview</CardTitle>
              <CardDescription>
                Choose your preferred date and time for the interview
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Select 
                      value={selectedCompany} 
                      onValueChange={setSelectedCompany}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCompanies.map(company => (
                          <SelectItem key={company.id} value={company.name}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Position</label>
                    <Select 
                      value={selectedJob} 
                      onValueChange={setSelectedJob}
                      disabled={!selectedCompany}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job position" />
                      </SelectTrigger>
                      <SelectContent>
                        {companiesJobs.map(job => (
                          <SelectItem key={job} value={job}>
                            {job}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform</label>
                    <Select 
                      value={selectedPlatform} 
                      onValueChange={setSelectedPlatform}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map(platform => (
                          <SelectItem key={platform} value={platform}>
                            {platform}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Slot</label>
                    <Select 
                      value={selectedTime} 
                      onValueChange={setSelectedTime}
                      disabled={!selectedDate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTimeSlots.map(slot => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-sm font-medium">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-md p-3"
                    disabled={(date) => 
                      date < new Date() || 
                      date.getDay() === 0 || 
                      date.getDay() === 6
                    }
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleScheduleInterview}
                className="w-full mt-6"
                disabled={!selectedCompany || !selectedJob || !selectedDate || !selectedTime || !selectedPlatform}
              >
                Schedule Interview
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scheduledInterviews.length > 0 ? (
              scheduledInterviews.map((interview) => (
                <Card key={interview.id} className="overflow-hidden">
                  <div className="bg-primary h-2"></div>
                  <CardHeader>
                    <CardTitle>{interview.jobTitle}</CardTitle>
                    <CardDescription>{interview.company}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{format(interview.date, 'PPP')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{interview.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Video className="w-4 h-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{interview.platform}</span>
                    </div>
                    <div className="pt-2">
                      <Badge variant="outline" className="bg-secondary/20">
                        Interviewer: {interview.interviewer}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button className="w-full" size="sm">
                        Join Meeting
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>No Upcoming Interviews</CardTitle>
                  <CardDescription>
                    You don't have any scheduled interviews yet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => setActiveTab('schedule')}>
                    Schedule Your First Interview
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewScheduler;
