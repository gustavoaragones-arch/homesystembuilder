/**
 * Feature flags — soft launch & staged rollouts.
 * Toggle here without removing code paths. Spec referenced `config/features.js`; this repo uses TS.
 */
export const FEATURES = {
  PDF_DOWNLOAD: false,
  EMAIL_GATE: false,
  PREMIUM: false,
} as const;

export type FeatureKey = keyof typeof FEATURES;
