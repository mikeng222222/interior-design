/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { WALL_OPTIONS, FLOOR_OPTIONS, FABRIC_OPTIONS, ACCENT_OPTIONS } from '../data';
import { MaterialOption } from '../types';
import { Layers, Check, RefreshCw, ClipboardList, Info, ArrowRight } from 'lucide-react';

interface VisualizerProps {
  onApplyMoodboard: (specText: string) => void;
}

export default function Visualizer({ onApplyMoodboard }: VisualizerProps) {
  const [selectedWall, setSelectedWall] = useState<MaterialOption>(WALL_OPTIONS[0]);
  const [selectedFloor, setSelectedFloor] = useState<MaterialOption>(FLOOR_OPTIONS[1]);
  const [selectedFabric, setSelectedFabric] = useState<MaterialOption>(FABRIC_OPTIONS[0]);
  const [selectedAccent, setSelectedAccent] = useState<MaterialOption>(ACCENT_OPTIONS[0]);

  const [activeTab, setActiveTab] = useState<'wall' | 'floor' | 'fabric' | 'accent'>('wall');
  const [showSpecSheet, setShowSpecSheet] = useState(false);

  const handleReset = () => {
    setSelectedWall(WALL_OPTIONS[0]);
    setSelectedFloor(FLOOR_OPTIONS[1]);
    setSelectedFabric(FABRIC_OPTIONS[0]);
    setSelectedAccent(ACCENT_OPTIONS[0]);
  };

  const getSpecText = () => {
    return `Wall: ${selectedWall.name} | Floor: ${selectedFloor.name} | Sofa Fabric: ${selectedFabric.name} | Accent Material: ${selectedAccent.name}`;
  };

  const tabs = [
    { id: 'wall', label: 'Walls', options: WALL_OPTIONS, current: selectedWall, setter: setSelectedWall },
    { id: 'floor', label: 'Flooring', options: FLOOR_OPTIONS, current: selectedFloor, setter: setSelectedFloor },
    { id: 'fabric', label: 'Upholstery', options: FABRIC_OPTIONS, current: selectedFabric, setter: setSelectedFabric },
    { id: 'accent', label: 'Accents', options: ACCENT_OPTIONS, current: selectedAccent, setter: setSelectedAccent },
  ] as const;

  const currentTabInfo = tabs.find(t => t.id === activeTab)!;

  return (
    <section id="visualizer" className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto bg-[#F6F3F2] border-y border-[#E6DED6]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Visualizer explanation and choice tabs */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="font-label-caps text-[11px] tracking-[0.25em] text-[#5D5F5B] uppercase mb-3">
            Bespoke Studio Tools
          </div>
          <h2 className="font-headline-md text-3xl sm:text-4xl text-[#1C1B1B] font-normal mb-6">
            Tactile Material <span className="italic font-light">Moodboard</span>
          </h2>
          <p className="font-body-md text-[#454843] mb-8 leading-relaxed">
            Every material in an Aether interior is selected for its authentic weight, texture, and natural ageing process. Select raw plaster textures, rich solid wood, organic fabrics, and luxury accents below to preview how light and materiality harmonize.
          </p>

          {/* Tab Selector Links */}
          <div className="flex border-b border-[#E6DED6] mb-6 overflow-x-auto gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`font-label-caps text-xs tracking-wider uppercase pb-3 px-2 transition-all cursor-pointer whitespace-nowrap focus:outline-none ${
                  activeTab === tab.id
                    ? 'text-[#1C1B1B] border-b-2 border-[#1C1B1B] font-bold'
                    : 'text-[#625E57] hover:text-[#1C1B1B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Options List */}
          <div className="space-y-3 mb-8">
            {currentTabInfo.options.map((option) => {
              const isSelected = currentTabInfo.current.id === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => currentTabInfo.setter(option as any)}
                  className={`w-full text-left p-4 rounded-sm border transition-all flex items-start gap-4 cursor-pointer focus:outline-none ${
                    isSelected
                      ? 'border-[#1C1B1B] bg-white shadow-sm'
                      : 'border-[#E6DED6] bg-white/40 hover:bg-white/80'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-full border border-black/10 flex-shrink-0 transition-transform flex items-center justify-center"
                    style={{ backgroundColor: option.hex }}
                  >
                    {isSelected && <Check className="w-5 h-5 text-white bg-black/40 rounded-full p-0.5" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1B1B] flex items-center gap-2">
                      {option.name}
                      {isSelected && <span className="text-[10px] bg-[#1C1B1B]/10 text-[#1C1B1B] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-label-caps font-semibold">Active</span>}
                    </h4>
                    <p className="text-xs text-[#454843] mt-1 leading-relaxed">
                      {option.textureDescription}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowSpecSheet(true)}
              className="bg-[#1C1B1B] text-white px-6 py-3 font-label-caps text-xs tracking-widest uppercase hover:bg-[#5D5F5B] transition-colors rounded-sm flex items-center gap-2"
            >
              <ClipboardList className="w-4 h-4" /> Save Material Spec Sheet
            </button>
            
            <button
              onClick={handleReset}
              className="border border-[#757873] text-[#1C1B1B] hover:bg-black/5 px-4 py-3 font-label-caps text-xs tracking-widest uppercase transition-colors rounded-sm flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Swatches
            </button>
          </div>
        </div>

        {/* Right Column: Live visual render mockup */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-white rounded-sm border border-[#E6DED6] p-6 shadow-md overflow-hidden flex flex-col">
            
            {/* Ambient Room Visual Canvas Box */}
            <div
              className="relative w-full aspect-[4/3] rounded-sm shadow-inner flex flex-col justify-between p-8 overflow-hidden transition-all duration-1000"
              style={{ backgroundColor: selectedWall.hex }}
            >
              {/* Natural Sunlight Shaft Effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/20 pointer-events-none" />
              <div
                className="absolute inset-y-0 right-1/4 w-28 bg-white/10 blur-xl transform skew-x-12 pointer-events-none"
                style={{ mixBlendMode: 'overlay' }}
              />

              {/* Top: Hanging Pendant Lighting fixture (Accent color indicator) */}
              <div className="relative z-10 flex flex-col items-center select-none self-center">
                <div className="w-0.5 h-16 bg-[#1C1B1B]/40" />
                <div
                  className="w-12 h-3 rounded-full transition-all duration-500 shadow-md"
                  style={{ backgroundColor: selectedAccent.hex }}
                />
                <div
                  className="w-6 h-6 rounded-full bg-[#E3E3DE] opacity-90 blur-sm -mt-1.5 transition-all animate-pulse"
                  style={{ boxShadow: `0 0 16px ${selectedAccent.hex}` }}
                />
              </div>

              {/* Middle Ground: Monolithic sofa frame and cushions (Fabric / Accent mix) */}
              <div className="relative z-10 w-3/4 mx-auto flex flex-col items-center select-none mt-auto">
                
                {/* Wall Backing Text label */}
                <span className="font-label-caps text-[9px] tracking-[0.2em] text-[#625E57] uppercase opacity-45 mb-14">
                  {selectedWall.name} backdrop
                </span>

                {/* Main Sofa Cushion Box (Fabric) */}
                <div
                  className="w-full h-16 rounded-t-xl shadow-lg border-b-2 border-black/10 transition-all duration-700 relative p-2 flex gap-1.5 justify-around"
                  style={{ backgroundColor: selectedFabric.hex }}
                >
                  {/* Sofa backrests */}
                  <div className="w-1/2 h-8 rounded-sm bg-black/5 flex items-center justify-center">
                    <span className="text-[8px] font-semibold text-black/30 tracking-widest uppercase font-label-caps">Linen</span>
                  </div>
                  <div className="w-1/2 h-8 rounded-sm bg-black/5 flex items-center justify-center">
                    <span className="text-[8px] font-semibold text-black/30 tracking-widest uppercase font-label-caps">Bouclé</span>
                  </div>

                  {/* Sitting Cushions Texture Layer */}
                  <div className="absolute bottom-1 inset-x-2 h-6 bg-black/5 rounded-sm border border-white/20" />
                </div>

                {/* Base platform of Sofa (Accent material) */}
                <div
                  className="w-[104%] h-3 rounded-sm shadow transition-all duration-700"
                  style={{ backgroundColor: selectedAccent.hex }}
                />
                
                {/* Shadow underneath */}
                <div className="w-full h-3 bg-black/20 blur-sm rounded-full -mt-1 opacity-60" />
              </div>

              {/* Bottom Wedge: Flooring Section (Floor option) */}
              <div
                className="absolute bottom-0 inset-x-0 h-1/4 border-t border-black/5 transition-all duration-700 flex flex-col justify-end p-4 shadow-2xl"
                style={{ backgroundColor: selectedFloor.hex }}
              >
                {/* Wood planks or stone joints mockup drawn with fine CSS lines */}
                {selectedFloor.id === 'f2' ? (
                  <div className="absolute inset-0 opacity-15 flex justify-around pointer-events-none">
                    <div className="w-[1px] h-full bg-black" />
                    <div className="w-[1px] h-full bg-black" />
                    <div className="w-[1px] h-full bg-black" />
                    <div className="w-[1px] h-full bg-black" />
                  </div>
                ) : selectedFloor.id === 'f3' ? (
                  <div className="absolute inset-0 opacity-10 grid grid-cols-4 grid-rows-2 gap-[1px] bg-black pointer-events-none">
                    <div className="bg-transparent" />
                    <div className="bg-transparent" />
                    <div className="bg-transparent" />
                    <div className="bg-transparent" />
                  </div>
                ) : null}

                {/* Fine Label of Floor */}
                <div className="relative z-10 flex justify-between items-baseline text-black/40">
                  <span className="font-label-caps text-[8px] tracking-widest uppercase">{selectedFloor.name}</span>
                  <span className="font-mono text-[8px]">EST. REF / 24A</span>
                </div>
              </div>
            </div>

            {/* Current Spec Summary bar */}
            <div className="mt-6 border-t border-[#E6DED6] pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex gap-2 items-center text-[#454843]">
                <Info className="w-4 h-4 text-[#5D5F5B]" />
                <span>
                  <strong>Active Harmony:</strong> {selectedWall.name} paired with {selectedFloor.name}
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#625E57] bg-[#FCF9F8] px-2 py-1 border border-[#E6DED6]">
                PALETTE CODE: {selectedWall.hex}-{selectedFabric.hex}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Save Moodboard Modal Confirmation */}
      {showSpecSheet && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-8 shadow-2xl rounded-sm border border-[#E6DED6]">
            <h3 className="font-headline-sm text-2xl text-[#1C1B1B] mb-2 font-medium">
              Aether Custom Material Palette
            </h3>
            <p className="text-xs text-[#454843] mb-6 leading-relaxed">
              We have generated your custom architectural palette summary. You can send this configuration directly to our lead design consultant.
            </p>

            <div className="bg-[#FCF9F8] border border-[#E6DED6] p-4 rounded-sm space-y-3 mb-6 text-sm">
              <div className="flex justify-between py-1 border-b border-[#E6DED6]">
                <span className="text-[#625E57] font-semibold text-xs uppercase tracking-wider font-label-caps">Wall Surface:</span>
                <span className="text-[#1C1B1B] font-medium">{selectedWall.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E6DED6]">
                <span className="text-[#625E57] font-semibold text-xs uppercase tracking-wider font-label-caps">Flooring:</span>
                <span className="text-[#1C1B1B] font-medium">{selectedFloor.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E6DED6]">
                <span className="text-[#625E57] font-semibold text-xs uppercase tracking-wider font-label-caps">Upholstery Fabric:</span>
                <span className="text-[#1C1B1B] font-medium">{selectedFabric.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E6DED6]">
                <span className="text-[#625E57] font-semibold text-xs uppercase tracking-wider font-label-caps">Metal/Accent Details:</span>
                <span className="text-[#1C1B1B] font-medium">{selectedAccent.name}</span>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSpecSheet(false)}
                className="px-4 py-2 text-xs font-semibold text-[#454843] hover:text-[#1C1B1B] font-label-caps"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onApplyMoodboard(getSpecText());
                  setShowSpecSheet(false);
                }}
                className="bg-[#1C1B1B] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-widest font-label-caps hover:bg-[#5D5F5B] transition-colors rounded-sm flex items-center gap-1.5"
              >
                Auto-Fill My Contact Form <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
