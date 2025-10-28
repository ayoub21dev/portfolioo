import React from 'react';
import type { Project } from '../types';
import { GithubIcon, ExternalLinkIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
  isActive: boolean;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isActive, index }) => {
  const delay = 500 + index * 150;

  return (
    <div
      className={`transition-all duration-700 ${isActive ? `opacity-100 translate-y-0` : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${isActive ? delay : 0}ms` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className={` ${index % 2 === 0 ? 'md:order-last' : ''}`}>
          <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer" className="block group">
            <img
              className="w-full h-auto object-cover rounded-lg shadow-xl transition-all duration-500 filter grayscale hover:grayscale-0 group-hover:scale-105"
              src={project.imageUrl}
              alt={project.title}
            />
          </a>
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl lg:text-3xl font-bold text-slate-100">{project.title}</h3>
          <p className="mt-3 text-slate-400 text-base leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
            {project.tags.map((tag) => (
              <span key={tag} className="bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-6 flex items-center space-x-4 justify-center md:justify-start">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub repository"
              >
                <GithubIcon className="w-6 h-6" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Live Demo"
              >
                <ExternalLinkIcon className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
