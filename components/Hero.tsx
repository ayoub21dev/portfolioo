import React from 'react';
import { GithubIcon, LinkedInIcon } from './Icons';
import Section from './Section';
import PixelatedText from './PixelatedText';
import type { PersonalInfo } from '../types';

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedInIcon,
};

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  isActive: boolean;
  personalInfo: PersonalInfo;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, isActive, personalInfo }) => {
  const getTransitionClass = (delay: number) =>
    `transition-all duration-700 ease-in-out ${isActive ? `opacity-100 translate-y-0 delay-${delay}` : 'opacity-0 translate-y-10'}`;

  return (
    <div id="home" className="h-full w-full p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <Section>
        <div className="h-full w-full flex items-center justify-center flex-grow overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Main content layout container using Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 items-center justify-center gap-8 lg:gap-12 xl:gap-20 max-w-7xl mx-auto">

            {/* Left Column: Image and Social Icons */}
            <div className={`lg:col-span-2 flex flex-col items-center gap-5 ${getTransitionClass(300)}`}>
              <div className="relative w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl transform -rotate-6"></div>
                <img
                  className="relative w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-slate-800"
                  src="/profile.png"
                  alt={`Profile portrait of ${personalInfo.name}`}
                  loading="lazy"
                />
              </div>
              <div className="flex items-center space-x-6">
                {personalInfo.socials.map(social => {
                  const Icon = socialIcons[social.name];
                  if (!Icon) return null;
                  return (
                    <a href={social.url} key={social.name} aria-label={`${social.name} Profile`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                      <Icon className="w-8 h-8 xl:w-9 xl:h-9" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Right Column: Text and Buttons */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight ${getTransitionClass(500)}`}>
                <PixelatedText text={personalInfo.name} className="gradient-text" />
              </h1>
              <p className={`text-base sm:text-lg lg:text-xl xl:text-2xl text-slate-300 max-w-lg xl:max-w-2xl ${getTransitionClass(700)}`}>
                {personalInfo.shortBio}
              </p>
              <div className={`mt-4 lg:mt-6 xl:mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs sm:max-w-none sm:w-auto ${getTransitionClass(900)}`}>
                <button
                  onClick={() => onNavigate('projects')}
                  className="w-full sm:w-auto inline-block bg-slate-100 text-black px-8 py-3 text-sm sm:text-base font-semibold rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
                >
                  View My Work
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="w-full sm:w-auto inline-block border border-slate-600 text-slate-300 px-8 py-3 text-sm sm:text-base font-semibold rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-slate-800/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Hero;