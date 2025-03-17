
// This service handles notifications for job applications
import { useToast } from '@/hooks/use-toast';

export type ApplicationNotificationData = {
  id: string;
  type: 'new_application' | 'status_change';
  jobId: number;
  jobTitle: string;
  company: string;
  applicantId?: number;
  applicantName?: string;
  employerId?: number;
  status?: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  timestamp: string;
  isRead: boolean;
};

// In a real app, these would be stored in a database
// and fetched via API
let mockNotifications: ApplicationNotificationData[] = [
  {
    id: '1',
    type: 'new_application',
    jobId: 1,
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    applicantName: 'Jane Smith',
    employerId: 1,
    status: 'PENDING',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false
  },
  {
    id: '2',
    type: 'status_change',
    jobId: 3,
    jobTitle: 'UX/UI Designer',
    company: 'DesignWave',
    applicantId: 2,
    status: 'ACCEPTED',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: true
  }
];

export const useNotificationService = () => {
  const { toast } = useToast();

  const getNotifications = (userId: number, userType: 'EMPLOYER' | 'APPLICANT') => {
    // Filter notifications based on user type and id
    return mockNotifications.filter(notification => {
      if (userType === 'EMPLOYER') {
        return notification.employerId === userId && notification.type === 'new_application';
      } else {
        return notification.applicantId === userId && notification.type === 'status_change';
      }
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const getUnreadCount = (userId: number, userType: 'EMPLOYER' | 'APPLICANT') => {
    return getNotifications(userId, userType).filter(n => !n.isRead).length;
  };

  const markAsRead = (notificationId: string) => {
    mockNotifications = mockNotifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    );
    return mockNotifications;
  };

  const markAllAsRead = (userId: number, userType: 'EMPLOYER' | 'APPLICANT') => {
    mockNotifications = mockNotifications.map(n => {
      if ((userType === 'EMPLOYER' && n.employerId === userId) || 
          (userType === 'APPLICANT' && n.applicantId === userId)) {
        return { ...n, isRead: true };
      }
      return n;
    });
    return mockNotifications;
  };

  const createNotification = (data: Omit<ApplicationNotificationData, 'id' | 'isRead' | 'timestamp'>) => {
    const newNotification: ApplicationNotificationData = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    mockNotifications = [...mockNotifications, newNotification];
    
    // In a real app, you would call an API to save the notification
    // and potentially trigger email/push notifications
    
    // Show a toast notification
    if (data.type === 'new_application') {
      toast({
        title: "New Application Received",
        description: `${data.applicantName} has applied for ${data.jobTitle}`,
      });
    } else if (data.type === 'status_change') {
      const statusMessage = data.status === 'ACCEPTED' 
        ? "Congratulations! Your application was accepted" 
        : "Your application status has been updated";
      
      toast({
        title: statusMessage,
        description: `Status for ${data.jobTitle} at ${data.company} is now ${data.status?.toLowerCase()}`,
        variant: data.status === 'REJECTED' ? "destructive" : "default",
      });
    }
    
    return newNotification;
  };

  return {
    getNotifications,
    getUnreadCount,
    markAsRead,
    markAllAsRead,
    createNotification
  };
};
