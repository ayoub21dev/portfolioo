import type { NavLink } from './types';
import {
  CodeBracketIcon,
  HomeIcon,
  UserIcon,
  CogIcon,
  PhoneIcon,
} from './components/Icons';

export const NAV_LINKS: NavLink[] = [
  { id: 'home', name: 'Home', href: '#home', icon: HomeIcon },
  { id: 'projects', name: 'Projects', href: '#projects', icon: CogIcon },
  { id: 'skills', name: 'Skills', href: '#skills', icon: CodeBracketIcon },
  { id: 'about', name: 'About', href: '#about', icon: UserIcon },
  { id: 'contact', name: 'Contact', href: '#contact', icon: PhoneIcon },
];