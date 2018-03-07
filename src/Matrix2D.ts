class Matrix2D {
  // Transformation:
  // 
  //     a  c  e       x          ax + cy + e
  //   ( b  d  f ) * ( y )  =>  ( bx + dy + f )
  //     0  0  1       1               1
  // 
  // 

  constructor(
    public a = 1,
    public b = 0,
    public c = 0,
    public d = 1,
    public e = 0,
    public f = 0
  ) { }
  static parse(str: string) {
    if (str.length === 0) {
      return new Matrix2D();
    }
    const l = str.indexOf('(');
    const r = str.indexOf(')');
    if (l === -1 || r === -1) {
      throw new Error('matrix string parsing error: can\'t find bracket.\n' + str);
    }
    const s = str.slice(l + 1, r);
    const args = s.split(',').map(v => parseFloat(v));
    if (args.length !== 6) {
      throw new Error('matrix string parsing error: expect 6 elements.\n' + s);
    }
    return new Matrix2D(...args);

  }
  static translate(x = 0, y = 0) {
    return new Matrix2D(1, 0, 0, 1, x, y);
  }

  static scale(x = 1, y = x) {
    return new Matrix2D(x, 0, 0, y, 0, 0);
  }

  translate(x = 0, y = 0) {
    // mutate
    return this.leftMultiply(Matrix2D.translate(x, y));
  }
  translated(x = 0, y = 0) {
    // not mutate
    return this.leftMultiplied(Matrix2D.translate(x, y));
  }
  scale(x = 1, y = x) {
    return this.leftMultiply(Matrix2D.scale(x, y));
  }

  leftMultiplied(mat: Matrix2D): Matrix2D {
    // not mutate
    return new Matrix2D(
      mat.a * this.a + mat.c * this.b,
      mat.b * this.a + mat.d * this.b,
      mat.a * this.c + mat.c * this.d,
      mat.b * this.c + mat.d * this.d,
      mat.a * this.e + mat.c * this.f + mat.e,
      mat.b * this.e + mat.d * this.f + mat.f
    );
  }
  leftMultiply(mat: Matrix2D): Matrix2D {
    // mutate
    [this.a, this.b, this.c, this.d, this.e, this.f] = [
      mat.a * this.a + mat.c * this.b,
      mat.b * this.a + mat.d * this.b,
      mat.a * this.c + mat.c * this.d,
      mat.b * this.c + mat.d * this.d,
      mat.a * this.e + mat.c * this.f + mat.e,
      mat.b * this.e + mat.d * this.f + mat.f
    ]
    return this;
  }
  toString() {
    return `matrix(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.e}, ${this.f})`;
  }
}

export default Matrix2D;