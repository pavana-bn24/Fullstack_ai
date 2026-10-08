import { useState, useEffect } from 'react';
import { validatePaymentReturn, sanitizeUrlParams, clearPreBookingSession } from '../utils/paymentSecurity';

export function usePaymentGuard() {
  const [paymentState, setPaymentState] = useState({
    isSuccess: false,
    isFailed: false,
    leadSession: null
  });

  useEffect(() => {
    const result = validatePaymentReturn();

    if (result.isValid) {
      if (result.isSuccess) {
        setPaymentState({
          isSuccess: true,
          isFailed: false,
          leadSession: result.session
        });
        // Consume session and sanitize URL immediately to prevent replay attacks on page refresh
        sanitizeUrlParams();
        clearPreBookingSession();
      } else if (result.isFailure) {
        setPaymentState({
          isSuccess: false,
          isFailed: true,
          leadSession: result.session
        });
        sanitizeUrlParams();
      }
    }
  }, []);

  const dismissPaymentStatus = () => {
    setPaymentState({
      isSuccess: false,
      isFailed: false,
      leadSession: null
    });
    sanitizeUrlParams();
    clearPreBookingSession();
  };

  return {
    paymentSuccess: paymentState.isSuccess,
    paymentFailed: paymentState.isFailed,
    leadSession: paymentState.leadSession,
    dismissPaymentStatus
  };
}
