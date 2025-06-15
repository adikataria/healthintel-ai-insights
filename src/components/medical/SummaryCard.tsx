
import React from "react";
import { Check, AlertTriangle } from "lucide-react";

type SummaryCardProps = {
  title: string;
  iconType: 'check' | 'alert' | 'info';
  color: 'green' | 'yellow' | 'red' | 'blue';
  description: React.ReactNode;
  children?: React.ReactNode;
};

const colorMap: Record<string, string> = {
  green: "border-green-300 bg-green-50 text-green-900",
  yellow: "border-yellow-300 bg-yellow-50 text-yellow-900",
  red: "border-red-300 bg-red-50 text-red-900",
  blue: "border-blue-300 bg-blue-50 text-blue-900",
};

const iconMap: Record<'check' | 'alert' | 'info', JSX.Element> = {
  check: <Check className="h-5 w-5 text-green-500" />,
  alert: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  info: <AlertTriangle className="h-5 w-5 text-blue-500" />,
};

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  iconType,
  color,
  description,
  children
}) => (
  <div className={`flex gap-4 p-4 border rounded-xl shadow-sm ${colorMap[color]} items-start mb-3 animate-fade-in`}>
    <div className="flex-shrink-0 mt-1">
      {iconMap[iconType]}
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="mb-1 text-sm">{description}</p>
      {children}
    </div>
  </div>
);

