import { floatEq, clamp, lerp } from './scalar';

export class Vector2 {
  constructor(public x: number, public y: number) {}

  static up(): Vector2 {
    return new Vector2(0, 1);
  }

  static down(): Vector2 {
    return new Vector2(0, -1);
  }

  static right(): Vector2 {
    return new Vector2(1, 0);
  }

  static left(): Vector2 {
    return new Vector2(-1, 0);
  }

  static zero(): Vector2 {
    return new Vector2(0, 0);
  }

  static one(): Vector2 {
    return new Vector2(1, 1);
  }

  /**
   * @returns random  uniform distributed unit vector.
   */
  static random(): Vector2 {
    const angle = Math.random() * 2 * Math.PI;
    return new Vector2(Math.cos(angle), Math.sin(angle));
  }

  add(rhs: Vector2): Vector2 {
    return new Vector2(this.x + rhs.x, this.y + rhs.y);
  }

  addScalar(value: number): Vector2 {
    return new Vector2(this.x + value, this.y + value);
  }

  minus(rhs: Vector2): Vector2 {
    return new Vector2(this.x - rhs.x, this.y - rhs.y);
  }

  minusScalar(value: number): Vector2 {
    return new Vector2(this.x - value, this.y - value);
  }

  scale(value: number): Vector2 {
    return new Vector2(this.x * value, this.y * value);
  }

  mul(rhs: Vector2): Vector2 {
    return new Vector2(this.x * rhs.x, this.y * rhs.y);
  }

  div(rhs: Vector2): Vector2 {
    return new Vector2(this.x / rhs.x, this.y / rhs.y);
  }

  /**
   * Dot product. It's just a cosine.
   * @param rhs
   * @returns
   */
  dot(rhs: Vector2): number {
    return this.x * rhs.x + this.y * rhs.y;
  }

  /**
   * Cross product. It's just a sine.
   * @param other
   */
  cross(other: Vector2) {
    return this.x * other.y - this.y * other.x;
  }

  toArr(): [number, number] {
    return [this.x, this.y];
  }

  /**
   * Returns length of the vector
   */
  get magnitude(): number {
    return Math.sqrt(this.magnitudeSquared);
  }

  get magnitudeSquared(): number {
    return this.x * this.x + this.y * this.y;
  }

  /**
   * Returns a normalized vector.
   */
  get normalized(): Vector2 {
    const l = this.magnitude;
    return new Vector2(this.x / l, this.y / l);
  }

  /**
   * Normalize this vector inplace.
   */
  normalize(): void {
    const l = this.magnitude;
    this.x /= l;
    this.y /= l;
  }

  /**
   * Compares this vector with other with a float precision.
   * @param other
   * @param precision
   * @returns
   */
  eq(other: Vector2, precision = 0.0000001): boolean {
    return floatEq(this.x, other.x, precision) && floatEq(this.y, other.y, precision);
  }

  get xx(): Vector2 {
    return new Vector2(this.x, this.x);
  }

  get yy(): Vector2 {
    return new Vector2(this.y, this.y);
  }

  get yx(): Vector2 {
    return new Vector2(this.y, this.x);
  }

  /**
   * Returns the angle between this vector and other in radians.
   * @param other
   * @returns
   */
  angleTo(other: Vector2): number {
    if (this.eq(other)) {
      return 0;
    }

    const cosine = this.dot(other) / (this.magnitude * other.magnitude);
    return Math.acos(clamp(cosine, -1, 1));
  }

  /**
   * Returns the signed angle between this and other in radians.
   * @param other
   * @returns
   */
  angleToSigned(other: Vector2): number {
    if (this.eq(other)) {
      return 0;
    }

    const s = this.cross(other);
    const c = this.dot(other);

    return Math.atan2(s, c);
  }

  distanceTo(other: Vector2): number {
    return this.minus(other).magnitude;
  }

  distanceToSqared(other: Vector2): number {
    return this.minus(other).magnitudeSquared;
  }

  /**
   * Returns a vector that is made from the largest components of two vectors.
   * @param other
   * @returns
   */
  max(other: Vector2): Vector2 {
    return new Vector2(Math.max(this.x, other.x), Math.max(this.y, other.y));
  }

  /**
   * Returns a vector that is made from the smallest components of two vectors.
   * @param other
   * @returns
   */
  min(other: Vector2): Vector2 {
    return new Vector2(Math.min(this.x, other.x), Math.min(this.y, other.y));
  }

  /**
   * Reflects a vector off the surface defined by a normal.
   * This vector is the direction vector towards the surface.
   * @param normal The normal vector that defines the surface.
   */
  reflect(normal: Vector2): Vector2 {
    const d = this.dot(normal);
    return this.minus(normal.scale(2 * d));
  }

  lerp(target: Vector2, t: number) {
    return new Vector2(lerp(this.x, target.x, t), lerp(this.y, target.y, t));
  }

  get floor() {
    return new Vector2(Math.floor(this.x), Math.floor(this.y));
  }

  get ceil() {
    return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
  }

  get round() {
    return new Vector2(Math.round(this.x), Math.round(this.y));
  }
}
