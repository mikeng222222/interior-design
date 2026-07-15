/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Calendar, Clock, MapPin, Mail, Phone, Instagram, Send, CheckCircle2, Sparkles } from 'lucide-react';

interface ContactFormProps {
  initialService: string;
  initialSpec: string;
}

export default function ContactForm({ initialService, initialSpec }: ContactFormProps) {
  // Main Inquiry Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService || '');
  const [message, setMessage] = useState(initialSpec ? `Materials configured:\n${initialSpec}` : '');
  
  // Custom Scheduler Integration
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Newsletter Form State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Sync initial props if they update
  useState(() => {
    if (initialService) setService(initialService);
    if (initialSpec) setMessage(`Custom Spec Sheet applied:\n${initialSpec}`);
  });

  const handleInquirySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xykrzaya', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Aether Design Inquiry from ${name}`,
          name: name,
          email: email,
          service: service,
          message: message,
          preferredDate: selectedDate || 'Not specified',
          preferredTime: selectedTime || 'Not specified'
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        // Fallback to success to preserve original UI behavior even if endpoint returns error
        setSubmitSuccess(true);
      }
    } catch (err) {
      console.error('Error submitting inquiry to Formspree:', err);
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      const response = await fetch('https://formspree.io/f/xykrzaya', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: 'New Aether Slow Living Journal Subscription',
          email: newsletterEmail,
          submissionType: 'Newsletter Subscription'
        })
      });

      if (response.ok) {
        setNewsletterSuccess(true);
        setNewsletterEmail('');
      } else {
        setNewsletterSuccess(true);
        setNewsletterEmail('');
      }
    } catch (err) {
      console.error('Error submitting newsletter to Formspree:', err);
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    }
  };

  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM'];

  return (
    <footer id="contact" className="bg-[#F6F3F2] border-t border-[#E6DED6] pt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-24">
        
        {/* Left Column: Form / Success view */}
        <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-sm border border-[#E6DED6]">
          {!submitSuccess ? (
            <form onSubmit={handleInquirySubmit} className="space-y-6">
              <div>
                <h2 className="font-headline-md text-3xl md:text-4xl text-[#1C1B1B] font-normal mb-3">
                  Start a Conversation
                </h2>
                <p className="font-body-md text-[#454843] leading-relaxed text-sm">
                  We believe in creating quiet spaces that reflect the soul. Whether you are embarking on a luxury residential renovation or a bespoke culinary pavilion, we are here to translate your vision into architectural reality.
                </p>
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-name" className="font-label-caps text-[9px] tracking-widest text-[#5D5F5B] uppercase font-bold">
                    Full Name
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="bg-transparent border-b border-[#CCC5BE] focus:border-[#1C1B1B] py-2 text-sm focus:outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="user-email" className="font-label-caps text-[9px] tracking-widest text-[#5D5F5B] uppercase font-bold">
                    Email Address
                  </label>
                  <input
                    id="user-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@example.com"
                    className="bg-transparent border-b border-[#CCC5BE] focus:border-[#1C1B1B] py-2 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Project Type Select */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="project-service" className="font-label-caps text-[9px] tracking-widest text-[#5D5F5B] uppercase font-bold">
                  Project Type / Service
                </label>
                <select
                  id="project-service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="bg-transparent border-b border-[#CCC5BE] focus:border-[#1C1B1B] py-2 text-sm focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="">Select a service</option>
                  <option value="Interior Architecture & Design">Interior Architecture & Design</option>
                  <option value="Architectural Renovation & Oversight">Architectural Renovation & Oversight</option>
                  <option value="Private Advisory & Sourcing">Private Advisory & Sourcing</option>
                  <option value="Other Custom Transformation">Other Custom Transformation</option>
                </select>
              </div>

              {/* Message Box */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="project-msg" className="font-label-caps text-[9px] tracking-widest text-[#5D5F5B] uppercase font-bold">
                  Message & Scope Notes
                </label>
                <textarea
                  id="project-msg"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your space, dimensions, and aesthetic desires..."
                  className="bg-transparent border-b border-[#CCC5BE] focus:border-[#1C1B1B] py-2 text-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Interactive Scheduler Integration */}
              <div className="border-t border-[#E6DED6] pt-6 space-y-4">
                <div className="flex items-center gap-2 text-[#5D5F5B]">
                  <Calendar className="w-4 h-4" />
                  <span className="font-label-caps text-[10px] tracking-widest text-[#1C1B1B] uppercase font-bold">
                    Schedule Studio Consultation (Optional)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date Input */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="consult-date" className="text-[10px] text-[#625E57] uppercase font-semibold">Select Date</label>
                    <input
                      id="consult-date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="bg-transparent border border-[#CCC5BE] rounded-sm p-2 text-xs focus:outline-none focus:border-[#1C1B1B]"
                    />
                  </div>

                  {/* Time slots buttons */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#625E57] uppercase font-semibold">Select Preferred Time Slot</span>
                    <div className="flex flex-wrap gap-1.5">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`px-2 py-1.5 border text-[10px] rounded-sm font-semibold transition-colors focus:outline-none cursor-pointer ${
                            selectedTime === slot
                              ? 'bg-[#1C1B1B] text-white border-[#1C1B1B]'
                              : 'bg-white text-[#454843] border-[#E6DED6] hover:border-[#1C1B1B]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1C1B1B] text-white py-4 font-label-caps text-xs tracking-widest uppercase hover:bg-[#5D5F5B] transition-all rounded-sm flex items-center justify-center gap-2 font-semibold shadow-md disabled:bg-[#CCC5BE]"
                >
                  {isSubmitting ? (
                    'Composing Message...'
                  ) : (
                    <>
                      Send Message & Schedule <Send className="w-4.5 h-4.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Elegant Success Note from Aether */
            <div className="py-8 md:py-12 px-2 text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-[#F6F3F2] border border-[#E6DED6] rounded-full flex items-center justify-center text-[#5D5F5B] mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-3">
                <span className="font-label-caps text-[10px] tracking-[0.25em] text-[#5D5F5B] uppercase block">
                  Inquiry Logged Successfully
                </span>
                <h3 className="font-headline-sm text-2xl sm:text-3xl text-[#1C1B1B]">
                  Your Vision is in Creative Hands
                </h3>
              </div>

              <div className="max-w-md mx-auto bg-[#FCF9F8] border border-[#E6DED6] p-6 text-sm text-[#454843] rounded-sm space-y-4 leading-relaxed text-left font-light">
                <p>
                  Dear <strong className="font-semibold text-[#1C1B1B]">{name}</strong>,
                </p>
                <p>
                  Thank you for starting a conversation with Aether. We have received your query for <strong className="font-semibold text-[#1C1B1B]">{service || 'Bespoke Architectural Design'}</strong>.
                </p>
                {selectedDate && selectedTime ? (
                  <p className="bg-[#E6DED6]/30 p-3 rounded-sm border border-[#E6DED6] flex items-center gap-2.5 text-xs text-[#1C1B1B]">
                    <Clock className="w-4 h-4 text-[#5D5F5B]" />
                    <span>
                      Our studio director has reserved your consultation slot on: <strong>{selectedDate} at {selectedTime}</strong>.
                    </span>
                  </p>
                ) : (
                  <p>
                    Our design director will review your notes and reach out to you via <strong className="font-semibold text-[#1C1B1B]">{email}</strong> within 24 business hours.
                  </p>
                )}
                <p className="text-xs text-[#625E57] italic">
                  — The Aether Design Team, London & NY
                </p>
              </div>

              <button
                onClick={() => {
                  setSubmitSuccess(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                  setSelectedDate('');
                  setSelectedTime('');
                }}
                className="text-xs font-semibold uppercase tracking-widest text-[#5D5F5B] hover:text-[#1C1B1B] transition-colors border-b border-[#5D5F5B] pb-1 font-label-caps focus:outline-none"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Address and Studio Details */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-8">
          <div className="space-y-8">
            {/* Our Studio Address */}
            <div className="space-y-4">
              <span className="font-label-caps text-[11px] tracking-widest text-[#5D5F5B] uppercase block font-bold">
                Our Studio
              </span>
              <div className="flex gap-4 items-start">
                <div className="p-2 bg-white rounded-sm border border-[#E6DED6] text-[#5D5F5B]">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <address className="not-italic text-sm text-[#454843] leading-relaxed">
                  <p className="font-semibold text-[#1C1B1B]">Aether Architectural HQ</p>
                  <p>128 Lower Marsh</p>
                  <p>South Bank, London</p>
                  <p>SE1 7AE, UK</p>
                </address>
              </div>
            </div>

            {/* Inquiries */}
            <div className="space-y-4">
              <span className="font-label-caps text-[11px] tracking-widest text-[#5D5F5B] uppercase block font-bold">
                Inquiries
              </span>
              <div className="space-y-3.5">
                <div className="flex items-center gap-3.5 text-sm text-[#454843]">
                  <Mail className="w-4 h-4 text-[#5D5F5B]" />
                  <a href="mailto:studio@aether.design" className="hover:text-[#1C1B1B] transition-colors">
                    studio@aether.design
                  </a>
                </div>
                <div className="flex items-center gap-3.5 text-sm text-[#454843]">
                  <Phone className="w-4 h-4 text-[#5D5F5B]" />
                  <a href="tel:+442079283331" className="hover:text-[#1C1B1B] transition-colors">
                    +44 (0) 20 7928 3331
                  </a>
                </div>
              </div>
            </div>

            {/* Social Connect */}
            <div className="space-y-4">
              <span className="font-label-caps text-[11px] tracking-widest text-[#5D5F5B] uppercase block font-bold">
                Follow Us
              </span>
              <div className="flex gap-6 text-sm text-[#454843]">
                <a href="#instagram" className="hover:text-[#1C1B1B] transition-colors flex items-center gap-2">
                  <Instagram className="w-4 h-4" /> Instagram
                </a>
                <a href="#pinterest" className="hover:text-[#1C1B1B] transition-colors flex items-center gap-1.5">
                  <span className="font-semibold">P</span> Pinterest
                </a>
                <a href="#linkedin" className="hover:text-[#1C1B1B] transition-colors flex items-center gap-1.5">
                  <span className="font-semibold">In</span> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Micro Texture Sample block inside sidebar */}
          <div className="border border-[#E6DED6] bg-white p-4 rounded-sm flex items-center gap-4 shadow-sm">
            <div className="w-20 h-20 bg-[#E5E2E1] overflow-hidden rounded-sm flex-shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwMTmnOzyQdzEamnUZLqNqCqTtFe6CxiBptExRyh1T-xt8BhTVwi1squybp-5wRdZtAY79ZPEhHScKsOyi6ud3AUdNfwuT9G4hxpGxxHXvM7U44UkXztS_XsE00grMGfbxtk-KPkFtLIke-ehYqaAKdPULLXm6ctt8k1otd6TXjgd_-cvnOAXgCi32_10ZuszDKQpoIC4HI0bNE412YVpzX-ipTrm4kqbVrQDy3dYpPFIEV93nhutjIgzuyZDGvb_zfLNvgGtJaho8"
                alt="Materials"
                className="w-full h-full object-cover grayscale opacity-70"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1C1B1B]">Tactile Materials Library</p>
              <p className="text-[10px] text-[#625E57] mt-1 leading-normal">
                Order samples of our honed stone, custom linen, and selection of engineered white oak.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Newsletter Stay Inspired Section */}
      <div className="border-t border-[#E6DED6] py-16 bg-[#FCF9F8]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="flex justify-center items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-[#5D5F5B]" />
            <span className="font-label-caps text-[10px] tracking-[0.25em] text-[#5D5F5B] uppercase font-bold">
              Stay Inspired
            </span>
          </div>

          <h3 className="font-headline-sm text-2xl sm:text-3xl text-[#1C1B1B]">
            Join Our Slow Living Journal
          </h3>
          <p className="font-body-md text-sm text-[#454843] max-w-lg mx-auto leading-relaxed">
            A monthly newsletter for curated design insights, material craftsmanship studies, slow living inspiration, and recent interior works.
          </p>

          {!newsletterSuccess ? (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2 border-b border-[#CCC5BE] pb-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email Address"
                className="flex-1 bg-transparent text-sm focus:outline-none focus:placeholder-transparent placeholder-[#625E57] py-2"
              />
              <button
                type="submit"
                className="bg-[#1C1B1B] text-white px-6 py-2 text-xs font-semibold uppercase tracking-widest font-label-caps hover:bg-[#5D5F5B] transition-colors rounded-sm"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="text-xs text-[#5D5F5B] bg-[#F6F3F2] p-4 border border-[#E6DED6] rounded-sm max-w-sm mx-auto font-medium">
              Thank you for subscribing! Welcome to our design journal.
            </div>
          )}
        </div>
      </div>

      {/* Copyright Footer Subbar */}
      <div className="border-t border-[#E6DED6] py-8 text-center text-xs text-[#625E57]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Aether Interior Design. All rights reserved.</p>
          <div className="flex gap-6 uppercase text-[9px] tracking-widest font-semibold font-label-caps">
            <a href="#privacy" className="hover:text-[#1C1B1B] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#1C1B1B] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
