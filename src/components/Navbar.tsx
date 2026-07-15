/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Projects', id: 'projects' },
    { label: 'Services', id: 'services' },
    { label: 'Visualizer', id: 'visualizer' },
    { label: 'Style Quiz', id: 'style-quiz' },
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 max-w-[1440px] mx-auto ${
          isScrolled
            ? 'bg-[#FCF9F8]/90 backdrop-blur-md py-4 border-b border-[#E6DED6]'
            : 'bg-transparent py-8'
        } px-6 md:px-16 flex justify-between items-center`}
      >
        {/* Brand Logo */}
        <button
          onClick={() => handleItemClick('hero')}
          className="font-headline-sm text-2xl tracking-[0.25em] text-[#1C1B1B] font-semibold hover:opacity-80 transition-opacity cursor-pointer focus:outline-none"
        >
          AETHER
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-10 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`font-label-caps text-xs tracking-widest uppercase transition-all duration-300 relative py-1 focus:outline-none cursor-pointer ${
                activeSection === item.id
                  ? 'text-[#5D5F5B] font-bold border-b border-[#5D5F5B]'
                  : 'text-[#454843] hover:text-[#5D5F5B]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleItemClick('contact')}
            className="hidden sm:flex items-center gap-1.5 bg-[#1C1B1B] text-white px-6 py-2.5 font-label-caps text-[11px] tracking-widest uppercase hover:bg-[#5D5F5B] transition-colors focus:outline-none rounded-sm border border-[#1C1B1B]"
          >
            Inquire <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[#1C1B1B] p-1.5 hover:bg-[#F6F3F2] rounded-sm transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#FCF9F8] z-40 lg:hidden flex flex-col pt-32 px-10 transition-all duration-300">
          <div className="flex flex-col gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-left font-headline-md text-3xl tracking-wide py-2 focus:outline-none border-b border-[#E6DED6] ${
                  activeSection === item.id ? 'text-[#5D5F5B] font-medium' : 'text-[#454843]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-16 flex flex-col gap-6">
            <button
              onClick={() => handleItemClick('contact')}
              className="w-full text-center bg-[#1C1B1B] text-white py-4 font-label-caps text-xs tracking-widest uppercase hover:bg-[#5D5F5B] transition-colors rounded-sm"
            >
              Get In Touch
            </button>
            <div className="text-center text-xs text-[#625E57] tracking-wider uppercase font-label-caps">
              EST. 2012 — NEW YORK & LONDON
            </div>
          </div>
        </div>
      )}
    </>
  );
}
