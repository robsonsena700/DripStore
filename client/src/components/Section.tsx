import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: "white" | "gray" | "dark";
  padding?: "small" | "medium" | "large";
}

export default function Section({ 
  children, 
  className = "", 
  backgroundColor = "white",
  padding = "medium" 
}: SectionProps) {
  const bgClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    dark: "bg-gray-900",
  };

  const paddingClasses = {
    small: "py-8",
    medium: "py-16",
    large: "py-24 lg:py-32",
  };

  return (
    <section className={`${bgClasses[backgroundColor]} ${paddingClasses[padding]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
