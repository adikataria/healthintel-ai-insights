import React, { useState, useEffect } from "react";
import { MobileChatInterface } from "@/components/mobile/MobileChatInterface";
import { ConsentModal } from "@/components/medical/ConsentModal";
import { useAIDoctorChat } from "@/hooks/useAIDoctorChat";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  isStreaming?: boolean;
}

const MobileChat = () => {
  const { user } = useAuth();
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");

  const { 
    messages: rawMessages, 
    isLoading, 
    sendMessage,
    userProfile, 
    userReports,
  } = useAIDoctorChat();

  // Transform messages to match our interface
  const messages: Message[] = rawMessages.map(msg => ({
    id: msg.id,
    content: msg.content,
    role: msg.role,
    timestamp: msg.timestamp,
    isStreaming: msg.isStreaming
  }));

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Check if this is the first message and show consent
    if (messages.length === 0) {
      setPendingMessage(message);
      setShowConsentModal(true);
      return;
    }

    await sendMessage(message);
  };

  const handleConsentAccepted = async () => {
    setShowConsentModal(false);
    
    if (pendingMessage) {
      await sendMessage(pendingMessage);
      setPendingMessage("");
    }
  };

  const handleConsentDeclined = () => {
    setShowConsentModal(false);
    setPendingMessage("");
    toast.info("You can start chatting anytime by accepting our terms.");
  };

  // Welcome message for first-time users
  useEffect(() => {
    if (messages.length === 0 && userProfile) {
      // Could add a welcome message here if needed
    }
  }, [messages.length, userProfile]);

  return (
    <div className="h-screen bg-background overflow-hidden">
      <MobileChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        placeholder={
          messages.length === 0 
            ? "Ask me about your health..." 
            : "Type your message..."
        }
      />

      <ConsentModal
        isOpen={showConsentModal}
        onAccept={handleConsentAccepted}
        onDecline={handleConsentDeclined}
        type="chat"
      />
    </div>
  );
};

export default MobileChat;