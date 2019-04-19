import Tour from './Tour';

let tour;

describe("Test getEdgeLength between two points", () => {

    beforeEach(() => {
        tour = new Tour();
    });

    it("Should return a value of 7.07", () => {
        const v1 = { x: 0, y: 0 };
        const v2 = { x: 5, y: 5 };
        const edge = { v1, v2 };
        const result = tour.calculateEdgeLength(edge);
        expect(result).toBe(7.07);
    });
});

describe("Test update tour properties", () => {

    beforeEach(() => {
        tour = new Tour();
    });

    it("Should update tour length to 80", () => {
        let vertices = [];
        for (let i = 0; i < 5; i++) {
            vertices.push({ x: 10 * i, y: 0 })
        }
        tour.vertices = vertices;
        tour.updateTourProperties();

        expect(tour.totalDistance).toBe(80);

    });

    it("Should update tour edges to array of 2 vertices", () => {
        let vertices = [];
        for (let i = 0; i < 4; i++) {
            vertices.push({ x: 10 * i, y: 0 })
        }
        tour.vertices = vertices;
        tour.updateTourProperties();

        const edges = [
            { v1: { x: 0, y: 0 }, v2: { x: 10, y: 0 } },
            { v1: { x: 10, y: 0 }, v2: { x: 20, y: 0 } },
            { v1: { x: 20, y: 0 }, v2: { x: 30, y: 0 } },
            { v1: { x: 30, y: 0 }, v2: { x: 0, y: 0 } },
        ];
        expect(tour.edges).toEqual(edges);
    });
})
