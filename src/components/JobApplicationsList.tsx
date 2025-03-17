import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNotificationService } from '@/utils/notificationService';

// Types
type Application = {
  id: number;
  jobId: number;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  employerNotes: string;
  applicantId?: number;
  applicantName?: string;
  employerId?: number;
};

type JobApplicationsListProps = {
  isEmployer?: boolean;
  userId?: number;
};

const JobApplicationsList = ({ isEmployer = false, userId = 1 }: JobApplicationsListProps) => {
  const { toast } = useToast();
  const { createNotification } = useNotificationService();
  
  // Mock application data (in a real app, this would come from API)
  const mockApplications = [
    {
      id: 1,
      jobId: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp",
      appliedDate: "2023-06-12T14:22:10",
      status: "PENDING" as const,
      employerNotes: "",
      applicantId: 2,
      applicantName: "Jane Doe",
      employerId: 1
    },
    {
      id: 2,
      jobId: 3,
      jobTitle: "UX/UI Designer",
      company: "DesignWave",
      appliedDate: "2023-06-01T09:15:45",
      status: "ACCEPTED" as const,
      employerNotes: "Great fit for our team. We'd like to schedule an interview.",
      applicantId: 2,
      applicantName: "Jane Doe",
      employerId: 3
    },
    {
      id: 3,
      jobId: 5,
      jobTitle: "DevOps Engineer",
      company: "CloudSys",
      appliedDate: "2023-05-20T16:30:22",
      status: "REJECTED" as const,
      employerNotes: "We're looking for someone with more Kubernetes experience.",
      applicantId: 2,
      applicantName: "Jane Doe",
      employerId: 5
    }
  ];
  
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [employerResponse, setEmployerResponse] = useState("");
  const [responseStatus, setResponseStatus] = useState<"ACCEPTED" | "REJECTED">("ACCEPTED");
  
  // Filter applications based on user role
  useEffect(() => {
    // In a real app, this would be an API call
    if (isEmployer && userId) {
      // Filter for applications where current user is the employer
      const filteredApps = mockApplications.filter(app => app.employerId === userId);
      setApplications(filteredApps);
    } else if (userId) {
      // Filter for applications where current user is the applicant
      const filteredApps = mockApplications.filter(app => app.applicantId === userId);
      setApplications(filteredApps);
    }
  }, [isEmployer, userId]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getStatusBadge = (status: "PENDING" | "ACCEPTED" | "REJECTED") => {
    switch (status) {
      case "PENDING":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
          <Clock className="w-3 h-3 mr-1" /> Pending
        </Badge>;
      case "ACCEPTED":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          <CheckCircle className="w-3 h-3 mr-1" /> Accepted
        </Badge>;
      case "REJECTED":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
          <XCircle className="w-3 h-3 mr-1" /> Rejected
        </Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    if (isEmployer && application.status === "PENDING") {
      setIsResponseDialogOpen(true);
      setEmployerResponse("");
    }
  };
  
  const handleSubmitResponse = async () => {
    if (!selectedApplication) return;
    
    try {
      // In a real app, this would be an API call to update the application status
      // For demo, we'll update the local state directly
      
      // The API endpoint would be:
      // const response = await fetch(`http://localhost:8080/api/applications/${selectedApplication.id}/status`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },
      //   body: new URLSearchParams({
      //     status: responseStatus,
      //     employerNotes: employerResponse
      //   })
      // });
      
      // Update local state to simulate API call
      setApplications(prevApplications => 
        prevApplications.map(app => 
          app.id === selectedApplication.id 
            ? { ...app, status: responseStatus, employerNotes: employerResponse }
            : app
        )
      );
      
      // Create notification for the applicant
      createNotification({
        type: 'status_change',
        jobId: selectedApplication.jobId,
        jobTitle: selectedApplication.jobTitle,
        company: selectedApplication.company,
        applicantId: selectedApplication.applicantId,
        status: responseStatus
      });
      
      toast({
        title: "Response Submitted",
        description: `You have ${responseStatus.toLowerCase()} the application for ${selectedApplication.jobTitle}`,
      });
      
      setIsResponseDialogOpen(false);
      setEmployerResponse("");
    } catch (error) {
      console.error('Error updating application:', error);
      toast({
        title: "Error",
        description: "An error occurred while updating the application status",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{isEmployer ? "Candidate Applications" : "Your Applications"}</h2>
      
      {applications.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-secondary/10">
          <Info className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="text-lg font-medium mb-1">No applications found</h3>
          <p className="text-muted-foreground">
            {isEmployer 
              ? "You don't have any candidate applications yet." 
              : "You haven't applied to any jobs yet."}
          </p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Position</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">{application.jobTitle}</TableCell>
                  <TableCell>{application.company}</TableCell>
                  <TableCell>{formatDate(application.appliedDate)}</TableCell>
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(application)}
                    >
                      {isEmployer && application.status === "PENDING" ? "Respond" : "View Details"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Response Dialog for Employers */}
      {isEmployer && (
        <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Respond to Application</DialogTitle>
              <DialogDescription>
                {selectedApplication && `Respond to the application for ${selectedApplication.jobTitle} position at ${selectedApplication.company}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant={responseStatus === "ACCEPTED" ? "default" : "outline"}
                  onClick={() => setResponseStatus("ACCEPTED")}
                  className={responseStatus === "ACCEPTED" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Accept
                </Button>
                
                <Button
                  type="button"
                  variant={responseStatus === "REJECTED" ? "default" : "outline"}
                  onClick={() => setResponseStatus("REJECTED")}
                  className={responseStatus === "REJECTED" ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="response" className="text-sm font-medium">
                  Feedback to Candidate (Optional)
                </label>
                <Textarea
                  id="response"
                  placeholder="Provide feedback about this application..."
                  value={employerResponse}
                  onChange={(e) => setEmployerResponse(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsResponseDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitResponse}>
                Submit Response
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Details Dialog for Applicants */}
      {!isEmployer && selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>
                {`Details for your application to ${selectedApplication.jobTitle} at ${selectedApplication.company}`}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Status</h3>
                <div>{getStatusBadge(selectedApplication.status)}</div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Applied On</h3>
                <p className="text-muted-foreground">{formatDate(selectedApplication.appliedDate)}</p>
              </div>
              
              {selectedApplication.status !== "PENDING" && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Employer Feedback</h3>
                  <p className="text-muted-foreground border p-3 rounded-md bg-muted/50">
                    {selectedApplication.employerNotes || "No feedback provided."}
                  </p>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button onClick={() => setSelectedApplication(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default JobApplicationsList;
