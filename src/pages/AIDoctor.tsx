
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Stethoscope, History, Mic, Send, Loader2, User, UserCircle, Bot, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuickAccessBar from "@/components/medical/QuickAccessBar";
import ChatFooter from "@/components/medical/ChatFooter";
import MessageBubble from "@/components/medical/MessageBubble";
import ProgressIndicator from "@/components/medical/ProgressIndicator";

type Message = {
  role: "user" | "ai";
  content: string;
  pending?: boolean;
};

const SAMPLE_QUESTIONS = [
  "Can you help me check my symptoms?",
  "What does my blood test mean?",
  "I’m feeling dizzy. What could it be?",
  "Remind me how to manage high blood pressure."
];

const HISTORY_MOCK = [
  "Last blood pressure check: 138/87",
  "You asked about high cholesterol last week",
  "Symptom tracked: sore throat (2 days)"
];

export default function AIDoctor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "👋 Hi! I’m your AI Doctor. Describe your symptoms, ask questions, or tap a quick action below!",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, showFAQ, showHistory]);

  // Simulate AI typing
  const sendMessage = (rawText: string) => {
    if (!rawText.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", content: rawText }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      // Example (mock) conversational flow with follow-up from AI
      let answer = "";
      if (/symptom/i.test(rawText)) {
        answer =
          "Let’s get more details! Can you describe your main symptom, and how long you've had it?";
      } else if (/blood/i.test(rawText)) {
        answer =
          "Generally, blood test results depend on a few values. Would you like me to walk you through interpreting your results?";
      } else if (/dizzy|dizziness|lightheaded/i.test(rawText)) {
        answer =
          "I'm here to help! When did your dizziness start, and do you have any other symptoms?";
      } else if (/remind/i.test(rawText)) {
        answer =
          "Great! Would you like daily or weekly reminders? And should I send them as notifications?";
      } else {
        answer =
          "Thank you for sharing. Could you give a bit more context, or describe any new symptoms?";
      }
      setMessages((msgs) => [
        ...msgs,
        {
          role: "ai",
          content: answer,
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  // Quick access handlers
  const handleQuickAccess = (type: string) => {
    if (type === "faq") setShowFAQ((p) => !p);
    if (type === "history") setShowHistory((p) => !p);
    if (type === "symptom") sendMessage("Can you help me check my symptoms?");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-medical-primary/10 to-white">
      {/* Header */}
      <header className="z-10 px-4 py-3 flex items-center justify-between bg-white shadow-sm sticky top-0 w-full">
        <div className="flex items-center gap-3">
          <Bot className="text-medical-primary h-6 w-6" />
          <span className="text-xl font-montserrat font-bold text-medical-primary tracking-tight">DocLumen AI Doctor</span>
        </div>
      </header>

      {/* Chat */}
      <main className="flex-1 overflow-y-auto px-0 py-2 md:px-0 bg-transparent">
        {/* Quick Access Bar */}
        <QuickAccessBar onAccess={handleQuickAccess} />

        {/* FAQ Drawer */}
        {showFAQ && (
          <div className="p-4 animate-fade-in">
            <div className="font-semibold mb-2 text-medical-primary flex items-center gap-2">
              <ChevronDown className="h-4 w-4" /> Frequently Asked
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAMPLE_QUESTIONS.map((q, idx) => (
                <Button key={idx} variant="outline" className="justify-start" onClick={() => sendMessage(q)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {q}
                </Button>
              ))}
            </div>
          </div>
        )}
        {/* History Drawer */}
        {showHistory && (
          <div className="p-4 animate-fade-in">
            <div className="font-semibold mb-2 text-medical-primary flex items-center gap-2">
              <ChevronDown className="h-4 w-4" /> Past Queries & Reports
            </div>
            <ul className="space-y-2">
              {HISTORY_MOCK.map((hist, i) => (
                <li key={i} className="flex items-center gap-2 bg-muted px-3 py-2 rounded-md text-accent">
                  <History className="h-4 w-4" /> {hist}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Chat window */}
        <div className="flex flex-col gap-2 p-2 sm:p-4 max-w-lg mx-auto">
          {messages.map((msg, i) => (
            <MessageBubble key={i} role={msg.role} content={msg.content} />
          ))}
          {isLoading && <ProgressIndicator />}
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Footer Input */}
      <ChatFooter
        value={input}
        onChange={setInput}
        onSend={sendMessage}
        onVoice={() => setVoiceActive(true)} // Placeholder for next step
        disabled={isLoading}
        suggested={SAMPLE_QUESTIONS}
      />
    </div>
  );
}
