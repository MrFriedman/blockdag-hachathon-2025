// components/FeatureCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: boolean;
}

const FeatureCard = ({ icon: Icon, title, description, gradient }: FeatureCardProps) => {
  return (
    <Card className={`p-6 shadow-medium ${gradient ? "gradient-soft" : ""}`}>
      <CardHeader>
        <div className="flex items-center space-x-4 mb-4">
          <Icon className="w-8 h-8 text-primary" />
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;