
import React, { useState, useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import ApplicationNotification from './ApplicationNotification';
import { 
  useNotificationService, 
  ApplicationNotificationData 
} from '@/utils/notificationService';
import { Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  userType: 'EMPLOYER' | 'APPLICANT';
}

const NotificationsPanel = ({
  isOpen,
  onClose,
  userId,
  userType
}: NotificationsPanelProps) => {
  const [notifications, setNotifications] = useState<ApplicationNotificationData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { 
    getNotifications, 
    getUnreadCount, 
    markAsRead, 
    markAllAsRead 
  } = useNotificationService();

  useEffect(() => {
    if (isOpen) {
      // Fetch notifications when panel opens
      loadNotifications();
    }
  }, [isOpen, userId, userType]);

  const loadNotifications = () => {
    const userNotifications = getNotifications(userId, userType);
    setNotifications(userNotifications);
    setUnreadCount(getUnreadCount(userId, userType));
  };

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead(notificationId);
    loadNotifications();
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead(userId, userType);
    loadNotifications();
  };

  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      console.error("Error formatting timestamp:", e);
      return "recently";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex justify-between items-center">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
              {unreadCount > 0 && (
                <span className="bg-primary text-xs text-white rounded-full px-2 py-1">
                  {unreadCount}
                </span>
              )}
            </SheetTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6">
          <Tabs defaultValue="all">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="unread" className="flex-1">Unread</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4 space-y-2">
              {notifications.length > 0 ? (
                notifications.map(notification => (
                  <ApplicationNotification
                    key={notification.id}
                    type={notification.type}
                    jobTitle={notification.jobTitle}
                    company={notification.company}
                    applicantName={notification.applicantName}
                    status={notification.status}
                    time={formatTime(notification.timestamp)}
                    isRead={notification.isRead}
                    onMarkAsRead={() => handleMarkAsRead(notification.id)}
                  />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No notifications</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="unread" className="mt-4 space-y-2">
              {notifications.filter(n => !n.isRead).length > 0 ? (
                notifications
                  .filter(n => !n.isRead)
                  .map(notification => (
                    <ApplicationNotification
                      key={notification.id}
                      type={notification.type}
                      jobTitle={notification.jobTitle}
                      company={notification.company}
                      applicantName={notification.applicantName}
                      status={notification.status}
                      time={formatTime(notification.timestamp)}
                      isRead={notification.isRead}
                      onMarkAsRead={() => handleMarkAsRead(notification.id)}
                    />
                  ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No unread notifications</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPanel;
