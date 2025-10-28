import React from 'react';
// Fix: The 'Skill' type is defined in 'types.ts', not 'constants.ts'.
import type { Skill } from '../types';
import Section from './Section';
import {
  CodeBracketIcon,
  HtmlIcon,
  CssIcon,
  JavaScriptIcon,
  LaravelIcon,
  PhpIcon,
  ReactIcon,
  TailwindIcon,
  LinuxIcon,
} from './Icons';

const iconMap: { [key: string]: React.ReactNode } = {
  'html': <HtmlIcon className="w-10 h-10" />,
  'css': <CssIcon className="w-10 h-10" />,
  'javascript': <JavaScriptIcon className="w-10 h-10" />,
  'react': <ReactIcon className="w-10 h-10" />,
  'laravel': <LaravelIcon className="w-10 h-10" />,
  'tailwind': <TailwindIcon className="w-10 h-10" />,
  'linux': <LinuxIcon className="w-10 h-10" />,
  'php': <PhpIcon className="w-10 h-10" />,
};


interface SkillsProps {
  isActive: boolean;
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ isActive, skills }) => {
  const groupedSkills = skills.reduce((acc, skill) => {
    const { category } = skill;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(groupedSkills);

  return (
    <div id="skills" className="h-full w-full p-4 sm:p-6 md:p-8 flex items-center justify-center">
      <Section className="justify-center">
        <div className="p-6 md:p-8 lg:p-12 flex-grow overflow-y-auto">
          <div className="max-w-7xl w-full mx-auto">
            <div className={`mb-8 md:mb-12 transition-all duration-700 ease-in-out text-center sm:text-left ${isActive ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-4'}`}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white inline-block">
                Skills
              </h2>
              <div className="h-1 w-12 bg-blue-500 mt-4 mx-auto sm:mx-0"></div>
            </div>

            <div className="space-y-10">
              {categories.map((category, catIndex) => {
                const baseDelay = 500 + catIndex * 400;
                return (
                  <div key={category}>
                    <h3
                      className={`text-xl sm:text-2xl font-semibold text-slate-300 mb-6 transition-all duration-500 ease-in-out ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                      style={{ transitionDelay: `${isActive ? baseDelay : 0}ms` }}
                    >
                      {category}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                      {groupedSkills[category].map((skill, skillIndex) => {
                        const cardDelay = baseDelay + 150 + skillIndex * 100;
                        return (
                          <div
                            key={skill.name}
                            className={`flex flex-col items-center justify-center gap-3 p-4 sm:p-6 bg-slate-800/20 border border-slate-700/50 rounded-xl ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                            style={{ transitionDelay: `${isActive ? cardDelay : 0}ms` }}
                          >
                            <div className="text-slate-300">{iconMap[skill.icon] || <CodeBracketIcon className="w-10 h-10" />}</div>
                            <h4 className="text-sm sm:text-base font-medium text-slate-300 text-center">{skill.name}</h4>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Skills;