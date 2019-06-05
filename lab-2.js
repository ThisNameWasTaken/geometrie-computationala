class Punct {
  /**
   *
   * @param {Number} x
   * @param {Number} y
   */
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  /**
   *
   * @param {Punct} punct1
   * @param {Punct} punct2
   */
  static comparator(punct1, punct2) {
    return punct1.x === punct2.x ? punct1.y - punct2.y : punct1.x - punct2.x;
  }

  /**
   *
   * @param {Segment} segment
   */
  ePeSegment(segment) {
    return segment.eVertical()
      ? this.y >= Math.min(segment.A.y, segment.B.y) &&
          this.y <= Math.max(segment.A.y, segment.B.y)
      : this.x >= Math.min(segment.A.x, segment.B.x) &&
          this.x <= Math.max(segment.A.x, segment.B.x);
  }

  /**
   *
   * @param {Punct} punct1
   * @param {Punct} punct2
   * @param {Punct} punct3
   * @returns {Boolean}
   */
  static suntColiniare(punct1, punct2, punct3) {
    return determinant(punct1, punct2, punct3) === 0;
  }
}

class Segment {
  /**
   *
   * @param {Punct} A
   * @param {Punct} B
   */
  constructor(A, B) {
    this.A = A;
    this.B = B;
  }

  eVertical() {
    return this.A.x === this.B.x;
  }

  eOrizontal() {
    return !this.eVertical();
  }
}

/**
 *
 * @param {Punct} punct1
 * @param {Punct} punct2
 * @param {Punct} punct3
 */
function determinant(punct1, punct2, punct3) {
  return (
    (punct1.y - punct2.y) * (punct3.x - punct2.x) -
    (punct1.x - punct2.x) * (punct3.y - punct2.y)
  );
}

/**
 *
 * @param {Punct} punct1
 * @param {Punct} punct2
 * @param {Punct} punct3
 */
function acoperire(punct1, punct2, punct3) {
  return Math.abs(determinant(punct1, punct2, punct3)) / 2;
}

(function() {
  let puncte = [
    new Punct(0, 0),

    // new Punct(1, 1),
    // new Punct(2, 2),
    // new Punct(2, 3),
    // new Punct(4, 4),

    // new Punct(1, 1),
    // new Punct(1, 4),
    // new Punct(2, 3),
    // new Punct(2, 5),

    new Punct(1, 1),
    new Punct(1, 4),
    new Punct(1, 3),
    new Punct(2, 5)

    // new Punct(1, 1),
    // new Punct(1, 4),
    // new Punct(1, 3),
    // new Punct(1, 5),
  ];

  if (
    Punct.suntColiniare(puncte[1], puncte[2], puncte[3]) &&
    Punct.suntColiniare(puncte[2], puncte[3], puncte[4])
  ) {
    console.log("punctele sunt coliniare");
    puncte.sort(Punct.comparator);
    if (
      puncte[2].ePeSegment(new Segment(puncte[1], puncte[4])) &&
      puncte[3].ePeSegment(new Segment(puncte[1], puncte[4]))
    ) {
      console.log(
        "segmente ",
        new Segment(puncte[1], puncte[4]),
        new Segment(puncte[2], puncte[3])
      );
    }
  } else {
    let acoperireMaxima = 0;
    let triunghi = [];
    let punct;

    const acoperire1 = acoperire(puncte[1], puncte[2], puncte[3]);
    if (acoperireMaxima < acoperire1) {
      acoperireMaxima = acoperire1;
      triunghi = [puncte[1], puncte[2], puncte[3]];
      punct = puncte[4];
    }

    const acoperire2 = acoperire(puncte[1], puncte[2], puncte[4]);
    if (acoperireMaxima < acoperire2) {
      acoperireMaxima = acoperire2;
      triunghi = [puncte[1], puncte[2], puncte[4]];
      punct = puncte[3];
    }

    const acoperire3 = acoperire(puncte[1], puncte[3], puncte[4]);
    if (acoperireMaxima < acoperire3) {
      acoperireMaxima = acoperire3;
      triunghi = [puncte[1], puncte[3], puncte[4]];
      punct = puncte[2];
    }

    const acoperire4 = acoperire(puncte[2], puncte[3], puncte[4]);
    if (acoperireMaxima < acoperire4) {
      acoperireMaxima = acoperire4;
      triunghi = [puncte[2], puncte[3], puncte[4]];
      punct = puncte[1];
    }

    function eTriunghi() {
      return (
        acoperireMaxima === acoperire1 + acoperire2 + acoperire3 ||
        acoperireMaxima === acoperire1 + acoperire2 + acoperire4 ||
        acoperireMaxima === acoperire1 + acoperire3 + acoperire4 ||
        acoperireMaxima === acoperire2 + acoperire3 + acoperire4
      );
    }

    if (eTriunghi()) {
      console.log("triunghi ", triunghi);
      console.log("punct interior ", punct);
    } else {
      console.log("patrulater convex ", puncte.slice(1, puncte.length));
    }
  }
})();
