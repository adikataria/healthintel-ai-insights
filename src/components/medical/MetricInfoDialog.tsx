
import React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Info } from "lucide-react";

interface MetricInfoDialogProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
}

export const MetricInfoDialog: React.FC<MetricInfoDialogProps> = ({ trigger, title, description }) => (
  <Dialog>
    <DialogTrigger asChild>
      <span className="inline-flex items-center underline cursor-pointer text-blue-600 hover:text-blue-800">{trigger}</span>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle className="flex items-center gap-2">
        <Info className="h-5 w-5 text-blue-500" />
        {title}
      </DialogTitle>
      <div className="text-gray-700 mt-2">{description}</div>
    </DialogContent>
  </Dialog>
);

