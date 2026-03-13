import React from "react";
import { cn } from "@/lib/cn";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  online?: boolean;
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[0.6rem]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
  "2xl": "h-20 w-20 text-xl",
};

const onlineSizeStyles: Record<AvatarSize, string> = {
  xs: "h-1.5 w-1.5 ring-1",
  sm: "h-2 w-2 ring-1",
  md: "h-2.5 w-2.5 ring-1",
  lg: "h-3 w-3 ring-2",
  xl: "h-3.5 w-3.5 ring-2",
  "2xl": "h-4 w-4 ring-2",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getGradient(name: string): string {
  const gradients = [
    "from-[#0066FF] to-[#00D4FF]",
    "from-[#7C3AED] to-[#C084FC]",
    "from-[#059669] to-[#34D399]",
    "from-[#DC2626] to-[#FB7185]",
    "from-[#D97706] to-[#FCD34D]",
    "from-[#0891B2] to-[#67E8F9]",
  ];
  const idx = name.charCodeAt(0) % gradients.length;
  return gradients[idx];
}

export function Avatar({
  src,
  alt,
  name = "",
  size = "md",
  className,
  online,
}: AvatarProps) {
  return (
    <div className={cn("relative shrink-0 inline-block", className)}>
      <div
        className={cn(
          "rounded-full overflow-hidden",
          sizeStyles[size],
          !src && "flex items-center justify-center"
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt ?? name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className={cn(
              "h-full w-full flex items-center justify-center",
              "bg-gradient-to-br font-semibold text-white",
              getGradient(name || "U")
            )}
          >
            {name ? getInitials(name) : "?"}
          </div>
        )}
      </div>

      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full",
            "ring-black",
            onlineSizeStyles[size],
            online ? "bg-[#30D158]" : "bg-white/30"
          )}
        />
      )}
    </div>
  );
}

interface AvatarGroupProps {
  avatars: Array<{ src?: string; name?: string }>;
  max?: number;
  size?: AvatarSize;
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = "md",
  className,
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((avatar, i) => (
        <div
          key={i}
          className={cn("ring-2 ring-black rounded-full -ml-2 first:ml-0")}
          style={{ zIndex: visible.length - i }}
        >
          <Avatar src={avatar.src} name={avatar.name} size={size} />
        </div>
      ))}

      {overflow > 0 && (
        <div
          className={cn(
            "ring-2 ring-black rounded-full -ml-2 z-0",
            sizeStyles[size],
            "flex items-center justify-center",
            "bg-white/10 text-white/60 text-xs font-medium"
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
