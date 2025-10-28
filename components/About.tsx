import React from 'react';
import Section from './Section';
import type { PersonalInfo, AboutMe } from '../types';


interface AboutProps {
  isActive: boolean;
  personalInfo: PersonalInfo;
  aboutMe: AboutMe;
}

const About: React.FC<AboutProps> = ({ isActive, personalInfo, aboutMe }) => {
  const getTransitionClass = (delay: number) => 
    `transition-all duration-700 ease-in-out ${isActive ? `opacity-100 translate-y-0 delay-${delay}` : 'opacity-0 translate-y-4'}`;
  
  return (
    <div id="about" className="h-full w-full p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <Section>
            <div className="p-6 md:p-8 lg:p-12 flex-grow overflow-y-auto flex items-center">
                <div className="max-w-7xl w-full mx-auto">
                    <div className={`mb-8 md:mb-12 text-center md:text-left ${getTransitionClass(300)}`}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white inline-block">
                            About Me
                        </h2>
                        <div className="h-1 w-20 bg-blue-500 mt-4 mx-auto md:mx-0"></div>
                    </div>
                    {/* Changed grid layout from 5 cols to 3 for better tablet responsiveness */}
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                    {/* Updated image column span */}
                    <div className={`md:col-span-1 flex justify-center ${getTransitionClass(500)}`}>
                        <img
                            // Adjusted image size to scale better
                            className="rounded-full w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 object-cover shadow-2xl border-4 border-slate-800"
                            src="/profile.png"
                            alt="Profile portrait"
                        />
                    </div>
                    {/* Updated text column span */}
                    <div className={`md:col-span-2 text-base sm:text-lg text-slate-300 space-y-5 leading-relaxed text-center md:text-left ${getTransitionClass(700)}`}>
                        {aboutMe.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                    </div>
                </div>
            </div>
        </Section>
    </div>
  );
};

export default About;
