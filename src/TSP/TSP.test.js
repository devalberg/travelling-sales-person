import TSP from './TSP';

let tsp;

class MockTour {
    constructor() {
        this.vertices = [];
        this.totalDistance;
        this.updateTourProperties = jest.fn()
        this.resetTour = jest.fn();
    }
}

class MockUI {
    constructor() {
        this.displayStatus = jest.fn();
        this.displayTotalDistance = jest.fn();
        this.displayGeneration = jest.fn();
    }
}

class MockCanvas {
    constructor() {
        this.drawTour = jest.fn();
    }
}

describe("Test setupTour", () => {
    beforeEach(() => {
        tsp = new TSP(new MockTour(), new MockTour(), new MockUI(), new MockCanvas());
    });

    it("Should set up the tour according to vertices given and execute tour's updateTourProperties", () => {
        tsp.setupTour([1, 2, 3, 4, 5]);
        expect(tsp.tour.vertices).toEqual([1, 2, 3, 4, 5]);
        expect(tsp.tour.updateTourProperties.mock.calls.length).toBe(1);
    });

    it("Should call the tempTour's resetTour", () => {
        expect(tsp.tempTour.resetTour.mock.calls.length).toBe(0);
        tsp.setupTour([1, 2, 3, 4, 5]);
        expect(tsp.tempTour.resetTour.mock.calls.length).toBe(1);
    })
})

describe("Test runSimulation", () => {
    it("Should set running to true and run twoOpt", () => {
        tsp.twoOptExecuted = false;
        tsp.twoOpt = () => { tsp.twoOptExecuted = true }
        tsp.runSimulation();

        expect(tsp.running).toBe(true);
        expect(tsp.twoOptExecuted).toBe(true);
    });
});

describe("Test stopSimulation", () => {
    it("Should set running to false", () => {
        tsp.running = true;
        tsp.stopSimulation();
        expect(tsp.running).toBe(false);
    });
});

describe("Test twoOptSwap", () => {
    it("Should swap elements correctly: i = 3, k = 6 and output is set in tempTour. Then execute updateTourProperties in tempTour.", () => {
        const input = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A'];
        const output = ['A', 'B', 'C', 'G', 'F', 'E', 'D', 'H', 'A'];
        tsp.tour.vertices = input;
        tsp.twoOptSwap(3, 6);
        expect(tsp.tempTour.updateTourProperties.mock.calls.length).toBeGreaterThanOrEqual(1);
        // check to see if original tour is still the same
        expect(tsp.tempTour.vertices).toEqual(output);
        expect(tsp.tour.vertices).toEqual(input);
    })
})

describe("Test twoOpt", () => {
    beforeEach(() => {
        tsp = new TSP(new MockTour(), new MockTour(), new MockUI(), new MockCanvas());
        tsp.setupTour([{ x: 77, y: 12 }, { x: 20, y: 20 }, { x: 50, y: 40 }, { x: 25, y: 10 }, { x: 30, y: 11 }]);
        tsp.running = true;
    });

    it("Should call twoOptSwap to swap points", () => {
        tsp.twoOptSwap = jest.fn();
        tsp.twoOpt();
        expect(tsp.twoOptSwap.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    it("Should call its UI displayStatus", () => {
        tsp.twoOpt();
        expect(tsp.ui.displayStatus.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    it("Should call its UI displayTotalDistance", () => {
        let tourDistance = 0;
        tsp.twoOptSwap = (i, j) => { tsp.tour.totalDistance = tourDistance++; tsp.tempTour.totalDistance = 5 }
        tsp.twoOpt();
        expect(tsp.ui.displayTotalDistance.mock.calls.length).toBeGreaterThanOrEqual(1);
    });

    it("Should call its UI displayGeneration", () => {
        tsp.twoOpt();
        expect(tsp.ui.displayGeneration.mock.calls.length).toBeGreaterThanOrEqual(1);
    });
});