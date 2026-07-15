/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { X, ArrowRight, MapPin, Calendar, Layers, Palette, MessageSquare, Send } from 'lucide-react';

interface ProjectGridProps {
  onInquireAboutProject: (projectTitle: string) => void;
}

export default function ProjectGrid({ onInquireAboutProject }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Custom interactive QA state for the modal
  const [questionText, setQuestionText] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'designer'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'residential', label: 'Residential' },
    { id: 'suite', label: 'Private Suites' },
    { id: 'culinary', label: 'Culinary Pavilion' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setChatHistory([
      {
        sender: 'designer',
        text: `Welcome to the design overview of ${project.title}. I'm the lead architectural designer on this transformation. Feel free to ask me anything about the materials, natural lighting, or spacing of this project!`
      }
    ]);
    setQuestionText('');
  };

  const handleSendQuestion = (e: FormEvent) => {
    e.preventDefault();
    if (!questionText.trim() || !selectedProject) return;

    const userMsg = questionText;
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg }]);
    setQuestionText('');
    setIsTyping(true);

    // Simulate custom lead designer response
    setTimeout(() => {
      let response = `Thank you for your question about the ${selectedProject.title}. `;
      const lowercaseMsg = userMsg.toLowerCase();

      if (lowercaseMsg.includes('color') || lowercaseMsg.includes('palette') || lowercaseMsg.includes('paint')) {
        response += `For this space, we curated a palette around ${selectedProject.colorPalette[0].name} (${selectedProject.colorPalette[0].hex}) and ${selectedProject.colorPalette[1].name} to reflect natural light perfectly without casting cold blue tones. We generally avoid pure whites in favor of soft, natural limestone tones.`;
      } else if (lowercaseMsg.includes('cost') || lowercaseMsg.includes('budget') || lowercaseMsg.includes('price') || lowercaseMsg.includes('expensive')) {
        response += `Bespoke spatial transformations like this are highly tailored to individual structural constraints. Typically, architectural packages of this detail start at $80,000, focusing heavily on bookmatched materials and custom furniture integration.`;
      } else if (lowercaseMsg.includes('material') || lowercaseMsg.includes('wood') || lowercaseMsg.includes('marble') || lowercaseMsg.includes('stone')) {
        response += `We sourced local, sustainable materials of exceptional grade. The ${selectedProject.materials.slice(0, 2).join(' and ')} were selected specifically for how they patinate over decades, making the space age with grace and organic integrity.`;
      } else if (lowercaseMsg.includes('light') || lowercaseMsg.includes('window') || lowercaseMsg.includes('sun')) {
        response += `Our lighting strategy centers on natural diurnal cycles. The sheer linen window treatments diffuse hard noon sun into a soft velvet glow, and we added warm, low-level indirect LED coves to mimic sunset at night.`;
      } else {
        response += `Our overarching goal with the ${selectedProject.title} was to eliminate visual noise. By integrating handles, recessed doors, and structural columns into the plaster work, we achieved a serene canvas that highlights the pure forms of the curated furniture.`;
      }

      setChatHistory(prev => [...prev, { sender: 'designer', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto bg-[#FCF9F8]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-xl">
          <div className="font-label-caps text-[11px] tracking-[0.25em] text-[#5D5F5B] uppercase mb-3">
            Selected Portfolio
          </div>
          <h2 className="font-headline-md text-3xl sm:text-5xl text-[#1C1B1B] font-normal leading-[1.2]">
            Selected Works
          </h2>
          <p className="font-body-md text-[#454843] mt-4 leading-relaxed">
            A curated collection of our most recent architectural interior transformations, highlighting our absolute dedication to honest materiality, sculptural balance, and natural light.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 md:gap-3 border-b border-[#E6DED6] pb-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`font-label-caps text-[11px] tracking-widest uppercase py-2 px-3 transition-all cursor-pointer focus:outline-none ${
                selectedCategory === cat.id
                  ? 'text-[#1C1B1B] border-b-2 border-[#1C1B1B] font-bold'
                  : 'text-[#625E57] hover:text-[#1C1B1B]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {filteredProjects.map((project, idx) => {
          // Asymmetric column widths for editorial feel
          let colSpan = 'md:col-span-6';
          if (idx === 0) colSpan = 'md:col-span-8';
          if (idx === 1) colSpan = 'md:col-span-4';
          if (idx === 2) colSpan = 'md:col-span-4';
          if (idx === 3) colSpan = 'md:col-span-8';

          return (
            <div
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className={`${colSpan} group cursor-pointer flex flex-col justify-between`}
            >
              <div className="overflow-hidden bg-[#E5E2E1] aspect-[4/3] md:aspect-auto md:h-[450px] relative mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* View Project Pill */}
                <div className="absolute bottom-6 right-6 bg-[#FCF9F8]/90 backdrop-blur-sm px-4 py-2.5 rounded-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2">
                  <span className="font-label-caps text-[9px] tracking-widest text-[#1C1B1B] uppercase">
                    Explore Details
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#1C1B1B]" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <span className="font-label-caps text-[10px] uppercase text-[#5D5F5B] tracking-[0.2em] font-semibold">
                  {project.categoryLabel}
                </span>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-headline-sm text-xl text-[#1C1B1B] font-medium group-hover:text-[#5D5F5B] transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-label-caps text-[10px] text-[#625E57] tracking-wider">
                    {project.location}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cinematic Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10">
          <div className="bg-[#FCF9F8] w-full max-w-6xl shadow-2xl overflow-hidden relative rounded-sm flex flex-col lg:flex-row max-h-[90vh] md:max-h-[85vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 bg-[#1C1B1B] text-white p-2.5 rounded-sm hover:bg-[#5D5F5B] transition-colors shadow-lg focus:outline-none"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image & Metadata Column */}
            <div className="lg:w-1/2 relative bg-[#E5E2E1] flex flex-col justify-end min-h-[300px] lg:min-h-0 overflow-y-auto">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
              
              {/* Image Floating Metadata */}
              <div className="relative p-8 md:p-12 text-white">
                <span className="font-label-caps text-[10px] tracking-[0.25em] text-[#E3E3DE] uppercase">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="font-headline-md text-3xl md:text-4xl text-white mt-2 leading-tight">
                  {selectedProject.title}
                </h3>
                
                {/* Specs row */}
                <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#ECE1D2]" />
                    <span className="font-label-caps text-xs tracking-wider text-white/90">
                      {selectedProject.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#ECE1D2]" />
                    <span className="font-label-caps text-xs tracking-wider text-white/90">
                      Completed {selectedProject.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Detailed Narrative & Lead Designer chat */}
            <div className="lg:w-1/2 p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
              <div>
                <div className="font-label-caps text-[10px] tracking-widest text-[#5D5F5B] uppercase mb-2">
                  Architectural Narrative
                </div>
                <p className="font-body-lg text-lg text-[#1C1B1B] leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                {/* Spatial Details */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="w-4.5 h-4.5 text-[#5D5F5B]" />
                    <span className="font-label-caps text-[11px] tracking-widest text-[#1C1B1B] uppercase font-bold">
                      Design & Spatial Features
                    </span>
                  </div>
                  <ul className="space-y-3.5 pl-1">
                    {selectedProject.details.map((detail, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-[#454843] leading-relaxed">
                        <span className="text-[#5D5F5B] mt-1 font-semibold">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Material Palette swatches */}
                <div className="mb-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-4.5 h-4.5 text-[#5D5F5B]" />
                    <span className="font-label-caps text-[11px] tracking-widest text-[#1C1B1B] uppercase font-bold">
                      Tactile Material Swatches
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.colorPalette.map((swatch, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-2 border border-[#E6DED6] bg-white rounded-sm hover:border-[#1C1B1B] transition-colors group/swatch"
                      >
                        <div
                          className="w-8 h-8 rounded-full border border-black/5 flex-shrink-0 transition-transform group-hover/swatch:scale-105"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-semibold text-[#1C1B1B] truncate">{swatch.name}</p>
                          <p className="text-[10px] font-mono text-[#625E57]">{swatch.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lead Designer Interactive QA Module */}
              <div className="border-t border-[#E6DED6] pt-6 bg-white/50 p-4 rounded-sm border">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-[#5D5F5B]" />
                  <span className="font-label-caps text-[10px] tracking-widest text-[#1C1B1B] uppercase font-semibold">
                    Studio Designer Q&A
                  </span>
                </div>

                {/* Chat Log */}
                <div className="max-h-[160px] overflow-y-auto space-y-3 mb-4 pr-1 text-xs">
                  {chatHistory.map((chat, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-sm leading-relaxed ${
                        chat.sender === 'designer'
                          ? 'bg-[#F6F3F2] text-[#454843] border-l-2 border-[#5D5F5B]'
                          : 'bg-[#5D5F5B] text-white self-end text-right'
                      }`}
                    >
                      <p className="font-bold text-[9px] uppercase tracking-wider mb-0.5 text-[#1C1B1B] dark:text-white">
                        {chat.sender === 'designer' ? 'Lead Architect' : 'You'}
                      </p>
                      <p>{chat.text}</p>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="text-xs text-[#625E57] italic animate-pulse">
                      Designer is composing thoughts...
                    </div>
                  )}
                </div>

                {/* Q&A Input form */}
                <form onSubmit={handleSendQuestion} className="flex gap-2">
                  <input
                    type="text"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Ask: 'What wood was used?' or 'How is lighting configured?'"
                    className="flex-1 bg-white border border-[#E6DED6] rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-[#1C1B1B]"
                  />
                  <button
                    type="submit"
                    className="bg-[#1C1B1B] text-white p-2 rounded-sm hover:bg-[#5D5F5B] transition-colors focus:outline-none"
                    aria-label="Send query"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

              {/* Action Link to main Consultation */}
              <div className="mt-8 pt-4 border-t border-[#E6DED6] flex justify-between items-center">
                <button
                  onClick={() => {
                    onInquireAboutProject(selectedProject.title);
                    setSelectedProject(null);
                  }}
                  className="text-xs font-semibold uppercase tracking-widest text-[#1C1B1B] hover:text-[#5D5F5B] transition-colors inline-flex items-center gap-2 font-label-caps"
                >
                  Request Consultation For This Style <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
