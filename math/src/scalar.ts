export function floatEq(a: number, b: number, precision = 0.0000001): boolean {
  return Math.abs(a - b) < precision;
}

export function clamp(v: number, l: number, r: number): number {
  return Math.max(Math.min(v, r), l);
}

export function lerpUnclamped(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t, 0, 1);
}
