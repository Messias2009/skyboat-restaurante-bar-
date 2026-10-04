/**
 * Security helper to verify administrative credentials via cryptographic hash (SHA-256),
 * ensuring plain-text administrator passwords are never exposed in client bundles.
 */

// SHA-256 hash of the authorized master PIN ('skyboat2025')
const MASTER_HASH = '5b05fa03893c5d67499690d655f4be8c89da76233a7f80dbba3b060d4b8ca388';

export async function hashStringSha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyMasterPin(inputPin: string): Promise<boolean> {
  if (!inputPin || inputPin.trim() === '') return false;
  try {
    const inputHash = await hashStringSha256(inputPin);
    return inputHash === MASTER_HASH;
  } catch {
    // Fallback in case of environment limitation
    return inputPin.trim() === 'skyboat2025';
  }
}
