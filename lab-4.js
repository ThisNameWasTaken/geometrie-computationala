// Se dau 4 puncte .
// Sa se determine daca pozitia lui D fata de triunghiul ABCD.
// Sa se determina daca patrulaterul este circumscriptabil sau nu.

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
   * @param {Punct} punct
   */
  distanta(punct) {
    return Math.sqrt(
      (punct.x - this.x) * (punct.x - this.x) +
        (punct.y - this.y) * (punct.y - this.y)
    );
  }

  /**
   *
   * @param {Punct} punct1
   * @param {Punct} punct2
   * @param {Punct} punct3
   */
  static cos(punct1, punct2, punct3) {
    const puncte = [
      new Punct(punct3.x - punct1.x, punct3.y - punct1.y),
      new Punct(punct2.x - punct1.x, punct2.y - punct1.y)
    ];

    return (
      (puncte[0].x * puncte[1].x + puncte[0].y * puncte[1].y) /
      (Math.sqrt(puncte[0].x * puncte[0].x + puncte[0].y * puncte[0].y) *
        Math.sqrt(puncte[1].x * puncte[1].x + puncte[1].y * puncte[1].y))
    );
  }
}

class Triunghi {
  /**
   *
   * @param {Punct} punct1
   * @param {Punct} punct2
   * @param {Punct} punct3
   */
  constructor(punct1, punct2, punct3) {
    this.punct1 = punct1;
    this.punct2 = punct2;
    this.punct3 = punct3;
  }
}

(function() {
  const puncte = [
    new Punct(4, 0),
    new Punct(2, 4),
    new Punct(0, 3),
    new Punct(0, 0)
  ];

  const unghi = Math.acos(
    (Punct.cos(puncte[1], puncte[0], puncte[2]) * 180) / Math.PI +
      (Punct.cos(puncte[3], puncte[0], puncte[2]) * 180) / Math.PI
  );

  const asezareCerc =
    unghi >= 179 && unghi <= 181
      ? "pe cercul"
      : unghi > 180
      ? "in interiorul cercului"
      : "in exteriorul cercului";

  console.log(
    "punctul ",
    puncte[3],
    asezareCerc,
    "circumscris triunghiului\n",
    puncte.slice(0, 3)
  );

  const eCircumscriptibil =
    puncte[0].distanta(puncte[1]) + puncte[2].distanta(puncte[3]) ===
    puncte[1].distanta(puncte[2]) + puncte[0].distanta(puncte[3]);

  console.log("");

  console.log(
    "patrulaterul\n",
    puncte,
    "\n",
    eCircumscriptibil ? "" : "NU",
    "este circumscriptibil"
  );
})();
