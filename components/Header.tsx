import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import { Bars3Icon, XMarkIcon } from './Icons';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center pt-6">
          <div className="flex items-center space-x-1 bg-[#111219] rounded-full px-3 py-2 shadow-lg">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 text-slate-300 hover:text-white hover:bg-white/10 lg:px-4 lg:text-base"
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between h-16">
          <button onClick={() => onNavigate('home')} className="text-3xl text-white hover:text-slate-300 transition-colors">
              AJ
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="bg-slate-800/50 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-slate-400"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#111219]/95 backdrop-blur-sm">
            {NAV_LINKS.map((link) => {
               const Icon = link.icon;
               return(
                  <button
                    key={link.id}
                    onClick={() => {
                        onNavigate(link.id);
                        setIsOpen(false);
                    }}
                    className="w-full text-slate-300 hover:bg-white/10 hover:text-white flex items-center gap-3 px-4 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </button>
               )
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;