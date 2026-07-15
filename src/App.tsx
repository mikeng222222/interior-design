/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import Services from './components/Services';
import Visualizer from './components/Visualizer';
import StyleQuiz from './components/StyleQuiz';
import About from './components/About';
import ContactForm from './components/ContactForm';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedService, setSelectedService] = useState('');
  const [selectedSpec, setSelectedSpec] = useState('');

  // Handle navigation scroll
  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Listen for scroll to dynamically update active navbar category
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'services', 'visualizer', 'style-quiz', 'philosophy', 'contact'];
      let currentSection = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If top of section is close to top of viewport
          if (rect.top <= 160 && rect.bottom >= 160) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Callback when a user clicks "Request Consultation For This Style" from a project modal
  const handleInquireAboutProject = (projectTitle: string) => {
    setSelectedService('Interior Architecture & Design');
    setSelectedSpec(`Style matched to project portfolio: "${projectTitle}"`);
    setTimeout(() => {
      handleNavigate('contact');
    }, 100);
  };

  // Callback when a user books a service card
  const handleBookService = (serviceName: string) => {
    setSelectedService(serviceName);
    setSelectedSpec(`Inquiry regarding package: "${serviceName}"`);
    setTimeout(() => {
      handleNavigate('contact');
    }, 100);
  };

  // Callback when user saves spec sheet from the moodboard visualizer
  const handleApplyMoodboard = (specText: string) => {
    setSelectedSpec(specText);
    setTimeout(() => {
      handleNavigate('contact');
    }, 100);
  };

  // Callback when user generates style quiz proposal
  const handleApplyQuizResult = (quizText: string) => {
    setSelectedSpec(quizText);
    setTimeout(() => {
      handleNavigate('contact');
    }, 100);
  };

  return (
    <div className="bg-[#FCF9F8] min-h-screen text-[#1C1B1B] selection:bg-[#5D5F5B] selection:text-white max-w-[1440px] mx-auto shadow-sm">
      {/* Dynamic Header / Navbar */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Hero Section */}
      <div id="hero">
        <Hero onExplore={() => handleNavigate('projects')} />
      </div>

      {/* Main Content Sections */}
      <main>
        {/* Selected Portfolio Works Grid */}
        <ProjectGrid onInquireAboutProject={handleInquireAboutProject} />

        {/* Studio Capabilities / Services */}
        <Services onBookService={handleBookService} />

        {/* Tactile Material Moodboard / Custom Room Visualizer */}
        <Visualizer onApplyMoodboard={handleApplyMoodboard} />

        {/* Style Quiz Assessment & Proposal Generator */}
        <StyleQuiz onApplyQuizResult={handleApplyQuizResult} />

        {/* Philosophy & Values */}
        <About />
      </main>

      {/* Inquiries Contact & Schedule Form */}
      <ContactForm initialService={selectedService} initialSpec={selectedSpec} />
    </div>
  );
}
