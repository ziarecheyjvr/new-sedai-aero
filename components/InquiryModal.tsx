import React, { useState } from 'react';

export type ModalMode = 'inquiry' | 'waitlist';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: ModalMode;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, mode = 'inquiry' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const isWaitlist = mode === 'waitlist';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "312925eb-f5a6-44aa-ae3f-ae2159469ac8");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/15 rounded-3xl p-8 md:p-10 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="mb-8 text-center">
          <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase mb-2">
            {isWaitlist ? 'PRIORITY RESERVATION' : 'COMMERCIAL & TECHNICAL INQUIRY'}
          </h3>
          <h2 className="text-3xl font-black font-heading uppercase tracking-tighter text-white">
            {isWaitlist ? 'JOIN THE WAITLIST' : 'SEND AN INQUIRY'}
          </h2>
          <p className="text-zinc-400 text-xs mt-2">
            {isWaitlist 
              ? 'Reserve your position for production milestones, telemetry data & priority delivery.' 
              : 'Contact our executive engineering & sales team for commercial aircraft details.'}
          </p>
        </div>

        {isSuccess ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-[#b46c00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#b46c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
              {isWaitlist ? 'WAITLIST RESERVED' : 'INQUIRY RECEIVED'}
            </h3>
            <p className="text-zinc-400 text-sm">
              {isWaitlist 
                ? 'You have been added to the official Sedai Aero priority waitlist.' 
                : 'Our team will review your inquiry and get in touch with you shortly.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="hidden" name="subject" value={isWaitlist ? "New Sedai Aero Waitlist Signup" : "New Sedai Aero Commercial Inquiry"} />
            <input type="hidden" name="from_name" value="Sedai Aero Website" />
            <input type="hidden" name="form_type" value={mode} />
            
            <div>
              <label htmlFor="name" className="block text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b46c00] transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b46c00] transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-1">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b46c00] transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            {!isWaitlist && (
              <div>
                <label htmlFor="message" className="block text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-1">Inquiry Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={3}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b46c00] transition-colors resize-none"
                  placeholder="Tell us about your fleet, commercial or personal aviation requirements..."
                />
              </div>
            )}

            {isWaitlist && (
              <div>
                <label htmlFor="interest" className="block text-[10px] font-black tracking-[0.2em] text-zinc-400 uppercase mb-1">Interest Area</label>
                <select 
                  id="interest" 
                  name="interest"
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#b46c00] transition-colors"
                >
                  <option value="Sedai Aero HPEV">Sedai Aero HPEV (Personal Aircraft)</option>
                  <option value="Sedai CropDuster">Sedai CropDuster (Industrial Drone)</option>
                  <option value="Harbor Vertiports">Harbor Vertiports (Infrastructure Partner)</option>
                </select>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-[#b46c00] text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting ? 'Submitting...' : (isWaitlist ? 'JOIN THE WAITLIST' : 'SUBMIT INQUIRY')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InquiryModal;
