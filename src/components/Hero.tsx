/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronDown, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <header className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#1C1B1B]">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 scale-105 transition-transform duration-[3s] ease-out hover:scale-100">
        <div
          className="w-full h-full bg-cover bg-center opacity-85 transition-opacity"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDuQIovzYk9YinL8VUfvA5s7swl2WjSpKPlRcnr7nm1zzhh5lRS30siNoxRA_fTX5Qd9hjCE3mR99Y9G8MiXcAFyqBlH1zjCFjDvZ1ohu0ir_BGz9ewSs_sfhgs-RyhZN7lCF6hCxsy8KSYYFqxDNsNmFHqAvPpWKwsNOZ3Ooe250t-mwyjD1G-pXw3pbD_ex4x_LvSmhIrkJdg5IcQMWn_8pu_YuOCLTxlgJ3MJqDIuRH1MmLwqTKLbFyiay6z2wrwtYznwHP8L887')`,
          }}
        />
        {/* Soft shadow overlay for absolute luxury contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B]/70 via-[#1C1B1B]/30 to-[#1C1B1B]/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 md:px-0 flex flex-col items-center">
        {/* Eyebrow Label */}
        <div className="flex items-center gap-2 mb-6 border border-white/20 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-white/90 animate-pulse" />
          <span className="font-label-caps text-[10px] tracking-[0.25em] text-white/95 uppercase">
            Curating Refined Living
          </span>
        </div>

        {/* Display Title */}
        <h1 className="font-headline-md text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight mb-6 max-w-3xl leading-[1.1]">
          Design Your <span className="italic font-light text-white/95">Dream Space</span>
        </h1>

        {/* Elegant Supporting text */}
        <p className="font-body-lg text-base sm:text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          Creating timeless, minimalist environments where every fine detail serves a purpose, fostering serenity, modern tactile warmth, and architectural scale.
        </p>

        {/* Interaction Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <button
            onClick={onExplore}
            className="bg-white text-[#1C1B1B] px-8 sm:px-10 py-4 font-label-caps text-xs tracking-widest uppercase hover:bg-[#F6F3F2] transition-colors rounded-sm shadow-lg font-semibold"
          >
            View Selected Works
          </button>
          <a
            href="#style-quiz"
            className="border border-white/40 text-white hover:border-white hover:bg-white/5 px-8 sm:px-10 py-4 font-label-caps text-xs tracking-widest uppercase transition-all rounded-sm flex items-center justify-center gap-2"
          >
            Take Style Quiz
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={onExplore}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center group focus:outline-none cursor-pointer"
        aria-label="Scroll to portfolio"
      >
        <span className="font-label-caps text-[9px] tracking-[0.3em] text-white/60 mb-2 group-hover:text-white transition-colors uppercase">
          SCROLL
        </span>
        <div className="p-1 rounded-full border border-white/20 group-hover:border-white/50 transition-colors bg-white/5 backdrop-blur-sm">
          <ChevronDown className="w-4 h-4 text-white/80 group-hover:translate-y-0.5 transition-transform" />
        </div>
      </button>
    </header>
  );
}
