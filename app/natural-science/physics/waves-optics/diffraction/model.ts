/**
 * Ideal scalar, uniformly illuminated, far-field single-slit model.
 * Intensities are normalized to the central maximum, so this module describes
 * angular pattern shape rather than total transmitted power.
 */
export const MAX_ANGLE = 60;

function assertPositiveLength(name: string, value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${name} must be a positive finite length.`);
  }
}

export function diffractionBeta(
  thetaDegrees: number,
  wavelength: number,
  aperture: number,
) {
  assertPositiveLength("wavelength", wavelength);
  assertPositiveLength("aperture", aperture);
  if (!Number.isFinite(thetaDegrees)) {
    throw new RangeError("thetaDegrees must be finite.");
  }

  const theta = (thetaDegrees * Math.PI) / 180;
  return Math.PI * (aperture / wavelength) * Math.sin(theta);
}

export function normalizedIntensityAtAngle(
  thetaDegrees: number,
  wavelength: number,
  aperture: number,
) {
  const beta = diffractionBeta(thetaDegrees, wavelength, aperture);
  const sinc = Math.abs(beta) < 1e-7 ? 1 : Math.sin(beta) / beta;
  return sinc * sinc;
}

export function buildScreen(wavelength: number, aperture: number) {
  assertPositiveLength("wavelength", wavelength);
  assertPositiveLength("aperture", aperture);

  return Array.from({ length: 181 }, (_, index) => {
    const theta = ((index - 90) / 90) * MAX_ANGLE;
    return {
      theta,
      intensity: normalizedIntensityAtAngle(theta, wavelength, aperture),
    };
  });
}

/**
 * Angular location of a dark minimum for a single slit:
 * a sin(theta_m) = m lambda.
 * Returns null when that order has no physical solution below or at 90 degrees.
 */
export function minimumAngle(
  wavelength: number,
  aperture: number,
  order: number,
) {
  assertPositiveLength("wavelength", wavelength);
  assertPositiveLength("aperture", aperture);
  if (!Number.isInteger(order) || order < 1) {
    throw new RangeError("order must be a positive integer.");
  }

  const sine = (order * wavelength) / aperture;
  if (sine > 1) return null;
  return (Math.asin(sine) * 180) / Math.PI;
}

export function firstMinimumAngle(wavelength: number, aperture: number) {
  return minimumAngle(wavelength, aperture, 1);
}

/** Inverse of the first-minimum relation for a target angle in (0, 90]. */
export function apertureForFirstMinimum(
  wavelength: number,
  thetaDegrees: number,
) {
  assertPositiveLength("wavelength", wavelength);
  if (!Number.isFinite(thetaDegrees) || thetaDegrees <= 0 || thetaDegrees > 90) {
    throw new RangeError("thetaDegrees must be greater than 0 and at most 90.");
  }

  return wavelength / Math.sin((thetaDegrees * Math.PI) / 180);
}
