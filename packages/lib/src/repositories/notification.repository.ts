import { supabase, isSupabaseConfigured } from '../supabase/client';
import { Notification } from '../types';

export class NotificationRepository {
  async getByUserId(userId: string): Promise<Notification[]> {
    if (!isSupabaseConfigured) return [
      { id: 1, user_id: userId, title: 'Welcome to LivFit', body: 'Start your journey today.', type: 'SYSTEM', is_read: false, created_at: new Date().toISOString() }
    ] as any;

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async markAsRead(id: number): Promise<void> {
    if (!isSupabaseConfigured) return;

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (error) throw error;
  }

  async create(notification: Partial<Notification>): Promise<Notification> {
    if (!isSupabaseConfigured) return { ...notification, id: Math.random(), created_at: new Date().toISOString() } as any;

    const { data, error } = await supabase
      .from('notifications')
      .insert(notification)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const notificationRepository = new NotificationRepository();
