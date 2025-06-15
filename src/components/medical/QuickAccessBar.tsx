
import { MessageCircle, Stethoscope, History } from "lucide-react";

interface Props {
  onAccess: (type: "faq" | "symptom" | "history") => void;
}
export default function QuickAccessBar({ onAccess }: Props) {
  return (
    <div className="flex justify-between gap-2 py-3 px-2 md:px-4 bg-white/60 border-b sticky top-0 z-10 rounded-t-xl shadow-sm">
      <button
        className="flex-1 flex flex-col items-center text-medical-primary active:scale-95 transition"
        onClick={() => onAccess("faq")}
        aria-label="Common Questions"
      >
        <MessageCircle className="h-5 w-5 mb-1" />
        <span className="text-[12px] font-medium">FAQ</span>
      </button>
      <button
        className="flex-1 flex flex-col items-center text-medical-primary active:scale-95 transition"
        onClick={() => onAccess("symptom")}
        aria-label="Symptom Checker"
      >
        <Stethoscope className="h-5 w-5 mb-1" />
        <span className="text-[12px] font-medium">Check Symptoms</span>
      </button>
      <button
        className="flex-1 flex flex-col items-center text-medical-primary active:scale-95 transition"
        onClick={() => onAccess("history")}
        aria-label="History"
      >
        <History className="h-5 w-5 mb-1" />
        <span className="text-[12px] font-medium">History</span>
      </button>
    </div>
  );
}
