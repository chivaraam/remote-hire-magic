
import React from 'react';
import { Bell, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type NotificationType = 'new_application' | 'status_change';

type ApplicationNotificationProps = {
  type: NotificationType;
  jobTitle: string;
  company?: string;
  applicantName?: string;
  status?: 'ACCEPTED' | 'REJECTED' | 'PENDING';
  time: string;
  isRead?: boolean;
  onMarkAsRead?: () => void;
};

const ApplicationNotification = ({
  type,
  jobTitle,
  company,
  applicantName,
  status,
  time,
  isRead = false,
  onMarkAsRead
}: ApplicationNotificationProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'PENDING':
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getNotificationTitle = () => {
    if (type === 'new_application') {
      return `New application for ${jobTitle}`;
    } else if (type === 'status_change') {
      return `Application ${status?.toLowerCase()} for ${jobTitle}`;
    }
    return '';
  };

  const getNotificationMessage = () => {
    if (type === 'new_application') {
      return `${applicantName} has applied for the ${jobTitle} position at ${company}.`;
    } else if (type === 'status_change') {
      if (status === 'ACCEPTED') {
        return `Congratulations! Your application for ${jobTitle} at ${company} has been accepted.`;
      } else if (status === 'REJECTED') {
        return `We're sorry, but your application for ${jobTitle} at ${company} has been rejected.`;
      }
    }
    return '';
  };

  return (
    <Card className={`mb-3 cursor-pointer hover:bg-secondary/10 transition-colors ${!isRead ? 'border-l-4 border-l-primary' : ''}`} onClick={onMarkAsRead}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            {type === 'new_application' ? (
              <Bell className="h-5 w-5 text-primary" />
            ) : (
              <Mail className="h-5 w-5 text-primary" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-sm">{getNotificationTitle()}</h4>
              <span className="text-xs text-muted-foreground">{time}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{getNotificationMessage()}</p>
            {status && type === 'status_change' && (
              <Badge className={`mt-2 ${getStatusColor(status)}`}>
                {status}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationNotification;
