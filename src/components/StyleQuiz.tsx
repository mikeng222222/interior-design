/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { QuizState } from '../types';
import { Check, ArrowRight, RefreshCw, Sparkles, Calendar, Heart, ShieldCheck } from 'lucide-react';

interface StyleQuizProps {
  onApplyQuizResult: (quizText: string) => void;
}

export default function StyleQuiz({ onApplyQuizResult }: StyleQuizProps) {
  const [quiz, setQuiz] = useState<QuizState>({
    step: 1,
    spaceType: '',
    vibe: '',
    size: '',
    budgetRange: '',
  });

  const [proposalGenerated, setProposalGenerated] = useState(false);

  const handleSelectOption = (key: keyof Omit<QuizState, 'step'>, value: string) => {
    setQuiz(prev => {
      const nextStep = prev.step + 1;
      const nextState = { ...prev, [key]: value, step: nextStep };
      if (nextStep > 4) {
        setProposalGenerated(true);
      }
      return nextState;
    });
  };

  const handleBack = () => {
    setQuiz(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  };

  const handleReset = () => {
    setQuiz({
      step: 1,
      spaceType: '',
      vibe: '',
      size: '',
      budgetRange: '',
    });
    setProposalGenerated(false);
  };

  // Generate customized proposal details based on choices
  const getProposalDetails = () => {
    const isBrutalist = quiz.vibe.includes('Brutalist');
    const isEditorial = quiz.vibe.includes('Editorial');
    
    let title = 'Warm Organic Minimalist';
    let description = 'A sanctuary prioritizing soft plaster-finish walls, organic linens, and low-profile European oak furnishings. Designed for absolute serenity and sensory rest.';
    let materials = ['Warm Roman Clay', 'Light White Oak', 'Textured Bouclé', 'Honed Limestone'];
    let colors = [
      { name: 'Alabaster Plaster', hex: '#FCF9F8' },
      { name: 'Chalky Oak', hex: '#E9E1D9' },
      { name: 'Raw Flax Linen', hex: '#CCC5BE' },
    ];
    let duration = '8 - 12 Weeks';

    if (isBrutalist) {
      title = 'Atmospheric Brutalist';
      description = 'An intimate layout showcasing raw concrete textures, high-contrast charcoal tones, and oxidized gunmetal fixtures. Designed to capture dramatic structural shadows.';
      materials = ['Poured Microcement', 'Matte Charcoal Clay', 'Oxidized Gunmetal', 'Honed Belgian Blue Stone'];
      colors = [
        { name: 'Soft Mist Gray', hex: '#E5E2E1' },
        { name: 'Brutalist Concrete', hex: '#CCC5BE' },
        { name: 'Soot Charcoal', hex: '#313030' },
      ];
      duration = '12 - 16 Weeks';
    } else if (isEditorial) {
      title = 'Luminous Editorial Modern';
      description = 'A gallery-like environment utilizing massive whitespace, unlacquered brass finishes, and dramatic bookmatched Calacatta marble surfaces bathed in high-noon light.';
      materials = ['Calacatta Lincoln Marble', 'Unlacquered Solid Brass', 'Warm Mohair Velvet', 'Sheer Linen'];
      colors = [
        { name: 'Pure Gallery White', hex: '#FFFFFF' },
        { name: 'Golden Brass Patina', hex: '#CFC5B6' },
        { name: 'Taupe Accent', hex: '#766E62' },
      ];
      duration = '10 - 14 Weeks';
    }

    return { title, description, materials, colors, duration };
  };

  const currentProposal = getProposalDetails();

  const handleApplyProposal = () => {
    const spec = `Space Type: ${quiz.spaceType} | Style Concept: ${currentProposal.title} | Area Scale: ${quiz.size} | Est. Scope: ${quiz.budgetRange}`;
    onApplyQuizResult(spec);
  };

  return (
    <section id="style-quiz" className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto bg-[#FCF9F8]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-label-caps text-[11px] tracking-[0.25em] text-[#5D5F5B] uppercase mb-3">
            Creative Direction
          </div>
          <h2 className="font-headline-md text-3xl sm:text-5xl text-[#1C1B1B] font-normal leading-tight">
            Discover Your Spatial Style
          </h2>
          <p className="font-body-md text-[#454843] mt-4 max-w-xl mx-auto leading-relaxed">
            Answer 4 quiet questions to define your design personality. We will curate a bespoke material theme and project scope summary instantly.
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        {!proposalGenerated && (
          <div className="w-full bg-[#E6DED6] h-[2px] mb-12 relative">
            <div
              className="bg-[#1C1B1B] h-full transition-all duration-500"
              style={{ width: `${(quiz.step / 4) * 100}%` }}
            />
            <div className="flex justify-between mt-3 text-[10px] font-mono text-[#625E57] uppercase tracking-wider">
              <span>Step {quiz.step} of 4</span>
              <span>{Math.round((quiz.step / 4) * 100)}% Complete</span>
            </div>
          </div>
        )}

        {/* Quiz Steps */}
        {!proposalGenerated ? (
          <div className="bg-[#F6F3F2] border border-[#E6DED6] p-8 md:p-12 rounded-sm shadow-sm min-h-[360px] flex flex-col justify-between">
            <div>
              {/* Question 1: Space Type */}
              {quiz.step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-headline-sm text-xl sm:text-2xl text-[#1C1B1B]">
                    01. What space type is ready for translation?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { val: 'Residential Sanctuary', label: 'Residential Sanctuary', desc: 'Living, family lounges, and open gathering pavilions' },
                      { val: 'Restful Bedroom Suite', label: 'Restful Bedroom Suite', desc: 'An intimate, quiet sleeping sanctuary of layered textures' },
                      { val: 'Monolithic Culinary Space', label: 'Monolithic Culinary Pavilion', desc: 'High-end custom master kitchens and dining zones' },
                      { val: 'Refined Atelier / Office', label: 'Refined Atelier / Office', desc: 'A sophisticated focused workspace of high creative order' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectOption('spaceType', opt.val)}
                        className="text-left p-5 border border-[#E6DED6] bg-white rounded-sm hover:border-[#1C1B1B] transition-all focus:outline-none cursor-pointer"
                      >
                        <p className="font-semibold text-sm text-[#1C1B1B]">{opt.label}</p>
                        <p className="text-xs text-[#625E57] mt-1 leading-relaxed">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2: Vibe / Mood */}
              {quiz.step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-headline-sm text-xl sm:text-2xl text-[#1C1B1B]">
                    02. Which aesthetic mood resonates deepest?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { val: 'Tactile Soft Warmth', label: 'Tactile Soft Warmth', desc: 'Roman plasters, enzyme linens, light chalky oaks' },
                      { val: 'High-Contrast Brutalist', label: 'Atmospheric Brutalist', desc: 'Raw concrete, slate clay, matte darkened irons' },
                      { val: 'Light Airy Editorial', label: 'Luminous Editorial', desc: 'Calacatta marble, solid brass details, pure gallery lights' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectOption('vibe', opt.val)}
                        className="text-left p-5 border border-[#E6DED6] bg-white rounded-sm hover:border-[#1C1B1B] transition-all focus:outline-none cursor-pointer"
                      >
                        <p className="font-semibold text-sm text-[#1C1B1B]">{opt.label}</p>
                        <p className="text-xs text-[#625E57] mt-1.5 leading-relaxed">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 3: Size */}
              {quiz.step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-headline-sm text-xl sm:text-2xl text-[#1C1B1B]">
                    03. What is the scale of the structure?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { val: 'Compact Suite (< 500 sq ft)', label: 'Compact Suite', desc: 'Under 500 square feet' },
                      { val: 'Grand Living Pavilion (500 - 1500 sq ft)', label: 'Grand Living Pavilion', desc: '500 to 1,500 square feet' },
                      { val: 'Multi-Room Estate (> 1500 sq ft)', label: 'Multi-Room Estate', desc: 'Over 1,500 square feet' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectOption('size', opt.val)}
                        className="text-left p-5 border border-[#E6DED6] bg-white rounded-sm hover:border-[#1C1B1B] transition-all focus:outline-none cursor-pointer"
                      >
                        <p className="font-semibold text-sm text-[#1C1B1B]">{opt.label}</p>
                        <p className="text-xs text-[#625E57] mt-1.5 leading-relaxed">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 4: Budget */}
              {quiz.step === 4 && (
                <div className="space-y-6">
                  <h3 className="font-headline-sm text-xl sm:text-2xl text-[#1C1B1B]">
                    04. What is the design scope package?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { val: 'Curation & Bespoke Furnishing', label: 'Curation & Furniture', desc: 'Furniture plans, lighting fixtures, and custom wool rugs' },
                      { val: 'Full Architectural Renovation', label: 'Bespoke Renovation', desc: 'New masonry, walls, custom bookmatched marble cabinetry' },
                      { val: 'Creative Master Direction', label: 'Ground-up Master Direction', desc: 'Comprehensive spatial blueprints, luxury building materials, full oversight' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectOption('budgetRange', opt.val)}
                        className="text-left p-5 border border-[#E6DED6] bg-white rounded-sm hover:border-[#1C1B1B] transition-all focus:outline-none cursor-pointer"
                      >
                        <p className="font-semibold text-sm text-[#1C1B1B]">{opt.label}</p>
                        <p className="text-xs text-[#625E57] mt-1.5 leading-relaxed">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Back Button step footer */}
            {quiz.step > 1 && (
              <div className="mt-8 pt-4 border-t border-[#E6DED6] flex justify-start">
                <button
                  onClick={handleBack}
                  className="text-xs font-semibold uppercase tracking-widest text-[#625E57] hover:text-[#1C1B1B] transition-colors focus:outline-none font-label-caps"
                >
                  ← Go Back
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Bespoke Generated Proposal Card */
          <div className="bg-[#1C1B1B] text-white p-8 md:p-12 rounded-sm shadow-xl border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#ECE1D2] animate-pulse" />
              <span className="font-label-caps text-[10px] tracking-[0.25em] text-[#E3E3DE] uppercase">
                Custom Architectural Blueprint Proposal
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Proposal Left column */}
              <div className="md:col-span-8">
                <h3 className="font-headline-md text-3xl md:text-5xl text-white font-normal mb-4">
                  The {currentProposal.title} <span className="italic font-light">Concept</span>
                </h3>
                <p className="font-body-md text-white/80 leading-relaxed mb-8 text-base">
                  {currentProposal.description}
                </p>

                {/* Harmonizing Materials */}
                <div className="mb-8">
                  <h4 className="font-label-caps text-xs tracking-widest text-[#E3E3DE] uppercase mb-4 font-bold">
                    Harmonizing Materials
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {currentProposal.materials.map((mat, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/90"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggested Swatches */}
                <div>
                  <h4 className="font-label-caps text-xs tracking-widest text-[#E3E3DE] uppercase mb-4 font-bold">
                    Suggested Swatch Codes
                  </h4>
                  <div className="flex gap-4">
                    {currentProposal.colors.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white/5 border border-white/15 p-2 rounded-sm">
                        <div
                          className="w-6 h-6 rounded-full border border-white/25 flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div>
                          <p className="text-[10px] font-semibold text-white/90 leading-none">{color.name}</p>
                          <p className="text-[9px] font-mono text-white/55 mt-0.5">{color.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Proposal Right column (Specs and Schedule) */}
              <div className="md:col-span-4 bg-white/5 border border-white/15 p-6 rounded-sm space-y-6">
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Calendar className="w-4 h-4 text-[#ECE1D2]" />
                    <span className="font-label-caps text-[9px] tracking-wider text-[#E3E3DE] uppercase">Estimated Timeline</span>
                  </div>
                  <p className="text-xl font-headline-sm text-white">{currentProposal.duration}</p>
                  <p className="text-[10px] text-white/50 mt-1 leading-normal">Includes spatial layout, structural sourcing, and curation.</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <Heart className="w-4 h-4 text-[#ECE1D2]" />
                    <span className="font-label-caps text-[9px] tracking-wider text-[#E3E3DE] uppercase">Target Quality</span>
                  </div>
                  <p className="text-sm font-semibold text-white">Quiet Luxury Standard</p>
                  <p className="text-[10px] text-white/50 mt-1 leading-normal">Strict compliance with raw materiality and daylight analysis.</p>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-3">
                  <button
                    onClick={handleApplyProposal}
                    className="w-full bg-[#E3E3DE] text-[#1C1B1B] py-3 text-xs font-semibold uppercase tracking-widest font-label-caps hover:bg-white transition-all rounded-sm flex items-center justify-center gap-1.5"
                  >
                    Use This Style <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full border border-white/20 text-white/80 py-2.5 text-[10px] uppercase tracking-wider font-label-caps hover:bg-white/5 transition-colors rounded-sm flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Start Over
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-2 text-xs text-white/60">
              <ShieldCheck className="w-4.5 h-4.5 text-[#ECE1D2]" />
              <span>
                Proposal ID: <strong>AETH-2026-{titleToCode(currentProposal.title)}</strong>. Preserves structural integrity of Aether est. guidelines.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function titleToCode(title: string): string {
  return title.toUpperCase().replace(/\s+/g, '-').slice(0, 12);
}
