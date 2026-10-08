import React, { useEffect, useState } from 'react';
import { PhoneCall, Rocket, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { validateEmail, validatePhone, sanitizeInput } from '../utils/validation';

export default function ContactModal({ modalType, onClose }) {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = sanitizeInput(formData.name);
    const contact = sanitizeInput(formData.contact);

    if (!name) {
      setError('Please enter your name.');
      return;
    }
    if (!contact || (!validateEmail(contact) && !validatePhone(contact))) {
      setError('Please enter a valid email or phone number.');
      return;
    }

    setError('');
    setSubmitted(true);

    try {
      const existing = JSON.parse(localStorage.getItem('instaskills_contact_leads') || '[]');
      existing.push({
        name,
        contact,
        modalType,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('instaskills_contact_leads', JSON.stringify(existing));
    } catch (err) {
      console.warn('LocalStorage save error:', err);
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#382c25]/60 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#fffdf7] rounded-3xl max-w-md w-full p-8 border border-[rgba(56,44,37,0.12)] shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f7f1df] text-[#382c25] flex items-center justify-center hover:bg-[#803c48] hover:text-white transition-colors cursor-pointer text-xs font-bold"
          aria-label={t('modalClose')}
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#234d3b]/10 text-[#234d3b] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h3 className="font-manrope text-2xl font-extrabold text-[#382c25]">Request Received!</h3>
            <p className="text-sm text-[#5f5148]">
              Thank you {formData.name || 'Builder'}. Our team will contact you shortly.
            </p>
          </div>
        ) : modalType === 'whatsapp' ? (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#234d3b]/10 text-[#234d3b] flex items-center justify-center mb-4">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h3 className="font-manrope text-2xl font-extrabold text-[#382c25] mb-2">{t('modalWaTitle')}</h3>
            <p className="text-sm text-[#5f5148] mb-6">
              {t('modalWaDesc')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold font-mono-custom text-[#382c25] uppercase mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f1df]/60 border border-[rgba(56,44,37,0.15)] text-sm focus:outline-none focus:border-[#803c48] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-mono-custom text-[#382c25] uppercase mb-1">WhatsApp Number</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 99999 00000"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f1df]/60 border border-[rgba(56,44,37,0.15)] text-sm focus:outline-none focus:border-[#803c48] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#803c48] text-white font-bold text-sm shadow-md hover:bg-[#682e38] active:scale-[0.99] transition-all cursor-pointer"
              >
                {t('modalWaBtn')}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#803c48]/10 text-[#803c48] flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="font-manrope text-2xl font-extrabold text-[#382c25] mb-2">{t('modalFormTitle')}</h3>
            <p className="text-sm text-[#5f5148] mb-6">
              {t('modalFormDesc')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold font-mono-custom text-[#382c25] uppercase mb-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f1df]/60 border border-[rgba(56,44,37,0.15)] text-sm focus:outline-none focus:border-[#234d3b] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-bold font-mono-custom text-[#382c25] uppercase mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="jane@example.com"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#f7f1df]/60 border border-[rgba(56,44,37,0.15)] text-sm focus:outline-none focus:border-[#234d3b] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#234d3b] text-white font-bold text-sm shadow-md hover:bg-[#1a3a2c] active:scale-[0.99] transition-all cursor-pointer"
              >
                {t('modalFormBtn')}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
