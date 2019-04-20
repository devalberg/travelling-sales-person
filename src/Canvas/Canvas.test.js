import Canvas from './Canvas';
import { createCanvas } from 'canvas';


let canvas;
document.body.innerHTML = '<canvas id="my-canvas" width="800" height="800">Canvas not supported!</canvas>';
document.getElementById('my-canvas').getContext = (param) => createCanvas(800, 800).getContext(param);

describe("Test valid drawVertices", () => {

    beforeEach(() => {
        canvas = new Canvas(document);
    })

    it("Should throw error because parameter is not array", () => {
        const param = 123
        expect(() => canvas.drawVertices(param)).toThrow("Vertices must be an array");
    })

    it("Should throw error because each item in array does not have x and y", () => {
        const param = [{ a: 3, b: 5 }];
        expect(() => canvas.drawVertices(param)).toThrow("Vertex must contain x and y");
    })

    it("Should throw error because each item in array does not have x and y", () => {
        const param = [1];
        expect(() => canvas.drawVertices(param)).toThrow("Vertex must be an object");
    })

    it("Should throw error because vertex x or y is not a number", () => {
        const param1 = [{ x: "hey", y: "yo" }];
        const param2 = [{ x: true, y: false }];
        const param3 = [{ x: 1, y: false }];
        expect(() => canvas.drawVertices(param1)).toThrow("Vertex x and y must be numbers");
        expect(() => canvas.drawVertices(param2)).toThrow("Vertex x and y must be numbers");
        expect(() => canvas.drawVertices(param3)).toThrow("Vertex x and y must be numbers");
    })

    it("Should not throw anything because array is valid", () => {
        const param = [{ x: 1, y: 2 }];
        expect(() => canvas.drawVertices(param)).not.toThrow();
    })
})

describe("Test valid drawEdgesBetweenVertices", () => {
    beforeEach(() => {
        canvas = new Canvas(document);
    })

    it("Should throw an error because vertices are not objects", () => {
        let v1 = 1;
        let v2 = 2;
        expect(() => canvas.drawEdgesBetweenVertices(v1, v2)).toThrow("Vertex must be an object");

        v1 = true;
        v2 = false;
        expect(() => canvas.drawEdgesBetweenVertices(v1, v2)).toThrow("Vertex must be an object");

        v1 = "text";
        v2 = "another text"
        expect(() => canvas.drawEdgesBetweenVertices(v1, v2)).toThrow("Vertex must be an object");

        v1 = { x: 1, y: 2 }; // one vertex being correct
        expect(() => canvas.drawEdgesBetweenVertices(v1, v2)).toThrow("Vertex must be an object");

    });

    it("Should throw an error because vertices have invalid keys", () => {
        let v1 = { a: 1, b: 2 };
        let v2 = { a: 1, b: 5 };
        expect(() => canvas.drawEdgesBetweenVertices(v1, v2)).toThrow("Vertex must contain x and y");
    });

    it("Should throw an error because vertices have invalid values", () => {
        let v1 = { x: 1, y: true };
        let v2 = { x: 1, y: 5 };
        expect(() => canvas.drawEdgesBetweenVertices(v1, v2)).toThrow("Vertex x and y must be numbers");
    });
});

describe("Test set delay", () => {
    beforeEach(() => {
        canvas = new Canvas(document);
    })

    it("Should update delay to 20", () => {
        canvas.setDelay(20);
        expect(canvas.delay).toBe(20);
    })

    it("Should throw error", () => {
        expect(() => canvas.setDelay(-1)).toThrow();
        expect(() => canvas.setDelay(true)).toThrow();
    })
});