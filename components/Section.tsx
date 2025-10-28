import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <div className={`relative w-full h-full bg-black/80 backdrop-blur-sm border border-blue-500/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden ${className}`}>
        {children}
    </div>
  );
};

export default Section;
