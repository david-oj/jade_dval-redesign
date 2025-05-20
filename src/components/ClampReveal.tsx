// src/components/ClampReveal.tsx
import React from "react";

type ClampProps = {
  children?: React.ReactNode;
  className?: string;
  /** collapsed max-height */
  maxheight?: string;
  /** line-clamp class when collapsed */
  clamp?: string;
  textColor?: string;
  /** ← state props: */
  expanded: boolean;
  onToggle: () => void;
};

export default function ClampReveal({
  children,
  className = "",
  maxheight = "max-h-[calc(1.5rem*5)]",
  clamp = "line-clamp-4",
  textColor = "text-[#525252]",
  expanded,
  onToggle,
}: ClampProps) {
  return (
    <div
      onClick={() => onToggle()}
      className={`
        overflow-hidden
        transition-[max-height] duration-500 ease-in-out
        ${expanded ? "max-h-[500px]" : maxheight}
        md:group-hover:max-h-[500px]
        cursor-pointer    /* enable pointer on mobile */
        md:pointer-events-none  /* disable pointer on desktop */
      `}
    >
      <p
        className={`
          mt-2 text-sm font-extralight leading-[150%]
          ${textColor} ${className}
          ${expanded ? "line-clamp-none" : clamp}
          md:group-hover:line-clamp-none
        `}
      >
        {children}
      </p>
    </div>
  );
}
