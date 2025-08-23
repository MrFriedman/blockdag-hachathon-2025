import { Heart } from "lucide-react";

interface WellChainLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const WellChainLogo = ({ size = "md", showText = true }: WellChainLogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl"
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Heart className={`${sizeClasses[size]} text-primary fill-primary`} />
      </div>
      {showText && (
        <span className={`font-bold text-primary ${textSizeClasses[size]}`}>
          WellChain
        </span>
      )}
    </div>
  );
};