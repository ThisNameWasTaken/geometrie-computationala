class Point2D {
    /**
     * @param {Number} x - x coord
     * @param {Number} y - y coord
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // TODO: Override for Point3D
    /**
     * checks if three points are collinear
     * @param {Point2D} a - first point
     * @param {Point2D} b - second point
     * @param {Point2D} c - third point
     * @returns {Boolean}
     */
    static areCollinear(a, b, c) {
        return !(a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    }
}

class Point3D extends Point2D {
    /**
     * @param {Number} x - x coord 
     * @param {Number} y - y coord 
     * @param {Number} z - z coord 
     */
    constructor(x = 0, y = 0, z = 0) {
        super(x, y);
        this.z = z;
    }

    /**
     * 
     * @param {point3D} a - first point 
     * @param {point3D} b - second point 
     * @param {point3D} c - third point 
     */
    static areCollinear(a, b, c) {
        // 1 a.x b.x
        // 1 a.y b.y
        // 1 a.z b.z
        // 1 a.x b.x
        // 1 a.y b.y
        const det1 = a.y * b.z + a.z * b.x + a.x * b.y - b.x * a.y - b.y * a.z - a.x * b.z;

        // 1 a.x c.x
        // 1 a.y c.y
        // 1 a.z c.z
        // 1 a.x c.x
        // 1 a.y c.y
        const det2 = a.y * c.z + a.z * c.x + a.x * c.y - c.x * a.y - c.y * a.z - a.x * c.z;

        // 1 b.x c.x
        // 1 b.y c.y
        // 1 b.z c.z
        // 1 b.x c.x
        // 1 b.y c.y
        const det3 = b.y * c.z + b.z * c.x + b.x * c.y - c.x * b.y - c.y * b.z - b.x * c.z;

        // return det1 === det2 === det3 === 0;
        return det1 === 0 && det2 === 0 && det3 === 0;
    }

    /**
     * checks if three points are collinear
     * @param {Point2D} a - first point
     * @param {Point2D} b - second point
     * @param {Point2D} c - third point
     * @returns {Boolean}
     */
    static areCoplanar(a, b, c) {
        return;
    }
}



console.log(Point2D.areCollinear(
    new Point2D(1, 1),
    new Point2D(1, 4),
    new Point2D(1, 3)
));

console.log(Point2D.areCollinear(
    new Point2D(1, 1),
    new Point2D(2, 5),
    new Point2D(4, 6)
));

console.log(Point3D.areCollinear(
    new Point3D(6, 7, 1),
    new Point3D(2, -3, 1),
    new Point3D(4, -5, 0)
));

console.log(Point3D.areCollinear(
    new Point3D(0, 0, 0),
    new Point3D(1, 1, 1),
    new Point3D(2, 2, 2)
));