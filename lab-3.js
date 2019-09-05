// Se dau 4 puncte.
// Sa se determine daca segmentele se intersescteaza sau nu.
// IMPORTANT: Sunt segmente NU drepte.

class Punct {
  /**
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   *
   * @param {Punct} a
   * @param {Punct} b
   */
  static min(a, b) {
    if (a.x != b.x) {
      return a.x <= b.x ? a : b;
    }

    return a.y <= b.y ? a : b;
  }

  /**
   *
   * @param {Punct} a
   * @param {Punct} b
   */
  static max(a, b) {
    return Punct.min(a, b) === a ? b : a;
  }

  /**
   *
   * @param {Punct} punct
   */
  egalCu(punct) {
    return this.x === punct.x && this.y === punct.y;
  }

  /**
   *
   * @param {Punct} punct
   */
  maiMicCa(punct) {
    return this.x != punct.x ? this.x < punct.x : this.y < punct.y;
  }

  /**
   *
   * @param {Punct} punct
   */
  maiMareCa(punct) {
    return !this.maiMicCa(punct);
  }
}

(function() {
  // const A = new Punct(1, 1);
  // const B = new Punct(3, 3);
  // const C = new Punct(1, 1);
  // const D = new Punct(3, 3);

  const A = new Punct(0, 0);
  const B = new Punct(2, 2);
  const C = new Punct(1, 1);
  const D = new Punct(3, 3);

  // const A = new Punct(2, 0);
  // const B = new Punct(5, 0);
  // const C = new Punct(0, 0);
  // const D = new Punct(4, 0);

  // Ecuatia segmentului AB
  const a1 = A.y - B.y;
  const b1 = B.x - A.x;
  const c1 = B.x * A.y - A.x * B.y;

  // Ecuatia segmentului CD
  const a2 = C.y - D.y;
  const b2 = D.x - C.x;
  const c2 = D.x * C.y - C.x * D.y;

  // Determinantul sistemului
  const delta = a1 * b2 - b1 * a2;

  if (delta != 0) {
    // Solutie unica, aplicam Cramer

    const x =
      ((B.x * A.y - A.x * B.y) * b2 - (D.x * C.y - C.x * D.y) * b1) / delta;
    const y =
      ((D.x * C.y - C.x * D.y) * a1 - (B.x * A.y - A.x * B.y) * a2) / delta;

    if (x < Math.min(A.x, B.x) || x < Math.min(C.x, D.x)) {
      console.log("Segmentele sunt paralele");
    } else if (x > Math.max(A.x, B.x) || x > Math.max(C.x, D.x)) {
      console.log("Segmentele sunt paralele");
    } else {
      console.log("Segmentele se intersecteaza in ", new Punct(x, y));
    }
  } else {
    // Verificam daca rangul matricei extinse este egal cu rangul matricei

    // Daca rangul matricei extinse este 2
    if (b1 * c2 - b2 * c1 != 0 || a1 * c2 - a2 * c1 != 0) {
      console.log("Segmentele sunt paralele");
      return;
    }

    // Daca rangul matricei extinse este 1
    const minAB = Punct.min(A, B);
    const minCD = Punct.min(C, D);
    const maxAB = Punct.max(A, B);
    const maxCD = Punct.max(C, D);

    if (minAB.egalCu(minCD) && maxAB.egalCu(maxCD)) {
      console.log("Segmentele sunt identice");
    } else if (maxCD.maiMicCa(minAB)) {
      console.log("Segmentele sunt paralele");
    } else if (maxCD.egalCu(minAB)) {
      console.log("Segmentele se intersecteaza in punctul ", minAB);
    } else if (minCD.maiMicCa(minAB)) {
      console.log(
        "Segmentele se intersectaza in segmentul: ",
        minAB,
        new Punct(Punct.min(maxAB, maxCD).x, Punct.min(maxAB, maxCD).y)
      );
    } else if (minAB.egalCu(minCD) && minCD.egalCu(Punct.min(maxAB, maxCD))) {
      console.log("Segmentele se intersecteaza in punctul ", minAB);
    } else if (minCD.maiMicCa(Punct.min(maxAB, maxCD))) {
      console.log(
        "Segmentele se intersectaza in segmentul: ",
        minCD,
        new Punct(Punct.min(maxAB, maxCD).x, Punct.min(maxAB, maxCD).y)
      );
      return 0;
    } else if (minCD.egalCu(Punct.min(maxAB, maxCD))) {
      console.log("Segmentele se intersecteaza in punctul", minCD);
    } else {
      console.log("Segmentele sunt paralele");
    }
  }
})();
