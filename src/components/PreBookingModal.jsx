import React, { useEffect, useState } from 'react';
import { CheckCircle2, ArrowRight, Lock, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { validateEmail, validatePhone, sanitizeInput } from '../utils/validation';
import { createPreBookingSession } from '../utils/paymentSecurity';

export default function PreBookingModal({
  onClose,
  pageSource = 'fullstack-main',
  whatsappGroupLink = 'https://chat.whatsapp.com/YOUR_GROUP_LINK'
}) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handlePreBookingSubmit = async (e) => {
    e.preventDefault();
    const name = sanitizeInput(formData.name);
    const email = sanitizeInput(formData.email);
    const phone = sanitizeInput(formData.phone);

    if (!name) {
      setError('Please enter your full name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    const mainPageUrl = window.location.href;

    // Create cryptographically signed lead session
    createPreBookingSession({
      name,
      email,
      phone,
      amount: 999,
      pageSource,
      pageUrl: mainPageUrl
    });

    try {
      const response = await fetch('/api/create-payment.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          page_source: pageSource,
          page_url: mainPageUrl
        })
      });

      const text = await response.text();
      let result = null;
      try {
        result = JSON.parse(text);
      } catch (jsonErr) {
        console.error('Server response parse error:', text);
      }

      if (response.ok && result && result.status === 'success' && result.payment_url) {
        window.location.href = result.payment_url;
      } else {
        const errorMsg = result?.message || (response.status === 500
          ? 'Server configuration error (500). Please verify config.php and Razorpay API keys.'
          : (response.status === 403 ? 'Access forbidden (403): Request origin not allowed.' : 'Failed to create payment link. Please try again.'));
        setError(errorMsg);
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Payment link creation failed:', err);
      setError(err?.message || 'Network error. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#382c25]/60 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#fffdf7] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[rgba(56,44,37,0.15)] shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#e5c86f]/20 blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#f7f1df] text-[#382c25] flex items-center justify-center hover:bg-[#234d3b] hover:text-white transition-colors cursor-pointer text-xs font-bold z-10"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-2xl bg-[#234d3b]/10 text-[#234d3b] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-[#234d3b]" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-wider text-[#234d3b] uppercase font-bold">
              Cohort Pre-Booking · ₹999 Slot Deposit
            </span>
            <h3 className="font-manrope text-xl sm:text-2xl font-extrabold text-[#382c25] leading-tight">
              Reserve Your Seat
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#5f5148] mb-5 leading-relaxed">
          Lock in your early-bird seat for the 100-day AI Full-Stack Developer Program. Fill your details below to proceed to secure Razorpay checkout.
        </p>

        <div className="bg-[#f7f1df]/70 rounded-2xl p-3.5 mb-5 border border-[rgba(56,44,37,0.1)] space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#172e24]">
            <CheckCircle2 className="w-4 h-4 text-[#234d3b] shrink-0" />
            <span>Guaranteed Seat Reservation (1 Token = 1 Seat)</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#172e24]">
            <CheckCircle2 className="w-4 h-4 text-[#234d3b] shrink-0" />
            <span>Early-Bird Fee Lock + ₹999 Slot Deduction</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#172e24]">
            <CheckCircle2 className="w-4 h-4 text-[#234d3b] shrink-0" />
            <span>Instant Access to Student WhatsApp Group</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handlePreBookingSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase text-[#382c25] font-mono">
                Full Name *
              </label>
              <span className="text-[10px] text-[#234d3b] font-medium">(1 Person per Booking)</span>
            </div>
            <input
              required
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(56,44,37,0.2)] text-sm focus:outline-none focus:border-[#234d3b] transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#382c25] mb-1 font-mono">
              Email Address *
            </label>
            <input
              required
              type="email"
              placeholder="rahul@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(56,44,37,0.2)] text-sm focus:outline-none focus:border-[#234d3b] transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#382c25] mb-1 font-mono">
              WhatsApp Phone Number *
            </label>
            <input
              required
              type="tel"
              placeholder="+91 99999 00000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-white border border-[rgba(56,44,37,0.2)] text-sm focus:outline-none focus:border-[#234d3b] transition-colors disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-full bg-[#234d3b] text-white font-extrabold text-sm sm:text-base shadow-lg hover:bg-[#1a3a2c] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating your payment link...</span>
              </>
            ) : (
              <>
                <span>Pay ₹999 & Reserve Slot</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-[rgba(56,44,37,0.1)] flex items-center justify-between text-[11px] text-[#5f5148]">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#234d3b]" />
            <span>256-Bit Encrypted Razorpay Checkout</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#234d3b]" />
            <span>Official InstaSkills Reservation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
