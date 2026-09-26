/** Ideal scalar, far-field single-slit model. Intensities are normalized to the central maximum. */
export const MAX_ANGLE = 60;

export function buildScreen(wavelength: number, aperture: number) {
  return Array.from({ length: 181 }, (_, index) => {
    const theta = ((index - 90) / 90) * MAX_ANGLE;
    const radians = (theta * Math.PI) / 180;
    const beta = Math.PI * (aperture / wavelength) * Math.sin(radians);
    const sinc = Math.abs(beta) < 1e-7 ? 1 : Math.sin(beta) / beta;
    return { theta, intensity: sinc * sinc };
  });
}

export function firstMinimumAngle(wavelength: number, aperture: number) {
  const value = wavelength / aperture;
  if (value > 1) return null;
  return (Math.asin(value) * 180) / Math.PI;
}
