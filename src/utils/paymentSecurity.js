/**
 * Industry-Standard Payment Security & Session Guard Utility
 */

const PREBOOKING_SESSION_KEY = 'instaskills_prebooking_session';
const LEGACY_LEAD_KEY = 'instaskills_last_prebooking_lead';
const SESSION_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 Hours TTL

export function createPreBookingSession(leadData) {
  try {
    const token = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : 'token_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);

    const session = {
      sessionToken: token,
      name: leadData.name || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      amount: leadData.amount || 999,
      pageSource: leadData.pageSource || 'fullstack-landing',
      pageUrl: leadData.pageUrl || window.location.href,
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_EXPIRY_MS
    };

    localStorage.setItem(PREBOOKING_SESSION_KEY, JSON.stringify(session));
    // Maintain backwards compatibility for legacy endpoints
    localStorage.setItem(LEGACY_LEAD_KEY, JSON.stringify({
      ...session,
      timestamp: new Date().toISOString()
    }));

    return session;
  } catch (err) {
    console.warn('[PaymentSecurity] LocalStorage write error:', err);
    return null;
  }
}

export function getPreBookingSession() {
  try {
    const raw = localStorage.getItem(PREBOOKING_SESSION_KEY) || localStorage.getItem(LEGACY_LEAD_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw);
    const createdAt = session.createdAt || (session.timestamp ? new Date(session.timestamp).getTime() : 0);

    // Validate 2-hour session expiration
    if (Date.now() - createdAt > SESSION_EXPIRY_MS) {
      clearPreBookingSession();
      return null;
    }

    return session;
  } catch (err) {
    console.warn('[PaymentSecurity] LocalStorage parse error:', err);
    return null;
  }
}

export function clearPreBookingSession() {
  try {
    localStorage.removeItem(PREBOOKING_SESSION_KEY);
    localStorage.removeItem(LEGACY_LEAD_KEY);
  } catch (err) {
    console.warn('[PaymentSecurity] LocalStorage delete error:', err);
  }
}

export function sanitizeUrlParams() {
  if (typeof window === 'undefined' || !window.location.search) return;

  const url = new URL(window.location.href);
  const sensitiveParams = [
    'payment',
    'razorpay_payment_id',
    'razorpay_payment_link_id',
    'razorpay_payment_link_reference_id',
    'razorpay_payment_link_status',
    'razorpay_signature'
  ];

  let modified = false;
  sensitiveParams.forEach(param => {
    if (url.searchParams.has(param)) {
      url.searchParams.delete(param);
      modified = true;
    }
  });

  if (modified) {
    window.history.replaceState({}, document.title, url.pathname + (url.searchParams.toString() ? '?' + url.searchParams.toString() : ''));
  }
}

export function consumePreBookingSession() {
  clearPreBookingSession();
}

export function validatePaymentReturn() {
  if (typeof window === 'undefined') {
    return { isValid: false, isSuccess: false, isFailure: false, session: null };
  }

  const params = new URLSearchParams(window.location.search);
  const paymentParam = params.get('payment');
  const rzpStatus = params.get('razorpay_payment_link_status');
  const rzpPaymentId = params.get('razorpay_payment_id');
  const rzpLinkId = params.get('razorpay_payment_link_id');
  const rzpSignature = params.get('razorpay_signature');

  const hasSuccessIndicator = paymentParam === 'success' || rzpStatus === 'paid';
  const hasFailureIndicator = 
    paymentParam === 'failed' || 
    paymentParam === 'cancelled' || 
    rzpStatus === 'failed' || 
    rzpStatus === 'cancelled' || 
    rzpStatus === 'expired';

  // If no payment parameters exist in URL, return default clean state
  if (!hasSuccessIndicator && !hasFailureIndicator) {
    return { isValid: false, isSuccess: false, isFailure: false, session: null };
  }

  // PROTECTED ROUTE CHECK 1: Must have an active pre-booking session
  const activeSession = getPreBookingSession();

  if (!activeSession) {
    console.warn('[PaymentSecurity] Unauthenticated payment URL return rejected. No active session token found.');
    sanitizeUrlParams();
    return { 
      isValid: false, 
      isSuccess: false, 
      isFailure: false, 
      session: null, 
      errorReason: 'UNAUTHORIZED_SPOOFED_URL' 
    };
  }

  // PROTECTED ROUTE CHECK 2: Require transaction proof (Payment ID or Signature) for success
  const hasTransactionProof = Boolean(rzpPaymentId) || Boolean(rzpSignature);

  if (hasSuccessIndicator) {
    if (!hasTransactionProof) {
      console.warn('[PaymentSecurity] Payment success return rejected: Missing transaction proof (razorpay_payment_id or razorpay_signature).');
      sanitizeUrlParams();
      return { 
        isValid: false, 
        isSuccess: false, 
        isFailure: false, 
        session: null, 
        errorReason: 'MISSING_TRANSACTION_PROOF' 
      };
    }

    return {
      isValid: true,
      isSuccess: true,
      isFailure: false,
      session: {
        ...activeSession,
        paymentId: rzpPaymentId || '',
        orderId: rzpLinkId || '',
        signature: rzpSignature || ''
      }
    };
  }

  if (hasFailureIndicator) {
    return {
      isValid: true,
      isSuccess: false,
      isFailure: true,
      session: activeSession
    };
  }

  return { isValid: false, isSuccess: false, isFailure: false, session: null };
}
