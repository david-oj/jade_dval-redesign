import React from "react";

interface CircularProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
  textColor?: string;
  children?: React.ReactNode;
  isComplete?: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  progress,
  size = 120,
  strokeWidth = 10,
  circleColor = "stroke-blue-500",
  textColor = "text-gray-400",
  children,
//   isComplete = false, 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={size} width={size} className="transform -rotate-90">
        <circle
          className="stroke-primary/20"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={circleColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className={`absolute flex flex-col items-center justify-center ${textColor}`}>
        {/* {showText && !isComplete && (
          <span className="text-xl font-medium">
            {Math.round(normalizedProgress)}%
          </span>
        )}
        {isComplete && (
          <span className="text-xl font-medium">✓</span>
        )} */}
        {children}
      </div>
    </div>
  );
};

export default CircularProgressBar;