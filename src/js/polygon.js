/**
 * @typedef {Vertex[]} Polygon
 * @typedef {'Inside' | 'OnEdge' | 'Outside'} Placement
 * @typedef {'Colinear' | 'Clockwise' | 'Counterclockwise'} Rotation
 */

export class Vertex {
    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Edge} edge 
     * @returns {boolean} a boolean asserting whether or not this vertex is on the given edge
     */
    isOnEdge(edge) {
        return this.x - (window.threshold || 0) <= Math.max(edge.a.x, edge.b.x)
            && this.x + (window.threshold || 0) >= Math.min(edge.a.x, edge.b.x)
            && this.y - (window.threshold || 0) <= Math.max(edge.a.y, edge.b.y)
            && this.y + (window.threshold || 0) >= Math.min(edge.a.y, edge.b.y);
    }

    /**
     * @param {Polygon} polygon
     * @returns {Placement} the placement of this vertex relative to the given polygon
     */
    getRelativePolygonPlacement(polygon) {
        const verticesLength = polygon.length;

        // The polygon must have at least 3 vertices
        if (verticesLength < 3) {
            throw new Error('A Polygon must have at least three vertices');
        }

        // Set the end of the casted ray 
        const rayCastEnd = new Vertex(Number.MAX_SAFE_INTEGER, this.y);

        // Count intersections of the above line with sides of polygon 
        let intersections = 0;
        let currentIndex = 0;

        // IMPORTANT: Do while is used because we also have to check the last vertex with the first one
        do {
            const nextIndex = (currentIndex + 1) % verticesLength;
            const currentVertex = polygon[currentIndex];
            const nextVertext = polygon[nextIndex];

            const polygonEdge = new Edge(currentVertex, nextVertext);
            // Cast a ray through this point
            const rayCast = new Edge(this, rayCastEnd);

            // If the casted ray goes throught the polygon
            if (polygonEdge.intersects(rayCast)) {
                // If this vertex is colinear with the polygon's edge vertices
                if (Vertex.areColinear(currentVertex, this, nextVertext)) {
                    // Check if it is on the polygon's edge or not
                    return this.isOnEdge(polygonEdge)
                        ? 'OnEdge'
                        : 'Outside';
                }
                intersections++;
            }

            currentIndex = nextIndex;
        } while (currentIndex);

        // If there is an odd number of interesctions,
        // this vertex is inside the polygon,
        // otherwise it is not
        return (intersections % 2 == 1)
            ? 'Inside'
            : 'Outside';
    }

    /**
     * @param {Vertex} vertex1 
     * @param {Vertex} vertex2 
     * @param {Vertex} vertex3 
     * @returns {Rotation} the rotation of the given vertices
     */
    static getRotation(vertex1, vertex2, vertex3) {
        const value = (vertex2.y - vertex1.y) * (vertex3.x - vertex2.x) - (vertex2.x - vertex1.x) * (vertex3.y - vertex2.y);

        if (Math.abs(value) <= (window.threshold || 0) * 100) {
            return 'Colinear';
        }

        if (value > 0) {
            return 'Clockwise';
        }

        return 'Counterclockwise';
    }

    /**
     * @param {Vertex} vertex1 
     * @param {Vertex} vertex2 
     * @param {Vertex} vertex3 
     * @returns {boolean} a boolean asserting whether or not the given vertices are colinear
     */
    static areColinear(vertex1, vertex2, vertex3) {
        return this.getRotation(vertex1, vertex2, vertex3) === 'Colinear';
    }
}

export class Edge {
    /**
     * @param {Vertex} a 
     * @param {Vertex} b 
     */
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    /**
     * @param {Edge} edge 
     * @returns a boolean asserting whether or not this edge intersects with the given edge
     */
    intersects(edge) {
        const rotation1 = Vertex.getRotation(this.a, this.b, edge.a);
        const rotation2 = Vertex.getRotation(this.a, this.b, edge.b);
        const rotation3 = Vertex.getRotation(edge.a, edge.b, this.a);
        const rotation4 = Vertex.getRotation(edge.a, edge.b, this.b);

        // If any three vertices have different rotations, they intersect
        if (rotation1 !== rotation2 && rotation3 !== rotation4) {
            return true;
        }

        // If at least three vertices are collinear
        // Then check if one of them is on the edge formed by the other two
        return rotation1 === 'Colinear' && edge.a.isOnEdge(this)
            || rotation2 === 'Colinear' && edge.b.isOnEdge(this)
            || rotation3 === 'Colinear' && this.a.isOnEdge(edge)
            || rotation4 === 'Colinear' && this.b.isOnEdge(edge);
    }
};