// Fix: Import React to make React types like React.ReactNode and React.FC available in this file.
import React from 'react';

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: string;
}

export interface NavLink {
  id: string;
  name: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface SocialLink {
    name: 'github' | 'linkedin';
    url: string;
}

export interface PersonalInfo {
    name: string;
    title: string;
    shortBio: string;
    profileImage: string;
    socials: SocialLink[];
}
  
export interface AboutMe {
    paragraphs: string[];
}
  
export interface PortfolioData {
    personalInfo: PersonalInfo;
    aboutMe: AboutMe;
    projects: Project[];
    skills: Skill[];
}