'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, cn } from "@livfit/ui";
import { Bell, CheckCircle, Info, AlertTriangle, Trash2 } from "lucide-react";
import { notificationRepository, Notification } from "@livfit/lib";
import { useRouter } from 'next/navigation';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await notificationRepository.getByUserId('patient-1');
        setNotifications(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await notificationRepository.markAsRead(id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (error) {
      console.error(error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'WORKOUT': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'DIET': return <Info className="h-5 w-5 text-blue-500" />;
      case 'SYSTEM': return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default: return <Bell className="h-5 w-5 text-slate-400" />;
    }
  };

  if (loading) return <div className="p-8">Loading notifications...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="ghost" className="text-sm">Mark all as read</Button>
      </header>

      <div className="space-y-4">
        {notifications.length > 0 ? notifications.map((n) => (
          <Card key={n.id} className={cn("transition-colors", !n.is_read && "border-primary/50 bg-primary/5")}>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="mt-1">
                {getIcon(n.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className={cn("font-bold", !n.is_read ? "text-slate-900" : "text-slate-600")}>{n.title}</h3>
                  <span className="text-xs text-muted-foreground">{new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-sm text-muted-foreground">{n.body}</p>
                {!n.is_read && (
                  <div className="pt-2">
                    <Button variant="link" className="p-0 h-auto text-xs" onClick={() => markAsRead(n.id)}>Mark as read</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )) : (
          <div className="text-center py-24 bg-slate-50 rounded-xl border-2 border-dashed">
            <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-muted-foreground">All caught up! No new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}

