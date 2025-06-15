
import { Mic, Send } from "lucide-react";

interface ChatFooterProps {
  value: string;
  suggested: string[];
  onChange: (val: string) => void;
  onSend: (val: string) => void;
  onVoice?: () => void;
  disabled?: boolean;
}

export default function ChatFooter({
  value,
  suggested,
  onChange,
  onSend,
  onVoice,
  disabled
}: ChatFooterProps) {
  return (
    <footer className="w-full sticky bottom-0 left-0 bg-white py-2 px-3 border-t z-30">
      <div className="flex gap-2 mb-1 items-center">
        <input
          className="flex-1 rounded-lg px-4 py-2 bg-gray-50 border focus:outline-none text-accent text-[15px]"
          type="text"
          value={value}
          placeholder="Describe your symptoms or ask a question…"
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => e.key === "Enter" && value.trim() && onSend(value)}
          disabled={disabled}
          aria-label="Message input"
        />
        <button
          className="p-2 rounded-full bg-medical-primary hover:bg-medical-dark text-white flex items-center justify-center transition-colors"
          onClick={() => value.trim() && onSend(value)}
          disabled={disabled}
          aria-label="Send"
        >
          <Send className="h-5 w-5" />
        </button>
        {onVoice && (
          <button
            className={`p-2 rounded-full bg-medical-secondary hover:bg-medical-primary text-white flex items-center justify-center transition-colors ml-1`}
            onClick={onVoice}
            disabled={disabled}
            aria-label="Voice input"
          >
            <Mic className="h-5 w-5" />
          </button>
        )}
      </div>
      {/* Suggestions */}
      <div className="flex gap-2 pt-1 overflow-x-auto hide-scrollbar">
        {suggested?.slice(0, 3).map((s, idx) => (
          <button
            key={idx}
            className="text-medical-primary bg-medical-light px-3 py-1 rounded-full hover:bg-medical-primary/20 text-sm whitespace-nowrap transition"
            onClick={() => onSend(s)}
            disabled={disabled}
          >
            {s}
          </button>
        ))}
      </div>
    </footer>
  );
}
