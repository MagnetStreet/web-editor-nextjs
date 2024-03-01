export class HSV {
  h: number;
  s: number;
  v: number;

  constructor(h: number, s: number, v: number) {
    if (h <= 0) {
      h = 0;
    }
    if (s <= 0) {
      s = 0;
    }
    if (v <= 0) {
      v = 0;
    }

    if (h > 360) {
      h = 360;
    }
    if (s > 100) {
      s = 100;
    }
    if (v > 100) {
      v = 100;
    }

    this.h = parseInt(h.toFixed(0), 10);
    this.s = parseInt(s.toFixed(0), 10);
    this.v = parseInt(v.toFixed(0), 10);
  }
}

export class RGB {
  r: number;
  g: number;
  b: number;

  constructor(r: number, g: number, b: number) {
    if (r <= 0) {
      r = 0;
    }
    if (g <= 0) {
      g = 0;
    }
    if (b <= 0) {
      b = 0;
    }

    if (r > 255) {
      r = 255;
    }
    if (g > 255) {
      g = 255;
    }
    if (b > 255) {
      b = 255;
    }

    this.r = parseInt(r.toFixed(0), 10);
    this.g = parseInt(g.toFixed(0), 10);
    this.b = parseInt(b.toFixed(0), 10);
  }
}

export class CMYK {
  c: number;
  m: number;
  y: number;
  k: number;

  constructor(c: number, m: number, y: number, k: number) {
    if (c <= 0) {
      c = 0;
    }
    if (m <= 0) {
      m = 0;
    }
    if (y <= 0) {
      y = 0;
    }
    if (k <= 0) {
      k = 0;
    }

    if (c > 100) {
      c = 100;
    }
    if (m > 100) {
      m = 100;
    }
    if (y > 100) {
      y = 100;
    }
    if (k > 100) {
      k = 100;
    }

    this.c = parseInt(c.toFixed(0), 10);
    this.m = parseInt(m.toFixed(0), 10);
    this.y = parseInt(y.toFixed(0), 10);
    this.k = parseInt(k.toFixed(0), 10);
  }
}
