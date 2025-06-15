
import { useEffect, useRef, useState } from "react";
import { Bot } from "lucide-react";
import QuickAccessBar from "@/components/medical/QuickAccessBar";
import MessageBubble from "@/components/medical/MessageBubble";
import ProgressIndicator from "@/components/medical/ProgressIndicator";
import { EnhancedChatFooter } from "@/components/medical/EnhancedChatFooter";
import { ConversationalFlow } from "@/components/medical/ConversationalFlow";
import { UserMemoryContext } from "@/components/medical/UserMemoryContext";
import { useAIDoctorChat } from "@/hooks/useAIDoctorChat";

const SAMPLE_QUESTIONS = [
  "Can you help me check my symptoms?",
  "What does my blood test mean?",
  "I'm feeling dizzy. What could it be?",
  "Remind me how to manage high blood pressure."
];

export default function AIDoctor() {
  const [input, setInput] = useState("");
  const [showFAQ, setShowFAQ] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [allowCorrection, setAllowCorrection] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    sendMessage,
    userProfile,
    recentInteractions,
    healthTrends,
    activeFollowUp,
    handleFollowUpComplete,
    recallInteraction
  } = useAIDoctorChat();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, showFAQ, showHistory, activeFollowUp.length]);

  // Enable correction option after AI responses
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    setAllowCorrection(lastMessage?.role === 'assistant' && !lastMessage.isStreaming);
  }, [messages]);

  const handleSendMessage = (rawText: string) => {
    if (!rawText.trim()) return;
    sendMessage(rawText);
    setInput("");
  };

  const handleVoiceResult = (text: string) => {
    setInput(text);
  };

  const handleRequestCorrection = () => {
    const clarificationMessage = "I'd like to clarify my previous message. Let me provide more details or correct something I said.";
    sendMessage(clarificationMessage);
  };

  const handleQuickAccess = (type: string) => {
    if (type === "faq") setShowFAQ(p => !p);
    if (type === "history") setShowHistory(p => !p);
    if (type === "symptom") sendMessage("Can you help me check my symptoms?");
  };

  const lastAIMessage = messages
    .filter(msg => msg.role === 'assistant' && !msg.isStreaming)
    .pop()?.content;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-medical-primary/10 to-white">
      {/* Header */}
      <header className="z-10 px-4 py-3 flex items-center justify-between bg-white shadow-sm sticky top-0 w-full">
        <div className="flex items-center gap-3">
          <Bot className="text-medical-primary h-6 w-6" />
          <span className="text-xl font-montserrat font-bold text-medical-primary tracking-tight">
            DocLumen AI Doctor
          </span>
        </div>
      </header>

      {/* Chat */}
      <main className="flex-1 overflow-y-auto px-0 py-2 md:px-0 bg-transparent">
        {/* Quick Access Bar */}
        <QuickAccessBar onAccess={handleQuickAccess} />

        {/* User Memory Context */}
        <div className="max-w-lg mx-auto px-2 sm:px-4">
          <UserMemoryContext
            userProfile={userProfile}
            recentInteractions={recentInteractions}
            healthTrends={healthTrends}
            onRecallInteraction={recallInteraction}
          />
        </div>

        {/* FAQ Drawer */}
        {showFAQ && (
          <div className="p-4 animate-fade-in">
            <div className="font-semibold mb-2 text-medical-primary">
              Frequently Asked Questions
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  className="justify-start text-left p-3 border border-gray-200 rounded-lg hover:border-medical-primary hover:bg-medical-light transition-all duration-200"
                  onClick={() => handleSendMessage(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* History Drawer */}
        {showHistory && (
          <div className="p-4 animate-fade-in">
            <div className="font-semibold mb-2 text-medical-primary">
              Recent Health Discussions
            </div>
            <ul className="space-y-2">
              {recentInteractions.map((interaction, i) => (
                <li key={i} className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md text-accent">
                  <button
                    onClick={() => recallInteraction(interaction)}
                    className="text-medical-primary hover:underline text-left"
                  >
                    {interaction}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Chat window */}
        <div className="flex flex-col gap-2 p-2 sm:p-4 max-w-lg mx-auto">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <MessageBubble
              role="assistant"
              content="👋 Hi! I'm your enhanced AI Doctor. I can remember our past conversations, ask follow-up questions, and even listen to your voice. How can I help you today?"
            />
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} content={msg.content} />
          ))}

          {/* Active Follow-up Questions */}
          <ConversationalFlow
            questions={activeFollowUp}
            onAnswerSubmit={(questionId, answer) => {
              console.log(`Answer for ${questionId}: ${answer}`);
            }}
            onFlowComplete={handleFollowUpComplete}
            isActive={activeFollowUp.length > 0}
          />

          {isLoading && <ProgressIndicator />}
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Enhanced Footer Input */}
      <EnhancedChatFooter
        value={input}
        onChange={setInput}
        onSend={handleSendMessage}
        onVoiceResult={handleVoiceResult}
        disabled={isLoading}
        suggested={SAMPLE_QUESTIONS}
        lastAIMessage={lastAIMessage}
        allowCorrection={allowCorrection}
        onRequestCorrection={handleRequestCorrection}
      />
    </div>
  );
}
