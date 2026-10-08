/**
 * Form Input Validation & Sanitization Utility
 */

export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}

export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  // Allows optional +, spaces, hyphens, and digits (min 10 digits)
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  return /^\d{10,15}$/.test(cleaned);
}

export function sanitizeInput(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .trim()
    .replace(/[<>]/g, ''); // Strip basic HTML tags
}
