import Utilities from './Utilities';

describe("Test GenerateRandomVertex", () => {
    it("Should return x: 2, y: 5", () => {
        const randomMock = () => 1;
        const result = Utilities.generateRandomVertex(randomMock, 2, 5);
        expect(result).toEqual({ x: 2, y: 5 });
    })
    it("Should return x: 0, y: 0", () => {
        const randomMock = () => 1;
        const result = Utilities.generateRandomVertex(randomMock, 2, 5);
        expect(result).toEqual({ x: 2, y: 5 });
    })
})

describe("Test GenerateRandomVertexArray", () => {
    it("Should return array of length 10 containing objects of {x: 1, y:1}", () => {
        const mockVertexGenerator = (randomFunction, xMax, yMax) => ({ x: xMax, y: yMax });
        const result = Utilities.generateRandomVertexArray(mockVertexGenerator, 10, 1, 1);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    x: 1, y: 1
                })
            ])
        );
        expect(result.length).toBe(10);
    })

    it("Should return array of length 5 containing objects of {x: 5, y:5}", () => {
        const mockVertexGenerator = (randomFunction, xMax, yMax) => ({ x: xMax, y: yMax });
        const result = Utilities.generateRandomVertexArray(mockVertexGenerator, 5, 5, 5);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    x: 5, y: 5
                })
            ])
        );
        expect(result.length).toBe(5);
    });
})