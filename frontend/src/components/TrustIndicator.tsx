// components/TrustIndicator.tsx
import { LucideIcon } from "lucide-react";

interface TrustIndicatorProps {
  icon: LucideIcon;
  label: string;
}

const TrustIndicator = ({ icon: Icon, label }: TrustIndicatorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Icon className="w-6 h-6 text-primary" />
      <span className="text-lg font-medium">{label}</span>
    </div>
  );
};

export default TrustIndicator;