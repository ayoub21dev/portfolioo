import React from 'react';
import { GithubIcon, LinkedInIcon } from './Icons';
import type { PersonalInfo } from '../types';

const socialIcons = {
    github: GithubIcon,
    linkedin: LinkedInIcon,
};

interface FooterProps {
  className?: string;
  personalInfo: PersonalInfo;
}

const Footer: React.FC<FooterProps> = ({ className, personalInfo }) => {
  return (
    <footer className={`w-full text-center p-6 border-t border-slate-700/50 ${className}`}>
        <div className="flex justify-center space-x-6">
          {personalInfo.socials.map(social => {
              const Icon = socialIcons[social.name];
              if (!Icon) return null;
              return (
                  <a href={social.url} key={social.name} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                      <span className="sr-only">{social.name.charAt(0).toUpperCase() + social.name.slice(1)}</span>
                      <Icon className="h-6 w-6" />
                  </a>
              )
          })}
        </div>
    </footer>
  );
};

export default Footer;