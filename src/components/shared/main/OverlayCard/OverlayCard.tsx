import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ReusableCardProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  backgroundImage?: string;
  className?: string;
  onClick?: () => void;
}

export function OverlayCard({
  title,
  description,
  icon,
  backgroundImage,
  className,
  onClick,
}: ReusableCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden h-70  p-6 text-white cursor-pointer transition-transform hover:scale-105",
        className,
      )}
      onClick={onClick}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center ",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 backdrop-grayscale-100 backdrop-brightness-90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center top-1/2 -translate-y-1/2 text-center space-y-4">
        {icon && <div className="text-white">{icon}</div>}

        {title && <h3 className="text-xl font-semibold">{title}</h3>}

        {description && (
          <p className="text-sm text-gray-200 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
