/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PenTool, Hammer, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onBookService: (serviceName: string) => void;
}

export default function Services({ onBookService }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const serviceDetails = [
    {
      id: 0,
      title: 'Interior Architecture & Design',
      icon: Compass,
      short: 'Comprehensive spatial planning, architectural elevations, lighting maps, and custom materials for high-end residences.',
      included: [
        'Complete spatial zoning and 3D architectural floor plans.',
        'Sourcing of rare finishes (Roman clay, Calacatta Lincoln marbles, and wide white oaks).',
        'Bespoke structural cabinetry and built-in closet blueprint designs.',
        'Curating timeless, handpicked European modernist furnishings.'
      ],
      process: 'Concept → Structural Drafting → Finish Selection → Delivery Control'
    },
    {
      id: 1,
      title: 'Architectural Renovation & Oversight',
      icon: Hammer,
      short: 'Expert structural management, masonry oversight, and artisan restoration services to breathe new life into existing heritage walls.',
      included: [
        'Coordination with master stonemasons and structural plasterers.',
        'Accurate preservation of vintage structural moldings and fireplaces.',
        'Precision installation of seamless microcements and underfloor climate systems.',
        'Rigorous bi-weekly site checks ensuring master drawings are followed.'
      ],
      process: 'Demolition Integrity → Utility Mapping → Fine Craft Installation'
    },
    {
      id: 2,
      title: 'Private Advisory & Sourcing',
      icon: PenTool,
      short: 'Bespoke design consultations, strategic space audits, global art curation, and tailored custom textile selection.',
      included: [
        'One-on-one editorial moodboard workshops with our Lead Architect.',
        'Direct connection to vintage galleries in Milan, Paris, and London.',
        'Private curation of original paintings and raw sculptural pottery accents.',
        'Comprehensive fabric audits focusing on tactile weights and linen patinas.'
      ],
      process: 'Aesthetic Alignment → Private Gallery Access → Placement Curation'
    }
  ];

  return (
    <section id="services" className="bg-[#F6F3F2] py-24 px-6 md:px-16 max-w-[1440px] mx-auto">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-label-caps text-[11px] tracking-[0.25em] text-[#5D5F5B] block mb-3 uppercase">
            STUDIO CAPABILITIES
          </span>
          <h2 className="font-headline-md text-3xl sm:text-5xl text-[#1C1B1B] font-normal leading-tight">
            Our Core Services
          </h2>
          <p className="font-body-md text-[#454843] max-w-lg mx-auto mt-4 leading-relaxed">
            We provide full-spectrum design and coordination, handling every structural milestone with absolute calm, professional composure, and linear precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceDetails.map((service) => {
            const IconComponent = service.icon;
            const isExpanded = selectedService === service.id;

            return (
              <div
                key={service.id}
                className={`p-8 md:p-10 bg-white border rounded-sm transition-all duration-300 flex flex-col justify-between ${
                  isExpanded
                    ? 'border-[#1C1B1B] shadow-lg ring-1 ring-[#1C1B1B]'
                    : 'border-[#E6DED6] hover:border-[#CCC5BE] hover:shadow-sm'
                }`}
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 mb-6 flex items-center justify-center text-[#5D5F5B] bg-[#FCF9F8] border border-[#E6DED6] rounded-sm transition-transform duration-300 hover:scale-105">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="font-headline-sm text-xl sm:text-2xl text-[#1C1B1B] mb-4">
                    {service.title}
                  </h3>
                  <p className="font-body-md text-sm text-[#454843] leading-relaxed mb-6">
                    {service.short}
                  </p>

                  {/* Expanded Content Section */}
                  {isExpanded && (
                    <div className="border-t border-[#E6DED6] pt-6 mt-6 space-y-4 animate-fade-in">
                      <h4 className="font-label-caps text-[10px] tracking-wider text-[#1C1B1B] uppercase font-bold">
                        What is Included:
                      </h4>
                      <ul className="space-y-3">
                        {service.included.map((item, idx) => (
                          <li key={idx} className="flex gap-2.5 text-xs text-[#454843] leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#5D5F5B] mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4 border-t border-[#E6DED6] text-xs">
                        <span className="font-label-caps text-[9px] tracking-wider text-[#625E57] uppercase block mb-1">
                          Milestone Flow
                        </span>
                        <p className="font-medium text-[#1C1B1B]">{service.process}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Button */}
                <div className="mt-8 pt-6 border-t border-[#E6DED6] flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(isExpanded ? null : service.id)}
                    className="text-xs font-semibold uppercase tracking-widest text-[#5D5F5B] hover:text-[#1C1B1B] transition-colors focus:outline-none font-label-caps"
                  >
                    {isExpanded ? 'Hide Details' : 'View Core Deliverables'}
                  </button>

                  <button
                    onClick={() => onBookService(service.title)}
                    className="text-xs font-semibold uppercase tracking-widest text-[#1C1B1B] hover:text-[#5D5F5B] transition-colors inline-flex items-center gap-1 focus:outline-none font-label-caps"
                  >
                    Inquire <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
