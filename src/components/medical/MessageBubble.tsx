
import { User, Bot } from "lucide-react";
import React from "react";

type Props = {
  role: "user" | "ai";
  content: string;
};

export default function MessageBubble({ role, content }: Props) {
  const user = role === "user";
  return (
    <div className={`flex ${user ? "justify-end" : "justify-start"} animate-fade-in`}>
      <div
        className={`rounded-2xl px-4 py-2 shadow-md flex items-end gap-2 max-w-[80%] ${
          user
            ? "bg-medical-primary text-white"
            : "bg-gray-100 text-accent"
        }`}
      >
        {!user && <Bot className="h-4 w-4 mr-1 text-medical-primary flex-shrink-0" aria-label="AI" />}
        <span className="text-[15px] leading-tight">
          {content}
        </span>
        {user && <User className="h-4 w-4 ml-1 text-medical-secondary flex-shrink-0" aria-label="User" />}
      </div>
    </div>
  );
}
