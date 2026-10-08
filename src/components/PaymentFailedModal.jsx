import React, { useEffect, useState } from 'react';
import { AlertTriangle, RefreshCw, MessageSquare } from 'lucide-react';
import { sanitizeUrlParams } from '../utils/paymentSecurity';

export default function PaymentFailedModal({ onClose, onRetry, leadSession }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = 'hidden';

    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get('razorpay_payment_id') || leadSession?.paymentId || '';
    const linkId = params.get('razorpay_payment_link_id') || leadSession?.orderId || '';

    const sessionData = leadSession || {};

    // Notify backend to log FAILED status
    fetch('/api/verify-payment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'FAILED',
        name: sessionData.name || '',
        email: sessionData.email || '',
        phone: sessionData.phone || '',
        payment_id: paymentId,
        order_id: linkId,
        amount: sessionData.amount || 999,
        page_source: sessionData.pageSource || 'razorpay-return-failed',
        page_url: sessionData.pageUrl || window.location.href
      })
    }).catch(err => console.error('Failed to notify backend of payment failure:', err));

    return () => {
      document.body.style.overflow = '';
    };
  }, [leadSession]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      document.body.style.overflow = '';
      sanitizeUrlParams();
      onClose();
    }, 300);
  };

  const handleRetry = () => {
    handleClose();
    if (onRetry) {
      setTimeout(() => onRetry(), 350);
    }
  };

  return (
    <div
      className="payment-failed-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(6px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '44px 36px',
          maxWidth: '440px',
          width: '90%',
          textAlign: 'center',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{
          width: '76px',
          height: '76px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 8px 24px rgba(239,68,68,0.3)',
        }}>
          <AlertTriangle className="w-10 h-10 text-white" />
        </div>

        <h2 style={{
          fontSize: '1.65rem',
          fontWeight: 700,
          color: '#1a1a2e',
          margin: '0 0 8px',
          fontFamily: "'Inter', sans-serif",
        }}>
          Payment Not Completed
        </h2>

        <p style={{
          fontSize: '0.95rem',
          color: '#555',
          margin: '0 0 16px',
          lineHeight: 1.5,
        }}>
          Your transaction was not finished or was cancelled. Don’t worry, no funds were deducted.
        </p>

        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '12px',
          padding: '12px 16px',
          fontSize: '0.85rem',
          color: '#991b1b',
          margin: '0 0 24px',
          textAlign: 'left',
          lineHeight: 1.45,
        }}>
          <strong>Common reasons:</strong> Bank session timeout, user cancellation, or insufficient balance.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={handleRetry}
            style={{
              background: 'linear-gradient(135deg, #234d3b, #1a3a2c)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 24px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 16px rgba(35,77,59,0.3)',
            }}
          >
            <RefreshCw className="w-4 h-4" />
            Retry Pre-Booking (₹999)
          </button>

          <a
            href="https://wa.me/919187951538?text=Hi%2C%20I%20had%20an%20issue%20with%20my%20payment%20for%20InstaSkills%20Pre-booking."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#f1f5f9',
              color: '#334155',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            Need Help? Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
