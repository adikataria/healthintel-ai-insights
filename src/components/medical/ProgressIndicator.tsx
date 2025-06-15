
import { Loader2 } from "lucide-react";

export default function ProgressIndicator() {
  return (
    <div className="flex justify-center py-2 animate-fade-in">
      <div className="flex items-center gap-2 px-4 py-2 bg-medical-light rounded-lg shadow-sm">
        <Loader2 className="animate-spin h-5 w-5 text-medical-primary" />
        <span className="text-medical-primary font-medium text-sm">AI is typing…</span>
      </div>
    </div>
  );
}
