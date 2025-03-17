
import React, { useState } from 'react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ApplicationNotification from './ApplicationNotification';
import { useNotificationService, ApplicationNotificationData } from '@/utils/notificationService';

type NotificationsPanelProps = {
  userId: number;
  userType: 'EMPLOYER' | 'APPLICANT';
};

const NotificationsPanel = ({ userId, userType }: NotificationsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    getNotifications, 
    getUnreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotificationService();
  
  const notifications = getNotifications(userId, userType);
  const unreadCount = getUnreadCount(userId, userType);
  
  const handleNotificationClick = (notificationId: string) => {
    markAsRead(notificationId);
  };
  
  const handleMarkAllAsRead = () => {
    markAllAsRead(userId, userType);
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 min-w-[20px] p-0 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[380px] sm:w-[450px]">
        <SheetHeader className="flex flex-row items-center justify-between pb-4 border-b">
          <SheetTitle>Notifications</SheetTitle>
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </SheetHeader>
        
        <div className="mt-4 overflow-y-auto max-h-[80vh]">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-lg font-medium mb-1">No notifications</h3>
              <p className="text-muted-foreground">
                {userType === 'EMPLOYER' 
                  ? "You'll be notified when candidates apply for your job postings." 
                  : "You'll be notified when there are updates to your job applications."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification: ApplicationNotificationData) => (
                <ApplicationNotification
                  key={notification.id}
                  type={notification.type}
                  jobTitle={notification.jobTitle}
                  company={notification.company}
                  applicantName={notification.applicantName}
                  status={notification.status}
                  time={formatTime(notification.timestamp)}
                  isRead={notification.isRead}
                  onMarkAsRead={() => handleNotificationClick(notification.id)}
                />
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPanel;
