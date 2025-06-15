import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: any;
  isStreaming?: boolean;
  followUpQuestions?: FollowUpQuestion[];
}

interface FollowUpQuestion {
  id: string;
  question: string;
  options?: string[];
  type: 'multiple-choice' | 'text' | 'yes-no';
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
  const [recentInteractions, setRecentInteractions] = useState<string[]>([]);
  const [healthTrends, setHealthTrends] = useState<string[]>([]);
  const [activeFollowUp, setActiveFollowUp] = useState<FollowUpQuestion[]>([]);
  const [conversationContext, setConversationContext] = useState<any>({});
  const abortControllerRef = useRef<AbortController | null>(null);

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
          metadata: (msg as any).metadata || null,
          isStreaming: false
        }));

        setMessages(formattedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, [currentConversationId]);

  // Load user's conversation history for memory
  useEffect(() => {
    const loadConversationHistory = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('chat_conversations')
          .select('id, title, created_at, messages:chat_messages(content)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;

        const interactions = data.flatMap(conv => 
          conv.messages?.slice(0, 2).map((msg: any) => msg.content) || []
        ).slice(0, 5);

        setRecentInteractions(interactions);

        // Mock health trends based on conversation history
        const trends = [
          "Blood pressure readings stable over last month",
          "Symptom pattern shows improvement",
          "Medication adherence on track"
        ];
        setHealthTrends(trends);

      } catch (error) {
        console.error('Error loading conversation history:', error);
      }
    };

    loadConversationHistory();
  }, [user]);

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

  const sendMessage = async (content: string, symptoms?: Symptom[], context?: any) => {
    if (!currentConversationId) {
      const newConversationId = await createNewConversation();
      if (!newConversationId) return;
    }

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      metadata: { symptoms: symptoms || [], context: context || {} },
      isStreaming: false
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Create AI message placeholder for streaming
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      metadata: {},
      isStreaming: true
    };

    setMessages(prev => [...prev, aiMessage]);

    try {
      console.log('Sending enhanced message to AI Doctor...');

      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      const { data, error } = await supabase.functions.invoke('ai-doctor-chat', {
        body: {
          message: content,
          conversationId: currentConversationId,
          userReports,
          userProfile,
          symptoms: symptoms || [],
          conversationHistory: recentInteractions,
          healthTrends,
          conversationContext
        }
      });

      if (error) {
        console.error('AI Doctor error:', error);
        throw new Error(error.message || 'Chat service error');
      }

      // Generate follow-up questions based on response
      const followUpQuestions = generateFollowUpQuestions(content, data.response);

      // Update the streaming message with final content
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { 
              ...msg, 
              content: data.response, 
              isStreaming: false, 
              metadata: data.metadata,
              followUpQuestions 
            }
          : msg
      ));

      // Set active follow-up questions
      if (followUpQuestions.length > 0) {
        setActiveFollowUp(followUpQuestions);
      }

      // Update conversation context
      setConversationContext(prev => ({
        ...prev,
        lastTopic: extractMainTopic(content),
        lastSymptoms: symptoms || [],
        followUpActive: followUpQuestions.length > 0
      }));

      // Show success toast for enhanced features
      if (data.compliance?.enhancedAnalysis) {
        toast.success('Enhanced analysis with personalized insights completed');
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was cancelled');
        setMessages(prev => prev.filter(msg => msg.id !== aiMessageId));
        return;
      }

      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
      toast.error(errorMessage);

      // Update streaming message with error
      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId 
          ? { 
              ...msg, 
              content: 'I apologize, but I\'m currently experiencing technical difficulties. Please consult with a healthcare provider for your medical questions.',
              isStreaming: false 
            }
          : msg
      ));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleFollowUpComplete = (answers: Record<string, string>) => {
    const followUpSummary = Object.entries(answers)
      .map(([questionId, answer]) => `${questionId}: ${answer}`)
      .join(', ');
    
    const contextualMessage = `Based on our follow-up discussion: ${followUpSummary}. Please provide more specific guidance.`;
    
    sendMessage(contextualMessage, [], { isFollowUp: true, answers });
    setActiveFollowUp([]);
  };

  const generateFollowUpQuestions = (userInput: string, aiResponse: string): FollowUpQuestion[] => {
    // Simple logic to generate follow-up questions based on content
    const questions: FollowUpQuestion[] = [];
    
    if (userInput.toLowerCase().includes('pain')) {
      questions.push({
        id: 'pain-scale',
        question: 'On a scale of 1-10, how would you rate your pain?',
        options: ['1-3 (Mild)', '4-6 (Moderate)', '7-8 (Severe)', '9-10 (Extreme)'],
        type: 'multiple-choice'
      });
    }
    
    if (userInput.toLowerCase().includes('symptom')) {
      questions.push({
        id: 'symptom-duration',
        question: 'How long have you been experiencing these symptoms?',
        options: ['Less than 24 hours', '1-3 days', '1 week', 'More than a week'],
        type: 'multiple-choice'
      });
    }
    
    return questions.slice(0, 2); // Limit to 2 follow-up questions
  };

  const extractMainTopic = (message: string): string => {
    // Simple topic extraction
    const commonTopics = ['pain', 'fever', 'headache', 'cough', 'fatigue', 'nausea'];
    const topic = commonTopics.find(t => message.toLowerCase().includes(t));
    return topic || 'general health';
  };

  const recallInteraction = (interaction: string) => {
    const recallMessage = `You mentioned: "${interaction}". Can you tell me more about this or provide an update?`;
    sendMessage(recallMessage, [], { isRecall: true, originalInteraction: interaction });
  };

  const sendSymptomAnalysis = async (symptoms: Symptom[], additionalContext?: string) => {
    const symptomDescriptions = symptoms.map(s => 
      `${s.description} (Duration: ${s.duration || 'not specified'}, Intensity: ${s.intensity || 'not specified'}/10)`
    ).join(', ');

    const message = `I'm experiencing the following symptoms: ${symptomDescriptions}. ${additionalContext || 'Please provide analysis and guidance.'}`;
    
    await sendMessage(message, symptoms);
  };

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    sendSymptomAnalysis: async (symptoms: Symptom[], additionalContext?: string) => {
      const symptomDescriptions = symptoms.map(s => 
        `${s.description} (Duration: ${s.duration || 'not specified'}, Intensity: ${s.intensity || 'not specified'}/10)`
      ).join(', ');

      const message = `I'm experiencing the following symptoms: ${symptomDescriptions}. ${additionalContext || 'Please provide analysis and guidance.'}`;
      
      await sendMessage(message, symptoms);
    },
    createNewConversation,
    conversationId: currentConversationId,
    userProfile,
    userReports: userReports.length,
    recentInteractions,
    healthTrends,
    activeFollowUp,
    handleFollowUpComplete,
    recallInteraction,
    conversationContext
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
