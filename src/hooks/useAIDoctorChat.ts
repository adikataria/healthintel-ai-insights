
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: any;
}

interface Symptom {
  description: string;
  duration?: string;
  intensity?: number;
  context?: string;
}

interface UseAIDoctorChatProps {
  conversationId?: string;
}

export const useAIDoctorChat = ({ conversationId }: UseAIDoctorChatProps = {}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(conversationId || null);
  const [userReports, setUserReports] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  // Load user's health profile for personalized insights
  useEffect(() => {
    const loadUserProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_health_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading user profile:', error);
          return;
        }

        if (data) {
          // Calculate age from date_of_birth if available
          const profileWithAge = data.date_of_birth 
            ? { ...data, age: calculateAge(data.date_of_birth) }
            : data;
          
          setUserProfile(profileWithAge);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    loadUserProfile();
  }, [user]);

  // Load user's recent medical reports for context
  useEffect(() => {
    const loadUserReports = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('medical_reports')
          .select('id, title, ai_insights, created_at')
          .eq('user_id', user.id)
          .eq('analysis_status', 'completed')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setUserReports(data || []);
      } catch (error) {
        console.error('Error loading user reports:', error);
      }
    };

    loadUserReports();
  }, [user]);

  // Load conversation messages with enhanced metadata
  useEffect(() => {
    const loadMessages = async () => {
      if (!currentConversationId) return;

      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('conversation_id', currentConversationId)
          .order('created_at', { ascending: true });

        if (error) throw error;

        const formattedMessages = data.map(msg => ({
          id: msg.id,
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: new Date(msg.created_at),
          metadata: msg.metadata
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, [currentConversationId]);

  const createNewConversation = async (title: string = 'New Health Consultation') => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert({
          user_id: user.id,
          title
        })
        .select()
        .single();

      if (error) throw error;
      
      setCurrentConversationId(data.id);
      setMessages([]);
      
      return data.id;
    } catch (error) {
      console.error('Error creating conversation:', error);
      toast.error('Failed to create new conversation');
      return null;
    }
  };

  const sendMessage = async (content: string, symptoms?: Symptom[]) => {
    if (!currentConversationId) {
      const newConversationId = await createNewConversation();
      if (!newConversationId) return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      metadata: { symptoms: symptoms || [] }
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('Sending enhanced message to AI Doctor...');

      const { data, error } = await supabase.functions.invoke('ai-doctor-chat', {
        body: {
          message: content,
          conversationId: currentConversationId,
          userReports,
          userProfile,
          symptoms: symptoms || []
        }
      });

      if (error) {
        console.error('AI Doctor chat error:', error);
        throw new Error(error.message || 'Chat service error');
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        metadata: data.metadata
      };

      setMessages(prev => [...prev, aiMessage]);

      // Show success toast for enhanced features
      if (data.compliance?.enhancedAnalysis) {
        toast.success('Enhanced analysis completed with personalized insights');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      toast.error(errorMessage);

      // Add fallback message
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m currently experiencing technical difficulties. Please consult with a healthcare provider for your medical questions.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendSymptomAnalysis = async (symptoms: Symptom[], additionalContext?: string) => {
    const symptomDescriptions = symptoms.map(s => 
      `${s.description} (Duration: ${s.duration || 'not specified'}, Intensity: ${s.intensity || 'not specified'}/10)`
    ).join(', ');

    const message = `I'm experiencing the following symptoms: ${symptomDescriptions}. ${additionalContext || 'Please provide analysis and guidance.'}`;
    
    await sendMessage(message, symptoms);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    sendSymptomAnalysis,
    createNewConversation,
    conversationId: currentConversationId,
    userProfile,
    userReports: userReports.length
  };
};

// Helper function to calculate age
function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}
