import React from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import Section from './Section';

interface ProjectsProps {
  isActive: boolean;
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ isActive, projects }) => {
  return (
    <div id="projects" className="h-full w-full p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <Section>
            <div className="p-6 md:p-8 lg:p-12 flex-grow overflow-y-auto">
                <div className="max-w-7xl w-full mx-auto">
                    <div className={`mb-8 md:mb-12 transition-all duration-700 ease-in-out ${isActive ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4'}`}>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white inline-block">
                            Featured Projects
                        </h2>
                        <div className="h-1 w-28 bg-blue-500 mt-4"></div>
                    </div>
                    {/* Adjusted vertical spacing for better tablet view */}
                    <div className="space-y-12 md:space-y-20">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} isActive={isActive} />
                    ))}
                    </div>
                </div>
            </div>
        </Section>
    </div>
  );
};

export default Projects;
