import React, { useEffect, useState } from 'react';
import { sanitizeUrlParams } from '../utils/paymentSecurity';

export default function PaymentSuccessModal({ onClose, leadSession }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    document.body.style.overflow = 'hidden';

    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get('razorpay_payment_id') || leadSession?.paymentId || '';
    const linkId = params.get('razorpay_payment_link_id') || leadSession?.orderId || '';
    const refId = params.get('razorpay_payment_link_reference_id') || '';
    const linkStatus = params.get('razorpay_payment_link_status') || 'paid';
    const signature = params.get('razorpay_signature') || '';

    const sessionData = leadSession || {};

    fetch('/api/verify-payment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'PAID',
        name: sessionData.name || '',
        email: sessionData.email || '',
        phone: sessionData.phone || '',
        payment_id: paymentId,
        order_id: linkId,
        reference_id: refId,
        link_status: linkStatus,
        signature: signature,
        amount: sessionData.amount || 999,
        page_source: sessionData.pageSource || 'razorpay-return',
        page_url: sessionData.pageUrl || window.location.href
      })
    }).catch(err => console.error('Failed to notify backend of payment success:', err));

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

  return (
    <div
      className="payment-success-overlay"
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
          padding: '48px 40px',
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
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2ecc71, #27ae60)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 8px 24px rgba(46,204,113,0.35)',
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#1a1a2e',
          margin: '0 0 8px',
          fontFamily: "'Inter', sans-serif",
        }}>
          Payment Successful!
        </h2>

        <p style={{
          fontSize: '1rem',
          color: '#555',
          margin: '0 0 8px',
          lineHeight: 1.6,
        }}>
          Your seat has been reserved for the <strong>InstaSkills AI Program</strong>.
        </p>

        <p style={{
          fontSize: '0.9rem',
          color: '#888',
          margin: '0 0 28px',
          lineHeight: 1.5,
        }}>
          A confirmation email and WhatsApp message will be sent to you shortly with all the details.
        </p>

        <button
          onClick={handleClose}
          style={{
            background: 'linear-gradient(135deg, #234d3b, #1a3a2c)',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 36px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 4px 16px rgba(35,77,59,0.3)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.03)';
            e.target.style.boxShadow = '0 6px 20px rgba(35,77,59,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 16px rgba(35,77,59,0.3)';
          }}
        >
          Continue Exploring →
        </button>
      </div>
    </div>
  );
}
