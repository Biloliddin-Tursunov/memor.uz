import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { ContactMessage } from '../types';

export const useMessages = () => {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMessages = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('contact_messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (err: any) {
            console.error('Error fetching messages:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const markAsRead = async (id: string) => {
        try {
            const { error } = await supabase
                .from('contact_messages')
                .update({ is_read: true })
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setMessages(prev => prev.map(msg =>
                msg.id === id ? { ...msg, is_read: true } : msg
            ));
        } catch (err: any) {
            console.error('Error marking message as read:', err);
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm("Xabarni o'chirmoqchimisiz?")) return;

        try {
            const { error } = await supabase
                .from('contact_messages')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setMessages(prev => prev.filter(msg => msg.id !== id));
        } catch (err: any) {
            console.error('Error deleting message:', err);
            alert("Xatolik yuz berdi");
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    return { messages, loading, error, refreshMessages: fetchMessages, markAsRead, deleteMessage };
};
