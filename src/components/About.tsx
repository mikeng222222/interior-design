/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, ShieldCheck, Heart } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Architectural Honesty',
      desc: 'We honor raw structural beauty. Materials are left in their authentic state, allowing concrete, wood grain, and stone pores to remain fully visible.'
    },
    {
      icon: Heart,
      title: 'Quiet Luxury Scale',
      desc: 'Luxury is an unhurried feeling, not an excess of items. We eliminate ornamental clutter to emphasize the beautiful negative space and proportions.'
    },
    {
      icon: Star,
      title: 'Bespoke Integration',
      desc: 'Every joint, hidden handle, and customized lighting cove is custom-mapped to the movement of natural light, aging beautifully over decades.'
    }
  ];

  return (
    <section id="philosophy" className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto bg-[#FCF9F8]">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
        
        {/* Left Column: Philosophical narrative */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="font-label-caps text-[11px] tracking-[0.25em] text-[#5D5F5B] block mb-3 uppercase">
              OUR MANIFESTO
            </span>
            <h2 className="font-headline-md text-3xl sm:text-5xl text-[#1C1B1B] font-normal leading-tight">
              Our Philosophy
            </h2>
          </div>

          <div className="space-y-6">
            <p className="font-body-lg text-lg sm:text-xl leading-relaxed text-[#1C1B1B] font-light">
              At <strong className="font-medium">AETHER</strong>, we believe that true luxury is found in the quiet, undisturbed moments of daily life. Our approach is deeply rooted in the principles of reduction—removing the unnecessary to reveal the essential beauty of pure form and raw function.
            </p>
            <p className="font-body-md text-[#454843] leading-relaxed">
              We prioritize natural materials that age gracefully: limestone that holds deep ancient history, solid oak wood that feels warm to the human touch, and washed linen fabrics that invite restful meditation. Every project is a bespoke collaboration, resulting in environments that are not just seen, but profoundly felt.
            </p>
          </div>

          {/* Value cards */}
          <div className="grid grid-cols-1 gap-4 pt-4">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="flex gap-4 p-4 bg-[#F6F3F2] border border-[#E6DED6] rounded-sm">
                  <div className="text-[#5D5F5B] mt-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1C1B1B]">{v.title}</h4>
                    <p className="text-xs text-[#454843] mt-1 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Visual illustration with Est badge */}
        <div className="lg:col-span-6 lg:col-start-7 relative">
          <div className="aspect-[4/5] bg-[#E5E2E1] overflow-hidden rounded-sm shadow-md">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwMTmnOzyQdzEamnUZLqNqCqTtFe6CxiBptExRyh1T-xt8BhTVwi1squybp-5wRdZtAY79ZPEhHScKsOyi6ud3AUdNfwuT9G4hxpGxxHXvM7U44UkXztS_XsE00grMGfbxtk-KPkFtLIke-ehYqaAKdPULLXm6ctt8k1otd6TXjgd_-cvnOAXgCi32_10ZuszDKQpoIC4HI0bNE412YVpzX-ipTrm4kqbVrQDy3dYpPFIEV93nhutjIgzuyZDGvb_zfLNvgGtJaho8"
              alt="Artistic closeup shot of honed travertine, oak sample, and raw linen"
              className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 ease-in-out"
              loading="lazy"
            />
          </div>

          {/* Floating Decorative Est Badge */}
          <div className="absolute -bottom-6 -left-6 bg-[#5D5F5B] p-6 shadow-xl border border-white/10 hidden md:block rounded-sm">
            <div className="font-headline-sm text-white text-lg tracking-widest italic font-light">
              Est. 2012
            </div>
            <div className="font-label-caps text-[9px] tracking-widest text-[#E3E3DE] mt-1 uppercase">
              London & New York
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
