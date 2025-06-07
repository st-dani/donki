'use client';

import NavLogo from './navigation/NavLogo';
import NavLinks from './navigation/NavLinks';
import NavCTA from './navigation/NavCTA';
import MobileNav from './navigation/MobileNav';

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-theme-white/80 backdrop-blur-md border-b border-theme-yellow/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <NavLogo />
          <div className="flex items-center space-x-4">
            <NavLinks />
            <NavCTA />
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
} 