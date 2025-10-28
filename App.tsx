import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import { NAV_LINKS } from './constants';
import type { PortfolioData } from './types';


const App: React.FC = () => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [previousSectionIndex, setPreviousSectionIndex] = useState(0);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // The JSON file should be in the `public` folder or at the root of your web server
        const response = await fetch('/portfolio-data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PortfolioData = await response.json();
        setPortfolioData(data);
      } catch (e) {
        console.error("Failed to fetch portfolio data:", e);
        setError("Could not load portfolio data. Please try again later.");
      }
    };
    fetchData();
  }, []);

  // Handle URL hash changes and initial load
  useEffect(() => {
    const sectionComponents = [
      { id: 'home', component: Hero, props: {} },
      { id: 'projects', component: Projects, props: {} },
      { id: 'skills', component: Skills, props: {} },
      { id: 'about', component: About, props: {} },
      { id: 'contact', component: Contact, props: {} },
    ];

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove the '#'
      const sectionIndex = sectionComponents.findIndex(s => s.id === hash);
      if (sectionIndex !== -1) {
        setPreviousSectionIndex(activeSectionIndex);
        setActiveSectionIndex(sectionIndex);
      }
    };

    // Set initial section based on URL hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [activeSectionIndex]);

  const handleNavigate = (sectionId: string) => {
    const sectionComponents = [
      { id: 'home', component: Hero, props: {} },
      { id: 'projects', component: Projects, props: {} },
      { id: 'skills', component: Skills, props: {} },
      { id: 'about', component: About, props: {} },
      { id: 'contact', component: Contact, props: {} },
    ];

    const newIndex = sectionComponents.findIndex(s => s.id === sectionId);
    if (newIndex !== -1 && newIndex !== activeSectionIndex) {
      setPreviousSectionIndex(activeSectionIndex);
      setActiveSectionIndex(newIndex);
      // Update URL hash
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  const getSectionStyle = (index: number): React.CSSProperties => {
    const distance = index - activeSectionIndex;
    const isPrevious = index === previousSectionIndex;

    // Handle the outgoing animation for the previous card
    if (isPrevious && activeSectionIndex !== previousSectionIndex) {
      // If the new card is 'after' the old one, animate the old one up.
      if (activeSectionIndex > previousSectionIndex) {
        return {
          transform: `translateY(-100%) scale(0.95)`,
          opacity: 0,
          zIndex: 0,
          transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
        };
      }
    }

    if (distance < 0) { // Sections that have been passed
      return {
        transform: `translateY(-100%) scale(1)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
        transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
      };
    }

    if (distance === 0) { // Active section
      return {
        transform: 'translateY(0%) scale(1)',
        opacity: 1,
        zIndex: 20,
        pointerEvents: 'auto',
        transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out 0.2s',
      };
    }

    // Stacked sections behind the active one
    return {
      transform: `translateY(${distance * 4}vh) scale(${1 - (distance * 0.05)})`,
      opacity: 1,
      zIndex: 20 - distance,
      pointerEvents: 'none',
      transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
    };
  };

  if (error) {
    return <div className="h-screen flex items-center justify-center bg-black text-red-500 p-8 text-center">{error}</div>;
  }

  if (!portfolioData) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-slate-600"></div>
      </div>
    );
  }

  const sectionComponents = [
    { id: 'home', component: Hero, props: { personalInfo: portfolioData.personalInfo } },
    { id: 'projects', component: Projects, props: { projects: portfolioData.projects } },
    { id: 'skills', component: Skills, props: { skills: portfolioData.skills } },
    { id: 'about', component: About, props: { aboutMe: portfolioData.aboutMe, personalInfo: portfolioData.personalInfo } },
    { id: 'contact', component: Contact, props: { personalInfo: portfolioData.personalInfo } },
  ];

  return (
    <div className="h-screen overflow-hidden relative gradient-bg z-10">
      <Header
        activeSection={sectionComponents[activeSectionIndex].id}
        onNavigate={handleNavigate}
      />

      <main className="relative h-full w-full" style={{ perspective: '1000px' }}>
        {sectionComponents.map(({ id, component: Component, props }, index) => {
          // Fix: Cast the component to `any` to resolve a TypeScript error.
          // This is necessary because TypeScript cannot correctly correlate the union of component
          // types with the corresponding union of prop types when rendering from a heterogeneous array.
          const AnyComponent = Component as React.ComponentType<any>;
          return (
            <div
              key={id}
              className="absolute top-0 left-0 w-full h-full"
              style={getSectionStyle(index)}
            >
              <AnyComponent
                onNavigate={handleNavigate}
                isActive={index === activeSectionIndex}
                {...props}
              />
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default App;
